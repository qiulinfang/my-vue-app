// src/router/modules/products.js
import Layout from 'myComponent';

const productsRouter = {
  path: '/products',
  component: Layout,
  name: 'Products',
  redirect: '/products/list',
  meta: { title: '商品中心', icon: 'Goods' },
  children: [
    {
      path: 'ProductList', // /products/list
      name: 'ProductList',
      component: () => import('@/views/products/ProductList.vue'), // 假设存在
      meta: { title: '商品列表' }
    },
    {
      path: 'ProductCategories', // /products/categories
      name: 'ProductCategories',
      component: () => import('@/views/products/Categories.vue'), // 假设存在
      meta: { title: '商品分类' }
    },
    {
      path: 'ProductBrands', // /products/brands
      name: 'ProductBrands',
      component: () => import('@/views/products/Brands.vue'), // 假设存在
      meta: { title: '品牌管理' }
    },
  ]
};

export default productsRouter;