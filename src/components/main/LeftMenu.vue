<template>
    <div class="leftMenu">
        <div class="leftMenu-header">
            <div class="logo" @click="navigateToMain()">
                <h1>MY MENU</h1>
            </div>
        </div>
        
        <ul class="leftMenu-list">
            <div v-for="item in menuList" :key="item">
                <li class="leftMenu-item" @click="navigate(item)">
                    <p href="#" :class="['leftMenu-link', { active: activeItem === item }]" >
                        <span class="menu-text">{{ item.menuNm }}</span>
                    </p>
                </li>
            </div>
            
            
        </ul>
    </div>
</template>

<script>
import MENU_LIST from "@/js/menu/left-menu";

export default{
    data() {
        return {
            menuList: MENU_LIST,
        }
    },
    methods: {
        navigate(item) {
            this.$router.push(item.path)
        },
        navigateToMain() {
            this.$router.push("/systemMain")
        }
    }
}

</script>