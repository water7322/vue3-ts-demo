export function generate(ast) {
    const { helpers } = ast;

    let code = `
import {${[...helpers].map((v) => v + ' as _' + v).join(', ')}} from 'vue'\n
export function render(_ctx, _cache, $props) {
    return (_openBlock(), ${ast.children.map((node) => walk(node))})
}`;

    function walk(node) {
        switch (node.type) {
            case 'element':
                let { flag } = node;
                let props =
                    '{' +
                    node.props
                        .reduce((ret, p) => {
                            if (flag.props) {
                                ret.push(p.key + ':_ctx.' + p.val.replace(/['"]/g, ''));
                            } else {
                                ret.push(p.key + ':' + p.val);
                            }
                            return ret;
                        }, [])
                        .join(',') +
                    '}';
                return `_createVnode("${node.tag}", ${props}), [${node.children.map((n) => walk(n))}], ${JSON.stringify(
                    flag
                )}`;
            case 'text':
                if (node.static) {
                    return '"' + node.val + '"';
                } else {
                    return `_toDisplayString(_ctx.${node.val})`;
                }
        }
    }
    return code;
}
