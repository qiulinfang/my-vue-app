// src/components/layout/Link.vue
<template>
  <component :is="linkComponent" v-bind="linkProps(to)">
    <slot /> </component>
</template>

<script setup>
import { computed } from 'vue';
import { isExternal } from '@/utils/validate'; // 引入外部链接判断函数

const props = defineProps({
  to: {
    type: String,
    required: true
  }
});

// 判断链接类型，决定使用哪个组件
const linkComponent = computed(() => {
  if (isExternal(props.to)) {
    return 'a'; // 外部链接使用 <a> 标签
  }
  return 'router-link'; // 内部链接使用 <router-link>
});

// 根据链接类型生成不同的 props
function linkProps(to) {
  if (isExternal(to)) {
    return {
      href: to,
      target: '_blank', // 在新标签页打开
      rel: 'noopener'  // 安全性考虑
    };
  }
  return {
    to: to // router-link 需要 'to' prop
  };
}
</script>