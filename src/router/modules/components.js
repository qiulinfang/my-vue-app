// src/router/modules/components.js
import Layout from '@/components/layout/Layout.vue'; // 引入你的主布局组件

const componentsRouter = {
  path: '/components', // 示例页面的基础路径
  component: Layout,
  name: 'ComponentExamples', // 路由名称，确保唯一
  redirect: '/components/button', // 重定向到第一个示例或概览页
  meta: {
    title: '组件示例', // 显示在侧边栏的标题
    icon: 'Menu',      // 选择一个 Element Plus 图标 (e.g., 'Menu', 'Collection', 'Files')
    alwaysShow: true   // 保证这个顶级菜单总是显示
  },
  children: [
    // --- 为每个组件示例页面添加路由 ---
    {
      path: 'button', // 访问路径: /components/button
      name: 'ButtonExample',
      component: () => import('@/views/components/ButtonExample.vue'), // 引入对应的示例页面组件
      meta: { title: 'Button 按钮' } // 子菜单标题
    },
    {
      path: 'input', // 访问路径: /components/input
      name: 'InputExample',
      component: () => import('@/views/components/InputExample.vue'), // 引入对应的示例页面组件
      meta: { title: 'Input 输入框' } // 子菜单标题
    },
    // --- 继续为你其他的组件添加路由 ---
    // {
    //   path: 'modal',
    //   name: 'ModalExample',
    //   component: () => import('@/views/components/ModalExample.vue'),
    //   meta: { title: 'Modal 弹窗' }
    // },
  ]
};

export default componentsRouter;