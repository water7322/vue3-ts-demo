import fs from 'fs-extra';
import Koa from 'koa';
import path from 'path';
import compilerSfc from '@vue/compiler-sfc';
import compilerDom from '@vue/compiler-dom';
const app = new Koa();
const __dirname = path.resolve();

app.use(async (ctx) => {
    const {
        request: { url, query }
    } = ctx;
    console.log(url);
    if (url === '/') {
        ctx.type = 'text/html';
        let content = fs.readFileSync('./index.html', 'utf-8');
        ctx.body = content;
    }
    if (url.endsWith('.js')) {
        // js文件
        const p = path.resolve(__dirname, url.slice(1));
        ctx.type = 'application/javascript';
        const content = fs.readFileSync(p, 'utf-8');
        ctx.body = rewriteImport(content);
    }
    if (url.startsWith('/@modules/')) {
        const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''));
        const module = fs.readJsonSync(prefix + '/package.json').module;
        const p = path.resolve(prefix, module);
        const ret = fs.readFileSync(p, 'utf-8');
        ctx.type = 'application/javascript';
        ctx.body = rewriteImport(ret);
    }
    if (url.includes('.vue')) {
        const p = path.resolve(__dirname, url.split('?')[0].slice(1));
        const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));
        console.log(query.type);
        if (!query.type) {
            ctx.type = 'application/javascript';
            ctx.body = ` ${rewriteImport(
                descriptor.scriptSetup.content.replace('export default ', 'const __script = ')
            )} import { render as __render } from "${url}?type=template"
            __script.render = __render
            export default __script `;
        } else if (query.type === 'template') {
            const template = descriptor.template;
            const render = compilerDom.compile(template.content, { mode: 'module' }).code;
            ctx.type = 'application/javascript';
            ctx.body = rewriteImport(render);
        }
    }
    if (url.endsWith('.css')) {
        const p = path.resolve(__dirname, url.slice(1));
        const file = fs.readFileSync(p, 'utf-8');
        const content = `
        const css = "${file.replace(/\n/g, '')}"
        let link = document.createElement('style')
        link.setAttribute('type', 'text/css')
        document.head.appendChild(link)
        link.innerHTML = css
        export default css
        `;
        ctx.type = 'application/javascript';
        ctx.body = content;
    }
});

app.listen('24678', () => {
    console.log('端口24678');
});

function rewriteImport(content) {
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, (s0, s1) => {
        if (s1[0] !== '.' && s1[1] !== '/') {
            return ` from '/@modules/${s1}'`;
        } else {
            return s0;
        }
    });
}
