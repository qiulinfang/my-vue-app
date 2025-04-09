<template>
    <div class="app-wrapper">
      <div class="main-container">
        <section class="app-main">
          <router-view v-slot="{ Component, route }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" :key="route.path" />
              </transition>
          </router-view>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  // 这里可以添加布局相关的逻辑，例如获取需要缓存的页面列表等
  // import { computed } from 'vue';
  // import { useTagsViewStore } from '@/store/modules/tagsView'; // 示例
  // const tagsViewStore = useTagsViewStore();
  // const cachedViews = computed(() => tagsViewStore.cachedViews);
  
  // 也可以导入并使用 Sidebar, Navbar, TagsView 等子组件
  // import Sidebar from './components/Sidebar/index.vue';
  // import Navbar from './components/Navbar.vue';
  // import TagsView from './components/TagsView/index.vue';
  </script>
  
  <style lang="scss" scoped> // 推荐使用 scoped 和 scss
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex; // 或者其他布局方式
  }
  
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    transition: margin-left .28s;
    // margin-left: var(--sidebar-width); // 根据侧边栏状态调整
    position: relative;
  }
  
  .app-main {
    /* 主内容区域样式 */
    min-height: calc(100vh - 50px); /* 假设顶部导航栏高度为 50px */
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 20px; /* 内容区域内边距 */
    background-color: #f0f2f5; /* 背景色示例 */
  }
  
  /* 可以添加过渡动画样式 */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }
  .fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>