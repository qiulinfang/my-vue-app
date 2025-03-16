<template>
    <el-input v-model="inputValue" :placeholder="placeholder" @input="handleInput" />
</template>

<script>
export default {
    name: 'CustomElInput',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入内容'
        }
    },
    data() {
        return {
            inputValue: this.value
        };
    },
    watch: {
        value(newValue) {
            this.inputValue = newValue;
        }
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value);
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>