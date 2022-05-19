import { mutableHandles } from './baseHandlers.js';

export function reactive(target) {
    if (typeof target !== 'object') {
        console.warn(`reactive ${target} 必须是对象`);
        return target;
    }
    return new Proxy(target, mutableHandles);
}
