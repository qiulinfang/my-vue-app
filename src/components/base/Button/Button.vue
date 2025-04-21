<template>
  <div>{{ type }}</div>
  </template>
  
  <script setup>
  const props = defineProps({
    /**
     * @description 按钮类型
     */
    type: {
      type: String,
    },
   
  });
  
  // 2. 定义 Emits
  const emit = defineEmits(['click']);
  
  </script>
 