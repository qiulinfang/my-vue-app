// src/router/modules/external.js
import {Layout }from 'myComponent';

const externalLinksRouter = {
  path: '/external-links', // 使用一个路径来组织它们
  component: Layout,
  name: 'ExternalLinks',
  // 如果不希望 '外部链接' 本身可点击，可以不设 redirect，或者也设置 alwaysShow
  meta: { title: '外部链接', icon: 'Link', /* alwaysShow: true */ },
  children: [
    {
      path: 'https://element-plus.org/',
      name: 'ElementPlusExternal',
      meta: { title: 'Element Plus 官网', icon: 'Link' } // 图标可以放子级
      // component 不需要，导航会由 SidebarItem 或 AppLink 处理
    },
    {
      path: 'https://vuejs.org/',
      name: 'VueJsExternal',
      meta: { title: 'Vue.js 官网', icon: 'Link' }
    }
  ]
};

export default externalLinksRouter;