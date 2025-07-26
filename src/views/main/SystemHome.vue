<template>
    <LeftMenu/>
    <div id="container">
        <div btn_area>
            <button-form label="접속" @click="navigateToCli()"/>
        </div>

    </div>
</template>
<script>
import LeftMenu from '@/components/main/LeftMenu.vue';

export default{
    components: {
        LeftMenu
    },
    methods: {
        navigateToCli() {
            this.$router.push("/con");
        }
    }
}
</script>