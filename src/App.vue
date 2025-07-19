<template>
    <left-menu v-if="showMenu"/>
    <router-view/>
</template>

<script>
import leftMenu from '@/components/main/LeftMenu.vue'
import { computed } from "vue";
import { useRoute } from "vue-router";
export default{
    components: {
      leftMenu
    },
    setup() {
      const route = useRoute();
      const showMenu = computed(() => route.name !== "login"); // 로그인 화면일 땐 false

      return { showMenu };
  },
}
</script>