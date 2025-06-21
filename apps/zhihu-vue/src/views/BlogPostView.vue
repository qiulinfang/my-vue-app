<template>
  <div>
    <router-link to="/blog">&lt; 返回列表</router-link>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>文章 ID: {{ post.id }}</p>
      <hr>
      <article>{{ post.content }}</article>
    </div>
    <div v-else>
      <p>文章加载中或未找到...</p>
    </div>
  </div>
</template>

<script setup>
// 组件通过 props 接收数据，与路由完全解耦
defineProps({
  post: Object
});
</script>