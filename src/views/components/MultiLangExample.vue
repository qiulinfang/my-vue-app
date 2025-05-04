<template>
  <div>
    <div class="item-list">
      <h3>选择要编辑的项目:</h3>
      <ul>
        <li v-for="item in items" :key="item.id" @click="selectItem(item)" :class="{ selected: selectedItem && selectedItem.id === item.id }">
          ID #{{ item.id }} - {{ item.title?.zh || '无标题' }}
        </li>
      </ul>
    </div>

    <hr>

    <MyMultiLang
      ref="multilingualFormRef"
      v-if="selectedItem"
      v-model="selectedItem"
      :supported-languages="availableLanguages"
      :multilingual-fields="['title', 'description']"
      :field-labels="{ title: '文章标题', description: '文章描述' }"
      :field-input-types="{ description: 'textarea' }"
      :custom-validation-rules="customRules"
      @validation-passed="handleValidationPassed"
      @validation-failed="handleValidationFailed"
    />
    <div v-else>
      请先从上方列表中选择一个项目。
    </div>

    <div class="parent-actions" v-if="selectedItem">
        <el-button type="success" @click="saveChanges">保存更改 (模拟)</el-button>
        <el-button type="warning" @click="triggerExternalValidation">从父组件触发校验</el-button>
        <el-button type="info" @click="triggerExternalResetValidation">从父组件清空校验</el-button>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { MyMultiLang } from "myComponent";

// 模拟的可选语言
const availableLanguages = ref([
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'jp', label: '日本語' }
]);

// 模拟的数据列表
const items = reactive([
  {
    id: 1,
    category: 'news',
    title: { zh: '中文标题1', en: 'English Title 1', jp: '' },
    description: { zh: '中文描述1', en: 'English Description 1', jp: '' }
  },
  {
    id: 2,
    category: 'events',
    title: { zh: '中文标题2', en: '', jp: '日本語タイトル２' },
    description: { zh: '中文描述2', en: '', jp: '日本語デスクリプション２' }
  }
]);

// 当前选中的项目
const selectedItem = ref(null); // 初始没有选中任何项目

// 子组件的引用
const multilingualFormRef = ref(null);

// 选择项目
const selectItem = (item) => {
  // 注意：这里直接赋值引用。子组件内部会创建副本进行编辑，并通过 v-model 更新回来
  selectedItem.value = item;
  // 切换项目时，最好清空之前的校验状态（如果需要）
  multilingualFormRef.value?.resetValidation();
};

// 自定义校验规则 (可选)
// key 的格式是 'fieldName.langCode'
const customRules = computed(() => {
    const rules = {};
    availableLanguages.value.forEach(lang => {
        // 例如：给英文标题添加最小长度校验
        if (lang.code === 'en') {
            rules['title.en'] = [
                { min: 5, message: 'English title must be at least 5 characters long', trigger: 'blur' }
            ];
        }
        // 例如：给日文描述添加一个自定义校验函数
        if (lang.code === 'jp') {
            rules['description.jp'] = [
                 { validator: validateJapaneseKeywords, trigger: 'blur' }
            ];
        }
    });
    // 也可以添加非多语言字段的规则，需要确保该字段存在于 selectedItem 中
    // rules['category'] = [{ required: true, message: 'Category is required', trigger: 'change' }];
    return rules;
});

// 自定义校验函数示例
const validateJapaneseKeywords = (rule, value, callback) => {
  if (value && value.includes('禁止词')) {
    callback(new Error('日文描述包含不允许的词汇'));
  } else {
    callback();
  }
};


// 处理子组件校验通过事件
const handleValidationPassed = (validatedData) => {
  console.log('子组件校验通过，收到的数据:', validatedData);
  // 在这里可以执行实际的保存操作，validatedData 是子组件内部数据的副本
  // 由于使用了 v-model，selectedItem.value 应该已经是更新后的数据了
  ElMessage.success(`项目 ID #${selectedItem.value.id} 校验通过，准备保存!`);
  // 模拟保存 API 调用
  // saveApiCall(selectedItem.value).then(...);
};

// 处理子组件校验失败事件
const handleValidationFailed = (errorFields) => {
  console.error('子组件校验失败:', errorFields);
  ElMessage.error('表单校验失败，请检查错误项');
};

// 父组件的保存按钮处理逻辑
const saveChanges = async () => {
    if (!multilingualFormRef.value) return;
    // 调用子组件的 validate 方法
    const isValid = await multilingualFormRef.value.validate();
    if (isValid) {
        // 校验通过，执行保存逻辑
        console.log('父组件触发保存，数据为:', selectedItem.value);
        ElMessage.success(`项目 ID #${selectedItem.value.id} 数据已提交保存 (模拟)`);
        // 模拟 API 调用
        // try {
        //   await api.saveItem(selectedItem.value);
        //   ElMessage.success('保存成功!');
        // } catch (error) {
        //   ElMessage.error('保存失败!');
        // }
    } else {
        ElMessage.warning('请先修正表单中的错误');
    }
};

// 父组件触发子组件校验
const triggerExternalValidation = async () => {
    if (multilingualFormRef.value) {
        console.log('父组件触发子组件校验...');
        await multilingualFormRef.value.validate(); // 调用暴露的方法
    }
};

// 父组件触发子组件重置校验状态
const triggerExternalResetValidation = () => {
     if (multilingualFormRef.value) {
        console.log('父组件触发子组件清空校验状态...');
        multilingualFormRef.value.resetValidation(); // 调用暴露的方法
     }
};

</script>

<style scoped>
.item-list ul {
  list-style: none;
  padding: 0;
}
.item-list li {
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #eee;
  margin-bottom: 5px;
  border-radius: 3px;
}
.item-list li:hover {
  background-color: #f0f0f0;
}
.item-list li.selected {
  background-color: #e0f0ff;
  border-color: #a0cfff;
  font-weight: bold;
}
.parent-actions {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}
</style>