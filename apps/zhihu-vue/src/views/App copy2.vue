<template>
  <main>
    <h1>Pinia 待办事项</h1>
    
    <TodoForm />
    <TodoList />

  </main>
</template>

<script setup lang="ts">
import TodoForm from '../components/TodoForm.vue';
import TodoList from '../components/TodoList.vue';
</script>

<style>
main {
  max-width: 560px;
  margin: 2rem auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
}
h1 {
  text-align: center;
  color: #42b983;
}
</style>