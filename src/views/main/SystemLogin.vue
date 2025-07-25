<template>
    <login-form v-if="formFlag==0" @updateFlag="updateFlag"/>
    <joinForm v-if="formFlag==1" @updateFlag="updateFlag"/>
</template>
<script>
import loginForm from '@/views/main/component/LoginForm.vue';
import joinForm from '@/views/main/component/JoinForm.vue';

export default{
    components: {
        loginForm,
        joinForm,
    },
    data() {
        return {
            formFlag: 0,
        }
    },
    methods: {
        updateFlag(flat) {
            this.formFlag = flat
        }
    }
}
</script>