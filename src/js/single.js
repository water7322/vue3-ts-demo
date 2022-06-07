const SingleInstance = (function () {
    let instance;
    function Single(age, sex) {
        this.age = age;
        this.sex = sex;
    }
    return function (...args) {
        console.log(instance);
        if (instance === undefined) {
            instance = new Single(...args);
        }
        return instance;
    };
})();

const a = new SingleInstance(18);
console.log(a.age);
const b = new SingleInstance();
console.log(a === b);

function User(name) {
    this.name = name;
}
function SingleWrapper(Fn) {
    let instance;
    return function (...args) {
        if (instance === undefined) {
            instance = new Fn(...args);
        }
        return instance;
    };
}

const SingleUser = SingleWrapper(User);
const c = new SingleUser('water');
console.log(c.name);
const d = new SingleUser('zxcv');
console.log(c === d);
