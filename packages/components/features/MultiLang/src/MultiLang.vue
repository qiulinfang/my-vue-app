<template>
    <div class="multilingual-object-form">
      <el-alert v-if="!modelValue || !modelValue.id" type="warning" show-icon :closable="false">
        请先从列表中选择一个项目进行编辑。
      </el-alert>
  
      <template v-else>
        <h4>正在编辑: ID #{{ modelValue.id }}</h4>
  
        <el-tabs v-model="activeLang" type="card" class="language-tabs" @tab-change="handleTabChange">
          <el-tab-pane
            v-for="lang in languages"
            :key="lang.code"
            :name="lang.code"
          >
            <template #label>
              <span :class="{ 'tab-has-error': errorLanguages.has(lang.code) }">
                {{ lang.label }}
                <el-icon v-if="errorLanguages.has(lang.code)" class="error-icon">
                  <WarningFilled />
                </el-icon>
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
  
        <div :key="activeLang + '-' + modelValue.id" class="form-content-wrapper">
          <el-form
            :model="internalFormData"
            :rules="formRules"
            label-width="auto"
            label-position="top"
            class="language-form-content"
            ref="formRef"
            @submit.prevent
            hide-required-asterisk="false"
          >
            <el-form-item
              v-for="field in multilingualFields"
              :key="field"
              :label="`${getFieldLabel(field)} (${activeLang.toUpperCase()})`"
              :prop="`${field}.${activeLang}`" >
              <el-input
                v-if="internalFormData[field] && typeof internalFormData[field] === 'object'"
                v-model="internalFormData[field][activeLang]"
                :placeholder="`请输入${getFieldLabel(field)}`"
                :type="getFieldInputType(field)"
                :rows="getFieldInputType(field) === 'textarea' ? 4 : undefined"
              ></el-input>
              <span v-else class="field-warning">
                字段 '{{ field }}' 在数据中结构错误或未初始化为多语言对象。
              </span>
            </el-form-item>
  
            </el-form>
        </div>
  
        <el-divider />
  
        <div class="form-actions">
           <el-button type="primary" @click="validateAndSave">校验并模拟保存</el-button>
           <el-button @click="resetCurrentLanguageForm">重置当前语言字段</el-button>
           <el-button @click="resetValidation">清空校验状态</el-button>
        </div>
      </template>
  
      </div>
  </template>
  
  <script setup>
  // --- 导入 ---
  import { ref, reactive, watch, computed, nextTick } from 'vue';
  import { ElMessage, ElAlert, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElIcon, ElButton, ElDivider } from 'element-plus'; // 按需或全局引入
  import { WarningFilled } from '@element-plus/icons-vue'; // 引入图标
  
  // --- 组件接口 (Props & Emits) ---
  const props = defineProps({
    /**
     * v-model 绑定的对象 (数组中的一项)
     * @type {Object | null}
     */
    modelValue: {
      type: Object,
      default: null
    },
    /**
     * 支持的语言列表
     * @type {Array<{code: string, label: string}>}
     */
    supportedLanguages: {
      type: Array,
      default: () => [
        { code: 'zh', label: '简体中文' },
        { code: 'en', label: 'English' },
      ]
    },
    /**
     * 需要进行多语言编辑的字段名数组
     * @type {Array<string>}
     * @required
     */
    multilingualFields: {
      type: Array,
      required: true,
      default: () => ['title', 'description'] // 示例默认值
    },
    /**
     * 字段显示名称的映射 (可选)
     * @type {Object.<string, string>}
     */
    fieldLabels: {
      type: Object,
      default: () => ({ title: '标题', description: '描述', keywords: '关键词' })
    },
    /**
     * 特定字段的输入类型映射 (可选, 默认 'text')
     * @type {Object.<string, string>}
     */
    fieldInputTypes: {
      type: Object,
      default: () => ({ description: 'textarea' }) // 示例: description 使用 textarea
    },
    /**
     * 自定义校验规则 (可选)
     * key 格式应为 'fieldName.langCode' 或非多语言字段的 'fieldName'
     * @type {Object}
     */
    customValidationRules: {
      type: Object,
      default: () => ({})
    }
  });
  
  const emit = defineEmits([
      /**
       * v-model 更新事件
       * @param {Object} value 更新后的对象数据
       */
      'update:modelValue',
      /**
       * 表单校验通过时触发
       * @param {Object} validatedData 当前内部表单数据
       */
      'validation-passed',
       /**
       * 表单校验失败时触发
       * @param {Object} errorFields Element Plus 返回的错误字段信息
       */
      'validation-failed'
  ]);
  
  // --- 内部状态 ---
  const languages = ref(props.supportedLanguages); // 支持的语言
  const activeLang = ref(languages.value.length > 0 ? languages.value[0].code : ''); // 当前激活的语言页签
  const formRef = ref(null); // 表单实例的引用
  const internalFormData = reactive({}); // 内部响应式数据副本
  const errorLanguages = ref(new Set()); // 存储包含校验错误的语言代码 Set
  
  // --- 计算属性 ---
  
  /**
   * 计算生成 Element Plus 表单所需的校验规则对象
   * @returns {Object} 校验规则对象
   */
  const formRules = computed(() => {
    const rules = {};
    // 生成多语言字段的规则
    languages.value.forEach(lang => {
      props.multilingualFields.forEach(field => {
        const ruleKey = `${field}.${lang.code}`; // key 格式: 'title.zh'
        const fieldLabel = getFieldLabel(field); // 获取友好名称
        const langLabel = lang.label;
  
        // 定义基础规则 (例如：必填)
        const baseRules = [
          { required: true, message: `请输入${langLabel}的${fieldLabel}`, trigger: 'blur' }
          // 可以根据需要添加更多通用规则，如：
          // { type: 'string', min: 3, message: '长度至少 3 个字符', trigger: 'blur' }
        ];
  
        // 合并父组件传入的自定义规则
        const customRulesForFieldLang = props.customValidationRules[ruleKey] || [];
  
        rules[ruleKey] = [...baseRules, ...customRulesForFieldLang];
      });
    });
  
    // 合并父组件传入的非多语言字段的自定义规则 (如果需要校验非多语言字段)
    Object.keys(props.customValidationRules).forEach(key => {
        // 如果 key 不包含 '.', 并且不是多语言字段的组合 key, 认为是普通字段规则
        if (!key.includes('.') && !props.multilingualFields.some(mf => key.startsWith(mf + '.'))) {
            // 需要确保 internalFormData 中确实有这个 key
            if (internalFormData.hasOwnProperty(key)) {
                rules[key] = props.customValidationRules[key];
            }
        }
    });
  
    // 示例: 直接添加非多语言字段 'category' 的规则
    // if (internalFormData.hasOwnProperty('category')) {
    //    rules['category'] = [ { required: true, message: '请输入分类', trigger: 'blur' } ];
    // }
  
    // console.log('Generated Form Rules:', JSON.stringify(rules)); // 调试时可以取消注释
    return rules;
  });
  
  // --- 方法 ---
  
  /**
   * 同步父组件传入的 modelValue 到内部的 internalFormData
   * 并确保所有语言和字段都有默认值，同时清空校验状态
   * @param {Object | null} sourceObject 父组件传入的 modelValue
   */
  const syncInternalData = (sourceObject) => {
    // 1. 清空错误标记和校验状态
    errorLanguages.value.clear();
    nextTick(() => { // 等待 DOM 更新后再清除，确保 ref 可用
        formRef.value?.clearValidate();
    });
  
    // 2. 如果传入的是 null 或非对象，清空内部数据
    if (!sourceObject || typeof sourceObject !== 'object') {
      Object.keys(internalFormData).forEach(key => delete internalFormData[key]); // 清理旧数据
      return;
    }
  
    // 3. 复制源对象的非多语言字段 (浅拷贝)
    Object.keys(sourceObject).forEach(key => {
        if (!props.multilingualFields.includes(key)) {
            internalFormData[key] = sourceObject[key];
        }
    });
  
    // 4. 处理多语言字段，确保每个语言都有值（默认为空字符串）
    props.multilingualFields.forEach(field => {
      // 确保字段本身在 internalFormData 中是个对象
      if (!internalFormData[field] || typeof internalFormData[field] !== 'object') {
        internalFormData[field] = {};
      }
      const sourceFieldData = sourceObject[field]; // 源数据中对应字段的值
  
      // 遍历支持的语言
      languages.value.forEach(lang => {
        // 检查源数据中是否有对应语言的值，没有则设为空字符串
        internalFormData[field][lang.code] = (sourceFieldData && typeof sourceFieldData === 'object') ? (sourceFieldData[lang.code] ?? '') : '';
      });
  
      // (可选清理) 清理 internalFormData 中存在但当前支持语言列表已移除的语言
       if (internalFormData[field] && typeof internalFormData[field] === 'object') {
          Object.keys(internalFormData[field]).forEach(langCode => {
              if (!languages.value.some(l => l.code === langCode)) {
                  delete internalFormData[field][langCode];
              }
          });
       }
    });
  
    // 5. (可选清理) 清理 internalFormData 中存在但源对象和多语言字段列表已不再包含的字段
     Object.keys(internalFormData).forEach(existingField => {
         const isMultilingual = props.multilingualFields.includes(existingField);
         const isInSource = sourceObject.hasOwnProperty(existingField);
         if (!isInSource && !isMultilingual) {
             // 如果是非多语言字段且源数据里没了，删除
              delete internalFormData[existingField];
         } else if (isMultilingual && !isInSource) {
             // 如果是多语言字段但源数据里没了，也删除
              delete internalFormData[existingField];
         }
     });
  };
  
  /**
   * 校验整个表单
   * 如果失败，会高亮错误 Tab，切换到第一个错误 Tab，并滚动到第一个错误字段
   * @returns {Promise<boolean>} Promise resolve true 表示校验通过, false 表示失败
   */
  const validateForm = async () => {
    if (!formRef.value) {
      console.error('Form ref is not available.');
      ElMessage.error('表单引用丢失，无法校验');
      return false;
    }
  
    // 1. 清空之前的错误语言标记
    errorLanguages.value.clear();
  
    try {
      // 2. 执行 Element Plus 的表单校验
      await formRef.value.validate();
      // 3. 校验通过
      console.log('Validation passed');
      emit('validation-passed', JSON.parse(JSON.stringify(internalFormData))); // 发送通过事件和数据副本
      return true;
  
    } catch (errorFields) {
      // 4. 校验失败
      console.error('Validation failed:', errorFields);
  
      // 5. 提取所有错误的语言代码
      const errorLangsFound = new Set();
      const errorFieldKeys = Object.keys(errorFields);
      errorFieldKeys.forEach(key => {
        const parts = key.split('.'); // 按 '.' 分割 prop 路径
        // 假设语言代码总在最后一部分，并且是有效的语言代码
        if (parts.length > 1) {
            const potentialLangCode = parts[parts.length - 1];
            if (languages.value.some(l => l.code === potentialLangCode)) {
               errorLangsFound.add(potentialLangCode);
            }
        }
        // 对于没有 '.' 的 key (可能是普通字段)，这里不处理语言标记
      });
  
      // 6. 更新错误语言状态以高亮 Tabs
      errorLanguages.value = errorLangsFound;
      emit('validation-failed', errorFields); // 发送失败事件和错误详情
  
      // 7. 处理跳转和滚动
      if (errorLangsFound.size > 0) {
        // 获取 Set 中的第一个错误语言
        const firstErrorLang = [...errorLangsFound][0];
        // 找到该语言下的第一个错误字段的 prop key
        const firstErrorProp = errorFieldKeys.find(key => key.endsWith(`.${firstErrorLang}`));
  
        const langLabel = languages.value.find(l => l.code === firstErrorLang)?.label || firstErrorLang;
        ElMessage.error(`请检查 ${langLabel} 语言下的字段`);
  
        // 8. 如果第一个错误不在当前激活的 Tab, 切换过去
        if (firstErrorLang !== activeLang.value) {
          activeLang.value = firstErrorLang;
          // 等待 Tab 切换的 DOM 更新完成
          await nextTick();
        }
  
        // 9. 滚动到第一个错误字段
        if (firstErrorProp) {
          try {
               formRef.value?.scrollToField(firstErrorProp);
          } catch (scrollError) {
               console.warn(`Failed to scroll to field ${firstErrorProp}:`, scrollError);
               // 备选：尝试手动滚动到 FormItem
               const errorItemElement = formRef.value?.$el?.querySelector(`.el-form-item[prop="${firstErrorProp}"]`);
               errorItemElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else {
         // 虽然 validate 失败了，但没有解析出带语言标记的错误？
         // 这通常发生在非多语言字段校验失败时
         ElMessage.error('表单校验失败，请检查错误提示');
         // 尝试滚动到第一个非语言相关的错误字段
          const firstNonLangErrorProp = errorFieldKeys.find(key => !key.includes('.'));
          if(firstNonLangErrorProp) {
              formRef.value?.scrollToField(firstNonLangErrorProp);
          }
      }
  
      return false; // 表示校验失败
    }
  };
  
  /**
   * 清空表单所有校验状态和错误 Tab 高亮
   */
  const resetValidation = () => {
    errorLanguages.value.clear(); // 清除错误语言标记
    formRef.value?.clearValidate(); // 清除表单校验状态
    ElMessage.info('校验状态已清除');
  };
  
  /**
   * 校验表单，如果通过则提示成功 (用于按钮点击)
   */
  const validateAndSave = async () => {
      const isValid = await validateForm(); // 调用核心校验方法
      if (isValid) {
          ElMessage.success('校验通过！数据已准备好。');
          // 实际的保存逻辑应该在父组件中处理
          // 父组件可以通过监听 validation-passed 事件，或者在需要时调用子组件的 validate 方法后进行
          console.log('Data ready to be saved (updated via v-model in parent):', JSON.parse(JSON.stringify(props.modelValue)));
      }
      // 校验失败的提示已在 validateForm 中处理
  };
  
  /**
   * 重置当前激活语言的所有多语言字段为空，并清除这些字段的校验状态和该语言的错误标记
   */
  const resetCurrentLanguageForm = () => {
    const langCode = activeLang.value;
    if (!props.modelValue || !langCode) {
        ElMessage.warning('没有选中项目或语言无效');
        return;
    }
  
    const fieldsToResetProps = []; // 存储需要清除校验的 prop 路径
    props.multilingualFields.forEach(field => {
      // 确保字段存在且为对象结构
      if (internalFormData[field] && typeof internalFormData[field] === 'object') {
        internalFormData[field][langCode] = ''; // 清空当前语言的值
        fieldsToResetProps.push(`${field}.${langCode}`); // 加入清除列表
      }
    });
  
    // 从错误语言 Set 中移除当前语言 (如果存在)
    errorLanguages.value.delete(langCode);
  
    // 使用 nextTick 确保 DOM 更新后再清除校验状态
    nextTick(() => {
         if (formRef.value && fieldsToResetProps.length > 0) {
             formRef.value.clearValidate(fieldsToResetProps); // 只清除重置字段的校验
         }
    });
  
    ElMessage.info(`项目 ID #${props.modelValue.id} 的 ${langCode.toUpperCase()} 语言字段已重置`);
  };
  
  /**
   * 处理语言 Tab 切换事件 (目前无特殊逻辑，可用于未来扩展)
   * @param {string} newLangCode 切换到的新语言代码
   */
  const handleTabChange = (/* newLangCode */) => {
    // 切换 Tab 时，可以考虑清除当前 Tab 的校验信息，避免用户看到旧的错误
    // 但这可能不是必须的，取决于具体需求
    // nextTick(() => { formRef.value?.clearValidate(); });
    // console.log('Tab changed to:', newLangCode);
  };
  
  // --- Watchers ---
  
  // 监听父组件传入的 modelValue 变化 (例如切换编辑对象)
  watch(() => props.modelValue, (newObject, oldObject) => {
    // 只有在对象真正改变时（或者从无到有时）才执行同步
    // 简单比较 ID，如果对象复杂可能需要更可靠的比较方式
    if (newObject?.id !== oldObject?.id) {
       console.log('Form received new object (ID changed):', newObject?.id);
       syncInternalData(newObject); // 同步数据并清除校验
    } else if (newObject && oldObject && JSON.stringify(newObject) !== JSON.stringify(oldObject)) {
       // 如果 ID 相同但内容不同（例如父组件外部修改），也同步，但要小心可能覆盖用户输入
       console.log('Form received updated object (same ID):', newObject?.id);
       // syncInternalData(newObject); // 根据需要决定是否在这种情况下也强制同步
    }
  }, { immediate: true, deep: false }); // deep: false 避免因内部编辑触发的不必要同步
  
  // 监听内部数据变化，通过 emit 更新父组件的 v-model
  watch(internalFormData, (newData) => {
    // 只有当确实在编辑一个对象时才向外发送更新
    if (props.modelValue) {
      // 发送深拷贝的数据，避免引用问题
      const dataToEmit = JSON.parse(JSON.stringify(newData));
      emit('update:modelValue', dataToEmit);
    }
  }, { deep: true }); // deep: true 是必须的，以便监听嵌套属性的变化
  
  // --- Expose ---
  // 将需要从父组件调用的方法暴露出去
  defineExpose({
    /**
     * 校验整个表单
     * @returns {Promise<boolean>} true if validation passes, false otherwise.
     */
    validate: validateForm,
    /**
     * 清空表单的校验状态和错误 Tab 高亮
     */
    resetValidation: resetValidation
  });
  
  // --- Helper Functions ---
  /**
   * 获取字段的显示标签名
   * @param {string} field 字段的 key
   * @returns {string} 标签名
   */
  const getFieldLabel = (field) => props.fieldLabels[field] || field; // 提供 fallback
  
  /**
   * 获取字段的输入框类型
   * @param {string} field 字段的 key
   * @returns {string} 输入框类型 ('text', 'textarea', etc.)
   */
  const getFieldInputType = (field) => props.fieldInputTypes[field] || 'text'; // 默认为 'text'
  
  </script>
  
  <style scoped>
  /* --- 表单整体样式 --- */
  .multilingual-object-form {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
  }
  .multilingual-object-form:focus-within { /* 当内部获得焦点时 */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 轻微的外发光效果 */
  }
  
  /* --- 标题样式 --- */
  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    font-weight: 600; /* 标题加粗 */
  }
  
  /* --- 语言标签页样式 --- */
  .language-tabs {
    margin-bottom: 20px;
  }
  
  /* 错误 Tab 的高亮样式 */
  .tab-has-error {
    color: var(--el-color-danger); /* 文字变红 */
    font-weight: 600; /* 可以加粗强调 */
    /* 可以添加其他样式，如背景、边框等，但需注意不要破坏布局 */
  }
  
  /* 错误图标样式 */
  .tab-has-error .error-icon {
    margin-left: 5px; /* 图标与文字间距 */
    vertical-align: middle; /* 垂直居中对齐 */
    font-size: 14px; /* 合适的图标大小 */
    /* 颜色默认继承父元素 (.tab-has-error) 的 color */
  }
  
  /* 确保 Element Plus 的样式可以被覆盖 (如果需要更强的样式) */
  :deep(.el-tabs__item span.tab-has-error) {
      /* 如果需要强制覆盖 Element Plus 内部样式，可以使用 :deep() 或 >>> */
      /* color: var(--el-color-danger) !important; */
  }
  
  /* --- 表单内容区域样式 --- */
  .form-content-wrapper {
    /* 可以添加过渡效果 */
  }
  .language-form-content {
    padding: 0 10px; /* 左右内边距 */
  }
  
  /* --- 表单项内部样式 --- */
  .field-warning { /* 数据结构错误时的提示 */
    color: #e6a23c;
    font-size: 12px;
    display: block; /* 独占一行 */
    margin-top: 4px;
  }
  
  /* --- 操作按钮区域样式 --- */
  .form-actions {
    margin-top: 25px; /* 增加与表单的间距 */
    padding-left: 10px; /* 与表单内容左对齐 */
    text-align: left; /* 按钮默认左对齐 */
    display: flex; /* 使用 flex 布局方便控制间距 */
    gap: 10px; /* 按钮之间的间距 */
  }
  
  /* --- 调试信息样式 (如果取消注释) --- */
  .debug-info {
    margin-top: 20px;
    background-color: #eee;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .debug-info h3 {
      margin-top: 0;
      font-size: 14px;
      margin-bottom: 8px;
  }
  .debug-info pre {
      font-size: 12px;
      white-space: pre-wrap;
      word-wrap: break-word;
      background-color: #f7f7f7;
      padding: 8px;
      border-radius: 3px;
  }
  </style>