import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/components/Login.vue";
import Admin from "@/components/Admin.vue";

const routes = [
    {path: '/', name: 'Login', component: Login},
    {path: '/about/:id', name: 'About',
// Создаст компонент, lazy-подгружаемый при первом обращении
        component: () => import('../src/components/About.vue')
    },
    {path: '/admin', name: 'Admin', component: Admin}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router