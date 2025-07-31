const MENU_LIST = [
    {
        menuNm: "회원관리",
        path: "/user/UserManage",
        items: [
            {
                menuNm: "회원상세",
                path: "/user/UserDetail",
            }
        ],
    },
    {
        menuNm: "권한관리",
        path: "/auth/AuthManage",
        items: [],
    },
    {
        menuNm: "엑세스관리",
        path: "/accs/AccsManage",
        items: [],
    },
]

export default MENU_LIST;