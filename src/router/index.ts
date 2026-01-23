import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/dashboard', component: () =>  import('@/views/Dashboard.vue') },
    { path: '/tasks', component: () =>  import('@/views/Tasks.vue') },
    { path: '/settings', component: () =>  import('@/views/Settings.vue') },
    { path: '/', redirect: '/dashboard' }],
})

export default router
