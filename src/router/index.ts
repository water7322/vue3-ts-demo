import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import { createRouter, createWebHashHistory } from './grouter/index';
/* Layout */
import Home from '@/views/home.vue';
// import ScriptSetup from '@/views/demo/script-setup.vue';
// import Script from '@/views/demo/script.vue';

const routes: RouteRecordRaw[] = [
    {
        path:'/',
        name: 'home',
        component: Home
    },
    {
        path: '/script-setup',
        component: () => import('@/views/demo/script-setup.vue'),
        // component: ScriptSetup,
    },
    {
        path: '/script',
        component: () => import('@/views/demo/script.vue'),
        // component: Script,
    },
    // 404 page must be placed at the end !!!
    { path: '/:catchAll(.*)', redirect: '/404' }
];

const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes
});

// router.beforeEach(async (to, from, next) => {
//     next();
// });
export default router;
