import type { Module } from 'vuex';
import type { ProductsState, RootState, Product } from '../types';

// 模拟的 API 调用
const fetchProductsFromApi = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '苹果', price: 5.50 },
        { id: 2, name: '香蕉', price: 3.80 },
        { id: 3, name: '橙子', price: 6.20 },
        { id: 4, name: '草莓', price: 12.00 }
      ]);
    }, 500);
  });
};

// 使用 Module<S, R> 类型
// S = 当前模块的 State 类型 (ProductsState)
// R = 根 State 类型 (RootState)
const productsModule: Module<ProductsState, RootState> = {
  namespaced: true,

  state: () => ({
    items: [],
  }),

  mutations: {
    // 为 payload 添加类型
    SET_PRODUCTS(state, products: Product[]) {
      state.items = products;
    },
  },

  actions: {
    // context 的类型会被自动推断出来
    async fetchProducts({ commit }) {
      console.log('Fetching products...');
      const products = await fetchProductsFromApi();
      commit('SET_PRODUCTS', products);
    },
  },
};

export default productsModule;