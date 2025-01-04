<template>
  <button @click="show = !show" v-wave class="wave-button">Toggle</button>
  <Transition name="slide-fade">
    <p v-if="show">hello</p>
  </Transition>
  <input v-focus type="text" placeholder="Enter text" />
</template>

<script setup>
import { ref } from "vue";

const show = ref(false);
</script>

<style>
/* 进入动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.wave-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #6200ea;
  color: white;
  position: relative;
  overflow: hidden;
}
</style>
