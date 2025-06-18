<template>
  <div>
    <el-header>
      <HeaderComponent />
    </el-header>
    <el-container class="layout-container">
      <el-container>
        <el-aside width="200px">
          <SidebarComponent />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SidebarComponent from '@/layout/Sidebar/src/Sidebar.vue';
import HeaderComponent from '@/layout/Header/src/Header.vue';
// Element Plus components are likely globally registered or correctly imported already
</script>

<style scoped>
.layout-container {
  /* 减去 Header 的高度，假设 Header 固定为 60px */
  height: calc(100vh - 60px);
  width: 100%;
}

/* --- Color Scheme 1: White Header --- */

.el-header {
  background-color: #ffffff; /* 洁净的白色 */
  color: #303133; /* 默认深灰色文字，对比度好 */
  line-height: 60px; /* 保持 */
  border-bottom: 1px solid #e4e7ed; /* Element Plus 默认的浅灰色边框 */
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08); /* 可选：添加细微阴影增加层次感 */
}

.el-aside {
  background-color: #304156; /* 更深邃、专业的蓝灰色，常用于后台侧边栏 */
  color: #bfcbd9; /* 侧边栏文字浅灰色，与深色背景协调 */
  height: 100%;
  border-right: none; /* 通常深色侧边栏不需要右边框 */
   /* 你可能还需要设置 el-menu 的背景色为透明或匹配 #304156 */
  /* .el-menu { background-color: transparent; } */
}

.el-main {
  background-color: #f0f2f5; /* 标准的浅灰色背景，适合内容区域 */
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

/* 确保侧边栏和主内容区容器占满剩余高度 */
.el-container > .el-container {
  height: 100%;
}
</style>