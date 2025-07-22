<template>
    <div class="search_box">
        <ul>
            <li>
                <label for="search2">키워드 검색</label>
                <input-form type="text" id="search2"/>
            </li>
            <li>
                <label for="search2">키워드 검색</label>
                <input-form type="text" id="search2"/>
            </li>
            <li>
                <label for="search2">키워드 검색</label>
                <input-form type="text" id="search2"/>
            </li>
        </ul>
    </div>
    <div class="btn_area right">
        <button-form label="조회" format="primary" @click="create()"/>
        <button-form label="초기화" @click="create()"/>
    </div>
    <div class="grid_box">
        <div class="grid_area">
            <tabulator-grid />
        </div>
    </div>
</template>

<script>
export default{
    
}
</script>