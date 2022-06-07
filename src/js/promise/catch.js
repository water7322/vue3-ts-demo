Promise.prototype.catch = function (cb) {
    return this.then(undefined, cb);
};
