Promise.prototype.finally2 = function (callback) {
    return this.then(
        (value) =>
            Promise.resolve(callback()).then(() => {
                return value;
            }),
        (reason) =>
            Promise.resolve(callback()).then(() => {
                throw reason;
            })
    );
};

function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
}
test()
    .then((data) => {
        console.log(data);
        return 2;
    })
    .then((data) => {
        console.log(data);
        return 3;
    })
    .finally2(() => {
        console.log('finally');
    })
    .finally2(() => {
        console.log('finally1');
    })
    .then((data) => {
        console.log(data);
    });
