import { createRouter, createWebHistory } from "vue-router";
import Layout from "./components/Layout.vue";
import Dashboard from "./views/Dashboard.vue"; // 假设这是你的首页组件
import Users from "./views/Users.vue"; // 用户管理页面组件
import Settings from "./views/Settings.vue"; // 系统设置页面组件
import duanju from "./views/DuanJu.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "", component: Dashboard },
      { path: "users", component: Users },
      { path: "settings", component: Settings },
      { path: "duanju", component: duanju },
    ],
  },
  {
    path: '/daunju',
    name: 'Daunju',
    component: duanju
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
