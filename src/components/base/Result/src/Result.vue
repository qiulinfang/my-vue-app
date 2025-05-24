<template>
    <div>
      <h1>嵌套表单校验</h1>
      <ValidatableComponent ref="topComponentRef" :data-source="initialData" :is-nested="false" />
      <el-button type="primary" @click="handleSubmit" style="margin-top: 20px;">
        全部校验并提交
      </el-button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import ValidatableComponent from './ValidatableComponent.vue';
  import { ElMessage } from 'element-plus';
  
  const topComponentRef = ref<InstanceType<typeof ValidatableComponent> | null>(null);
  
  const initialData = ref({
    fieldX: '', // 顶层组件的表单字段
    tableItems: [ // 顶层组件的表格数据
      { id: 'top-row1', name: '顶层行1', nestedData: { tableItems: [{ id: 'top-row1-sub1', name: '顶层行1-子行1' }] } },
      { id: 'top-row2', name: '顶层行2', nestedData: { tableItems: [] } }, // 可能没有更深层嵌套
    ]
  });
  
  const handleSubmit = async () => {
    if (topComponentRef.value) {
      console.log("--- [TopLevelForm] 开始全局校验 ---");
      const isValid = await topComponentRef.value.validate();
      if (isValid) {
        ElMessage.success('所有表单校验通过！准备提交...');
        console.log("--- [TopLevelForm] 模拟提交数据 ---");
        // 提交逻辑
      } else {
        ElMessage.error('表单校验失败，请检查错误项！');
        console.error("--- [TopLevelForm] 表单校验失败 ---");
      }
    }
  };
  </script>
  