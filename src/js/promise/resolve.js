Promise.resolve2 = function (value) {
    return new Promise((resolve) => resolve(value));
};

Promise.resolve2(4).then((data) => console.log(data));
