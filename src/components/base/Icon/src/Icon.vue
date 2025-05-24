<template>
  <div>
    <h4>useGeolocation 示例</h4>
    <p v-if="!isSupported">你的浏览器不支持地理位置 API。</p>
    <div v-else>
      <p v-if="error">错误: {{ error.message }}</p>
      <div v-else-if="coords.latitude !== Infinity"> <p>纬度: {{ coords.latitude }}</p>
        <p>经度: {{ coords.longitude }}</p>
        <p>精度: {{ coords.accuracy }} 米</p>
        <p>获取于: {{ locatedAt ? new Date(locatedAt).toLocaleTimeString() : 'N/A' }}</p>
        <button @click="pause" v-if="isActive">暂停监听</button>
        <button @click="resume" v-if="!isActive">恢复监听</button>
      </div>
      <p v-else>正在获取位置...</p>
    </div>
  </div>
</template>

<script setup>
import { useGeolocation } from '@vueuse/core';
import { computed } from 'vue';

const { coords, locatedAt, error, isSupported, resume, pause } = useGeolocation({ immediate: true, watch: true });

// isActive 通常需要自己根据 pause/resume 状态管理，或者检查 locatedAt 是否变化
// VueUse v10+ useGeolocation 返回 isTracking ref
// const isActive = ref(true); // 简单示例
// function doPause() { pause(); isActive.value = false; }
// function doResume() { resume(); isActive.value = true; }
// 假设 VueUse v10+, 它会有一个 isTracking ref
// const { coords, locatedAt, error, isSupported, resume, pause, isTracking as isActive } = useGeolocation();
// 临时模拟 isActive
const isActive = computed(() => locatedAt.value !== null && !error.value);


</script>
