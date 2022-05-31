const fs = require('fs');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAstSync } = require('@babel/core');
module.exports = {
    getAST: (path) => {
        const source = fs.readFileSync(path, 'utf-8');
        return parse(source, {
            sourceType: 'module'
        });
    },
    getDependencies: (ast) => {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration: (nodePath) => {
                const { node } = nodePath;
                // console.log(nodePath);
                console.log(node.source.value);
                dependencies.push(node.source.value);
            }
        });
        return dependencies;
    },
    transform: (ast) => {
        const res = transformFromAstSync(ast, null, {
            presets: ['@babel/env']
        });
        // console.log(res)
        return res.code;
    }
};
