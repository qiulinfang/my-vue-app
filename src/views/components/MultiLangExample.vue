<template>
  <div class="parent-container">
    <h2>多语言项目列表编辑器</h2>

    <div class="list-and-form">
      <div class="item-list">
        <h3>项目列表</h3>
        <el-radio-group v-model="selectedItemId" @change="handleSelectionChange">
          <el-radio
            v-for="item in itemList"
            :key="item.id"
            :label="item.id"
            border
            class="list-item-radio"
          >
            项目 ID #{{ item.id }} ({{ item.title?.['zh'] || item.title?.['en'] || '无标题' }})
          </el-radio>
        </el-radio-group>
        <el-button @click="addNewItem" type="primary" plain style="margin-top: 15px;">添加新项目</el-button>
        <el-button @click="clearSelection" v-if="selectedItemId" plain style="margin-top: 15px;">取消选择</el-button>
      </div>

      <div class="edit-form">
    <h3>编辑区域</h3>
    <MultilingualObjectForm
      v-if="selectedItem"
      ref="multilingualFormRef" v-model="selectedItem"
      :supported-languages="supportedLangs"
      :multilingual-fields="editableMultilingualFields"
      :field-labels="customFieldLabels"
      :field-input-types="customInputTypes"
      :custom-validation-rules="myCustomRules" @update:modelValue="handleItemUpdate"
      @validation-passed="onValidationPassed"
      @validation-failed="onValidationFailed"
    />
    <el-button @click="triggerChildValidation" v-if="selectedItem">从父组件触发校验</el-button>
  </div>
    </div>

    <el-divider />

    <div class="full-data-display">
      <h3>完整列表数据 (itemList):</h3>
      <pre>{{ JSON.stringify(itemList, null, 2) }}</pre>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import MultilingualObjectForm from '@/components/features/MultiLang/src/MultiLang.vue'; // 引入子组件

// --- 父组件状态 ---

// 支持的语言 (可以传递给子组件)
const supportedLangs = ref([
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' } // 示例：添加了法语
]);

// 定义哪些字段是多语言的 (传递给子组件)
const editableMultilingualFields = ref(['title', 'description', 'keywords']);

// (可选) 自定义字段标签 (传递给子组件)
const customFieldLabels = ref({
    title: '产品名称',
    description: '详细介绍',
    keywords: '搜索关键词'
});

// (可选) 自定义输入类型
const customInputTypes = ref({
    description: 'textarea',
    keywords: 'text' // 明确指定，虽然默认也是 text
});


// 核心：对象数组
const itemList = reactive([
  { id: 1, category: 'A', title: { zh: '示例产品1', en: 'Sample Product 1' }, description: { zh: '这是第一个产品的中文描述', en: 'Description for product 1' }, keywords: { zh: '示例,产品', en: 'sample,product' } },
  { id: 2, category: 'B', title: { zh: '示例产品2', en: 'Sample Product 2', fr: 'Produit Exemple 2' }, description: { en: 'Desc 2' }, keywords: {} }, // 注意：keywords可能是空对象
  { id: 3, category: 'A', title: { en: 'Third item' }, description: {}, keywords: { zh: '第三' } } // 语言可能不全
]);

// 当前选中的项目 ID
const selectedItemId = ref(null);

// --- 计算属性 ---

// 根据 selectedItemId 找到要编辑的完整对象
const selectedItem = computed(() => {
  if (selectedItemId.value === null) {
    return null;
  }
  return itemList.find(item => item.id === selectedItemId.value);
});

// --- 方法 ---

// 处理列表选择变化
const handleSelectionChange = (newId) => {
  console.log('Selected item ID:', newId);
  // selectedItem 会自动根据 selectedItemId 更新
};

// 清除选择
const clearSelection = () => {
    selectedItemId.value = null;
}

// 处理子组件触发的 update:modelValue 事件
const handleItemUpdate = (updatedItem) => {
  console.log('Received update from child:', updatedItem);
  const index = itemList.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    // 用更新后的对象替换数组中的旧对象
    // 使用 Object.assign 或者直接替换都可以，确保响应性
    // itemList[index] = updatedItem; // 直接替换，简单有效
    Object.assign(itemList[index], updatedItem); // 或者合并，可以保留未被子组件处理的字段（如果父组件有特殊字段）
    console.log('Item updated in list:', itemList[index]);
  } else {
      console.warn("Couldn't find item with ID", updatedItem.id, "to update.");
  }
};

// 添加新项目
const addNewItem = () => {
    const newId = itemList.length > 0 ? Math.max(...itemList.map(i => i.id)) + 1 : 1;
    const newItem = {
        id: newId,
        category: 'New', // 示例非多语言字段
        // 初始化多语言字段为空对象或包含空语言的对象
        title: {},
        description: {},
        keywords: {}
    };
    // 确保所有语言的空字符串都存在
    supportedLangs.value.forEach(lang => {
        editableMultilingualFields.value.forEach(field => {
            if (!newItem[field]) newItem[field] = {};
            newItem[field][lang.code] = '';
        });
    });

    itemList.push(newItem);
    selectedItemId.value = newId; // 添加后自动选中新项目
};

// (可选) 自定义规则示例
const myCustomRules = reactive({
    // 示例：英文标题还需要包含 "Sample"
    'title.en': [
        { validator: (rule, value, callback) => {
            if (value && !value.includes('Sample')) {
                callback(new Error('English title must include "Sample"'));
            } else {
                callback();
            }
          },
          trigger: 'blur'
        }
    ],
    // 示例: 中文描述长度限制
    'description.zh': [
        { max: 100, message: '中文描述不能超过 100 个字符', trigger: 'blur' }
    ]
});

// ... (handleItemUpdate, addNewItem, etc.) ...

// 监听子组件校验结果 (可选)
const onValidationPassed = (validatedData) => {
    console.log('Parent received validation-passed event. Data:', validatedData);
    // 可以在这里执行保存逻辑，或者确认 v-model 已更新，依赖父组件的保存流程
};

const onValidationFailed = (errorFields) => {
    console.log('Parent received validation-failed event. Errors:', errorFields);
    // 可以做一些全局提示等
};

// 从父组件触发子组件校验的方法
const triggerChildValidation = async () => {
    if (multilingualFormRef.value) {
        const isValid = await multilingualFormRef.value.validate(); // 调用暴露的 validate 方法
        if (isValid) {
            console.log('Validation triggered from parent: PASSED');
            // 执行父组件的保存逻辑...
            // alert('保存成功！');
        } else {
            console.log('Validation triggered from parent: FAILED');
        }
    }
};
</script>

<style scoped>
.parent-container {
  padding: 20px;
}
.list-and-form {
  display: flex;
  gap: 30px; /* 左右间距 */
}
.item-list {
  width: 300px; /* 左侧列表宽度 */
  border-right: 1px solid #eee;
  padding-right: 20px;
}
.item-list h3 {
    margin-top: 0;
}
.list-item-radio {
    display: block; /* 每个选项占一行 */
    margin-bottom: 10px;
    margin-right: 0 !important; /* 覆盖Element Plus默认右边距 */
    width: 100%; /* 占满宽度 */
}
.edit-form {
  flex-grow: 1; /* 右侧表单区域占据剩余空间 */
}
.edit-form h3 {
    margin-top: 0;
}
.no-selection-placeholder {
    color: #909399;
    padding: 20px;
    text-align: center;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    margin-top: 10px;
}
.full-data-display {
  margin-top: 30px;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #eee;
}
.full-data-display h3 {
    margin-top: 0;
}
.full-data-display pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 13px;
}


</style>