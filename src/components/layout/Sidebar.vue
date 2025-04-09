<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :unique-opened="true" mode="vertical"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElMenu, ElScrollbar } from 'element-plus';
import SidebarItem from './SidebarItem.vue'; // 引入递归菜单项组件
// import { routes } from '@/router'; // 如果路由是静态导入的
import router from '@/router'; // 导入 router 实例以获取动态添加的路由

const route = useRoute();

// 获取需要在菜单中显示的路由
// 注意：这里直接用了 router.options.routes，这可能只包含初始路由。
// 如果你的路由是动态添加的 (addRoute)，你需要从其他地方获取完整的路由表，
// 例如 Pinia store 或者直接使用 router.getRoutes() 并进行处理。
// 假设你的布局路由都在 asyncRoutes 中，并且已添加到 router 实例
const menuRoutes = computed(() => {
  // router.getRoutes() 获取当前所有注册的路由记录
  // 你需要根据你的路由结构进行过滤，通常是找到 path: '/' 的那个布局路由下的 children
  console.log(router.getRoutes())
  const layoutRoute = router.getRoutes(); // 假设你的 Layout 组件有 name: 'Layout'
  if (!layoutRoute) {
    console.error('布局路由 / 未找到');
    return [];
  }
  // 或者直接使用导入的 asyncRoutes (如果你的路由不是动态根据权限生成的)
  // import { asyncRoutes } from '@/router' // 如果直接用这个
  // return asyncRoutes;
  return layoutRoute; // 返回布局路由的子路由作为菜单来源
});

// 计算当前激活的菜单项
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) { // 允许在路由 meta 中手动指定高亮的菜单路径
    return meta.activeMenu;
  }
  return path;
});

// 控制菜单折叠状态 (可以从父组件或 store 获取)
const isCollapse = ref(false);

</script>

<style scoped>
.el-menu {
  border-right: none;
  height: 100%;
}
.scrollbar-wrapper {
  height: calc(100% - 50px); /* 根据你的布局调整，可能需要减去 logo 区域高度 */
  overflow-x: hidden !important;
}
.el-menu--collapse {
 width: 64px; /* 折叠时的宽度 */
}
.el-menu:not(.el-menu--collapse) {
 width: 200px; /* 展开时的宽度 */
}

/* 修复折叠时 Tooltip 问题或样式 */
.el-menu--collapse .el-sub-menu__title span,
.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none;
}
</style>