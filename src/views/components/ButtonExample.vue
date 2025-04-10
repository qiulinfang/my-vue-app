<template>
    <div class="component-example-page">
      <h1>MyButton 按钮示例</h1>
      <p>演示 MyButton 组件的不同类型、状态和配置。</p>
  
      <section>
        <h2>基础用法与类型 (type)</h2>
        <MyButton @click="logClick('默认')">默认按钮</MyButton>
        <MyButton type="primary" @click="logClick('主要')">主要按钮</MyButton>
        <MyButton type="success" @click="logClick('成功')">成功按钮</MyButton>
        <MyButton type="warning" @click="logClick('警告')">警告按钮</MyButton>
        <MyButton type="danger" @click="logClick('危险')">危险按钮</MyButton>
        <MyButton type="info" @click="logClick('信息')">信息按钮</MyButton>
        <MyButton type="text" @click="logClick('文本')">文本按钮</MyButton>
        <pre><code class="language-html">&lt;MyButton type="primary"&gt;主要按钮&lt;/MyButton&gt;</code></pre>
      </section>
  
      <section>
        <h2>朴素按钮 (plain)</h2>
        <MyButton plain @click="logClick('默认朴素')">默认按钮</MyButton>
        <MyButton type="primary" plain @click="logClick('主要朴素')">主要按钮</MyButton>
        <MyButton type="success" plain @click="logClick('成功朴素')">成功按钮</MyButton>
        <pre><code class="language-html">&lt;MyButton type="primary" plain&gt;主要按钮&lt;/MyButton&gt;</code></pre>
      </section>
  
      <section>
        <h2>圆角 (round) / 圆形 (circle)</h2>
        <MyButton type="warning" round @click="logClick('警告圆角')">警告按钮</MyButton>
        <MyButton type="danger" icon="Delete" circle @click="logClick('删除圆形')" title="删除" />
         <MyButton icon="Search" circle @click="logClick('搜索圆形')" title="搜索"/>
        <pre><code class="language-html">&lt;MyButton type="danger" icon="Delete" circle /&gt;</code></pre>
      </section>
  
      <section>
        <h2>禁用状态 (disabled)</h2>
        <MyButton disabled>默认按钮 (禁用)</MyButton>
        <MyButton type="primary" disabled>主要按钮 (禁用)</MyButton>
        <MyButton type="success" plain disabled>成功按钮 (朴素禁用)</MyButton>
        <pre><code class="language-html">&lt;MyButton type="primary" disabled&gt;主要按钮&lt;/MyButton&gt;</code></pre>
      </section>
  
      <section>
        <h2>加载状态 (loading)</h2>
        <MyButton type="primary" :loading="true">加载中...</MyButton>
        <MyButton type="info" :loading="isLoading" @click="simulateLoading">
          {{ isLoading ? '处理中...' : '点击模拟加载' }}
        </MyButton>
        <pre><code class="language-html">&lt;MyButton type="primary" :loading="isLoading"&gt;
    {{ isLoading ? '处理中...' : '点击加载' }}
  &lt;/MyButton&gt;</code></pre>
      </section>
  
      <section>
        <h2>带图标 (icon)</h2>
        <MyButton type="primary" icon="Edit" @click="logClick('编辑')">编辑</MyButton>
        <MyButton icon="Share" @click="logClick('分享')">分享</MyButton>
        <MyButton icon="Upload" @click="logClick('上传')" /> <pre><code class="language-html">&lt;MyButton type="primary" icon="Edit"&gt;编辑&lt;/MyButton&gt;</code></pre>
      </section>
  
      <section>
        <h2>不同尺寸 (size)</h2>
        <MyButton type="primary" size="large">大按钮</MyButton>
        <MyButton type="primary">默认按钮</MyButton>
        <MyButton type="primary" size="small">小按钮</MyButton>
         <br>
        <MyButton type="success" icon="Check" size="large" round>大圆角</MyButton>
        <MyButton type="success" icon="Check" round>默认圆角</MyButton>
        <MyButton type="success" icon="Check" size="small" round>小圆角</MyButton>
        <pre><code class="language-html">&lt;MyButton type="primary" size="large"&gt;大按钮&lt;/MyButton&gt;</code></pre>
      </section>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  // 确保路径正确
  import MyInput from '@/components/base/Input/Input.vue'; // 确保路径正确
  import MyButton from '@/components/base/Button/Button.vue'; // 假设 MyButton 存在
  // 如果图标不是全局注册的，需要按需导入
  // import { Delete, Search, Edit, Share, Upload, Check } from '@element-plus/icons-vue';
  
  const isLoading = ref(false);
  
  function logClick(buttonName) {
    console.log(`按钮 "${buttonName}" 被点击了!`);
  }
  
  function simulateLoading() {
    isLoading.value = true;
    logClick('模拟加载');
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
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
  /* 给按钮之间加些间距 */
  /* 选择器可能需要根据 MyButton 的实际渲染调整 */
  .component-example-page :deep(button.el-button),
  .component-example-page > section > button[class^="f-button"] {
      margin-right: 10px;
      margin-bottom: 10px;
  }
  
  pre {
    background-color: #f6f8fa; /* 浅灰色背景 */
    border: 1px solid #e1e4e8; /* 边框 */
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    margin-top: 15px; /* 与上面的按钮隔开 */
  }
  code.language-html {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 14px;
    color: #24292e; /* 代码颜色 */
  }
  </style>