function test1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('第1个成功');
            reject('第1个失败');
        }, 3000);
    });
}
function test2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('第2个成功');
            reject('第2个失败');
        }, 5000);
    });
}
function test3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('第3个成功');
            reject('第3个失败');
        }, 2000);
    });
}

Promise.any2 = function (promises) {
    return new Promise((resolve, reject) => {
        if (!promises.length) reject('[AggregateError: All promises were rejected]');
        let count = 0;
        for (const promise of promises) {
            Promise.resolve(promise)
                .then(resolve)
                .catch(() => {
                    count++;
                    if (count === promises.length) reject('[AggregateError: All promises were rejected]');
                });
        }
    });
};

async function test() {
    try {
        const res = await Promise.any2([]);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

test();
