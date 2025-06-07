import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/Main.vue'),
        children: [
            { path: '/about', component: () => import('@/views/About.vue'), name: 'about', meta: { requiresAuth: true } },
            { path: '/empresas', component: () => import('@/views/Startup/Index.vue'), name: 'startup-list', meta: { requiresAuth: true } },
            { path: '/empresa/criar', component: () => import('@/views/Startup/Create.vue'), name: 'create-startup', meta: { requiresAuth: true } },
            { path: '/empresa/editar/:id', component: () => import('@/views/Startup/Edit.vue'), name: 'edit-startup', meta: { requiresAuth: true } },
            { path: '/usuarios', component: () => import('@/views/Users/Index.vue'), name: 'user-list', meta: { requiresAuth: true } },
            { path: '/usuario/criar', component: () => import('@/views/Users/Create.vue'), name: 'create-user', meta: { requiresAuth: true } },
            { path: '/usuario/editar/:id', component: () => import('@/views/Users/Edit.vue'), name: 'edit-user', meta: { requiresAuth: true } },
        ]
    },
    { path: '/login', component: () => import('@/views/Login.vue') },
];

export { routes };

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth) && !store.getters.isAuthenticated) {
        store.commit('setReturnUrl', to.fullPath)
        return next('/login')
    }
    next()
})

export default router;