const throttle = (fn, delay) => {
    let lastTime = 0;
    return (...args) => {
        const nowTime = Date.now();
        if (nowTime - lastTime < delay) return;
        lastTime = nowTime;
        fn.apply(this, args);
    };
};

const throttle2 = (fn, delay) => {
    let timer = null;
    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay);
        }
    };
};

function test() {
    console.log(1);
}
const testFn = throttle(test, 2000);

for (const i of new Array(10)) {
    testFn();
}
