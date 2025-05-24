<template>
  <div class="jitter-demo-page">
    <h1>表单校验“抖动”演示</h1>
    <p>
      点击“全部校验”按钮。如果所有表单（父表单和两个子表单）的字段都为空，
      您可能会观察到页面先滚动到子表单1的错误，然后是子表单2的错误，最后滚动到父表单的错误。
      （为了演示效果，已加入微小延时，实际项目中可能非常迅速）。
    </p>

    <el-divider content-position="left">父表单</el-divider>
    <el-form
      ref="parentFormRef"
      :model="parentFormData"
      :rules="parentFormRules"
      label-position="top"
      status-icon
      class="parent-form-section"
    >
      <el-form-item label="父表单字段" prop="parentField">
        <el-input v-model="parentFormData.parentField" placeholder="输入父表单内容" />
      </el-form-item>
    </el-form>
    <div v-for="i in 5" :key="i">{{i}}</div>
    <div v-for="i in 5" :key="i">{{i}}</div>
    <div v-for="i in 5" :key="i">{{i}}</div>
    <div v-for="i in 5" :key="i">{{i}}</div>
    <el-divider content-position="left">子表单区域</el-divider>
    <child-form ref="child1Ref" id="C1" />
    <div v-for="i in 5" :key="i">{{i}}</div>
    <div v-for="i in 5" :key="i">{{i}}</div>
    <div v-for="i in 5" :key="i">{{i}}</div>
    <div v-for="i in 5" :key="i">{{i}}</div>
    <div style="height: 50px;"></div> <child-form ref="child2Ref" id="C2" />
    <div style="height: 50px;"></div> <el-button type="primary" @click="validateAll" :loading="loading">
      全部校验
    </el-button>
    <el-button @click="resetForms">重置所有表单</el-button>

    <div style="height: 300px;"></div> </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import ChildForm from './ChildForm.vue'; // 假设 ChildForm.vue 在同一目录下
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

interface ChildFormComponentExposed {
  validate: () => Promise<boolean>;
}

const parentFormRef = ref<FormInstance>();
const child1Ref = ref<ChildFormComponentExposed | null>(null);
const child2Ref = ref<ChildFormComponentExposed | null>(null);
const loading = ref(false);

const parentFormData = reactive({
  parentField: '',
});

const parentFormRules = reactive<FormRules>({
  parentField: [{ required: true, message: '父表单的字段不能为空', trigger: 'blur' }],
});

let firstParentErrorProp: string | null = null;

const validateAll = async () => {
  loading.value = true;
  console.log("--- [Parent] 开始全局校验 ---");
  firstParentErrorProp = null; // 重置
  let isParentFormValid = true;

  // 1. 校验父表单自身
  if (parentFormRef.value) {
    try {
      await parentFormRef.value.validate();
      console.log("[Parent] 父表单自身校验通过");
    } catch (invalidFields) {
      isParentFormValid = false;
      firstParentErrorProp = Object.keys(invalidFields as Record<string, any>)[0];
      console.warn(`[Parent] 父表单自身校验失败. 第一个错误字段: ${firstParentErrorProp}`);
      // 父表单的滚动会放在所有子表单校验之后执行
    }
  }

  // 2. 校验子表单
  const childValidationPromises: Promise<boolean>[] = [];
  if (child1Ref.value) {
    console.log("[Parent] 准备校验 ChildForm C1");
    childValidationPromises.push(child1Ref.value.validate());
  }
  if (child2Ref.value) {
    console.log("[Parent] 准备校验 ChildForm C2");
    childValidationPromises.push(child2Ref.value.validate());
  }

  const childResults = await Promise.all(childValidationPromises);
  const allChildrenValid = childResults.every(isValid => isValid);
  console.log(`[Parent] 所有子表单校验完成. 结果: ${allChildrenValid ? '通过' : '失败'}`);


  const overallValid = isParentFormValid && allChildrenValid;

  if (!overallValid) {
    console.warn("[Parent] 整体校验失败");
    ElMessage.error('整体表单校验失败，请检查所有错误项！');

    // 如果父表单之前校验失败，现在执行滚动
    if (firstParentErrorProp && parentFormRef.value) {
      ElMessage({
        message: `父表单校验失败，正在定位...`,
        type: 'warning',
        duration: 1500,
      });
      // 为了演示效果，增加一个微小的延迟
      // 在实际应用中，这个延迟通常不需要
      await new Promise(resolve => setTimeout(resolve, 100)); // 演示用延迟

      console.log(`[Parent] 滚动到父表单的错误字段: ${firstParentErrorProp}`);
      parentFormRef.value.scrollToField(firstParentErrorProp);
      // 使滚动效果更明显
      await nextTick();
      const el = (parentFormRef.value.$el as HTMLElement).querySelector(`[prop="${firstParentErrorProp}"] .el-input__inner`);
      if (el) (el as HTMLElement).focus({ preventScroll: true });
    }
  } else {
    console.log("[Parent] 整体校验通过!");
    ElMessage.success('所有表单均校验通过！');
  }
  loading.value = false;
};

const resetForms = () => {
  parentFormRef.value?.resetFields();
  parentFormData.parentField = ''; // ElForm 的 resetFields 可能不会清空 v-model绑定的非prop数据
  // 通常子组件也需要暴露一个 reset 方法
  // 这里简单地清空演示数据 (实际项目中子组件应自己管理重置)
  if (child1Ref.value && (child1Ref.value as any).formData) { // 简陋的访问方式，仅为演示
      (child1Ref.value as any).formData.childField = '';
      (child1Ref.value as any).formRef?.clearValidate();
  }
   if (child2Ref.value && (child2Ref.value as any).formData) { // 简陋的访问方式，仅为演示
      (child2Ref.value as any).formData.childField = '';
      (child2Ref.value as any).formRef?.clearValidate();
  }
  ElMessage.info('表单已重置 (简化版)');
};

</script>

<style scoped>
.jitter-demo-page {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  font-family: sans-serif;
}
.parent-form-section {
  border: 1px solid #409EFF;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: #ecf5ff;
}
h1 { color: #303133; }
p { color: #606266; line-height: 1.6; }
</style>