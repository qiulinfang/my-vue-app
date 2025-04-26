// src/router/modules/products.js
import Layout from '@/components/layout/Layout/src/Layout.vue';

const productsRouter = {
  path: '/products',
  component: Layout,
  name: 'Products',
  redirect: '/products/list',
  meta: { title: '商品中心', icon: 'Goods' },
  children: [
    {
      path: 'list', // /products/list
      name: 'ProductList',
      component: () => import('@/views/products/List.vue'), // 假设存在
      meta: { title: '商品列表' }
    },
    {
      path: 'categories', // /products/categories
      name: 'ProductCategories',
      component: () => import('@/views/products/Categories.vue'), // 假设存在
      meta: { title: '商品分类' }
    },
    {
      path: 'brands', // /products/brands
      name: 'ProductBrands',
      component: () => import('@/views/products/Brands.vue'), // 假设存在
      meta: { title: '品牌管理' }
    },
    {
      path: 'detail/:id(\\d+)', // /products/detail/123
      name: 'ProductDetail',
      component: () => import('@/views/products/Detail.vue'), // 假设存在
      meta: { title: '商品详情', hidden: true, activeMenu: '/products/list' } // 详情页通常隐藏，并指定高亮哪个菜单
    }
  ]
};

export default productsRouter;