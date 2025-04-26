// src/router/modules/system.js
import Layout from '@/components/layout/Layout/src/Layout.vue';

const systemRouter = {
  path: '/system',
  component: Layout,
  name: 'System', // 模块根路由的 Name
  redirect: '/system/user',
  meta: { title: '系统管理', icon: 'Setting', alwaysShow: true }, // alwaysShow 根据需要设置
  children: [
    {
      path: 'user', // 路径: /system/user
      name: 'UserManagement',
      component: () => import('@/views/system/User.vue'),
      meta: { title: '用户管理' }
    },
    {
      path: 'role', // 路径: /system/role
      name: 'RoleManagement',
      component: () => import('@/views/system/Role.vue'),
      meta: { title: '角色管理' }
    },
  ]
};

export default systemRouter;