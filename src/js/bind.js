Function.prototype.bind2 = function (context, ...args) {
    const self = this;
    function fBound(...args2) {
        return self.apply(this instanceof self ? this : context, args.concat(args2));
    }
    fBound.prototype = Object.create(self.prototype);
    return fBound;
};

function test(a, b, c, d) {
    console.log('this', this);
    console.log(a, b, c, d);
    this.asd = 'asd';
    return {
        b: 5
    };
}
const a = {};
const bindTest = test.bind2(a, 1, 2, 3);
// bindTest(4);
const newTest = new bindTest(4);
console.log(newTest.asd);
