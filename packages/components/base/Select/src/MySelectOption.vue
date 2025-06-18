<template>
    <div
      class="my-select-option"
      :class="{ 'is-selected': isSelected, 'is-disabled': optionData.disabled }"
      @click="handleClick"
    >
      {{ optionData.label }}
      <span v-if="isSelected" class="my-select-option__check">✓</span>
    </div>
  </template>
  
  <script setup>
  // --- Props ---
  const props = defineProps({
    optionData: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  })
  
  // --- Emits ---
  const emit = defineEmits(['select']) // 定义会触发的事件
  
  // --- Methods ---
  function handleClick() {
    if (props.optionData.disabled) return
    emit('select', props.optionData)
  }
  </script>
  
  <style scoped>
  /* 样式与之前 TypeScript 版本相同 */
  .my-select-option {
    padding: 8px 12px;
    cursor: pointer;
    position: relative; /* 用于定位标记 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .my-select-option:hover {
    background-color: #f5f5f5;
  }
  .my-select-option.is-selected {
    color: #409eff; /* 示例选中颜色 */
    font-weight: bold;
    background-color: #ecf5ff; /* 示例选中背景 */
  }
  .my-select-option.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: transparent;
  }
  .my-select-option__check {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  </style>
  