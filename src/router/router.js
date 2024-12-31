import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/custom/Layout.vue";
import Dashboard from "../views/Dashboard.vue"; // 假设这是你的首页组件
import Users from "../views/Users.vue"; // 用户管理页面组件
import duanju from "../views/DuanJu.vue";
const routes = [
  {
    path: "/Layout",
    component: Layout,
    children: [
      { path: "", component: Dashboard },
      { path: "users", component: Users },
      { path: "duanju", component: duanju },
    ],
  },
  {
    path: '/daunju',
    name: 'Daunju',
    component: () => import('@/views/DuanJu.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/setting/ParentComponent.vue')
  },
  {
    path: '/extralist',
    name: 'extralist',
    component: () => import('@/views/extralist.vue')
  },
  {
    path: '/APITest',
    name: 'APITest',
    component: () => import('@/views/APITest.vue')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('@/views/icon/index.vue')
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('@/views/button/index.vue')
  },
  {
    path: '/container',
    name: 'container',
    component: () => import('@/views/container/index.vue')
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('@/views/link/index.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import('@/views/text/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
