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

function sum(...args) {
    let total = args.reduce((pre, cur) => pre + cur, 0);
    function curry(...args2) {
        total = total + args2.reduce((pre, cur) => pre + cur, 0);
        return curry;
    }
    curry.toString = () => {
        return total;
    };
    return curry;
}

console.log(sum(1) == 1);
console.log(sum(1, 2)(3) == 6);
console.log(sum(1)(2)(3) == 6);
console.log(sum(1)(2)(3)(4) == 10);
console.log(sum(1, 2, 3, 4) == 10);

function sum(...args) {
    if(args.length === 0) return 0
    const totalArgs = [...args];
    return function curry(...args2) {
        if (args2.length === 0) {
            return totalArgs.reduce((pre, cur) => pre + cur, 0);
        } else {
            totalArgs.push(...args2);
            return curry;
        }
    };
}

console.log(sum() === 0);
console.log(sum(1)() === 1);
console.log(sum(1, 2)(3)() === 6);
console.log(sum(1)(2)(3)() === 6);
console.log(sum(1)(2)(3)(4)() === 10);
console.log(sum(1, 2, 3, 4)() === 10);
