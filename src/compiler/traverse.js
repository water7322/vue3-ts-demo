import { PatchFlags } from './shared.js';
export function traverse(ast, context) {
    switch (ast.type) {
        case 'root':
            context.helpers.add('createBlock');
        case 'element':
            ast.children.forEach((node) => {
                traverse(node, context);
            });
            ast.flag = 0;
            ast.props = ast.props.map((prop) => {
                const { key, val } = prop;
                if (key[0] === '@') {
                    ast.flag |= PatchFlags.HYDRATE_EVENTS;
                    return {
                        key: 'on' + key[1].toUpperCase() + key.slice(2),
                        val
                    };
                }
                if (key[0] === ':') {
                    const k = key.slice(1);
                    if (k === 'class') {
                        ast.flag |= PatchFlags.CLASS;
                    } else if (k === 'style') {
                        ast.flag |= PatchFlags.STYLE;
                    } else {
                        ast.flag |= PatchFlags.PROPS;
                    }
                    return {
                        key: key.slice(1),
                        val
                    };
                }
                if (key.startsWith('v-')) {
                }
                return {
                    ...prop,
                    static: true
                };
            });
        case 'text':
            let re = /\{\{(.*)\}\}/g;
            if (re.test(ast.val)) {
                ast.flag |= PatchFlags.TEXT;
                context.helpers.add('toDisplayString');
                ast.val = ast.val.replace(re, (s0, s1) => {
                    return s1;
                });
            } else {
                ast.static = true;
            }
    }
}
