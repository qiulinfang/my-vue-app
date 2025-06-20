<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input
      type="text"
      v-model="newTodoText"
      placeholder="想做点什么？"
    />
    <button type="submit">添加</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../pinia/todo';

// 使用 ref 来处理表单输入
const newTodoText = ref('');
// 获取 todo store 实例
const todoStore = useTodoStore();

function handleSubmit() {
  // 调用 store 的 action 来添加新事项
  todoStore.addTodo(newTodoText.value);
  // 清空输入框
  newTodoText.value = '';
}
</script>

<style scoped>
.todo-form {
  display: flex;
  margin-bottom: 1.5rem;
}
input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>