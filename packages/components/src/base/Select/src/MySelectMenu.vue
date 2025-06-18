<template>
    <div class="my-select-menu">
      <div v-if="options && options.length > 0" class="my-select-menu__list">
        <MySelectOption
          v-for="option in options"
          :key="option.value"
          :option-data="option"
          :is-selected="isSelected(option)"
          @select="handleOptionSelect"
        />
      </div>
      <div v-else class="my-select-menu__empty">
        暂无数据
      </div>
    </div>
  </template>
  
  <script setup>
  import MySelectOption from './MySelectOption.vue'
  
  // --- Props ---
  const props = defineProps({
    options: {
      type: Array,
      default: () => []
    },
    modelValue: { // 用于判断哪个选项被选中
      type: [String, Number, null, undefined],
      default: undefined
    }
  })
  
  // --- Emits ---
  const emit = defineEmits(['select-option']) // 定义会触发的事件
  
  // --- Methods ---
  function isSelected(option) {
    // 简化：仅处理单选情况
    return props.modelValue === option.value
  }
  
  function handleOptionSelect(option) {
    emit('select-option', option)
  }
  </script>
  
  <style scoped>
  /* 样式与之前 TypeScript 版本相同 */
  .my-select-menu {
    background-color: white;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 6px 0;
    max-height: 280px; /* 示例最大高度 */
    overflow-y: auto; /* 简单滚动 */
  }
  .my-select-menu__empty {
    padding: 10px 12px;
    color: #999;
    text-align: center;
    font-size: 14px;
  }
  </style>
  