<template>
<div class="login-container">
    <div class="logo">
        <h1>로그인</h1>
    </div>
    
    <form id="loginForm">
        <div class="form-group">
            <label for="email">아이디</label>
            <input class="input-form" type="text" v-model="param.userId" placeholder="아이디를 입력하세요" required @keydown.enter.prevent="login()">
        </div>
        <div class="form-group">
            <label for="password">비밀번호</label>
            <input class="input-form" type="password" v-model="param.userPswd" placeholder="비밀번호를 입력하세요" required @keydown.enter.prevent="login()">
        </div>
        <div class="form-group">
            <label for="password">OTP 번호</label>
            <input class="input-form" type="text" v-model="param.userOtp" placeholder="OTP를 입력하세요" required @keydown.enter.prevent="login()">
        </div>
        <button type="button" @click="login" class="login-btn">로그인</button>
    </form>
    
    <div class="signup-link">
        계정이 없으신가요? <a @click="flagChange(1)">회원가입</a>
    </div>
</div>
</template>

<script>

const API = {
    JOIN: "/user/login"
}
export default{
    props: ['flag'],
    data() {
        return {
            param: {
                userId: "",
                userPswd: "",
            }
        }
    },
    methods: {
        flagChange(flag) {
            this.$emit('updateFlag', flag)
        },
        login() {
            return new Promise((resolve, reject) => {
                if(this.param.userId == "" || this.param.userId == null || this.param.userPswd == "" || this.param.userPswd == null ) {
                    alert("빈 칸에 값을 입력해주세요.")
                    return;
                }
                this.$fetchApi.write(
                    API.JOIN,
                    this.param,
                    async (result) => {
                        if(result.flag == 1) {
                            await this.$store.dispatch('session/saveSession', result)
                            this.$router.push('/user/UserManage')
                            resolve();
                        } else {
                            alert("로그인 실패")
                        }
                    },
                    () => {
                        alert("로그인 실패")
                        reject();
                    }
                );
            })
        }
    }
}
</script>