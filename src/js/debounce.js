const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

const debounce2 = (fn, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        const callNow = !timer;
        timer = setTimeout(() => {
            timer = null;
        }, delay);
        if (callNow) fn.apply(this, args);
    };
};

const a = {};
function asdf() {
    console.log(this === a);
    console.log(123123);
}
a.debounceFn = debounce(asdf, 2000);
a.debounceFn();
a.debounceFn();
