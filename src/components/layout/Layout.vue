<template>
  <el-container class="layout-container">
    <el-container>
      <el-aside width="200px"> <SidebarComponent />
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SidebarComponent from './Sidebar.vue'; // 引入侧边栏组件
// import HeaderComponent from './Header.vue'; // 如果有顶部导航栏，也引入
import { ElContainer, ElAside, ElMain, ElHeader } from 'element-plus'; // 按需导入或全局导入
</script>

<style scoped>
.layout-container {
  height: 100vh; /* 让布局撑满整个视口高度 */
  width: 100%;
}

.el-aside {
  background-color: #545c64; /* 示例背景色 */
  color: #fff;
  height: 100%; /* 侧边栏也撑满高度 */
  /* 可以添加更多样式 */
}

.el-main {
  background-color: #f0f2f5; /* 示例背景色 */
  padding: 20px; /* 给内容区一些内边距 */
  height: 100%; /* 让内容区撑满 */
  overflow-y: auto; /* 如果内容过长，允许滚动 */
}

/* 如果有 Header */
/* .el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #eee;
} */
</style>