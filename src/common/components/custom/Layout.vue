<template>
  <el-row class="tac">
    <el-col :span="3">
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
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <f-icon type="f-caidan"></f-icon>
            <span>组件库</span>
          </template>
          <el-menu-item index="/icon"><f-icon type="f-caidan"></f-icon><span>coin</span></el-menu-item>
          <el-menu-item index="/button"><f-icon type="f-caidan"></f-icon><span>button</span></el-menu-item>
          <el-menu-item index="/container"><f-icon type="f-caidan"></f-icon><span>container</span></el-menu-item>
          <el-menu-item index="/link"><f-icon type="f-caidan"></f-icon><span>link</span></el-menu-item>
          <el-menu-item index="/text"><f-icon type="f-caidan"></f-icon><span>text</span></el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>

</template>

<script>
import { FIcon} from 'f-ui';
  export default {
    components: {
      FIcon
    },
  }
</script>

<style scoped>

</style>