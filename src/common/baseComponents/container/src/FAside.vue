<template>
  <aside>
    <slot />
  </aside>
</template>

<script>
export default {
    name: 'FAside',
    props: {
        width: {
        type: String,
        default: '200px'
        }
    },
    computed: {
        style() {
        return {
            width: this.width
        };
        }
    }
};
</script>

<style></style>
