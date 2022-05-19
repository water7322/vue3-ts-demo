import { traverse } from './traverse.js';

export function transform(ast) {
    let context = {
        helpers: new Set(['openBlock', 'createVnode'])
    };
    traverse(ast, context);
    ast.helpers = context.helpers;
}
