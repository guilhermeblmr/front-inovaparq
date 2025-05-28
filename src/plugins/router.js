import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path : '/',
        component: () => import('@/layouts/Main.vue'),
        children: [
            { path: '/about', component: () => import('@/views/About.vue'), name: 'about' },
            { path: '/empresas' , component: () => import('@/views/Startup/Index.vue'), name: 'startup-list' },
            { path: '/empresa/criar', component: () => import('@/views/Startup/Create.vue'), name: 'create-startup' },
        ]
    },
    { path: '/login', component: () => import('@/views/Login.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;