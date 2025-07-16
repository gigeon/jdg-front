import { createRouter, createWebHistory } from "vue-router";

import systemLogin from "@/views/main/SystemLogin.vue";
import systemMain from "@/views/main/SystemMain.vue";


import sampleMenu from "@/js/menu/sample-menu.js";

const routes = [
    {
        name: "login",
        path: "/login",
        component: systemLogin,
    },
    {
        name: "systemMain",
        path: "/systemMain",
        component: systemMain,
    }
]

function generateMenus(menuList) {
    menuList.forEach(menu => {
        menu.items.forEach(item => {
            routes.push({
                path: item.path,
                name: item.menuNm,
                component: () => import(`@/views/sample/SampleGrid.vue`)
            })

        })
    });
}

generateMenus(sampleMenu)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // 예: 로그인 되어있는지 확인
    //   const isLoggedIn = !!localStorage.getItem('token'); // 또는 store에 저장된 로그인 상태

    // if (to.path !== '/login' && !isLoggedIn) {
        //     next('/login'); // 로그인 안 한 상태에서 로그인 외 페이지 접근 시
        // } else {
            //     next(); /
    if (to.path == "/") {
        next('/login'); // /login이 아닌 경우에만 이동
    } else {
        next(); // /login일 땐 그대로 진행
    }
})

export default router