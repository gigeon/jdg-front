<template>
    <div class="table_box">
        <table class="info-table">
            <tr>
                <th>회원명</th>
                <td>{{ info.userNm }}</td>
            </tr>
            <tr>
                <th>권한</th>
                <td>{{ info.authNm }}</td>
            </tr>
            <tr>
                <th>가입일자</th>
                <td>{{ info.crtDt }}</td>
            </tr>
        </table>
    </div>

    <div class="grid_box">
        <div class="grid_area">
            <tabulator-grid 
                ref="userAuthGridRef"
                id="userAuthGrid"
                :apiUrl="userAuthGridApiUrl"
                :columns="userAuthGridColumns"
                :param="param"
                v-model:grid="userAuthGridObject"
            />
        </div>
    </div>
</template>
<script>
const API = {
    USER_DTL: "/user/dtl",
    USER_AUTH: "/user/auth"
}
export default{
    data() {
        return {
            userAuthGridApiUrl: API.USER_DTL,
            userAuthGridColumns: "",
            param: {
                userId: "",
            },
            userAuthGridObject: null,
            info: {
                userNm: "",
                authNm: "",
                crtDt: "",
            },
        }
    },
    mounted() {

    },
    methods: {
        read() {
            this.$fetchApi.get(
                API.USER_AUTH,
                this.param,
                (result) => {
                    this.info = result;
                }
            )
        },
    }
}
</script>