<script setup lang="ts">
// 1. 导入你的新组件
import Greeting from '../components/Greeting.vue'

// 2. 定义一个处理事件的方法
const handleHello = (message: string) => {
  console.log('Event received from Greeting component:', message)
}
</script>

<template>
  <main>
    <h1>Welcome to Your Vue + TS App</h1>
    
    <Greeting name="TypeScript" :initial-enthusiasm="5" @say-hello="handleHello" />
    
    <Greeting name="Vue" />
  </main>
</template>