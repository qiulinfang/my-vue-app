<template>
  <div class="top-navbar-container">
    <div class="left-menu">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
         </el-breadcrumb>
    </div>

    <div class="right-menu">
       <el-tooltip content="全屏" effect="dark" placement="bottom">
         <el-icon class="right-menu-item hover-effect" @click="toggleFullScreen"><FullScreen /></el-icon>
       </el-tooltip>

       <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
         <div class="avatar-wrapper">
           <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
           <el-icon><CaretBottom /></el-icon>
         </div>
         <template #dropdown>
           <el-dropdown-menu>
             <router-link to="/profile/index">
               <el-dropdown-item>个人中心</el-dropdown-item>
             </router-link>
             <el-dropdown-item divided @click="logout">
               <span style="display:block;">退出登录</span>
             </el-dropdown-item>
           </el-dropdown-menu>
         </template>
       </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'; // 引入消息提示和确认框
// 导入所需的 Element Plus 图标 (main.js 已全局注册，可以直接使用)
// import { FullScreen, CaretBottom } from '@element-plus/icons-vue'; // 如果没有全局注册，需要导入

const router = useRouter();

// --- 面包屑逻辑 (通常更复杂，需要监听路由变化) ---
// const breadcrumbs = ref([]);
// watch(() => router.currentRoute.value, (route) => {
//   // 根据 route.matched 生成面包屑数据
// }, { immediate: true });


// --- 全屏逻辑 ---
const isFullscreen = ref(false);
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullscreen.value = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullscreen.value = false;
    }
  }
};
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});
onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

// --- 退出登录逻辑 ---
const logout = async () => {
  try {
    await ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    // 调用你的退出登录接口或清除本地存储/Pinia状态
    localStorage.removeItem('your_token_key'); // 假设从 localStorage 获取 token
    // store.dispatch('user/logout'); // 示例：如果使用 Pinia/Vuex
    // 跳转到登录页
    router.push(`/login`);
  } catch (error) {
    // 用户点击了取消或关闭弹窗
    if (error !== 'cancel') {
      ElMessage.error('退出失败');
    }
  }
};

// --- 从 Pinia Store 获取用户信息 (如果需要) ---
// import { useUserStore } from '@/store/modules/user'; // 假设有用户 store
// const userStore = useUserStore();
// const userName = computed(() => userStore.name);
// const avatar = computed(() => userStore.avatar);
</script>

<style lang="scss" scoped>
.top-navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 15px; // 左右内边距

  .left-menu {
    // 样式...
    .navbar-logo {
       height: 30px; // 示例 logo 大小
       vertical-align: middle;
       margin-right: 10px;
    }
     // 可能需要调整面包屑样式
     .el-breadcrumb {
        line-height: 50px; // 与 header 高度一致
     }
  }

  .right-menu {
    display: flex;
    align-items: center;

    .right-menu-item {
      padding: 0 8px;
      font-size: 18px; // 图标大小
      color: #5a5e66;
      vertical-align: text-bottom;
      cursor: pointer;

      &.hover-effect {
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-left: 15px; // 与其他项隔开

      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;

        .el-avatar {
          margin-right: 5px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -15px; // 调整位置
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
        }
      }
    }
  }
}
</style>