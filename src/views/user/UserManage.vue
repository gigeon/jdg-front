<template>
    <!-- 검색 조건 영역 -->
    <div class="search_box">
        <ul>
            <li>
                <label for="search2">회원명</label>
                <input-form type="text" id="search2" v-model="userNm"/>
            </li>
            <li>
                <label for="search2">키워드 검색</label>
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
                ref="userGridRef"
                id="userGrid"
                :apiUrl="userGridApiUrl"
                :columns="userGridColumns"
                :rowButton="userGridRowButton"
                :param="param"
                v-model:grid="userGridObject"
            />
        </div>
    </div>
</template>

<script>
const API = {
    USER: "/user"
}

export default{
    data() {
        return {
            param: {
                userNm: "",
                userAuthCd: "",
            },
            userGridApiUrl: API.USER,
            userGridColumns: [],
            userGridRowButton: "",
            userGridObject: "",
        }
    },
    created() {
        this.setUserGridColumns();
    },
    mounted() {
        
    },
    methods: {
        setUserGridColumns() {
            this.userGridColumns = [
                {title: "아이디", field: "userId"},
                {title: "이름", field: "userNm"},
                {title: "권한", field: "userAuthCd"},
                {title: "가입일자", field: "regDt"},
            ]
        },
    },
    
}
</script>