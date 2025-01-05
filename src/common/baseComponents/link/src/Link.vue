<template>
  <a :href="href">
    <f-icon v-if="icon" :type="icon"></f-icon>
    <span v-if="$slots.default">
      <slot />
    </span>
    <slot name="icon" v-if="$slots.icon" />
  </a>
</template>
<script>
import { FIcon } from 'f-ui';
export default {
    components: {
      FIcon
    },
    props: {
      icon: String,
      href: {
        type: String,
        default: '#'
      }
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
    }
}
</script>