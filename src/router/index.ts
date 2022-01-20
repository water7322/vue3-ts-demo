import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
/* Layout */
import Layout from '@/layout/index.vue'

const routes = [
    // 面试页
    {
        path: '/interview',
        component: Layout,
        redirect: '/interview/list',
        children: [
            {
                path: 'list',
                component: () =>
                    import(
                        /* webpackChunkName: "page/main/module/meetcode/interview/group/entry" */ '@/views/interview/list/index.vue'
                    ),
                meta: { title: '面试', permission: 'interview', entry: 'interview/list/index' }
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/interview/list'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    next();
});
export default router;
