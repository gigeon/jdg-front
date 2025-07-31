<template>
    <LeftMenu/>
    <div id="container">
        <div class="grid_box">
            <div class="grid_area">
                <tabulator-grid 
                    ref="homeGridRef"
                    id="homeGrid"
                    :apiUrl="homeGridApiUrl"
                    :columns="homeGridColumns"
                    :param="param"
                    v-model:grid="homeGridObject"
                />
            </div>
        </div>
    </div>

</template>

<script>
import LeftMenu from '@/components/main/LeftMenu.vue';

export default{
    components: {
        LeftMenu
    },
    data() {
        return {
            param: {
                userId: this.$store.getters['session/getUser']
            },
            homeGridApiUrl : "/safe/home",
            homeGridColumns : [],
            homeGridObject : null,
        }
    },
    created() {
        console.log(this.userId)
        this.setHomeGridColumns();
    },
    methods: {
        navigateToCli(rowData) {
            this.$router.push({path:"/con", query: rowData});
        },
        setHomeGridColumns() {
            this.homeGridColumns = [
                {title:"엑세스 명", field: "accsId"},
                {title:"엑세스 유형", field: "accsCd"},
                {title:"접속 권한", field: "authNm"},
                { title: "접속", field: "aprvYn", formatter: (cell) => {
                        const rowData = cell.getRow().getData();
                        if(rowData.aprvYn === 'Y' ) {
                            return '승인완료';
                        } else {
                            return "<button class='button primary grid'>승인</button>";
                        }
                    },
                    cellClick: (e, cell) => {
                        const rowData = cell.getRow().getData();
                        this.navigateToCli(rowData);
                    }
                },
            ]
        }
    }
}
</script>