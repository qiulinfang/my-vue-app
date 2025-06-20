<template>
  <div class="todo-list">
    <h3>待办 ({{ incompleteTodos.length }})</h3>
    <ul>
      <li v-for="todo in incompleteTodos" :key="todo.id" class="todo-item">
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">X</button>
      </li>
    </ul>

    <h3>已完成 ({{ completedTodos.length }})</h3>
    <ul>
      <li v-for="todo in completedTodos" :key="todo.id" class="todo-item">
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../pinia/todo';

const todoStore = useTodoStore();

// 使用 storeToRefs 来解构 getters，保持其响应性
const { completedTodos, incompleteTodos } = storeToRefs(todoStore);

// 直接解构 actions，因为它们是普通函数
const { toggleTodo, removeTodo } = todoStore;
</script>

<style scoped>
.todo-list h3 {
  margin-top: 1.5rem;
}
ul {
  list-style: none;
  padding: 0;
}
.todo-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.todo-item span {
  flex-grow: 1;
  margin-left: 0.5rem;
}
.todo-item.completed span, .completed {
  text-decoration: line-through;
  color: #aaa;
}
.todo-item button {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-weight: bold;
}
</style>