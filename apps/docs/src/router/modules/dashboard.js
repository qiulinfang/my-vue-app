// src/router/modules/dashboard.js
import Layout from 'myComponent';

console.log(Layout)

const dashboardRouter = {
  // 注意：如果 Dashboard 是根路径 '/' 的一部分，需要确保路径和名称不与其他模块冲突
  // 或者调整结构，让 '/' 作为顶级容器，动态添加模块作为其 children
  // 这里假设 '/' 及其下的 dashboard 是一个独立的逻辑入口
  path: '/', // 也可以是 /dashboard 如果你不想它作为根路径
  component: Layout,
  name: 'Layout_Dashboard', // 给布局一个相关的 name
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard', // 实际路径 /dashboard
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: 'HomeFilled', affix: true } // affix 用于标签页固定
    }
  ]
};

export default dashboardRouter;