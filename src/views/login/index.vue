<template>
    <div class="login-page">
      <h1>登录页面</h1>
      <p>这里是登录页面的内容区域。</p>
      </div>
  </template>
  
  <script setup>
  // 这是脚本区域，使用 <script setup> 是 Vue 3 的推荐方式
  // 你可以在这里编写组件的逻辑，例如处理用户输入、调用登录 API 等
  import { ref } from 'vue';
  
  console.log('登录页面组件 setup 执行');
  
  const username = ref('');
  const password = ref('');
  
  function submitLogin() {
    console.log('提交登录:', username.value, password.value);
    // 在这里调用你的登录 action 或 API
  }
  </script>
  
  <style scoped>
  /* 这是样式区域，'scoped' 属性确保样式只作用于当前组件 */
  .login-page {
    padding: 30px;
    text-align: center;
  }
  </style>