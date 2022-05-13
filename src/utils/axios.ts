import store from '@/store';
import axios from 'axios';

function request<T extends keyof Api>(url: T, obj: Api[T]) {
    return axios.post(url, obj);
}
interface Api {
    '/course/buy': {
        id: number;
    };
    '/course/comment': {
        id: number;
        message: string;
    };
}
request('/course/buy', { id: 1 });
request('/course/comment', { id: 1, message: '嘎嘎好看' });
// request('/course/comment', { id: 1 }); //如果message必传 怎么类型提醒缺少参数
// request('/course/404', { id: 1 }); //接口不存在 类型怎么需要报错

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

service.interceptors.request.use(
    (config) => {
        if (store.getters.token) {
            config.headers ??= {}
            config.headers['X-Token'] = 'token'; //getToken()
        }
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 20000) {
            console.log('接口信息报错', res.message);
            return Promise.reject(new Error(res.message || 'Error'));
        }
        return res;
    },
    (error) => {
        console.log('接口信息报错' + error);
        return Promise.reject(error);
    }
);

export default service;
