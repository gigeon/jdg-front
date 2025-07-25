<template>
    <div class="login-container">
        <div class="logo">
            <h1>회원가입</h1>
        </div>
        
        <form id="loginForm">
            <div class="form-group">
                <label for="email">아이디</label>
                <input class="input-form" type="text" v-model="param.userId" placeholder="아이디를 입력하세요" required @keydown.enter.prevent="joinMem()">
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input class="input-form" type="password" v-model="param.userPswd" placeholder="비밀번호를 입력하세요" required @keydown.enter.prevent="joinMem()">
            </div>
            <div class="form-group">
                <label for="password">비밀번호 확인</label>
                <input class="input-form" type="password" v-model="param.userChkPswd" placeholder="비밀번호 확인을 입력하세요" required @keydown.enter.prevent="joinMem()">
            </div>
            <div class="form-group">
                <label for="password">이름</label>
                <input class="input-form" type="text" v-model="param.userNm" placeholder="이름을 입력하세요" required @keydown.enter.prevent="joinMem()">
            </div>
            
            <button v-if="!btnShowFlag" type="button" @click="showCheckOtp()" class="login-btn">OTP 생성</button>
            <button v-else type="button" @click="joinMem()" class="login-btn">회원가입</button>
        </form>
        <div class="signup-link">
            <a @click="flagChange(0)">로그인</a>
        </div>
    </div>
<check-otp
    :btnShowFlag="btnShowFlag"
    :userNm="param.userNm"
    @updateFlag="updateFlag()"
/>
</template>
<script>
import CheckOtp from '@/views/main/component/CheckOtp.vue';

const API = {
    USER_JOIN: "/user/join",
}
export default{
    components: {
        CheckOtp
    },
    data() {
        return {
            param: {
                userId: "",
                userPswd: "",
                userChkPswd: "",
                userNm: "",
            },
            btnShowFlag: false,
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() { 
        },
        joinMem() {
            this.$fetchApi.write(
                API.USER_JOIN,
                this.param,
                () => {
                    alert("회원가입 성공")
                    this.flagChange(0)
                },
                () => {
                    alert("회원가입 실패")
                }
            );
        },
        showCheckOtp() {
            if(this.param.userNm == "") {
                alert("이름을 입력 해주세요");
                return;
            }
            this.btnShowFlag = true
        },
        updateFlag(flag) {
            this.flag = flag
        },
        flagChange(flag) {
            this.$emit('updateFlag', flag)
        },
    }
}
</script>

<style>
.input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
}
</style>