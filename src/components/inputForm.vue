<template>
<input 
    class="input-form"
    v-model="inputValue"
    :type="type"
    :placeholder="placeholdValue"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    @keydown.enter.prevent="enterKeyup()"
    @change="onChange"
/>
</template>

<script>
export default{
    props: {
        label: {type: String, required: true},
        type: {type: String, default: 'text'},
        placeholder: {type: String, default: ''},
        
        required: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
        prohibited: {type: Boolean, default: true},
        readonly: {type: Boolean, default: false},
        unit: {type: String, default: ''},
        maxlength: {type: Number, default: null},
        validator: {type: String, default: ''},
        panel: {type: String, default: ''},
        align: {type: String, default: 'left'},
        class: {type: String, default: ''},
        id: {type: String, default: ''},
    },
    emit: [
        'change', 'enterKeyup'
    ],
    data() {
        return {
            inputValue: "",
            placeholdValue: "",
        }
    },
    computed() {
        this.setPlacehold();
    },
    methods: {
        setPlacehold() {
            this.placeholdValue = this.placehold || this.label + "입력"
        },
        onChange() {
            this.$emit('change');
        },
        enterKeyup() {
            this.$emit('enterKeyup');
        }
    }
}
</script>