<template>
  <div>
    <h1>用户详情页</h1>
    <p>当前查看的用户 ID 是：<strong>{{ userId }}</strong></p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const userId = computed(() => route.params.id);
</script>