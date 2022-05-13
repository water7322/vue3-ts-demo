import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './index.css';

createApp(App).use(router).use(store).mount('#app');

interface Todo {
    title: string;
    desc: string;
    done: boolean;
}

type Partial1<T> = { 
    [K in keyof T]?: T[K] 
}

type partTodo = Partial1<Todo>;
