<template>
  <div id="app">
    <header class="app-header">
      <h1>水果网店</h1>
      <div class="cart-info">购物车 ({{ cartItemCount }})</div>
    </header>
    <main class="app-content">
      <ProductList />
      <ShoppingCart />
    </main>
  </div>
</template>

<script setup lang="ts">
// 1. 导入 vue 的 computed
import { computed } from 'vue';
// 2. 导入我们自己创建的、类型化的 useStore hook
import { useStore } from './vuex'; // @ 是 src 目录的别名，这是标准配置

// 导入子组件
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

// 3. 获取类型化的 store 实例
const store = useStore();

// 4. 访问命名空间下的 getter
// 正确的路径是 '模块名/getter名'
const cartItemCount = computed(() => store.getters['cart/cartItemCount']);
</script>

<style>
/* 样式部分保持不变 */
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  background-color: #f0f2f5;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.cart-info {
  font-weight: bold;
}

.app-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
</style>