<template>
  <router-view />
</template>

<script setup>
// 导入 RouterView 组件 (显式导入是一个好习惯)
import { RouterView } from 'vue-router';

// 对于后台管理系统的根组件 App.vue：
// - 通常不需要包含复杂的响应式状态或方法。
// - 全局状态（如用户信息、权限、主题设置）通常由 Pinia 或 Vuex 管理。
// - 路由守卫 (router.beforeEach) 会处理页面访问权限和重定向。
// - 主要的布局结构和逻辑会封装在专门的布局组件中（例如 src/layout/Layout.vue）。

// 你可以在这里执行一些非常顶层的、只执行一次的初始化逻辑，但通常很少需要。
console.log('后台管理系统 App.vue setup 已执行');
</script>

<style>
/* 全局样式设置。
  强烈建议将大部分全局样式（特别是 CSS Reset、UI 库主题覆盖、通用工具类）
  放在单独的 CSS/SCSS 文件中 (例如 src/styles/index.css 或 src/styles/global.scss)，
  然后在 main.js 中导入。
  这里只保留最基础的设置。
*/

html, body, #app {
  /* 确保根元素、body 和 #app 容器占满整个视口高度 */
  height: 100%; 
  width: 100%;
  margin: 0;
  padding: 0;
  /* 可选：为整个应用设置一个基础背景色，通常是浅灰色 */
  /* background-color: #f0f2f5; */ 
  overflow: hidden; /* 防止根元素出现滚动条，滚动应在布局内部处理 */
}

/* 基础字体和颜色 (可以根据你选用的 UI 库进行调整) */
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  font-size: 14px; /* 后台系统常用的基础字号 */
  color: #303133; /* 可以是 UI 库的默认文字颜色 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*, *::before, *::after {
  box-sizing: border-box; /* 统一盒模型 */
}

/* 可以在 :root 中定义全局 CSS 变量，方便主题切换或样式复用 */
:root {
  --el-color-primary: #409EFF; /* 示例：定义 Element Plus 的主题色变量 */
  --layout-header-height: 60px; /* 示例：定义布局头部高度 */
  --layout-sidebar-width: 210px; /* 示例：定义侧边栏宽度 */
}
</style>