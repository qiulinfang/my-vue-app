<template>
  <div class="main-editor">
    <h3>正在编辑文档 #{{ $route.params.id }}</h3>
    <textarea v-model="content" placeholder="在这里输入内容..."></textarea>
    <br>
    <button @click="save">保存</button>
    <p v-if="!isDirty" style="color: green;">所有更改已保存</p>
    <p v-if="isDirty" style="color: orange;">有未保存的更改！</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const content = ref('');
const isDirty = ref(false); // 用于标记是否有未保存的更改

// 监视 content 的变化，一旦变化就将 isDirty 设为 true
watch(content, () => {
  isDirty.value = true;
});

function save() {
  console.log('保存内容:', content.value);
  isDirty.value = false;
  alert('内容已保存！');
}

// --- 这就是组件内的导航守卫 ---
onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value) {
    const answer = window.confirm(
      '您有未保存的更改！确定要离开吗？'
    );
    // 如果用户点击“取消”，则阻止导航
    if (!answer) {
      next(false);
    } else {
      next(); // 否则，允许导航
    }
  } else {
    next(); // 如果没有未保存的更改，直接允许导航
  }
});
</script>