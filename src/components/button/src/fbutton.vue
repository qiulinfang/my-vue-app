<template>
  <div class="button">
    <button>
      <div class="button-content">
        <f-icon v-if="icon" :type="icon"></f-icon>
        <slot v-else name="icon" />
        <slot></slot>
      </div>
    </button>
  </div>
</template>
<script>
import {FIcon} from 'f-ui';
export default {
  components: { FIcon },
  props: { icon: String },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},

  methods: {},
};
</script>
