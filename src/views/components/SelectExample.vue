<template>
  <div>
    <h1>My Select Component Demo (JavaScript)</h1>
    <MySelect
      v-model="selectedValue"
      :options="selectOptions"
      placeholder="选择一个水果"
      style="margin-bottom: 20px;"
    />
    <p>Selected Value: {{ selectedValue }}</p>

    <MySelect
      v-model="disabledValue"
      :options="selectOptions"
      placeholder="禁用的选择器"
      disabled
    />
     <p>Disabled Value: {{ disabledValue }}</p>

     <div v-for="i in 100" :key="i">{{i}}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {MySelect} from 'myComponent'

const selectedValue = ref(null) // 初始值设为 null
const disabledValue = ref('banana')

const selectOptions = ref([
  { label: '苹果 (Apple)', value: 'apple' },
  { label: '香蕉 (Banana)', value: 'banana' },
  { label: '橙子 (Orange)', value: 'orange' },
  { label: '芒果 (Mango)', value: 'mango', disabled: true },
  { label: '葡萄 (Grape)', value: 'grape' },
])
</script>

<style>
/* 样式与之前 TypeScript 版本相同 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}
</style>
