// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Layout/src/Layout.vue'; // 可以在这里导入，或者确认在模块中导入即可

// --- 导入各个模块的路由配置 ---
import dashboardRouter from './modules/dashboard';
import systemRouter from './modules/system';
import componentsRouter from './modules/components'; 
import directivesRouter from './modules/directives'; 
// import productsRouter from './modules/products';
// import contentRouter from './modules/content';
// import externalLinksRouter from './modules/external';
// ... 如果有更多模块，继续导入

// --- 公开访问的路由 ---
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '页面未找到', hidden: true }
  },
  // 你可能还有 /redirect 等其他常量路由
];

// --- 需要权限或动态添加的路由，由模块组成 ---
// 注意：这里的顺序可能影响菜单的显示顺序
export const asyncRoutes = [
  dashboardRouter, // 首页通常放最前
  systemRouter,
  componentsRouter,
  directivesRouter,
  // productsRouter,
  // contentRouter,
  // externalLinksRouter,
  // ... 添加其他导入的模块路由
];

// --- 创建 Router 实例 ---
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes, // 初始加载常量路由
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// --- 导航守卫 (维持原样，但现在处理的是由模块组成的 asyncRoutes) ---
router.beforeEach(async (to, from, next) => {
  // TODO: 替换为真实的权限判断和路由添加逻辑
  // 示例逻辑：
  // const token = localStorage.getItem('your_token_key'); // 假设从 localStorage 获取 token
  const token = 111; // 假设从 localStorage 获取 token
  const hasRoutes = router.hasRoute('Dashboard'); // 检查核心路由是否存在判断是否已添加

  if (token) { // 已登录
    if (to.path === '/login') {
      next({ path: '/' }); // 重定向到首页
    } else {
      if (!hasRoutes) { // 如果路由未添加
        try {
          // 实际项目中，这里应该是根据用户角色过滤后的 accessRoutes
          const accessRoutes = asyncRoutes; // 示例：添加所有模块路由

          accessRoutes.forEach(route => {
            // 最好检查一下是否已存在同名路由，虽然 addRoute 内部可能有处理
            if (route.name && !router.hasRoute(route.name)) {
              router.addRoute(route);
            } else if (!route.name) {
              router.addRoute(route); // 没有 name 的路由谨慎处理
            }
          });

          // **动态添加 404 捕获规则到最后**
          // 确保它只在所有其他路由添加之后执行，并且只添加一次
          if (!router.hasRoute('CatchAll')) { // 防止重复添加
             router.addRoute({ path: '/:pathMatch(.*)*', name: 'CatchAll', redirect: '/404', meta: { hidden: true } });
          }

          console.log('动态路由模块已添加:', router.getRoutes().map(r=>r.name)); // 打印路由名称方便调试
          next({ ...to, replace: true }); // 确保使用新路由表
        } catch (error) {
          console.error("添加动态路由模块时出错:", error);
          // 可能需要重置 token 或其他错误处理
          next('/login');
        }
      } else {
        next(); // 路由已添加，正常放行
      }
    }
  } else { // 未登录
    if (to.path !== '/login') {
      next(`/login?redirect=${to.path}`); // 重定向到登录页
    } else {
      next(); // 访问登录页，放行
    }
  }
});

// --- 后置守卫 ---
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - 你的应用名称` : '你的应用名称';
});

// --- 重置路由函数 (基本保持不变，因为它遍历的是原始的 asyncRoutes 数组) ---
export function resetRouter() {
  console.log('重置路由...');
  // 遍历原始定义的 asyncRoutes 数组，移除对应名称的路由
  asyncRoutes.forEach(route => {
    if (route.name && router.hasRoute(route.name)) {
      router.removeRoute(route.name);
      console.log(`路由已移除: ${route.name}`);
    }
    // 注意：如果模块路由结构复杂（例如模块内部又添加了动态路由），可能需要更复杂的移除逻辑
  });
   // 移除 404 CatchAll 规则
   if(router.hasRoute('CatchAll')){
       router.removeRoute('CatchAll');
       console.log('路由已移除: CatchAll');
   }
  // 可能还需要重置 Pinia store 中的路由状态
  // const permissionStore = usePermissionStore();
  // permissionStore.resetRoutes(); // 假设 store 中有此方法
}

export default router;