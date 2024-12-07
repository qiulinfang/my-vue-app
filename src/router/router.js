import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import Dashboard from "../views/Dashboard.vue"; // 假设这是你的首页组件
import Users from "../views/Users.vue"; // 用户管理页面组件
import duanju from "../views/DuanJu.vue";
import ParentComponent from "../views/setting/ParentComponent.vue";
import extralist from "../views/extralist.vue";

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
    component: duanju
  },
  {
    path: '/settings',
    name: 'settings',
    component: ParentComponent
  },
  {
    path: '/extralist',
    name: 'extralist',
    component: extralist
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
