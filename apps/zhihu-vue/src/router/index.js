import { createRouter, createWebHistory } from "vue-router";
// 注意：我们不再在顶部静态导入所有组件
import { getPostById,getArticleById } from '../api'; // 导入我们模拟的 API

const routes = [
  {
    path: "/",
    name: "home",
    // 懒加载语法：只有在访问时才会加载组件代码
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import("../views/UserView.vue"),
  },
  // --- 这是我们新增的嵌套路由 ---
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { requiresAuth: true }, // <--- 添加这行，标记此路由需要认证
    component: () => import("../views/DashboardView.vue"),
    // children 数组定义了嵌套的子路由
    children: [
      {
        // 当访问 /dashboard 时，默认重定向到个人资料页
        path: "",
        redirect: "/dashboard/profile",
      },
      {
        // 子路由的 path 不需要以 / 开头
        // 它会自动拼接在父路径之后，形成 /dashboard/profile
        path: "profile",
        name: "dashboard-profile",
        component: () => import("../views/ProfileView.vue"),
      },
      {
        path: "settings",
        name: "dashboard-settings",
        component: () => import("../views/SettingsView.vue"),
      },
    ],
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue')
  },
  {
    path: '/blog/:id',
    name: 'blog-post',
    component: () => import('../views/BlogPostView.vue'),
    // 这是一个非常优雅的数据获取模式
    // 1. 在导航守卫中获取数据
    beforeEnter: async (to, from, next) => {
      try {
        const post = await getPostById(to.params.id);
        // 2. 将获取到的数据附加到路由的 meta 字段
        to.meta.post = post;
        next();
      } catch (error) {
        console.error(error);
        // 如果文章不存在，可以导航到 404 页面
        // 为了简单，我们暂时只阻止导航
        next(false); 
      }
    },
    // 3. 通过 props 的函数模式，将 meta 中的数据作为 prop 传递给组件
    props: route => ({ post: route.meta.post })
  },
  {
    path: '/document/:id',
    name: 'document',
    // 父组件是我们的布局组件
    component: () => import('../views/DocumentLayout.vue'),
    // 子路由使用 components (复数) 对象来定义命名视图
    children: [
      {
        path: '', // 匹配 /document/:id 本身
        name: 'document-view',
        // 定义每个命名视图应该渲染哪个组件
        components: {
          main: () => import('../views/DocumentEditor.vue'),
          sidebar: () => import('../views/DocumentInfo.vue')
        }
      }
    ]
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('../views/ArticleView.vue'),
    meta: {
      requiresAuth: true, // 需要登录 (由 beforeEach 检查)
      title: '文章详情'
    },
    // --- 路由独享守卫: beforeEnter ---
    beforeEnter: async (to, from, next) => {
      console.log('2. Route beforeEnter: 路由独享守卫');
      const userJson = localStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      if (user && user.isSubscriber) {
        console.log('   - 身份验证: 是订阅会员，允许进入');
        try {
          // 获取核心数据，并附加到 meta 上
          to.meta.articleData = await getArticleById(to.params.id);
          next();
        } catch (e) {
          next('/404'); // 文章不存在
        }
      } else {
        console.log('   - 身份验证: 非订阅会员，导航中断');
        alert('抱歉，只有订阅会员才能阅读文章！');
        next(false); // 中断导航
      }
    },
    // 将守卫中获取的数据通过 props 传递给组件
    props: route => ({ article: route.meta.articleData })
  },
    {
    // 使用带参数的正则表达式，匹配所有路径
    // :pathMatch 是参数名，(.*)* 是正则，表示匹配任何字符零次或多次
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
    scrollBehavior(to, from, savedPosition) {
    // 如果 savedPosition 存在，说明是通过浏览器的“前进/后退”按钮触发的
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否则，对于所有新的导航，都滚动到页面顶部
      return { top: 0 };
    }
  },
});

// --- 1. 全局前置守卫: beforeEach ---
router.beforeEach((to, from, next) => {
  console.log('1. Global beforeEach: 全局前置守卫');
  const isLoggedIn = !!localStorage.getItem('user');
  if (to.meta.requiresAuth && !isLoggedIn) {
    console.log('   - 身份验证: 未登录，重定向到首页');
    next('/');
  } else {
    next();
  }
});

// --- 2. 全局解析守卫: beforeResolve ---
router.beforeResolve((to, from, next) => {
  console.log('3. Global beforeResolve: 全局解析守卫');
  console.log('   - 此时异步组件已加载，组件内守卫(beforeRouteEnter)已执行');
  next();
});

// --- 3. 全局后置钩子: afterEach ---
router.afterEach((to, from) => {
  console.log('4. Global afterEach: 全局后置钩子');
  const siteTitle = '我的Vue应用';
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${siteTitle}`;
  } else {
    document.title = siteTitle;
  }
});


export default router;
