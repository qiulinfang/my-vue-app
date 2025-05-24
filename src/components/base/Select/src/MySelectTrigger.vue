<template>
    <div
      class="my-select-trigger"
      :class="{ 'is-disabled': disabled }"
      @click="handleClick"
    >
      <span v-if="hasValue" class="my-select-trigger__value">
        {{ selectedLabel || modelValue }}
      </span>
      <span v-else class="my-select-trigger__placeholder">
        {{ placeholder }}
      </span>
      <span class="my-select-trigger__arrow" :class="{ 'is-active': menuOpen }">
        ▼
      </span>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // --- Props ---
  const props = defineProps({
    modelValue: {
      type: [String, Number, null, undefined], // 保持与 v-model 类型一致
      default: undefined
    },
    selectedOption: { // 选中的完整 Option 对象
      type: Object,
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    menuOpen: { // 菜单是否展开，用于箭头状态
      type: Boolean,
      default: false
    }
  })
  
  // --- Emits ---
  const emit = defineEmits(['click']) // 定义会触发的事件
  
  // --- Computed ---
  const hasValue = computed(() => props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== '')
  const selectedLabel = computed(() => props.selectedOption?.label) // 使用可选链操作符
  
  // --- Methods ---
  function handleClick() {
    if (props.disabled) return
    emit('click')
  }
  </script>
  
  <style scoped>
  /* 样式与之前 TypeScript 版本相同 */
  .my-select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px; /* 示例高度 */
    padding: 0 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background-color: white;
    position: relative; /* 用于定位箭头等 */
    user-select: none;
  }
  .my-select-trigger.is-disabled {
    cursor: not-allowed;
    background-color: #f5f5f5;
    opacity: 0.6;
  }
  .my-select-trigger__placeholder {
    color: #aaa;
  }
  .my-select-trigger__value {
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20px; /* 留出箭头空间 */
  }
  .my-select-trigger__arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #999;
    transition: transform 0.3s;
  }
  .my-select-trigger__arrow.is-active {
    transform: translateY(-50%) rotate(180deg);
  }
  </style>
  