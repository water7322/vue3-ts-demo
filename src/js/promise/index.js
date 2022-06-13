const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(excutor) {
    this.status = PENDING;
    this.value;
    this.reason;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
        setTimeout(() => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach((fn) => fn(value));
            }
        });
    };
    const reject = (reason) => {
        setTimeout(() => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn(reason));
            }
        });
    };
    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : (reason) => {
                  throw reason;
              };
    let promise2;
    if (this.status === FULFILLED) {
        return (promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }));
    }
    if (this.status === REJECTED) {
        return (promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }));
    }

    return (promise2 = new MyPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push((value) => {
            try {
                const x = onFulfilled(value);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        });
        this.onRejectedCallbacks.push((reason) => {
            try {
                const x = onRejected(reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        });
    }));
};
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(TypeError('循环引用'));
    }
    if (x instanceof MyPromise) {
        if (x.status === PENDING) {
            x.then((y) => {
                resolvePromise(promise2, y, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
    } else if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        let called = false;
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(
                    x,
                    (y) => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (reason) => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    }
                );
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
function test() {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
}
Promise.resolve(1)
    .then((data) => {
        console.log(data);
        Promise.resolve().then(() => {
            console.log('promise 5');
        });
        return 3;
    })
    .then((data) => {
        console.log(data);
    });
async function test() {
    console.log(1);
    await Promise.resolve(1);
    console.log(2);
    await Promise.resolve(2);
    console.log(3);
}
test();
console.log(12);
setTimeout(() => {
    console.log('setTimeout');
});
MyPromise.deferred = function () {
    const result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
};

module.exports = MyPromise;
