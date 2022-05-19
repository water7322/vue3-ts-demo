const targetMap = new WeakMap();
let activeEffect = null;
export function effect(fn, options = {}) {
    const effectFn = () => {
        try {
            activeEffect = effectFn;
            return fn();
        } finally {
            activeEffect = null;
        }
    };
    if (!options.lazy) {
        effectFn();
    }
    effectFn.scheduler = options.scheduler;
    return effectFn;
}

export function track(target, type, key) {
    // console.log(`触发 track -> target: ${target} type:${type} key:${key}`)
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        // 初始化 depsMap 的逻辑
        targetMap.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if (!deps) {
        depsMap.set(key, (deps = new Set()));
    }
    if (!deps.has(activeEffect) && activeEffect) {
        // 防止重复注册
        deps.add(activeEffect);
    }
}

export function trigger(target, type, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }
    const deps = depsMap.get(key);
    if (!deps) {
        return;
    }
    const effects = [];
    for (const dep of deps) {
        effects.push(dep);
    }
    for (const effectFn of effects) {
        if (effectFn.scheduler) {
            effectFn.scheduler();
        } else {
            effectFn();
        }
    }
}
