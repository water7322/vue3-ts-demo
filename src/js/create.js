function create(prototype) {
    const fn = function () {};
    fn.prototype = prototype;
    return new fn();
}

const b = {};
a = create(b);
console.log(a.__proto__ === b);
console.log(a.__proto__.constructor === Object);
