import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createRouter, createWebHistory } from "vue-router"
const routes = [
    {
        path: '/',
        name: "home",
        component: () => import("./components/Home.vue"),
        //路由守卫,防止未登录进入系统
    },
    {path: '/login', name: "login", component: () => import("./components/Login.vue")},
    {path: '/manage', name: "manage", component: () => import("./components/Manage.vue")},
    {path: '/:pathMatch(.*)*', name: "error", component: () => import("./components/404.vue")},

];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
const app = createApp(App);
app.use(router);
app.use(ElementPlus, {size: 'small', zIndex: 3000, locale: zhCn})
app.mount('#app')
