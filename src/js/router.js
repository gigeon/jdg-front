import { createRouter, createWebHistory } from "vue-router";

import systemLogin from "@/views/main/SystemLogin.vue";
import systemMain from "@/views/main/SystemMain.vue";
import systemHome from "@/views/main/SystemHome.vue";
import connectedWeb from "@/views/main/ConnectedWeb.vue";

import leftMenu from "@/js/menu/left-menu.js";

import { store } from "@/main.js"

let mainRoutes = [];
generateMenus(leftMenu)
let routes = [
    {
        name: "login",
        path: "/login",
        component: systemLogin,
    },
    {
        name: "main",
        path: "/",
        component: systemMain,
        children: mainRoutes,
    },
    {
        name: "home",
        path: "/home",
        component: systemHome,
    },
    {
        name: "con",
        path: "/con",
        component: connectedWeb,
    }
]

function generateMenus(menuList) {
    menuList.forEach(menu => {
        try{
            mainRoutes.push({
                path: menu.path,
                name: menu.menuNm,
                component: () => import(`@/views${menu.path}.vue`),
            });
        } catch {
            console.log("임포트 에러")
        }

        // 서브 메뉴 처리
        if (menu.items && menu.items.length > 0) { // items가 있는지 확인
            menu.items.forEach(item => {
                mainRoutes.push({
                    path: item.path,
                    name: item.menuNm,
                    component: () => import(`@/views${item.path}.vue`),
                });
            });
        }
    });
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isLogin = store.getters['session/getUser']
    if( !isLogin && to.path !== '/login' ) {
        next('/login');
    } else {
        next();
    } 
})

export default router