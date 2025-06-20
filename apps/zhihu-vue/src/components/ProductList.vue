<template>
  <div class="product-list">
    <h2>在售水果</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        <span>{{ product.name }} - ¥{{ product.price.toFixed(2) }}</span>
        <button @click="handleAddToCart(product)">添加到购物车</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
// 导入我们自己创建的 useStore hook
import { useStore } from '../vuex';
import type { Product } from '../vuex/types';

// store 实例现在是完全类型化的！
const store = useStore();

// store.state.products.items 会被自动推断为 Product[] 类型
const products = computed(() => store.state.products.items);

// product 参数会被检查，必须是 Product 类型
function handleAddToCart(product: Product) {
  // dispatch 的载荷也会被类型检查
  store.dispatch('cart/addProductToCart', product);
}

onMounted(() => {
  store.dispatch('products/fetchProducts');
});
</script>