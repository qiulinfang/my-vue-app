<template>
  <button :class="buttonClasses" @click="handleClick">
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon v-else>
        <component :is="'Loading'" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span
      v-if="$slots.default"
    >
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  name: 'MyButton',
})

const props = defineProps({
  type: {
    type: String,
    // 可以添加 validator 限制类型
    validator: (value) => {
      return ['primary', 'success', 'warning', 'danger', 'info', 'text', ''].includes(value)
    }
  },
  size: String, // 你可能还需要添加 size, plain 等 prop 的定义
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  disabled: Boolean,
  loading: Boolean,
  icon: String,
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
  return [
    'my-button', // Base class
    props.type ? `my-button--${props.type}` : '', // Type class
    props.size ? `my-button--${props.size}` : '', // Size class
    {
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-disabled': props.disabled || props.loading, // loading 时也应禁用
      'is-loading': props.loading,
    }
  ];
});

const handleClick = (evt) => {
 // 阻止禁用或加载中按钮的点击事件
  if (props.disabled || props.loading) return;
  emit('click', evt)
}
</script>

<style lang="scss" scoped>
// 1. 定义基础变量 (推荐)
// ==========================================================================
$button-prefix-cls: "my-button";

// 颜色变量
$primary-color: #409eff;
$success-color: #67c23a;
$warning-color: #e6a23c;
$danger-color: #f56c6c;
$info-color: #909399;
$text-color: #303133;
$border-color-base: #dcdfe6;
$white: #ffffff;
$button-font-weight: 500;
$button-border-radius: 4px;
$button-padding-vertical: 8px;
$button-padding-horizontal: 15px;
$button-font-size: 14px; // 默认字号

// 不同尺寸的变量 (可以根据需要调整)
$button-font-size-large: $button-font-size + 2px;
$button-padding-vertical-large: $button-padding-vertical + 4px;
$button-padding-horizontal-large: $button-padding-horizontal + 5px;
$button-border-radius-large: $button-border-radius + 1px;

$button-font-size-small: $button-font-size - 2px;
$button-padding-vertical-small: $button-padding-vertical - 3px;
$button-padding-horizontal-small: $button-padding-horizontal - 5px;
$button-border-radius-small: $button-border-radius - 1px;

// 圆形按钮的 Padding (通常等于垂直 Padding)
$button-padding-circle: $button-padding-vertical;

// 圆角按钮的 Radius
$button-border-radius-round: 20px; // 或者一个足够大的值

// 辅助函数
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}

// 2. 基础按钮样式 (Block) - 按功能排序
// ==========================================================================
.#{$button-prefix-cls} {
  // --- Layout ---
  display: inline-block;
  line-height: 1;
  text-align: center;
  white-space: nowrap;

  // --- Box Model ---
  margin: 0;
  padding: $button-padding-vertical $button-padding-horizontal;
  border: 1px solid $border-color-base;
  border-radius: $button-border-radius;
  box-sizing: border-box;

  // --- Visual/Content ---
  color: $text-color;
  background: $white;
  font-size: $button-font-size;
  font-weight: $button-font-weight;
  -webkit-appearance: none;

  // --- Interaction/Miscellaneous ---
  cursor: pointer;
  outline: none;
  transition: 0.1s;
  user-select: none;

  // 基础 Hover 和 Focus 状态
  &:hover,
  &:focus {
    border-color: tint($primary-color, 70%);
    color: $primary-color;
    background-color: tint($primary-color, 90%);
  }

  // 基础 Active 状态
  &:active {
    border-color: shade($primary-color, 10%);
    color: shade($primary-color, 10%);
    outline: none;
  }

  // 禁用状态 (通用)
  &.is-disabled,
  &.is-disabled:hover,
  &.is-disabled:focus,
  &.is-disabled:active {
    border-color: #ebeef5;
    color: #c0c4cc;
    background-color: $white;
    background-image: none;
    cursor: not-allowed;
  }

  // 加载中状态 (通用)
  &.is-loading {
    position: relative;
    pointer-events: none; // 加载时不可点击

    // 可以在这里或 Modifier 中添加具体 loading 图标样式
    // 例如：让内部内容半透明，并叠加一个 spinner
    // > *:not(.el-icon) { // 假设你有 el-icon 组件
    //   opacity: 0.5;
    // }
    // &::before {
    //   pointer-events: none;
    //   content: "";
    //   position: absolute;
    //   left: -1px;
    //   top: -1px;
    //   right: -1px;
    //   bottom: -1px;
    //   border-radius: inherit;
    //   background-color: rgba(255, 255, 255, 0.35);
    // }
    // .el-icon.is-loading { // 假设 loading icon 有 is-loading 类
    //   // ... spinner 样式 ...
    // }
  }

  // 3. 类型修饰符 (Modifier --type) - 按功能排序
  // ==========================================================================
  // --- Primary ---
  &--primary {
    border-color: $primary-color;
    color: $white;
    background-color: $primary-color;
    &:hover, &:focus { border-color: tint($primary-color, 20%); background: tint($primary-color, 20%); color: $white; }
    &:active { border-color: shade($primary-color, 10%); background: shade($primary-color, 10%); color: $white; outline: none; }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus, &.is-disabled:active { border-color: tint($primary-color, 50%); background-color: tint($primary-color, 50%); color: $white; }
  }
  // --- Success ---
  &--success {
    border-color: $success-color; color: $white; background-color: $success-color;
    &:hover, &:focus { border-color: tint($success-color, 20%); background: tint($success-color, 20%); color: $white; }
    &:active { border-color: shade($success-color, 10%); background: shade($success-color, 10%); color: $white; outline: none; }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus, &.is-disabled:active { border-color: tint($success-color, 50%); background-color: tint($success-color, 50%); color: $white; }
  }
  // --- Warning ---
  &--warning {
    border-color: $warning-color; color: $white; background-color: $warning-color;
    &:hover, &:focus { border-color: tint($warning-color, 20%); background: tint($warning-color, 20%); color: $white; }
    &:active { border-color: shade($warning-color, 10%); background: shade($warning-color, 10%); color: $white; outline: none; }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus, &.is-disabled:active { border-color: tint($warning-color, 50%); background-color: tint($warning-color, 50%); color: $white; }
  }
  // --- Danger ---
  &--danger {
    border-color: $danger-color; color: $white; background-color: $danger-color;
    &:hover, &:focus { border-color: tint($danger-color, 20%); background: tint($danger-color, 20%); color: $white; }
    &:active { border-color: shade($danger-color, 10%); background: shade($danger-color, 10%); color: $white; outline: none; }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus, &.is-disabled:active { border-color: tint($danger-color, 50%); background-color: tint($danger-color, 50%); color: $white; }
  }
  // --- Info ---
  &--info {
    border-color: $info-color; color: $white; background-color: $info-color;
    &:hover, &:focus { border-color: tint($info-color, 20%); background: tint($info-color, 20%); color: $white; }
    &:active { border-color: shade($info-color, 10%); background: shade($info-color, 10%); color: $white; outline: none; }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus, &.is-disabled:active { border-color: tint($info-color, 50%); background-color: tint($info-color, 50%); color: $white; }
  }
  // --- Text ---
  &--text {
    padding-left: 0; padding-right: 0; border-color: transparent;
    color: $primary-color; background: transparent;
    &:hover, &:focus { border-color: transparent; color: tint($primary-color, 20%); background-color: transparent; }
    &:active { color: shade($primary-color, 10%); background-color: transparent; outline: none; }
    &.is-disabled, &.is-disabled:hover, &.is-disabled:focus, &.is-disabled:active { border-color: transparent; color: #c0c4cc; background-color: transparent; }
  }

  // 4. 其他修饰符 (Modifier --size, .is-*) - 按功能排序
  // ==========================================================================

  // --- Size Modifiers ---
  &--large {
    // --- Box Model ---
    padding: $button-padding-vertical-large $button-padding-horizontal-large;
    border-radius: $button-border-radius-large;
    // --- Visual/Content ---
    font-size: $button-font-size-large;
  }
  &--small {
    // --- Box Model ---
    padding: $button-padding-vertical-small $button-padding-horizontal-small;
    border-radius: $button-border-radius-small;
    // --- Visual/Content ---
    font-size: $button-font-size-small;
  }

  // --- Plain Modifier ---
  // .is-plain 需要结合类型一起看，因为它改变了类型按钮的颜色逻辑
  // 基础 Plain 状态 (通常是透明背景，类型颜色边框和文字)
  &.is-plain {
    // --- Visual/Content ---
    // 默认 hover/focus 状态不适用于 plain，需要被类型覆盖
    &:hover,
    &:focus {
      border-color: $primary-color; // 默认 hover 边框颜色为主色
      color: $primary-color;       // 默认 hover 文字颜色为主色
      background-color: $white;    // 背景保持白色或透明
    }
    &:active {
      border-color: shade($primary-color, 10%); // 默认 active 颜色
      color: shade($primary-color, 10%);
      outline: none;
    }
    // 默认禁用状态
    &.is-disabled,
    &.is-disabled:hover,
    &.is-disabled:focus,
    &.is-disabled:active {
      border-color: #ebeef5;
      color: #c0c4cc;
      background-color: $white;
    }
  }

  // Plain + Type Combinations
  // (为每种类型定义 plain 状态下的颜色、边框和 hover/active 效果)
  @mixin plain-type-styles($type-color) {
    // --- Visual/Content ---
    color: $type-color;
    background: tint($type-color, 90%); // 淡色背景
    // --- Box Model ---
    border-color: tint($type-color, 60%); // 淡色边框

    &:hover,
    &:focus {
      // --- Box Model ---
      border-color: $type-color; // Hover 时边框为原色
      // --- Visual/Content ---
      color: $white;             // Hover 时文字为白色
      background-color: $type-color; // Hover 时背景为原色
    }
    &:active {
      // --- Box Model ---
      border-color: shade($type-color, 10%); // Active 时边框为深色
      // --- Visual/Content ---
      color: $white;                       // Active 时文字为白色
      background-color: shade($type-color, 10%); // Active 时背景为深色
      outline: none;
    }
    &.is-disabled,
    &.is-disabled:hover,
    &.is-disabled:focus,
    &.is-disabled:active {
      // --- Box Model ---
      border-color: tint($type-color, 80%); // 禁用时更淡的边框
      // --- Visual/Content ---
      color: tint($type-color, 50%);      // 禁用时更淡的文字
      background-color: tint($type-color, 95%); // 禁用时极淡的背景
    }
  }

  &--primary.is-plain { @include plain-type-styles($primary-color); }
  &--success.is-plain { @include plain-type-styles($success-color); }
  &--warning.is-plain { @include plain-type-styles($warning-color); }
  &--danger.is-plain { @include plain-type-styles($danger-color); }
  &--info.is-plain { @include plain-type-styles($info-color); }
  // Text 按钮通常没有 plain 状态，因为它们本身就是“朴素”的

  // --- Round Modifier ---
  &.is-round {
    // --- Box Model ---
    border-radius: $button-border-radius-round;
  }

  // --- Circle Modifier ---
  &.is-circle {
    // --- Box Model ---
    padding: $button-padding-circle; // Padding 上下左右相等
    border-radius: 50%;              // 圆形
  }

  // 对于 Circle 和 Round，可能需要调整 Large/Small 尺寸下的 Radius
  &.is-round {
    &.#{$button-prefix-cls}--large { /* 可以微调 large round radius */ }
    &.#{$button-prefix-cls}--small { /* 可以微调 small round radius */ }
  }
  &.is-circle {
     &.#{$button-prefix-cls}--large { padding: $button-padding-vertical-large; } // 保持圆形padding
     &.#{$button-prefix-cls}--small { padding: $button-padding-vertical-small; } // 保持圆形padding
  }

}
</style>