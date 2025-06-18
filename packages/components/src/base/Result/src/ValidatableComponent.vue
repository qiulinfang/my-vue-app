<template>
  <div>
    <el-form ref="ownFormRef" :model="ownFormData" :rules="ownFormRules">
      <el-form-item label="字段X" prop="fieldX">
        <el-input v-model="ownFormData.fieldX" />
      </el-form-item>
    </el-form>
    <pre>Debug: expandedRowKeys = {{ expandedRowKeys }}</pre>
    <el-table
      v-if="hasTable"
      :data="tableData"
      row-key="id"
      ref="tableRef"
      :expand-row-keys="expandedRowKeys"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="expand">
        <template #default="props">
          <ValidatableComponent
            :ref="(el) => setExpandedComponentRef(props.row.id, el)"
            :data-source="props.row.nestedData"
            :is-nested="true"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose, defineAsyncComponent, nextTick, watch } from "vue";
import type { FormInstance, ElTable } from "element-plus";

// 为了处理循环引用/递归组件，可以使用 defineAsyncComponent
const ValidatableComponent = defineAsyncComponent(() => import("./ValidatableComponent.vue"));

const props = defineProps<{
  dataSource?: any; // 当前组件的数据源
  isNested?: boolean; // 标识是否为嵌套组件
}>();

// A. 自身表单逻辑 (如果存在)
const ownFormRef = ref<FormInstance>();
const ownFormData = reactive({ fieldX: "" });
const ownFormRules = { fieldX: [{ required: true, message: "字段X必填", trigger: "blur" }] };

// B. 表格及其展开行逻辑 (如果存在)
const hasTable = ref(true); // 假设所有组件都可能包含表格用于演示
const tableRef = ref<InstanceType<typeof ElTable>>();
const tableData = reactive(
  props.dataSource?.tableItems || [
    // 示例数据
    { id: "row1", name: "行1", nestedData: { tableItems: [{ id: "row1-1", name: "嵌套行1-1" }] } },
    { id: "row2", name: "行2", nestedData: { tableItems: [{ id: "row2-1", name: "嵌套行2-1" }] } },
  ]
);
const expandedRowKeys = ref<string[]>([]); // 控制哪些行是展开的

// 存储展开行中动态创建的 ValidatableComponent 的引用
const expandedComponentRefs = ref<Map<string, InstanceType<typeof ValidatableComponent>>>(
  new Map()
);

const setExpandedComponentRef = (rowId: string, el: any) => {
  if (el) {
    expandedComponentRefs.value.set(rowId, el as InstanceType<typeof ValidatableComponent>);
  } else {
    expandedComponentRefs.value.delete(rowId); // 组件销毁时清除引用
  }
};

const handleExpandChange = (row: any, expandedRows: any[]) => {
  // 1. 打印日志，确认此函数是否被触发
  console.log('handleExpandChange Fired! Clicked Row:', row);
  console.log('Raw expandedRows from event:', expandedRows);

  // 2. 确认 expandedRows 是否包含了当前点击的行对象
  //    Element Plus 的 expandedRows 参数是当前所有已展开的行对象数组
  const newExpandedKeys = expandedRows.map(r => r.id); // 假设你的 row-key 是 'id'
  console.log('Keys to be set for expansion:', newExpandedKeys);

  expandedRowKeys.value = newExpandedKeys; // 更新 ref
  console.log('expandedRowKeys.value AFTER update:', JSON.parse(JSON.stringify(expandedRowKeys.value)));
};
// ★★★ 核心校验方法 ★★★
const validate = async (): Promise<boolean> => {
  let isOwnFormValid = true;
  let areAllNestedComponentsValid = true;

  console.log(`[ValidatableComponent isNested=${props.isNested}] 开始校验`);

  // 1. 校验自身表单 (如果存在)
  if (ownFormRef.value) {
    try {
      await ownFormRef.value.validate();
      console.log(`[ValidatableComponent isNested=${props.isNested}] 自身表单校验通过`);
    } catch (e) {
      isOwnFormValid = false;
      console.warn(`[ValidatableComponent isNested=${props.isNested}] 自身表单校验失败`, e);
      ownFormRef.value.scrollToField(Object.keys(e as Record<string, any>)[0]); // 滚动到自身错误
    }
  }

  // 2. 校验所有当前已展开的、可引用的嵌套子组件
  if (hasTable.value && expandedComponentRefs.value.size > 0) {
    const validationPromises: Promise<boolean>[] = [];

    // 遍历当前已记录的 (即已渲染且 ref 已设置的) 展开行组件
    for (const [rowId, componentInstance] of expandedComponentRefs.value.entries()) {
      validationPromises.push(
            componentInstance.validate()
          );
    }

    if (validationPromises.length > 0) {
      const results = await Promise.all(validationPromises);
      areAllNestedComponentsValid = results.every((res) => res);
    }
  }

  const overallValid = isOwnFormValid && areAllNestedComponentsValid;
  if (overallValid) {
    console.log(`[ValidatableComponent isNested=${props.isNested}] 整体校验通过`);
  } else {
    console.warn(`[ValidatableComponent isNested=${props.isNested}] 整体校验失败`);
  }
  return overallValid;
};

defineExpose({ validate });

// 模拟数据加载或初始化
if (props.dataSource && props.dataSource.fieldX) {
  ownFormData.fieldX = props.dataSource.fieldX;
}
</script>

<style scoped>
/* 根据需要添加样式，例如给嵌套组件添加缩进或边框 */
div[data-nested="true"] {
  margin-left: 20px;
  padding: 10px;
  border-left: 2px solid #eee;
}
</style>
