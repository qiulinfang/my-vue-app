<template>
    <div class="component-example-page">
      <h1>MyInput 输入框示例</h1>
      <p>演示 MyInput 输入框组件的基础用法、不同类型、状态和配置。</p>
      <MyInput></MyInput>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  // 确保路径正确  
  // 如果图标不是全局注册的，需要按需导入
  // import { User, Calendar, Lock, Search, Edit } from '@element-plus/icons-vue';
  // 响应式数据
  const textValue = ref('');
  const passwordValue = ref('123456');
  const numberValue = ref(10);
  const textareaValue = ref('这是\n一段多行文本');
  const disabledInputValue = ref('禁止输入');
  const readonlyInputValue = ref('只能读取');
  const clearableValue = ref('点右侧清除');
  const prefixValue = ref('');
  const suffixValue = ref('');
  const prependValue = ref('');
  const appendValue = ref('');
  const sizeValue = ref('');
  
  
  // 事件处理函数
  function logEvent(eventName, payload) {
    if (payload !== undefined) {
      console.log(`Input Event: ${eventName}`, payload);
    } else {
      console.log(`Input Event: ${eventName}`);
    }
  }
  
  // --- 可选：代码高亮 ---
  // import hljs from 'highlight.js';
  // import 'highlight.js/styles/stackoverflow-light.css'; // 选择一个主题
  
  // onMounted(() => {
  //   // 确保在 DOM 更新后再执行高亮
  //   setTimeout(() => {
  //      try {
  //         hljs.highlightAll();
  //      } catch(e) {
  //         console.error("Highlight.js error:", e);
  //      }
  //   }, 0);
  // });
  // --- 代码高亮结束 ---
  </script>
  
  <style scoped>
  .component-example-page {
    padding: 20px;
  }
  section {
    margin-bottom: 30px;
     padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  section:last-of-type {
      border-bottom: none;
  }
  section h2 {
    margin-bottom: 15px;
     padding-bottom: 5px;
  }
  /* 给输入框和标签一些样式和间距 */
  label {
      font-weight: bold;
      font-size: 14px;
      color: #606266;
      margin-right: 8px;
      display: inline-block; /* 方便和输入框同行 */
      vertical-align: middle;
  }
  /* 选择器可能需要根据 MyInput 的实际渲染调整 */
  .component-example-page :deep(.el-input),
  .component-example-page > section > div[class^="f-input"], /* 如果你的组件根是 div */
  .component-example-page > section > p > div[class^="f-input"] {
    margin-bottom: 10px;
    max-width: 450px; /* 限制最大宽度方便查看 */
    vertical-align: middle;
  }
  .component-example-page :deep(.el-input-group__append .el-button) {
      margin: 0 -10px; /* 可能需要微调按钮在 append slot 中的样式 */
  }
  
  pre {
    background-color: #f6f8fa; /* 浅灰色背景 */
    border: 1px solid #e1e4e8; /* 边框 */
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    margin-top: 15px;
  }
  code.language-html {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 14px;
    color: #24292e; /* 代码颜色 */
  }
  </style>