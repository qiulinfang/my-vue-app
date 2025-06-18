<template>
  <div class="my-button-group">
    <slot></slot>
  </div>
</template>

<script setup>
// 使用 defineOptions 定义组件名，方便调试和识别
defineOptions({
  name: 'MyButtonGroup',
});

// 这个简单的 ButtonGroup 组件目前不需要 props 或复杂的逻辑
// 它主要通过 CSS 来实现分组效果
</script>

<style lang="scss" scoped>
// 引入你 MyButton 组件中可能用到的变量，如果需要的话
// 例如 $border-color-base, 但在这个例子中我们主要处理布局和圆角

// 定义 ButtonGroup 的 BEM 类名
.my-button-group {
  // 使用 inline-flex 让按钮组表现得像行内元素，并且内部元素可以使用 flex 布局
  display: inline-flex;
  // 垂直对齐方式，确保不同高度的按钮（如果有的话）能良好对齐
  vertical-align: middle;

  // --- 核心样式：处理子按钮的样式 ---
  // 选择器 targeting direct children with the .my-button class
  // 使用 ::v-deep 或 :deep() 来穿透 scoped 样式影响子组件的根元素
  // 或者，如果 MyButton 的根元素就是 <button> 且带有 .my-button 类，可以直接用 > .my-button
  // 为确保兼容性和清晰性，推荐使用 :deep()
  :deep(.my-button) {
    // 设置相对定位，以便后续调整 z-index
    position: relative;

    // 移除按钮之间的默认间距 (如果 MyButton 组件自身有 margin 的话)
    // margin-left: 0;
    // margin-right: 0;

    // --- 圆角处理 ---
    // 默认情况下，所有按钮的左右圆角都可能存在

    // 对于非第一个子按钮，移除左侧圆角
    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      // 关键：通过负 margin 让相邻按钮的边框重叠 1px
      margin-left: -1px;
    }

    // 对于非最后一个子按钮，移除右侧圆角
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    // --- 交互状态处理 ---
    // 当按钮获得焦点、悬停或激活时，提高其层级，确保其边框在最前面，看起来更清晰
    &:hover,
    &:focus,
    &:active {
      z-index: 1;
    }
    // 如果按钮是 disabled 状态，则不需要提升 z-index
    &.is-disabled {
      z-index: 0;
    }

    // 对于第一个子按钮，确保它没有负的左边距，并保持其左侧圆角 (如果父组件没强制移除的话)
    &:first-child {
      margin-left: 0;
      // 如果 MyButton 默认有圆角，这里不需要特殊处理，
      // 如果 MyButton 默认无圆角，则需要在这里添加：
      // border-top-left-radius: $button-border-radius; // 假设 $button-border-radius 已定义
      // border-bottom-left-radius: $button-border-radius;
    }

     // 对于最后一个子按钮，确保保持其右侧圆角
    // &:last-child {
       // border-top-right-radius: $button-border-radius;
       // border-bottom-right-radius: $button-border-radius;
    // }
  }
}
</style>