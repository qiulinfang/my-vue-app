<template>
  <div :class="containerKls">
    <layout></layout>
  </div>
</template>

<script setup>
import { computed } from "vue";
import layout from "./common/baseComponents/custom/Layout.vue";
import { useNamespace } from "@utils";
const ns = useNamespace("app");
const containerKls = computed(() => {
  return [ns.b("container")];
});
</script>
<style lang="scss" scoped>
@use '@styles/mixins.scss' as *;
@include b(app) {
  height: 100vh;
  background-color: #f0f0f0;

  @include b(container) {
    height: 100%;
    background-color: #f0f0f0;

  }
}
</style>
