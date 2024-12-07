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
            <el-icon><location /></el-icon>
            <span>直播管理</span>
          </template>
          <el-menu-item index="/">产品包管理</el-menu-item>
          <el-menu-item index="/users">T片IAP模板产品管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>财务管理</span>
          </template>
          <el-menu-item index="/settings">系统设置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/daunju">产品管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
            <span>通用组件</span>
          </template>
          <el-menu-item index="/extralist">extlist</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>



const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
