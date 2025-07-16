<template>
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <h1>MY MENU</h1>
            </div>
        </div>
        
        <ul class="menu-list">
            <div v-for="">
                <li class="menu-item">
                <a href="#" class="menu-link active">
                    <svg class="menu-icon" viewBox="0 0 24 24">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                    <span class="menu-text">대시보드</span>
                </a>
            </li>
            </div>
            
            
            <!-- <li class="menu-item">
                <a href="#" class="menu-link has-submenu" onclick="toggleSubmenu(this)">
                    <svg class="menu-icon" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <span class="menu-text">콘텐츠 관리</span>
                </a>
                <div class="submenu">
                    <a href="#" class="submenu-item">게시글 관리</a>
                    <a href="#" class="submenu-item">댓글 관리</a>
                    <a href="#" class="submenu-item">파일 관리</a>
                </div>
            </li> -->
            
            
        </ul>
    </div>
</template>

<script>
export default{

}

</script>