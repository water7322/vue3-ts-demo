function test1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('第1个成功');
        }, 3000);
    });
}
function test2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('第2个成功');
        }, 5000);
    });
}
function test3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('第3个成功');
            reject('第3个失败');
        }, 2000);
    });
}

Promise.race2 = function (promises) {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise).then(resolve, reject);
            // .catch((e) => {
            //     reject(e);
            // });
        }
    });
};

async function test() {
    try {
        const res = await Promise.race2([test1(), test2(), test3()]);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

test();
