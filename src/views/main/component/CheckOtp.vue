<template>
    <div class="popup_area" v-if="flag">
        <div class="popup">
            <div class="popup_header">
                <h2 class="popup_title">OTP 인증</h2>
                <button class="close_btn" @click="closePopup()">×</button>
            </div>
            <div class="popup_content">
                <table class="board_box">
                    <tr>
                        <th>OTP</th>
                        <td><img :src="qrImage" /></td>
                    </tr>
                </table>
            </div>
            <div class="btn_area center">
                <button-form label="OTP 인증 완료" @click="otpClear()"/>
            </div>
        </div>
    </div>
</template>

<script>
const API = {
    USER: "/user",
    USER_OTP: "/user/otp"
}
export default{
    props: {
        btnShowFlag: { type: Boolean, default: false },
        userNm: { type: String, required: true },
    },
    emits: [
        'updateFlag'
    ],
    data() {
        return {
            flag: false,
            qrImage: false,
        }
    },
    watch: {
        btnShowFlag: {
            handler() {
                this.flag = this.btnShowFlag;
                this.readOtp();
            },
        },
    },
    mounted() {
    },
    methods: {
        readOtp() {
            this.$fetchApi.write(
                API.USER_OTP,
                {"userNm": this.userNm},
                async (result) => {
                    this.qrImage = result.qr
                },
                () => {
                    alert("OTP 생성 실패")
                }
            );
        },
        closePopup() {
            this.flag = false
        },
        otpClear() {
            this.flag = false
            this.$emit('updateFlag', true);
        },
    }
}
</script>