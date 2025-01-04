<template>
    <span :style="{color: color, fontSize: fontSize}">
        <slot></slot>
        <slot name="icon"></slot>
        <slot name="extra"></slot>
    </span>
</template>
<script>
import { textProps } from './text.js';
export default {
    name: 'FText',
    props: textProps,
    data() {
        return {
        }
    },
    computed: {
    },
    watch: {

    },
    mounted() {
    },

    methods: {
    }
}
</script>