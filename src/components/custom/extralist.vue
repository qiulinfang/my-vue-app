<template>
    <!-- 
     需求1：数据呈现
     需求2：参数值列根据配置呈现相应表单元素
        输入框
        时间选择器
        单选框
     需求3：数据双向绑定
     需求4：多选列控制参数列的元素的编辑读写，且进行过滤
     需求5：示意图悬浮提示
     需求6：表单校验 离开focus就校验
     需求7：在iap场景和业务包场景下，只展示必要的配置项 通过新增按钮展示剩余配置项
     需求8：提示语
     需求9：参数值列根据配置类型显示不同的输入类型
      -->
    <!-- <mark-tip :mark-tip="markTip" :needSymbol="true" v-if="markTip"></mark-tip> -->
    <div v-bind:class="{ active: 'false', fontSize: '20px' }">
        这个元素可能有 active 或 text-danger 类
        </div>

    <div v-bind:style="'color: red; font-size: 20px;'">Hello World</div>
    <div :style="{ fontSize: 20 + 'px' }">Hello World</div>
    <div :style="{ color: 'red', backgroundImage: 'url(image.jpg)' }">Hello World</div>
    <div :style="{ color: activeColor, height: computedHeight + 'px' }">Hello World</div>
    <div v-if="markTip">
        <div v-for="(item, index) in markTip" :key="index">{{ item }}</div>
    </div>
    <!-- <div style="display: flex; flex-direction: row-reverse;">
            <hc-button v-if="showNoRequiredRrr.length > 0 && editType !== 'read' && (iapModel === '2' || isPackage)"
                :button-text="'productmanage.product.adding.title'" :click-fun="addFun" button-type="add" size="sm"
                color="red" style="margin: 10px 15px"></hc-button>
        </div> -->
    <el-button @click="addFun">新增</el-button>
    <!-- 多语言选择 -->
    {{ extraType }} {{ currentLang }}
    <div v-if="extraType === 'displayExtra'">多语言选择
        <!-- <hc-multi-choise v-if="extraType === 'displayExtra' && formData.datalist.length" :model="langList"
            :items="allLangList" :edit-type="editType" :default-key="defaultLang" :selected-valid="selectedValid"
            :select-fun="selectLang" :remove-fun="removeLang" :click-fun="changeLang"
            placeholder="hc.directive.multiLanguage.addOther.option">
        </hc-multi-choise> -->
        <el-select v-model="currentLang" placeholder="请选择语言" @change="handleLangChange">
            <el-option v-for="lang in langList" :key="lang.key" :label="lang.name" :value="lang.key" />
        </el-select>
    </div>
    <el-card>formData    {{ formData }} </el-card>
    <el-card>selectedRows {{ selectedRows }}</el-card>
    <el-table :data="formData" @selection-change="handleSelectionChange">
        <!-- 多选框列 -->
        <el-table-column type="selection" v-if="editType === 'edit'"></el-table-column>

        <!-- 参数名称列 -->
        <el-table-column prop="name" label="参数名称" min-width="10%"></el-table-column>

        <!-- 参数键列 -->
        <el-table-column prop="key" label="参数键" min-width="10%"></el-table-column>

        <!-- 参数值列 -->
        <el-table-column label="参数值" min-width="20%">
            <template #default="scope">
                <component :is="getComponentType(scope.row.type)" v-bind="getComponentProps(scope.row)"
                    v-model="scope.row.value" :placeholder="scope.row.placeholder || '请输入内容'"
                    @change="handleInputOrChange()" v-if="extraType === 'logicExtra'">
                    <el-option v-if="scope.row.type === 'select'" v-for="option in scope.row.options"
                        :key="option.value" :label="option.label" :value="option.value"></el-option>
                </component>
                <el-input v-else v-model.trim="scope.row.value[currentLang]" :disabled="disabled(scope.row)"
                    :placeholder="scope.row.placeholder || '请输入内容'" show-word-limit maxlength="1024"
                    @change="handleInputOrChange()">
                </el-input>
            </template>
        </el-table-column>


        <!-- 参数说明列 -->
        <el-table-column label="参数说明" min-width="40%">
            <template #default="scope">
                <div v-if="scope.row.description">{{ scope.row.description }}</div>
                <el-popover effect="light" trigger="hover" placement="left" width="auto">
                    <template #default>
                        <el-image style="width: 200px; height: 200px"
                            :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                            :fit="fit" />
                    </template>
                    <template #reference>
                        <el-link>示意图</el-link>
                    </template>
                </el-popover>
            </template>
        </el-table-column>

        <!-- 操作列，仅在编辑模式下显示 -->
        <el-table-column label="操作" min-width="10%" v-if="isEditing">
            <template #default="scope">
                <el-button type="text" size="small" @click="handleDelete(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
import { findFormElementByName } from "@/utils/util.js";
import {
    ElButton,
    ElInputNumber,
    ElInput,
    ElSelect,
    ElOption,
    ElMessageBox,
    ElMessage,
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio,
    ElSwitch,
    ElDatePicker,
    ElTimePicker,
} from "element-plus";

export default {
    props: {
        // 表单数据
        modelValue: {
            type: Array,
            required: true,
        },
        // 表单配置
        fieldList: {
            type: Array,
            required: true,
        },
        // 编辑场景
        editType: { type: String, default: 'edit' },
        // 自定义属性类型 displayExtra / logicExtra
        extraType: { type: String, default: 'logicExtra' },
        // 提示信息
        markTip: {
            type: Array,
            default() {
                return null
            }
        },
        // 当前活动类型，传入则进行过滤
        campType: { type: String },
        iapModel: { type: String },

        // 父组件传递的options，配置项场景使用
        dynamicOptionsMap: {
            type: Object,
            default() {
                return null
            }
        }

    },
    components: {
        ElButton,
        ElInputNumber,
        ElInput,
        ElSelect,
        ElOption,
        ElMessageBox,
        ElMessage,
        ElCheckboxGroup,
        ElCheckbox,
        ElRadioGroup,
        ElRadio,
        ElSwitch,
        ElDatePicker,
        ElTimePicker,
    },
    data() {
        return {
            activeColor: '#409EFF',
            computedHeight: 'auto',
            selectedRows: [], // 选中的行
            editing: false, // 是否处于编辑模式
            formData: [],
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
            validationErrors: {}
        };
    },
    computed: {
        // 动态计算 v-model 的值
        inputValue() {
            return (item, index) => {
                const getter = () => {
                    if (this.extraType === 'extraTypeValue') {
                        return item.value[this.currentLang];
                    } else {
                        return item.value;
                    }
                };

                const setter = (newValue) => {
                    if (this.extraType === 'extraTypeValue') {
                        Vue.set(item.value, this.currentLang, newValue);
                    } else {
                        item.value = newValue;
                    }
                };

                return {
                    get: getter,
                    set: setter
                };
            };
        }
    },
    created() {
        this.init();
    },

    methods: {
        init() {
            // 构造表格数据
            this.formData = this.fieldList.map((item) => {
                let value = this.modelValue.find((item2) => item2.key === item.key).value;
                let hasData = value !== undefined && value !== null;
                let checked = hasData || item.noEmpty;
                // 时间选择器默认值
                let time = item.keyInputType === 4 ? { start: value } : undefined;
                // 呈现类场景value结构为对象，键为语言标识，值为内容
                if (this.extraType === 'displayExtra' && value === null) {
                    value = {};
                    this.langList.forEach(langInfo => value[langInfo.key] = '');
                }
                // 构造下拉框选项列表
                let options = [];
                if (item.keyInputType === "select") {
                    if (this.dynamicOptionsMap && Object.keys(this.dynamicOptionsMap).includes(item.configKey)) {
                        // 从父组件传入下拉框的选项列表，配置项场景适用
                        options = this.dynamicOptionsMap[item.configKey];
                    } else {
                        // 从数据字典读取下拉框的选项列表，普通场景适用
                        this.$dict.getDictInfoList(item.configKey).then((dictData) => {
                            options = dictData[item.configKey] || [];
                        });
                    }
                }
                return {
                    ...item,
                    value,
                    hasData,
                    checked,
                    time,
                    options,
                };
            });

            // 如果存在支付场景，需要对表格数据进行过滤
            if (this.extraType === "payExtra") {
                this.formData = this.formData.filter(
                    (item) => item.key !== "extra_pay_type"
                );
            }
            // 如果存在活动场景，需要对表格数据进行过滤
            if (this.extraType === "activityExtra") {
                this.formData = this.formData.filter(
                    (item) => item.key !== "extra_activity_type"
                );
            }
        },
        getComponentType(type) {
            const componentMap = {
                text: "el-input",
                number: "el-input-number",
                select: "el-select",
                checkbox: "el-checkbox-group",
                radio: "el-radio-group",
                date: "el-date-picker",
                switch: "el-switch",
                textarea: "el-input",
                // 添加更多类型...
            };
            return componentMap[type] || "el-input"; // 默认为文本输入框
        },

        // 根据行数据和字段配置获取组件的属性
        getComponentProps(row) {
            // 初始化一个空对象来存储组件属性
            const props = {};

            // 根据字段类型来决定组件的属性
            switch (row.type) {
                case "text":
                    // 对于文本类型，不需要额外属性，直接跳过
                    break;
                case "textarea":
                    // 对于文本域类型，设置占位符
                    props.placeholder = row.placeholder;
                    break;
                case "number":
                    // 对于数字类型，设置最小值、最大值和占位符
                    props.min = row.min;
                    props.max = row.max;
                    props.placeholder = row.placeholder;
                    break;
                case "select":
                    // 对于选择框类型，设置占位符和选项
                    props.placeholder = row.placeholder;
                    break;
                case "date":
                    // 对于日期类型，设置日期格式、值格式和占位符
                    props.type = "date";
                    props.format = row.format;
                    props.valueFormat = row.valueFormat;
                    props.placeholder = row.placeholder;
                    break;
            }
            props.disabled = this.disabled(row); // 禁用组件
            return props;
        },
        disabled(row) {
            // 判断行是否被选中
            const isSelected = this.selectedRows.some(
                (selectedRow) => selectedRow.key === row.key
            );
            if (!isSelected || this.editType === 'read') {
                return true;
            } else {
                return false;
            }
        },
        handleSelectionChange(selection) {
            console.log(selection)
            this.selectedRows = selection;
            this.handleInputOrChange()
        },
        // 处理输入或更改事件的函数
        handleInputOrChange() {
            const filteredFormData = this.formData
                .filter((item) =>
                    this.selectedRows.some((selectedRow) => selectedRow.key === item.key)
                )
                .map((item) => ({
                    key: item.key,
                    value: item.value,
                    // 只选择父组件需要的属性
                }));
            console.log(
                "🚀 ~ handleInputOrChange ~ filteredFormData:",
                filteredFormData
            );
            this.$emit("update:modelValue", filteredFormData);
        },
                // 新增语言
                selectLang(langInfo) {
            this.formData.dataList = this.formData.dataList.map((item) => {
                item.value = { ...item.value, [langInfo.key]: '' };
                return item;
            });
            this.selectedValid[langInfo.key] = 'success';
        },

        // 删除语言
        removeLang(langInfo) {
            this.formData.dataList = this.formData.dataList.map((item) => {
                const newItem = typeUtil.deepCopy(item);
                delete newItem.value[langInfo.key];
                return newItem;
            });
        },// 切换语言
        changeLang(langInfo) {
            this.currentLang = langInfo.key;
        },
        validate() {
            return new Promise((resolve, reject) => {
                this.$refs.formRef.validate((valid) => {
                    if (valid) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            });
        }
    },
};
</script>

<style scoped>
.el-table {
    width: 100%;
    margin-top: 20px;
}
</style>
