function multiRequest(urls = [], maxNum) {
    return new Promise((resolve, reject) => {
        // 请求总数量
        const len = urls.length;
        // 根据请求数量创建一个数组来保存请求的结果
        const result = new Array(len);
        // 总的完成数量
        let totalCount = 0;
        let index = 0;
        // 请求maxNum个
        while (index < maxNum) {
            console.log('并行N', index);
            next();
        }
        function next() {
            let curIndex = index++;
            const url = urls[curIndex];
            url()
                .then((res) => {
                    // 保存请求结果
                    console.log(curIndex);
                    result[curIndex] = res;
                })
                .catch((err) => {
                    result[curIndex] = err;
                })
                .finally(() => {
                    totalCount++;
                    // 请求没有全部完成, 就递归
                    if (index < len) {
                        next();
                    }
                    if (totalCount >= len) {
                        resolve(result);
                        return;
                    }
                });
        }
    });
}
function productor(id) {
    return function time() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(id);
            }, Math.random() * 10000);
        });
    };
}
const urls = [];
for (let i = 0; i < 100; i++) {
    urls[i] = productor(i);
}

console.time();
multiRequest(urls, 10).then((res) => {
    console.log(res);
    console.timeEnd();
});
