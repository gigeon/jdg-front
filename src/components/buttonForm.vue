<template>
    <button 
        @click.prevent="onClick"
        :class="classList"
    > {{ label }}</button>
</template>

<script>
export default{
    props: {
        label: {type: String, required: true},
        format: {type: String, default: ""},
    },
    emits: ['click'],
    data() {
        return {
            classList: "button-form " + this.format,
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
}
</script>