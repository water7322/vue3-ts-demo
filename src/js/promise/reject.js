Promise.reject2 = function (reason) {
    return new Promise((resolve, reject) => reject(reason));
};

Promise.reject2(4)
    .then((data) => console.log(data))
    .catch((e) => console.log('失败：', e));
