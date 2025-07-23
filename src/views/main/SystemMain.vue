<template>
    <left-menu />
    <div id="container">
        <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.path" />
        </router-view>
    </div>
</template>

<script>
import leftMenu from '@/components/main/LeftMenu.vue';

export default{
    components: {
        leftMenu
    },
    data() {
        return {

        }
    },
    methods: {
        check() {
        },
    }
}
</script>