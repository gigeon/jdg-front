import { createRouter, createWebHistory } from "vue-router";

import systemLogin from "@/views/main/SystemLogin.vue";
import systemMain from "@/views/main/SystemMain.vue";
import userManage from "@/views/user/UserManage.vue";

/* import sampleMenu from "@/js/menu/sample-menu.js"; */
/* import leftMenu from "@/js/menu/left-menu.js"; */

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
    },
    {
        name: "회원관리",
        path: "/user/UserManage",
        component: userManage,
    }
]

/* function generateMenus(menuList) {
    menuList.forEach(menu => {
        routes.push({
            path: menu.path,
            name: menu.menuNm,
            component: import('@/views'+menu.path+'.vue'),
        });

        // 서브 메뉴 처리
        if (menu.items && menu.items.length > 0) { // items가 있는지 확인
            menu.items.forEach(item => {
                routes.push({
                    path: item.path,
                    name: item.menuNm,
                    component: () => {
                        return import('@/views'+menu.path+'.vue');
                    }
                });
            });
        }
    });
    console.log(routes);
} */

/* generateMenus(sampleMenu) */
/* generateMenus(leftMenu) */

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