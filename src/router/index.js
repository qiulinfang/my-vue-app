// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// --- 导入布局组件 ---
// 你的后台主体布局组件，通常包含侧边栏、顶部导航栏和主内容区 <router-view>
// 路径可能需要根据你的项目结构调整
// 使用 @ 代表 src 目录 (需在 vite.config.js 或 vue.config.js 中配置 alias)
import Layout from '@/components/layout/Layout.vue';

/**
 * @name constantRoutes (常量路由)
 * @description 不需要动态权限控制的路由，所有用户都能访问。
 * 通常包括登录页、404错误页、重定向页等。
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'), // 路由懒加载，优化首屏加载
    meta: { 
      title: '登录', 
      hidden: true // 自定义元信息：不在菜单栏显示
    }
  },
];

/**
 * @name asyncRoutes (异步路由 / 动态路由)
 * @description 需要根据用户角色/权限，在登录后动态添加到路由实例中的路由。
 * 这些路由配置通常按模块拆分存放在 ./modules/ 文件夹下。
 * 注意：这个数组本身通常不直接在 createRouter 时使用，而是作为权限匹配的来源。
 */
// 示例：导入模块路由
// import userRoutes from './modules/user';
// import productRoutes from './modules/product';
// export const asyncRoutes = [
//   ...userRoutes,
//   ...productRoutes,
//   // 必须放在动态路由最后！用于匹配所有未定义的路径，并重定向到404
//   { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } }
// ];

// 创建 Router 实例
const router = createRouter({
  // 使用 H5 History 模式 (需要服务器端配置支持，否则刷新页面会404)
  // 如果部署在子目录下，需要设置 base: '/your-sub-directory/'
  history: createWebHistory(import.meta.env.BASE_URL), 
  // 初始加载的路由（只包含常量路由）
  routes: constantRoutes,
  // 路由切换时的页面滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果有保存的滚动位置（例如浏览器前进/后退），则恢复该位置
      return savedPosition;
    } else {
      // 否则，滚动到页面顶部
      return { top: 0, behavior: 'smooth' }; // 平滑滚动
    }
  }
});

// --- 全局前置导航守卫 (router.beforeEach) ---
// 这是实现权限控制、动态路由加载的核心区域
// import NProgress from 'nprogress'; // (可选) 进度条库
// import 'nprogress/nprogress.css'; // (可选) 进度条样式
// import { useUserStore } from '@/store/modules/user'; // (必需) 用户状态管理器 (Pinia 示例)
// import { getToken } from '@/utils/auth'; // (必需) 获取/设置 token 的工具函数

// NProgress.configure({ showSpinner: false }); // (可选) 配置进度条

const whiteList = ['/login', '/auth-redirect']; // 路由白名单，无需登录即可访问

router.beforeEach(async (to, from, next) => {
  // NProgress.start(); // (可选) 开始进度条

  console.log(`导航守卫：从 ${from.path} 到 ${to.path}`);

  // 在这里实现你的权限验证逻辑：
  // 1. 获取 token
  // const hasToken = getToken();
  // 2. 判断 token 是否存在
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // 如果已登录，访问登录页则重定向到首页
  //     next({ path: '/' });
  //     // NProgress.done();
  //   } else {
  //     // 获取用户状态 store
  //     const userStore = useUserStore();
  //     // 判断是否已有用户信息（例如角色 roles）
  //     const hasRoles = userStore.roles && userStore.roles.length > 0;
  //     if (hasRoles) {
  //       // 如果已有角色信息，说明动态路由已添加，直接放行
  //       next();
  //     } else {
  //       try {
  //         // 异步获取用户信息 (包含角色/权限)
  //         const { roles } = await userStore.getInfo();
  //         // 根据角色生成可访问的路由表 (需要你在 store 中实现 generateRoutes 方法)
  //         const accessRoutes = await userStore.generateRoutes(roles);
  //         // 动态添加路由：将生成的路由添加到 router 实例
  //         accessRoutes.forEach(route => {
  //           router.addRoute(route); // 核心！
  //         });
  //         // 使用 replace: true, 这样导航就不会留下历史记录
  //         // 目的是确保 addRoute 完成后，路由实例已更新，重新进入导航流程
  //         next({ ...to, replace: true }); 
  //       } catch (error) {
  //         // 如果获取用户信息失败（例如 token 过期）
  //         console.error('获取用户信息失败:', error);
  //         await userStore.resetToken(); // 清除 token 和用户信息
  //         // 重定向到登录页，并携带目标路径作为查询参数，以便登录后跳回
  //         next(`/login?redirect=${to.path}`);
  //         // NProgress.done();
  //       }
  //     }
  //   }
  // } else {
  //   // 没有 token 的情况
  //   if (whiteList.includes(to.path)) {
  //     // 如果在白名单中，直接放行
  //     next();
  //   } else {
  //     // 否则，重定向到登录页
  //     next(`/login?redirect=${to.path}`);
  //     // NProgress.done();
  //   }
  // }

  // **** 简化版 - 无权限控制 ****
  // 如果你暂时不需要复杂的权限控制，可以直接放行所有导航
  next(); 
  // **** 简化版结束 ****
});

// 全局后置钩子
router.afterEach((to) => {
  // NProgress.done(); // (可选) 结束进度条
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 后台管理系统` : '后台管理系统';
});

// --- 重置路由方法 ---
// 在用户登出或权限变更时，可能需要重置路由到初始状态（只包含常量路由）
export function resetRouter() {
  // 先获取所有动态添加的路由
  const newRouter = createRouter({ /* ... */ }); // 创建一个新的干净的 router 配置是获取默认路由的方式之一
  router.matcher = newRouter.matcher // reset router
  // 或者更常见的做法是记录动态添加的路由并逐个移除
  // router.getRoutes().forEach(route => {
  //   const name = route.name;
  //   if (name && !constantRoutes.some(cr => cr.name === name)) { // 判断是否为动态路由
  //      router.removeRoute(name);
  //   }
  // });
}

// 导出 router 实例，供 main.js 使用
export default router;