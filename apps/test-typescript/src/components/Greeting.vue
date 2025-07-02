<script setup lang="ts">
import { ref } from 'vue'

// 1. 使用 defineProps 定义带有类型的 props
// 这里定义了一个必需的 'name' prop，类型为 string
const props = defineProps<{
  name: string
  initialEnthusiasm?: number // '?' 表示这是一个可选的 prop
}>()

// 2. 使用 defineEmits 定义带有类型的事件
const emit = defineEmits<{
  (e: 'sayHello', message: string): void
}>()

// 3. 使用 ref 创建响应式变量，TypeScript 会自动推断其类型为 number
const enthusiasmLevel = ref(props.initialEnthusiasm || 1)

// 4. 定义一个方法
const greet = () => {
  const message = `Hello, ${props.name}! Your enthusiasm level is ${enthusiasmLevel.value}.`
  alert(message)
  // 5. 触发一个带参数的事件
  emit('sayHello', message)
}

const addEnthusiasm = () => {
  enthusiasmLevel.value++
}
</script>

<template>
  <div class="greeting-card">
    <p>
      Message for <strong>{{ props.name }}</strong>
    </p>
    <p>Enthusiasm: {{ enthusiasmLevel }}</p>
    <button @click="greet">Say Hello</button>
    <button @click="addEnthusiasm">Add Enthusiasm</button>
  </div>
</template>

<style scoped>
.greeting-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
button {
  margin-right: 0.5rem;
}
</style>