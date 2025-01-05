<template>
  <svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <use :href="_type"></use>
  </svg>
</template>

<script>
import "./iconfont.js";
import "../styles/index.less";
export default {
  name: "FIcon",
  props: {
    type: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#FFF",
    },
    size: {
      type: String || Number,
      default: 20,
    },
    hoverColor: {
      type: String,
      default: "orange",
    },
  },
  computed: {
    _type() {
      return `#${this.type}`;
    },
  },
};
</script>

<style scoped>
/* svg {
    cursor: pointer;
} */
svg:hover > path {
  fill: v-bind(hoverColor) !important;
}
</style>
