<template>
  <div class="shopping-cart">
    <h2>我的购物车</h2>

    <div v-if="cartItems.length === 0" class="empty-cart-message">
      购物车是空的，快去添加商品吧！
    </div>

    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <span class="item-name">{{ item.name }} x {{ item.quantity }}</span>
          <span class="item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
          <button @click="handleRemove(item.id)" class="remove-button">移除</button>
        </li>
      </ul>
      <hr />
      <div class="total-price">
        <h3>总价: ¥{{ totalPrice }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// 确保这里的路径是正确的，相对于你当前文件的位置
import { useStore } from '../vuex'; 

const store = useStore();

// store.state.cart.items 会被推断为 CartItem[]
const cartItems = computed(() => store.state.cart.items);

// store.getters['cart/cartTotalPrice'] 会被推断为 string
const totalPrice = computed(() => store.getters['cart/cartTotalPrice']);

// productId 参数会被检查，必须是 number 类型
function handleRemove(productId: number) {
  store.dispatch('cart/removeFromCart', productId);
}
</script>

<style scoped>
.shopping-cart {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  min-height: 200px;
}

h2 {
  margin-top: 0;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #42b983;
}

.empty-cart-message {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0.25rem;
  border-bottom: 1px solid #eee;
}

.item-name {
  font-weight: 500;
}

.item-price {
  color: #555;
  font-family: monospace;
}

.remove-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-button:hover {
  background-color: #d32f2f;
}

hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1rem 0;
}

.total-price {
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  color: #d32f2f;
}

.total-price h3 {
  margin: 0;
}
</style>