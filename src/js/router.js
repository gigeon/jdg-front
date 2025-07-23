import { createRouter, createWebHistory } from "vue-router";

import systemLogin from "@/views/main/SystemLogin.vue";
import systemMain from "@/views/main/SystemMain.vue";

import leftMenu from "@/js/menu/left-menu.js";

// store 인스턴스를 import (storeSession 모듈이 아닌 실제 store 인스턴스)
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
]

function generateMenus(menuList) {
    menuList.forEach(menu => {
        // require(`@/views${menu.path}.vue`);
        mainRoutes.push({
            path: menu.path,
            name: menu.menuNm,
            component: () => import(`@/views${menu.path}.vue`),
        });

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
    console.log(mainRoutes);
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // 올바른 store getter 접근 방법
    const user = store.getters['session/getUser'];
    console.log('Router beforeEach - 현재 사용자:', user);
    
    if( !user && to.path !== '/login' ) {
        next('/login');
    } else {
        next();
    } 
})

export default router