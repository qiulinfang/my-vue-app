import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Layout.vue'; // 确保路径正确

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  // 可以添加 404 页面路由
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'), // 假设有 404 页面
    meta: { hidden: true }
  }
];

// 需要布局的路由（通常是异步或需要权限的）
export const asyncRoutes = [
  {
    path: '/', // 根路径通常指向布局
    component: Layout, // 使用 Layout 组件作为容器
    redirect: '/dashboard', // 默认重定向到首页或其他页面
    children: [
      {
        path: 'dashboard', // 路径是 /dashboard
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'), // 首页内容组件
        meta: { title: '首页', icon: 'HomeFilled' } // meta 用于菜单生成和面包屑
      },
    ]
  },

  // **重要：** 将 404 匹配放到所有路由规则的最后
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 初始时只加载常量路由，动态路由会在登录后添加（如果需要权限控制）
  // 如果不需要权限，可以将 asyncRoutes 合并到 routes
  routes: constantRoutes, 
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// --- 你的导航守卫逻辑 ---
// 如果需要动态添加路由（权限控制），在 beforeEach 中：
// 1. 判断是否登录
// 2. 如果已登录且没有角色/路由信息，则获取信息
// 3. 根据角色生成可访问路由 (filteredAsyncRoutes)
// 4. 使用 router.addRoute() 动态添加路由
// 5. 使用 next({ ...to, replace: true }) 确保路由添加完毕
router.beforeEach(async (to, from, next) => {
  // 示例：如果没有权限控制，直接添加所有 asyncRoutes
  // 注意：实际项目中，这部分通常在登录成功后或有 token 时执行，并根据用户权限过滤 asyncRoutes
  // 这里仅作演示，假设所有 asyncRoutes 都需要添加
  const hasAddedRoutes = router.hasRoute('Dashboard'); // 检查一个动态路由是否存在，判断是否已添加
  if (!hasAddedRoutes && to.path !== '/login') { // 避免重复添加和在登录页添加
     try {
        asyncRoutes.forEach(route => {
           router.addRoute(route);
        });
        console.log('动态路由已添加:', router.getRoutes());
        // 使用 replace: true, 以确保 addRoute 完成后，使用新的路由表进行导航
        next({ ...to, replace: true }); 
     } catch (error) {
        console.error("添加动态路由时出错:", error);
        // 可以重定向到错误页或登录页
        next('/login'); 
     }
  } else {
     next(); // 正常放行
  }

  // **** 替换为你的完整导航守卫逻辑 ****
});


router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - YourAppName` : 'YourAppName';
});

// （可选）导出重置路由函数，用于登出
export function resetRouter() {
  // 移除动态添加的路由
  asyncRoutes.forEach(route => {
    if (route.name && router.hasRoute(route.name)) {
      router.removeRoute(route.name);
    }
    // 如果路由没有 name，可能需要更复杂的逻辑来移除
  });
  // 也可以重新创建 router 实例来完全重置，但 removeRoute 通常足够
}


export default router;