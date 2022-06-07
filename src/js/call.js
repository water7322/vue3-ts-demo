Function.prototype.call2 = function (context, ...args) {
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
};
