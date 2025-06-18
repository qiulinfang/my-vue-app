<template>
  <div style="padding: 20px;">
    <h1>配置表格示例 (父组件 - v-model 代表勾选项)</h1>

    <el-card shadow="never" style="margin-bottom: 20px;">
      <template #header>
        <div class="card-header">
          <span>控制选项</span>
        </div>
      </template>
      <el-form inline label-position="left" label-width="80px">
        <el-form-item label="编辑模式:">
          <el-radio-group v-model="editMode">
            <el-radio label="edit">可编辑</el-radio>
            <el-radio label="read">只读</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <p style="font-size: 13px; color: #666;">
        说明：请在下方表格右上角的下拉框中选择要添加（并自动勾选）的配置项。表格中只显示已勾选项的值。
      </p>
    </el-card>

    <MyExtraList
      ref="tableComponentRef"
      v-model="activeItems"
      :field-list="fullConfigList"
      :edit-type="editMode"
      :id-key="idKey"
      :mandatory-key="mandatoryKey"
      @item-deleted="handleItemDeleted"
    />

    <el-button @click="saveSettings">保存设置</el-button>

    <el-divider style="margin: 30px 0;" />

    <div style="display: flex; flex-direction: column; gap: 20px;">
      <el-card shadow="never">
        <template #header>当前勾选项的值 (v-model: activeItems)</template>
        <pre>{{ JSON.stringify(activeItems, null, 2) }}</pre>
      </el-card>
      <el-card shadow="never">
        <template #header>完整配置列表 (prop: fullConfigList)</template>
        <pre>{{ JSON.stringify(fullConfigList, null, 2) }}</pre>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MyExtraList } from "myComponent";
import { ElMessage } from 'element-plus';

const tableComponentRef = ref(null);
const idKey = 'uniqueId';
const mandatoryKey = 'mandatoryKey';

const fullConfigList = ref([
  {
    [idKey]: 1,
    name: 'Logo 图片',
    description: '网站顶部 Logo 地址',
    [mandatoryKey]: true,
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Logo',
    initialValue: '/images/logo.png',
    validationRequired: true,
    validationType: 'url',
    validationMessage: '请输入有效的 Logo 图片 URL'
  },
  {
    [idKey]: 2,
    name: '网站标题',
    description: '显示在浏览器标签页的标题',
    [mandatoryKey]: true,
    imageUrl: null,
    initialValue: '我的网站',
    validationRequired: true
  },
  {
    [idKey]: 3,
    name: '备案号',
    description: '网站底部的备案信息',
    [mandatoryKey]: false,
    imageUrl: null,
    initialValue: '京ICP备XXXXXXXX号',
    validationRegex: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}ICP备\d{8}号(-\d+)?$/,
    validationMessage: '请输入正确的 ICP 备案号格式'
  },
  {
    [idKey]: 4,
    name: '客服电话',
    description: '页面显示的联系电话',
    [mandatoryKey]: false,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Tel'
  },
  {
    [idKey]: 5,
    name: '版权信息 (必选)',
    description: '网站底部的版权声明',
    [mandatoryKey]: true,
    imageUrl: null,
    initialValue: `© ${new Date().getFullYear()} MyCompany Inc.`
  },
  {
    [idKey]: 6,
    name: '主题颜色',
    description: '网站主色调',
    [mandatoryKey]: false,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Color',
    initialValue: '#409EFF',
    validationRegex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    validationMessage: '请输入有效的十六进制颜色值 (例如 #FF0000)'
  }
]);

const activeItems = ref(
  fullConfigList.value
    .filter(item => item[mandatoryKey] === true)
    .map(item => ({
      [idKey]: item[idKey],
      value: item.initialValue ?? ''
    }))
);

const editMode = ref('edit');

const handleItemDeleted = (deletedIds) => {
  console.log('Parent received item-deleted:', deletedIds);
  ElMessage.info(`收到子组件删除通知 (ID: ${deletedIds.join(', ')}), 已取消勾选。`);
};
</script>

<style scoped>
h1 {
  font-size: 1.5em;
  margin-bottom: 1em;
}

h2 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 13px;
  max-height: 300px;
  overflow-y: auto;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.el-card {
  margin-bottom: 20px;
}
</style>