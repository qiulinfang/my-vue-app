<template>
  <div class="component-example-page">
    <h1>MyButton 按钮示例</h1>
    <p>演示 MyButton 组件的不同类型、状态和配置。</p>
  </div>
  <MyButton>按钮示例</MyButton>
  <MyButton @click="consoleLog">consoleLog按钮示例</MyButton>
</template>

<script setup>
const consoleLog = () => {
  console.log("consoleLog按钮示例");
};


</script>
