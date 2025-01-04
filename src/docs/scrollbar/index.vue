<template>
    <f-scrollbar
      ref="scrollbarRef"
      :height="500"
      :maxHeight="800"
      @scroll="handleScroll">
      <p v-for="i in 100" :key="i">{{ i }}</p>        
    </f-scrollbar>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FScrollbar } from "f-ui";
const scrollbarRef = ref(null);
onMounted(() => {
  scrollbarRef.value.scrollTo(600)
})
</script>

<style></style>
