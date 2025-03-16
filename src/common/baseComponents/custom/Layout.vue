<template>
  <div :class="containerKls">
    <el-row ref="layoutRef" :class="layoutKls">
      <el-col :span="3" class="menu-col">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <f-icon type="f-caidan"></f-icon>
              <span>直播管理</span>
            </template>
            <el-menu-item index="/">产品包管理</el-menu-item>
            <el-menu-item index="/users">T片IAP模板产品管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <f-icon type="f-caidan"></f-icon>
              <span>财务管理</span>
            </template>
            <el-menu-item index="/settings">系统设置</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <f-icon type="f-caidan"></f-icon>
              <span>内容管理</span>
            </template>
            <el-menu-item index="/daunju">产品管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <f-icon type="f-caidan"></f-icon>
              <span>通用组件</span>
            </template>
            <el-menu-item index="/extralist">extlist</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <f-icon type="f-caidan"></f-icon>
              <span>api执行顺序测试</span>
            </template>
            <el-menu-item index="/apiTest">api执行顺序测试</el-menu-item>
            <el-menu-item index="/test">test</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="6">
            <template #title>
              <f-icon type="f-caidan"></f-icon>
              <span>组件库</span>
            </template>
            <el-menu-item index="/icon"
              ><f-icon type="f-caidan"></f-icon><span>coin</span></el-menu-item
            >
            <el-menu-item index="/button"
              ><f-icon type="f-caidan"></f-icon
              ><span>button</span></el-menu-item
            >
            <el-menu-item index="/container"
              ><f-icon type="f-caidan"></f-icon
              ><span>container</span></el-menu-item
            >
            <el-menu-item index="/link"
              ><f-icon type="f-caidan"></f-icon><span>link</span></el-menu-item
            >
            <el-menu-item index="/text"
              ><f-icon type="f-caidan"></f-icon><span>text</span></el-menu-item
            >
            <el-menu-item index="/scrollbar"
              ><f-icon type="f-caidan"></f-icon
              ><span>scrollbar</span></el-menu-item
            >
            <el-menu-item index="/transition"
              ><f-icon type="f-caidan"></f-icon><span>transition</span></el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="21" class="content-col">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { FIcon } from "f-ui";
import { useNamespace } from "@utils";
const ns = useNamespace("layout");
const containerKls = computed(() => {
  return [ns.b("container")];
});
const layoutKls = computed(() => {
  return [ns.b("layout")];
});
</script>

<style lang="scss" scoped>
@use "@styles/mixins.scss" as *;
@include b(layout) {
  position: relative;
  height: 100vh;
  display: flex;

  @include b(container) {
    flex: 0 0 200px; /* 固定宽度 */
    height: 100%; /* 占满容器高度 */
  }

  .menu-col {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px; /* 固定宽度 */
    height: 100vh; /* 设置为屏幕视口高度 */
    overflow-y: auto; /* 如果内容超出高度，显示滚动条 */
  }

  .content-col {
    margin-left: 200px; /* 留出菜单栏的宽度 */
    height: 100vh; /* 设置为屏幕视口高度 */
    overflow-y: hidden; /* 禁止滚动 */
  }
}
</style>
