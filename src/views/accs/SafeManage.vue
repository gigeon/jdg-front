<template>
    <div class="grid_box">
        <div class="grid_area">
            <tabulator-grid 
                ref="safeGridRef"
                id="safeGrid"
                :apiUrl="safeGridApiUrl"
                :columns="safeGridColumns"
                :rowButton="safeGridRowButton"
                :param="param"
                v-model:grid="safeGridObject"
            />
        </div>
    </div>
</template>

<script>

const API = {
    SAFE: "/safe"
}

export default{
    data() {
        return {
            param: {
                userNm: "",
                userAuthCd: "",
            },
            safeGridApiUrl: API.SAFE,
            safeGridColumns: [],
            safeGridRowButton: ['C', 'S', 'D'],
            safeGridObject: "",
        }
    },
    created() {
        this.setSafeGridColumns();
    },
    mounted() {
        
    },
    methods: {
        setSafeGridColumns() {
            this.safeGridColumns = [
                this.$gridEditor.editInput({title: "권한명", field: "authNm"}),
                this.$gridEditor.editInput({title: "설명", field: "authCn"}),
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