class Koa {
    constructor() {
        this.middleware = [];
    }
    use(fn) {
        this.middleware.push(fn);
    }
    compose(next) {
        let index = -1;
        const dispatch = (i) => {
            if (index >= i) return Promise.reject(new Error('next不能在一个fn里调用多次'));
            index = i;
            let fn = this.middleware[i];
            if (i === this.middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(this, () => dispatch(i + 1)));
            } catch (e) {
                return Promise.reject(e);
            }
        };
        dispatch(0);
    }
}

const app = new Koa();

app.use(async (ctx, next) => {
    console.log('come in 1');
    await next();
    console.log('come out 1');
});

app.use(async (ctx, next) => {
    console.log('come in 2');
    await next();
    console.log('come out 2');
});

app.use(async (ctx, next) => {
    console.log('come in 3');
    await next();
    console.log('come out 3');
});

app.compose(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('2000ms 后 call controller');
            resolve(13);
        }, 2000);
    });
});
