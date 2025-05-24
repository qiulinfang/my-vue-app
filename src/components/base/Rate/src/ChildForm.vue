<template>
    <div class="child-form-container">
      <h4>子表单 ID: {{ id }}</h4>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-position="top"
        status-icon
      >
        <el-form-item :label="`子组件 ${id} 字段`" prop="childField">
          <el-input v-model="formData.childField" :placeholder="`输入子组件 ${id} 内容`" />
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, defineProps, defineExpose, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { ElMessage } from 'element-plus';
  
  const props = defineProps<{
    id: string;
  }>();
  
  const formRef = ref<FormInstance>();
  const formData = reactive({
    childField: '',
  });
  
  const rules = reactive<FormRules>({
    childField: [
      { required: true, message: `子组件 ${props.id} 的字段不能为空`, trigger: 'blur' },
    ],
  });
  
  const validate = async (): Promise<boolean> => {
    if (!formRef.value) return false;
    console.log(`[ChildForm ${props.id}] 开始校验...`);
    try {
      await formRef.value.validate();
      console.log(`[ChildForm ${props.id}] 校验通过`);
      return true;
    } catch (invalidFields) {
      console.warn(`[ChildForm ${props.id}] 校验失败:`, invalidFields);
      ElMessage({
          message: `子表单 ${props.id} 校验失败，正在定位...`,
          type: 'warning',
          duration: 1500,
      });
  
      // 为了演示效果，增加一个微小的延迟
      // 在实际应用中，这个延迟通常不需要
      // await new Promise(resolve => setTimeout(resolve, 50)); // 演示用延迟
  
      const firstErrorProp = Object.keys(invalidFields as Record<string, any>)[0];
      if (firstErrorProp) {
        console.log(`[ChildForm ${props.id}] 滚动到错误字段: ${firstErrorProp}`);
        formRef.value.scrollToField(firstErrorProp);
        // 使滚动效果更明显，确保元素在视口中
        await nextTick();
        const el = (formRef.value.$el as HTMLElement).querySelector(`[prop="${firstErrorProp}"] .el-input__inner`);
        if (el) (el as HTMLElement).focus({ preventScroll: true }); // 尝试聚焦但不触发额外滚动
      }
      return false;
    }
  };
  
  defineExpose({
    validate,
  });
  </script>
  
  <style scoped>
  .child-form-container {
    border: 1px dashed #909399;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  h4 {
    margin-top: 0;
    color: #303133;
  }
  </style>