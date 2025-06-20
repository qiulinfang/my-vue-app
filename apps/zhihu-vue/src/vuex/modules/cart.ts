import type { Module } from 'vuex';
import type { CartState, RootState, Product, CartItem } from '../types';

const cartModule: Module<CartState, RootState> = {
  namespaced: true,

  state: () => ({
    items: [],
  }),

  getters: {
    cartTotalPrice: (state): string => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    },
    cartItemCount: (state): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },

  mutations: {
    ADD_TO_CART(state, product: Product) {
      state.items.push({ ...product, quantity: 1 });
    },
    INCREMENT_ITEM_QUANTITY(state, cartItem: CartItem) {
      const item = state.items.find(i => i.id === cartItem.id);
      if (item) {
        item.quantity++;
      }
    },
    REMOVE_FROM_CART(state, productId: number) {
      state.items = state.items.filter(item => item.id !== productId);
    },
  },

  actions: {
    addProductToCart({ state, commit }, product: Product) {
      const cartItem = state.items.find(item => item.id === product.id);
      if (cartItem) {
        commit('INCREMENT_ITEM_QUANTITY', cartItem);
      } else {
        commit('ADD_TO_CART', product);
      }
    },
    removeFromCart({ commit }, productId: number) {
      commit('REMOVE_FROM_CART', productId);
    },
  },
};

export default cartModule;