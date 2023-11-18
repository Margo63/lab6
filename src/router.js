import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../src/components/Home.vue'
import Login from "@/components/Login.vue";

const routes = [
    {path: '/', name: 'Login', component: Login},
    {path: '/about/:id', name: 'About',
// Создаст компонент, lazy-подгружаемый при первом обращении
        component: () => import('../src/components/About.vue')
    },
    {path: '/home', name: 'Home', component: Home}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router