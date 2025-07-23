<template>
    <router-view></router-view>
</template>

<script>
export default{
    methods: {
        isCheckedPathWith() {
            const paths = ['']
            console.log(paths.includes(this.$route.path))
            return paths.includes(this.$route.path);
        },
    }
}
</script>