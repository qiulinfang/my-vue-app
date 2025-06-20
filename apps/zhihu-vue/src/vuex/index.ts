import { createStore, Store } from 'vuex';
import type { InjectionKey } from 'vue';
import type { RootState } from './types';

import productsModule from './modules/products';
import cartModule from './modules/cart';

// 1. 定义 InjectionKey，它会作为 provide 和 inject 的键。
//    这是 Vuex 官方推荐的 TypeScript 实践。
export const key: InjectionKey<Store<RootState>> = Symbol();

// 2. 创建 store 实例
export const store = createStore<RootState>({
  // 在严格模式下，任何未在 mutation 函数中修改 state 的操作都会抛出错误
  modules: {
    products: productsModule,
    cart: cartModule,
  },
});

// 3. 定义你自己的 `useStore` 组合式函数
//    这样，当你在组件中调用 useStore 时，它会返回一个完全类型化的 store。
export function useStore() {
  return baseUseStore(key);
}

// Vuex 并没有导出这个函数，所以我们需要自己从 vuex 中“借用”它的类型
// 或者直接使用官方的 useStore(key)
import { useStore as baseUseStore } from 'vuex';