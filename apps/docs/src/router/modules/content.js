// src/router/modules/content.js
import Layout from 'myComponent';

const contentRouter = {
  path: '/content',
  component: Layout,
  name: 'Content',
  redirect: '/content/articles',
  meta: { title: '内容管理', icon: 'Document' },
  children: [
    {
      path: 'articles', // /content/articles
      name: 'ArticleList',
      component: () => import('@/views/content/Articles.vue'), // 假设存在
      meta: { title: '文章列表' }
    },
    {
      path: 'categories', // /content/categories
      name: 'ContentCategories',
      component: () => import('@/views/content/Categories.vue'), // 假设存在
      meta: { title: '内容分类' }
    },
    {
      path: 'tags', // /content/tags
      name: 'ContentTags',
      component: () => import('@/views/content/Tags.vue'), // 假设存在
      meta: { title: '标签管理' }
    }
  ]
};

export default contentRouter;