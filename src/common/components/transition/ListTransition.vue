<template>
    <TransitionGroup
      name="list"
      tag="ul"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <li
        v-for="(item, index) in items"
        :key="item.id"
        :data-index="index"
        class="list-item"
      >
        {{ item.text }}
      </li>
    </TransitionGroup>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 接收 items 作为 props
  const props = defineProps({
    items: {
      type: Array,
      required: true
    }
  });
  
  // 进入前的状态：透明并且向下偏移
  const onBeforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
  };
  
  // 进入时的动画：过渡至透明度 1 和位移 0
  const onEnter = (el, done) => {
    el.offsetHeight; // 强制重绘，以确保动画能够触发
    el.style.transition = 'all 0.5s ease';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
    done();
  };
  
  // 离开时的动画：透明度变为 0 并向下偏移
  const onLeave = (el, done) => {
    el.style.transition = 'all 0.5s ease';
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    done();
  };
  </script>
  
  <style scoped>
  .list-item {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  </style>
  