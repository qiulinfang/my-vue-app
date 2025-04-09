<template>
    <el-scrollbar wrap-class="scrollbar-wrapper"> <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router  
        :collapse="isCollapse" 
      >
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
  
        <el-sub-menu index="/management">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/management/users">用户管理</el-menu-item>
          <el-menu-item index="/management/roles">角色管理</el-menu-item>
        </el-sub-menu>
  
         <el-menu-item index="/products">
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </el-menu-item>
  
        </el-menu>
    </el-scrollbar>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElIcon,
    ElScrollbar
  } from 'element-plus';
  import { HomeFilled, Setting, Goods } from '@element-plus/icons-vue'; // 引入图标
  
  const route = useRoute();
  
  // 计算当前激活的菜单项（基于当前路由）
  const activeMenu = computed(() => {
    const { meta, path } = route;
    // 如果路由设置了 activeMenu，优先使用
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  });
  
  // 控制菜单是否折叠（如果需要折叠功能）
  const isCollapse = ref(false); 
  // toggleCollapse() { isCollapse.value = !isCollapse.value } 
  // 你可以通过父组件或 Pinia store 控制 isCollapse 的值
  
  </script>
  
  <style scoped>
  .el-menu {
    border-right: none; /* 移除默认的右边框 */
    height: 100%; /* 菜单填满侧边栏高度 */
  }
  
  /* 修复折叠时文字不消失的问题（如果启用折叠） */
  .el-menu--collapse .el-sub-menu__title span {
    display: none;
  }
  .el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow {
    display: none;
  }
  
  .scrollbar-wrapper {
    height: 100%;
    overflow-x: hidden !important; /* 隐藏水平滚动条 */
  }
  
  /* 可以根据需要自定义菜单样式 */
  </style>