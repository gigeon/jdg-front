<template>
    <login-form v-if="formFlag==0" @updateFlag="updateFlag"/>
    <joinForm v-if="formFlag==1" @updateFlag="updateFlag"/>
    <forgotForm v-if="formFlag==2" @updateFlag="updateFlag"/>
</template>
<script>
import loginForm from '@/views/main/component/LoginForm.vue';
import joinForm from '@/views/main/component/JoinForm.vue';
import forgotForm from '@/views/main/component/ForgotForm.vue';

export default{
    components: {
        loginForm,
        joinForm,
        forgotForm,
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