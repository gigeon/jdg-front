<template>
    <!-- 검색 조건 영역 -->
    <div class="search_box">
        <div class="search_area">
            <table class="search_group">
                <tbody>
                    <tr>
                        <td>회원 아이디</td>
                        <td>
                            <input-form />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="btn_area">
        <button class="btn primary" @click="search()">조회</button>
        <button class="btn secondary" @click="reset()">초기화</button>
    </div>
    
    <!-- 그리드 영역 -->
    <div class="grid-section">
        <div class="grid-header">
            <div class="grid-title">조회 결과</div>
            <div class="grid-info">총 <span id="totalCount">0</span>건</div>
        </div>
        
        <!-- Tabulator 그리드 영역 -->
        <div id="data-grid">
            여기에 Tabulator 그리드가 들어갑니다
        </div>
    </div>
</template>

<script>
export default{
    
}
</script>