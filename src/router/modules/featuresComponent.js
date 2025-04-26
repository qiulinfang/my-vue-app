// src/router/modules/components.js
import Layout from '@/components/layout/Layout/src/Layout.vue'; // Your main layout component

const componentsRouter = {
  path: '/featuresComponents', // Base path for component examples
  component: Layout,
  name: 'featuresComponents', // Unique route name
  // Redirect to the first component example or an overview page if you create one
  redirect: '/components/button',
  meta: {
    title: '特色组件', // Title in the sidebar
    icon: 'Menu',      // Choose an Element Plus icon
    alwaysShow: true   // Ensure this top-level menu is always visible
  },
  children: [
    {
        path: 'extralist', // 路径通常使用小写
        name: 'ExtraListExample', // 组件名称 + Example
        component: () => import('@/views/components/ExtraListExample.vue'), // 假设组件文件名为 ExtraListExample.vue
        meta: { title: 'ExtraList 附加列表' } // 根据组件功能填写中文标题
      },
      {
        path: 'langselect',
        name: 'LangSelectExample',
        component: () => import('@/views/components/LangSelectExample.vue'), // 假设组件文件名为 LangSelectExample.vue
        meta: { title: 'LangSelect 语言选择' }
      },
      {
        path: 'multilang',
        name: 'MultiLangExample',
        component: () => import('@/views/components/MultiLangExample.vue'), // 假设组件文件名为 MultiLangExample.vue
        meta: { title: 'MultiLang 多语言' } // 或者 '多语言切换'
      }
    // ... Add more custom component examples if needed
  ]
};

export default componentsRouter;