<template>
    <div class="search_box">
        <ul>
            <li>
                <label for="search2">회원명</label>
                <input-form type="text" id="search2" v-model="userNm"/>
            </li>
            <li>
                <label for="search2">권한명</label>
                <input-form type="text" id="search2" v-model="userAuthCd"/>
            </li>
        </ul>
    </div>
    <div class="btn_area right">
        <button-form label="조회" format="primary" @click="create()"/>
        <button-form label="초기화" @click="create()"/>
    </div>
    <div class="grid_box">
        <div class="grid_area">
            <tabulator-grid 
                ref="authGridRef"
                id="authGrid"
                :apiUrl="authGridApiUrl"
                :columns="authGridColumns"
                :rowButton="authGridRowButton"
                :param="param"
                v-model:grid="authGridObject"
            />
        </div>
    </div>
</template>

<script>

const API = {
    AUTH: "/auth"
}

export default{
    data() {
        return {
            param: {
                userNm: "",
                userAuthCd: "",
            },
            authGridApiUrl: API.AUTH,
            authGridColumns: [],
            authGridRowButton: ['', 'S', 'D'],
            authGridObject: "",
        }
    },
    created() {
        this.setAuthGridColumns();
    },
    mounted() {
        
    },
    methods: {
        setAuthGridColumns() {
            this.authGridColumns = [
                {title: "권한명", field: "authNm"},
                {title: "설명", field: "authCn"},
                {title: "DDL여부", field: "ddlYn"},
                {title: "CRUD", hozAlign:"center", columns: [
                    {title: "조회여부", field: "sYn"},
                    {title: "수정여부", field: "uYn"},
                    {title: "추가여부", field: "iYn"},
                    {title: "삭제여부", field: "dYn"},
                    {title: "등록일", field: "regDt"},
                ]},
            ]
        },
    },
}
</script>