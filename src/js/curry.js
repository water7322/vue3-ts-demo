function curry(fn) {
    return function curried(...args) {
        const that = this;
        if (fn.length <= args.length) return fn.apply(that, args);
        return (...args2) => {
            return curried.call(that, ...args, ...args2);
        };
    };
}

const a = {};
function add(a, b, c, d) {
    console.log(this);
    return a + b + c + d;
}

a.curryAdd = curry(add);
console.log(a.curryAdd(1)(2)(3)(4));
