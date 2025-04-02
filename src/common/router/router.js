import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/common/baseComponents/custom/Layout.vue";
import Dashboard from "@/docs/others/Dashboard.vue"; // 假设这是你的首页组件
import Users from "@/docs/others/Users.vue"; // 用户管理页面组件
import duanju from "@/docs/others/DuanJu.vue";
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
    component: () => import('@/docs/others/DuanJu.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/docs/others/setting/ParentComponent.vue')
  },
  {
    path: '/extralist',
    name: 'extralist',
    component: () => import('@/docs/others/extralist.vue')
  },
  {
    path: '/APITest',
    name: 'APITest',
    component: () => import('@/docs/others/APITest.vue')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('@/docs/icon/index.vue')
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('@/docs/button/index.vue')
  },
  {
    path: '/container',
    name: 'container',
    component: () => import('@/docs/container/index.vue')
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('@/docs/link/index.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import('@/docs/text/index.js')
  },
  {
    path: '/scrollbar',
    name: 'scrollbar',
    component: () => import('@/docs/scrollbar/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/docs/test/index.vue')
  },
  {
    path: '/transition',
    name: 'transition',
    component: () => import('@/docs/transition/index.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@/docs/table/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
