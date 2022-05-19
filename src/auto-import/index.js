const vue3 = ['ref', 'computed', 'reactive', 'onMounted', 'watchEffect', 'watch'];

export default function autoPlugin() {
    return {
        name: 'vite-plugin-auto-import',
        enforce: 'pre',
        transform(code, id) {
            const vueReg = /\.vue$/;
            if (vueReg.test(id)) {
                const helpers = new Set();
                vue3.forEach((api) => {
                    const reg = new RegExp(api + '(.*)');
                    if (reg.test(code)) {
                        helpers.add(api);
                    }
                });
                return code.replace(
                    '<script setup>',
                    `<script setup>
                import {${[...helpers].join(', ')}} from 'vue'
                `
                );
            }
            return code;
        }
    };
}
