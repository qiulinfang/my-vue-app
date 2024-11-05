<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: 'GreetingComponent',
    data() {
        return {
            addr: 'http://localhost:8080/api/getGreetingMessage'
        }
    },
    created() {
        this.$axios.get(this.addr).then(response => {
            console.log(response.data);
        })
    },
    methods: {
        
    },
}
</script>