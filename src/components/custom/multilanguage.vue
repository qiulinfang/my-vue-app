<template>
    <div>
        {{ dataList }}
        <!-- 多语言选择框 -->
        <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="12">
                <el-select v-model="currentLang" placeholder="请选择语言" @change="handleLangChange">
                    <el-option v-for="lang in langList" :key="lang.key" :label="lang.name" :value="lang.key" />
                </el-select>
            </el-col>
        </el-row>

        <!-- 输入框区域 -->
        <el-row :gutter="20">
            <el-col v-for="(item, index) in renderedItems" :key="index" :span="isPackage ? 8 : 12">
                <el-card v-if="extraType === 'extraTypeValue'" class="box-card" shadow="hover">
                    <el-input v-if="item.keyInputType === 3" :name="getInputName(item, index)"
                        :id="getInputId(item, index)" v-model.trim="item.value[currentLang]" :disabled="!isEnabled(item)"
                        :placeholder="item.placeholder || '请输入内容'"  show-word-limit maxlength="1024"
                        >
                        <template #prepend>{{ getLangName(currentLang) }}</template>
                    </el-input>
                    <div v-if="validationErrors[`${index}-${currentLang}`]" class="error-message">
                        {{ validationErrors[`${index}-${currentLang}`] }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 模拟的数据列表
      dataList: [
        { keyInputType: 3, checked: true, value: { zh: '', en: '' } },
        { keyInputType: 3, checked: false, value: { zh: '', en: '' } }
      ],
      // 语言列表
      langList: [
        { key: 'zh', name: '中文' },
        { key: 'en', name: '英文' }
      ],
      // 当前选择的语言
      currentLang: 'zh',
      isPackage: false,
      extraType: 'extraTypeValue',
      validationErrors: {}
    };
  },
  computed: {
    renderedItems() {
      return this.dataList.filter(item => item.keyInputType === 3);
    }
  },
  methods: {
    getLangName(langKey) {
      return this.langList.find(lang => lang.key === langKey)?.name || '';
    },
    async displayExtraValid(value, item, langKey) {
      if (!value.trim()) {
        this.$set(this.validationErrors, `${this.dataList.indexOf(item)}-${langKey}`, '输入不能为空');
        return false;
      } else {
        this.$delete(this.validationErrors, `${this.dataList.indexOf(item)}-${langKey}`);
        return true;
      }
    },
    getInputName(row, index) {
      if (this.extraType === 'extraTypeValue') {
        return `dataList.${index}.value.${this.currentLang}`;
      } else {
        return row.name || `dataList.${this.dataList.indexOf(row)}.value`;
      }
    },
    getInputId(row, index) {
      if (this.extraType === 'extraTypeValue') {
        return `extraForm_dataList.${index}.value.${this.currentLang}`;
      } else {
        return `extraForm_dataList.${this.dataList.indexOf(row)}.value`;
      }
    },
    getValue(row, index) {
      if (this.extraType === 'extraTypeValue') {
        return row.value[this.currentLang];
      } else {
        return row.value;
      }
    },
    isEnabled(row) {
      return this.extraType === 'extraTypeValue' ? row.checked : true;
    },
    async valueChange(newValue, item, langKey) {
      await this.displayExtraValid(newValue, item, langKey);
      console.log(`输入框值变化：${newValue}，对应项：`, item, `语言：${langKey}`);
    },
    handleLangChange(newLang) {
      // 清除所有验证错误
      this.validationErrors = {};
      // 可以在这里添加更多逻辑，例如保存当前语言的选择
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>