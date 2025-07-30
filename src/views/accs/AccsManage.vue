<template>
    <!-- 검색 조건 영역 -->
    <div class="search_box">
        <ul>
            <li>
                <label>엑세스 명</label>
                <input-form type="text" v-model="param.accsNm"/>
            </li>
            <li>
                <label>구분</label>
                <input-form type="text" v-model="param.accsCd"/>
            </li>
        </ul>
    </div>
    <div class="btn_area right">
        <button-form label="조회" format="primary" @click="search()"/>
        <button-form label="초기화" @click="reset()"/>
    </div>
    <div class="grid_box">
        <div class="grid_area">
            <tabulator-grid 
                ref="accsGridRef"
                id="accsGrid"
                :apiUrl="accsGridApiUrl"
                :columns="accsGridColumns"
                :rowButton="accsGridRowButton"
                :param="param"
                v-model:grid="accsGridObject"
                :row-clicked="showSafePopup()"
            />
        </div>
    </div>
</template>

<script>
const API = {
    ACCS: "/accs"
}

export default{
    data() {
        return {
            param: {
                accsNm: "",
                accsCd: "",
            },
            accsGridApiUrl: API.ACCS,
            accsGridColumns: [],
            accsGridRowButton: "",
            accsGridObject: "",
        }
    },
    created() {
        this.setAccsGridColumns();
    },
    mounted() {
        
    },
    methods: {
        setAccsGridColumns() {
            this.accsGridColumns = [
                {title: "이름", field: "accsNm"},
                {title: "설명", field: "accsCn"},
                {title: "구분", field: "accsCd"},
                {title: "주소", field: "accsUrl"},
                {title: "포트", field: "accsPort"},
                {title: "DB", field: "accsDb"},
            ]
        },
        reset() {
            this.param.accsNm = ""
            this.param.accsCd = ""
        },
        search() {
            this.accsGridObject.replaceData();
        },
        showSafePopup() {
            
        }
    },
    
}
</script>