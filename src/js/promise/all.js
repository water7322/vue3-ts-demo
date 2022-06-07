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
            // resolve('第3个成功');
            reject('第3个失败');
        }, 2000);
    });
}

Promise.all2 = function (promises) {
    return new Promise((resolve, reject) => {
        if (!promises.length) resolve([]);
        const results = [];
        let count = 0;
        for (const [index, promise] of promises.entries()) {
            Promise.resolve(promise).then((data) => {
                results[index] = data;
                count++;
                if (count === promises.length) resolve(results);
            }, reject);
            // .catch((e) => {
            //     reject(e);
            // });
        }
    });
};

async function test() {
    try {
        const res = await Promise.all2([test1(), test2(), test3(), 4]);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

test();
