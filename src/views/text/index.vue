<template>
    <f-text>dsfsdf</f-text>
    <f-button @click="slkdjfsld">dsfsdf</f-button>
</template>

<script>
import {classNameToArray} from '@utils'
import {FButton} from 'f-ui'
import {FText} from 'f-ui'
export default {
    components: {
        FText,
        FButton
    },
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
        slkdjfsld() {
            let res = classNameToArray('ds fs     d f')
            console.log(res)
        }
    }
}
</script>

<style>

</style>