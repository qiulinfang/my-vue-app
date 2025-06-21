<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">首页</router-link> | <router-link to="/about">关于我们</router-link> |
        <router-link to="/user/123">用户123</router-link> |
        <router-link to="/dashboard">用户中心</router-link> |
        <router-link to="/blog">博客</router-link> |
        <router-link to="/article/1">阅读文章 #1</router-link> |
        <router-link to="/document/42">编辑文档42</router-link> |
          <span v-if="router.hasRoute('admin')">
    | <router-link to="/admin">后台管理</router-link> |
  </span>
      </nav>
      <div class="auth-buttons">
        <div v-if="!isLoggedIn">
          <button @click="login('user', false, false)">普通用户登录</button>
          <button @click="login('user', false, true)">订阅会员登录</button>
        </div>
        <button v-if="isLoggedIn" @click="logout">登出</button>
      </div>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isNavigationFailure } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

function login(role = 'user', isVip = false, isSubscriber = false) {
  const authUser = {
    name: '测试用户',
    role,
    isVip,
    isSubscriber // 添加订阅状态
  };
  localStorage.setItem('user', JSON.stringify(authUser));

  isLoggedIn.value = true;

  // 如果是管理员登录，动态添加路由
  if (role === 'admin') {
    // 检查路由是否已存在，防止重复添加
    if (!router.hasRoute('admin')) {
      router.addRoute({
        path: '/admin',
        name: 'admin',
        component: () => import('./views/AdminView.vue'),
        meta: { requiresAuth: true }
      });
      console.log('管理员路由已添加！');
    }
  }

  alert(`作为 ${authUser.name} 登录成功！`);
}

// 登出时，我们可能需要移除路由（或者刷新页面让其自然消失）
// 为了简单起见，我们刷新页面来重置路由表
async function logout() {
  try {
    // router.push 返回一个 Promise
    await router.push('/');
    
    // 只有在导航成功后才执行登出逻辑
    localStorage.removeItem('user');
    isLoggedIn.value = false;
    alert('您已成功登出！');

  } catch (error) {
    // isNavigationFailure 是 vue-router 提供的一个工具函数
    // 用来判断错误是不是一个标准的导航故障
    if (isNavigationFailure(error)) {
      // 如果是，说明导航被守卫（比如我们的 beforeRouteLeave）阻止了
      console.log('导航被取消:', error);
      alert('无法登出，因为您在其他页面有未保存的更改。');
    } else {
      // 其他未知错误
      console.error('登出时发生未知错误:', error);
    }
  }
}
// 在组件挂载时，检查本地存储以恢复登录状态
onMounted(() => {
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
});
</script>
<style scoped>
/* 添加一些简单的样式，让布局更清晰 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  padding: 20px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 10px;
}

/* 这是 vue-router 自动为激活链接添加的类 */
nav a.router-link-exact-active {
  color: #42b983;
}

main {
  padding: 20px;
}

/* src/App.vue */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
