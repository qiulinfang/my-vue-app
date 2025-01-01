<template>
    <f-text ref="text">dsfsdf</f-text>
</template>

<script>
import { FText,FButton } from "f-ui";
import { useNamespace } from '@utils';
export default {
    components: {
        FText,
        FButton
    },
    data() {
        return {
            ns: null,
        }
    },
    computed: {
    },
    watch: {

    },
    mounted() {
        this.ns = useNamespace('button')
        console.log(this.ns.bem('text','icon','loading'))
    },

    methods: {
    }
}
</script>

<style>

</style>