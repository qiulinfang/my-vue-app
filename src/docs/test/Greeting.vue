<template>
  <div class="form-field-wrapper" :class="fieldClass">
    <label v-if="label" :for="inputId" class="form-field-label">{{ label }}</label>
    <div class="input-area">
      <slot></slot> <span v-if="hasChanged" class="diff-icon" v-tooltip="tooltipText">
        {{ icon }}
      </span>
    </div>
    </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

// --- Props 定义 ---
const props = defineProps({
  // 字段路径，如 'profile.name'
  path: {
    type: String,
    required: true
  },
  // 字段标签文本
  label: {
    type: String,
    default: ''
  },
  // 预先计算好的差异 Map 对象
  changesMap: {
    type: Map,
    required: true
  },
  // (可选) 显式传入 ID，否则基于 path 生成
  inputId: {
      type: String,
      default: null
  }
});

// --- 内部计算属性 ---
// 获取当前字段的差异信息
const changeInfo = computed(() => props.changesMap.get(props.path));

// 判断是否有变化
const hasChanged = computed(() => !!changeInfo.value);

// 计算应用于包装器 div 的 CSS 类
const fieldClass = computed(() => {
  if (changeInfo.value) {
    switch (changeInfo.value.kind) {
      case 'E': return 'diff-modified';
      case 'N': return 'diff-added';
      // D 类型在此组件通常不处理，因为它包装的是新表单中的元素
      // A 类型可以有特定样式或依赖子路径
      default: return '';
    }
  }
  return '';
});

// 计算提示图标
const icon = computed(() => {
  if (changeInfo.value) {
    return changeInfo.value.kind === 'N' ? '➕' : '✏️';
  }
  return '';
});

// 计算 Tooltip 提示文本
const tooltipText = computed(() => {
  if (changeInfo.value) {
    if (changeInfo.value.kind === 'E') {
      return `修改前: ${JSON.stringify(changeInfo.value.oldValue)}`;
    }
    if (changeInfo.value.kind === 'N') {
      return '新增字段';
    }
  }
  return null;
});

// --- Tooltip 指令 (简易示例，同上) ---
// 推荐替换为成熟库的用法
const vTooltip = {
  mounted: (el, binding) => { if (binding.value) el.setAttribute('title', binding.value); },
  updated: (el, binding) => { if (binding.value) el.setAttribute('title', binding.value); else el.removeAttribute('title'); }
}

// --- Input ID ---
// 如果没传 inputId prop，根据 path 生成一个（确保唯一性可能需要更复杂逻辑）
// 这个 ID 用于 label 的 for 属性
const generatedInputId = computed(() => props.path.replace(/[^a-zA-Z0-9]/g, '-'));
const inputId = computed(() => props.inputId || generatedInputId.value);

</script>

<style scoped>
.form-field-wrapper {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: background-color 0.3s ease, border-left-color 0.3s ease;
  /* border-left: 4px solid transparent; 保留空间，避免跳动 */
}

.form-field-label {
  display: block;
  margin-bottom: 8px; /* 调整标签和输入区域间距 */
  font-weight: bold;
  color: #606266;
}

.input-area {
  position: relative; /* 用于定位图标 */
  display: flex; /* 让图标可以放在输入框旁边 */
  align-items: center;
}

/* 通过插槽进来的元素，我们无法直接控制其样式， */
/* 但可以通过父级样式或 CSS 深度选择器 (>>> 或 ::v-deep，需谨慎使用) 影响 */
/* 这里假设输入框会撑满空间，图标在右侧 */
.input-area ::v-deep(input),
.input-area ::v-deep(select),
.input-area ::v-deep(textarea) {
  flex-grow: 1; /* 让输入控件占据主要空间 */
  /* 可以在这里添加一些通用样式，但最好由父组件传递的控件自己负责 */
  border: none; /* 示例：移除默认边框，让包装器边框生效 */
  padding: 0;
  background-color: transparent; /* 继承包装器背景色 */
}
.input-area ::v-deep(input[readonly]) {
     background-color: transparent; /* 覆盖 input 的只读背景 */
}


/* 高亮样式 (应用在 .form-field-wrapper 上) */
.form-field-wrapper.diff-modified {
  background-color: #fffbe6;
  border-left: 4px solid #e6a23c;
}

.form-field-wrapper.diff-added {
  background-color: #f0f9eb;
  border-left: 4px solid #67c23a;
}

/* 图标样式 */
.diff-icon {
  margin-left: 8px; /* 图标与输入控件的间距 */
  cursor: help;
  font-size: 1em;
  opacity: 0.8;
  color: #909399;
  flex-shrink: 0; /* 防止图标被压缩 */
}
.diff-icon:hover {
  opacity: 1;
}

/* ... (删除区域样式，如果需要在父组件处理) ... */
</style>