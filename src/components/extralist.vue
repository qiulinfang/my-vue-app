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
     需求7：在iap场景和业务包场景下，只展示必要的配置项
      -->
    <el-form :model="formData" :rules="rules" ref="formRef">
        <mark-tip :mark-tip="markTip" :needSymbol="true" v-if="markTip"></mark-tip>
        <!-- 多语言选择 -->
        <hc-multi-choise v-if="extraType === 'displayExtra' && formData.datalist.length" :model="langList"
            :items="allLangList" :edit-type="editType" :default-key="defaultLang" :selected-valid="selectedValid"
            :select-fun="selectLang" :remove-fun="removeLang" :click-fun="changeLang"
            placeholder="hc.directive.multiLanguage.addOther.option">
        </hc-multi-choise>
        <div style="display: flex; flex-direction: row-reverse;">
            <hc-button v-if="showNoRequiredRrr.length > 0 && editType !== 'read' && (iapModel === '2' || isPackage)"
                :button-text="'productmanage.product.adding.title'" :click-fun="addFun" button-type="add" size="sm"
                color="red" style="margin: 10px 15px"></hc-button>
        </div>
        <el-table :data="formData" @selection-change="handleSelectionChange">
            <!-- 多选框列 -->
            <el-table-column type="selection"></el-table-column>

            <!-- 参数名称列 -->
            <el-table-column prop="name" label="参数名称" min-width="10%"></el-table-column>

            <!-- 参数键列 -->
            <el-table-column prop="key" label="参数键" min-width="10%"></el-table-column>

            <!-- 参数值列 -->
            <el-table-column label="参数值" min-width="20%">
                <template #default="scope">
                    <component :is="getComponentType(scope.row.type)" v-bind="getComponentProps(scope.row)"
                        v-model.trim="scope.row.value" :placeholder="scope.row.placeholder || '请输入内容'"
                        :options="scope.row.options" @change="handleInputOrChange()" />
                    <el-option v-if="scope.row.type === 'select'" v-for="option in scope.row.options"
                        :key="option.value" :label="option.label" :value="option.value"></el-option>
                </template>
            </el-table-column>
            <!-- 输入框 -->
            <hc-input v-if="extraItem.keyInputType === 3" :name="`dataList.${index}.value`"
                :id="`extraForm_dataList.${index}.value`" :no-title="true" v-model="extraItem.value" input-style="lg"
                :edit-type="getEditType(extraItem.checked)" :async-check-fun="[logicExtraValid, extraItem]"
                :non-empty="extraItem.checked" :clearable="true" max-length="1024" show-word-limit="true"
                v-cmp:extraList="[...formDiff, 'extraList', extraItem]"></hc-input>
            <!-- 遍历 dataList，为每个 extraItem 创建输入框 -->
            <div v-for="(extraItem, index) in dataList" :key="index">
                <div class="w-40 vertical-center" :class="[isPackage ? 'w30' : '']"
                    v-if="extraType === 'extraTypeValue'">
                    <div v-for="langInfo in langList" :key="langInfo.key" v-show="langInfo.key === currentLang">
                        <!-- 输入框 -->
                        <hc-input v-if="extraItem.keyInputType === 3" :name="`dataList.${index}.value.${langInfo.key}`"
                            :id="`extraForm_dataList.${index}.value.${langInfo.key}`" :no-title="true"
                            v-model="extraItem.value[langInfo.key]" :non-empty="extraItem.checked" input-style="lg"
                            show-word-limit="true" max-length="1024"
                            :async-check-fun="[displayExtraValid, extraItem.value[langInfo.key], extraItem, [langInfo.key]]"
                            pattern-tip="hu.vue.common.displayExtra.input.valid.tips"
                            :edit-type="getEditType(extraItem.checked)" @hc-input-change="valueChange"
                            v-cmp:extraList="[...formDiff, formDiffKey, extraItem, langInfo.key]"></hc-input>
                    </div>
                </div>
            </div>
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
    </el-form>
</template>

<script>
// import { findFormElementByName } from "@/utils/util";
// import formService from '../vbusiness/services/formService.js';
// import { htmlDecode } from '../utils/func/codec.js';
// import { vcommon } from '@hw-videoserver/web-framework';
// import queryCommonService from '../vbusiness/services/queryCommonService';
// import { getErrMsg, langListSort, changeValid, assembleDomain } from '@utils/func/commonfun';
// import initFun from '@/vbusiness/init/init';
// import tradeCommonService from '@/vbusiness/services/tradeCommonService';
// import packageInfoMixins from '@/vpages/productManage/packageInfo/packageInfoMixins';

// const isCIBN = initFun.judgmentIsCIBN();

// const {
//     vService: { http: httpService },
//     vUtils: { type: typeUtil, i18n },
// } = vcommon;


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
        modelValue: {
            type: Array,
            required: true,
        },
        fieldList: {
            type: Array,
            required: true,
        },
        checked: Boolean,
        data: {
            type: Array, default() {
                return []
            }
        }, // 查询到的数据
        fieldList: {
            type: Array, default() {
                return []
            }
        }, // 初始配置数据
        editType: { type: String, default: 'edit' }, // 自定义属性类型 displayExtra / logicExtra
        extraType: { type: String, default: 'logicExtra' }, // 自定义属性类型 displayExtra / logicExtra
        campType: { type: String }, // 当前活动类型，传入则进行过滤
        isActive: {
            type: Boolean,
            default: true
        },
        campScene: [String, Number], // 当前使用场景更换，传入则进行过滤
        checkBoxDisabled: Boolean, // 全选按钮是否置灰
        hasUrl: Boolean, // 参数中包含了 url
        formDiff: {
            type: Array, default() {
                return [undefined, undefined]
            }
        },
        formDiffKey: {
            type: String,
            default: 'customFieldList'
        },
        extraAccordionTitle: { type: String }, // 是否需要手风琴标题旁的 tips 提示
        needTips: {
            type: Boolean,
            default: false
        },
        tips: {
            type: Array,
            default() {
                return []
            }
        },
        campScene: [String, Number], // 当前使用场景更换，传入则进行过滤
        checkBoxDisabled: Boolean, // 全选按钮是否置灰
        hasUrl: Boolean, // 参数中包含了 url
        formDiff: {
            type: Array,
            default() {
                return [undefined, undefined]
            }
        },
        formDiffKey: {
            type: String,
            default: 'customFieldList'
        },
        extraAccordionTitle: { type: String }, // 是否需要手风琴标题旁的 tips 提示
        needTips: {
            type: Boolean,
            default: false
        },
        tips: {
            type: Array,
            default() {
                return []
            }
        },
        markTip: {
            type: Array,
            default() {
                return null
            }
        },
        urlArrFlag: Boolean,
        iapModel: { type: String },
        isPackage: Boolean,
        productType: { type: [String, Number] },
        spId: { type: [String, Number] },
        packageMode: {
            type: Number,
        },
        packageAppType: {
            type: Number,
        },
        supportIap4SpidFlag: Boolean,
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
            selectedRows: [], // 选中的行
            editing: false, // 是否处于编辑模式
            formData: [],

            formData: {
                dataList: [], // 表格数据
            },
            beInfo: this.$store.getters['beinfo/current'] && this.$store.getters['beinfo/current'].beInfo,
            currentLang: '', // 当前选中的语言
            defaultLang: '', // 默认语言
            allLangList: [], // 多语言控件的所有语言列表
            langList: [], // 多语言控件的当前语言列表
            selectedValid: {}, // 多语言控件的语言颜色显示
            checkAll: false, // 是否全选
            isIndeterminate: false,
            urlValidReg: '',
            pictureDiagramVisible: false,
            pictureDiagramSrc: undefined,
            showRequiredRrr: [], // 必填项展示数组
            showNoRequiredRrr: [], // 非必填项展示数组
            showEditedRrr: [], // 必填项展示数组
            showFinalArr: [], // 最终展示数据
            allDataFiedlist: []
        };
    },
    computed: {
        extraTitle() {
            if (this.extraAccordionTitle) {
                return this.extraAccordionTitle;
            }
            return this.extraType === 'displayExtra' ? "productmanage.product.extratitle.present.label" : "productmanage.product.extratitle.label";
        },

        parameterValue() {
            let iap4Label = i18n.$t('productmanage.aggregationmanagement.parameter.value.menu');
            let iap2Label = i18n.$t('productmanage.product.extra.value');
            // 判断是否为iap4.0，是否必填取决于配置数据
            let label = this.iapModel === '2' ? iap4Label : iap2Label;
            return `${label}${this.currentLang}`;
        },

        selectItems() {
            return this.formData.dataList.filter(item => {
                return item.checked === true;
            });
        },

        checkBoxDisabledFun() {
            return this.editType === 'read' || this.checkBoxDisabled;
        },
        extraFieldSelect: function () {
            let option = [];
            const fieldList = this.filterFiledList(this.fieldList);
            option = fieldList.map(item => {
                let disabled = false;
                if (this.formData.dataList?.findIndex(val => item.configKey === val.configKey) !== -1) {
                    disabled = true;
                }
                return {
                    ...item,
                    dictKey: item.configKey,
                    dictName: item.keyName,
                    disabled: disabled
                }
            });

            // 赋值描述desc字段
            for (let field of fieldList) {
                for (let item of this.formData.dataList) {
                    if (field.configKey === item.configKey) {
                        item.desc = field.keyDesc;
                        item.diagram = field.diagram;
                        item.isUrl = field.isUrl;
                        item.keyInputType = field.keyInputType;
                        if (this.supportIap4SpidFlag) {
                            item.configKey = field.configKey;
                        }
                        // 为逻辑类且为单选框时，组装的下拉枚举赋值
                        if (this.extraType === 'logicExtra' && item.keyInputType === 5) {
                            item.options = field.options;
                        }
                    }
                }
            }

            return option;
        },
    },
    watch: {
        "fieldList": {
            handler() {
                this.init();
            },
            deep: true
        },
        "data": {
            handler() {
                this.init();
            },
            deep: true
        },

        campType(val) {
            this.init(val);
            // 活动类型切换后等待一段时间重新进行校验
            setTimeout(() => {
                // 先校验
                this.valueChange();
            }, 100);
        },
        campScene() {
            this.init(this.campType);
            // 活动类型切换后等待一段时间重新进行校验
            setTimeout(() => {
                // 先校验
                this.valueChange();
            }, 100);
        },
        "formData.dataList": {
            handler(val) {
                if (this.iapModel === '2' && !this.isPackage) {
                    let arr = [];
                    arr = this.initEditData(val);
                    this.$emit('update:extralist', arr);
                } else {
                    if (this.isPackage) {
                        this.$emit('update:extralist', val);
                    } else {
                        this.$emit('update:extralist', val);
                    }
                }
            },
            deep: true
        },
        "iapModel": {
            handler() {
                this.initData();
            },
            deep: true
        },
        "productType": {
            handler() {
                this.initData();
            },
            deep: true
        },
        "spId": {
            // 切换spId重新赋值去除不符合条件的值
            handler() {
                this.formData.dataList = this.filterFiledList(this.formData.dataList);
            }
        },
        "dynamicOptionsMap": {
            handler() {
                if (this.editType === 'add') {
                    this.formData.dataList.forEach((item) => {
                        if (item.keyInputType === 5) {
                            if (this.dynamicOptionsMap && Object.keys(this.dynamicOptionsMap).includes(item.configKey)) {
                                // 从父组件传入下拉框的选项列表
                                item.options = this.dynamicOptionsMap[item.configKey];
                                item.value = null;
                            }
                        }
                    });
                }
            },
            deep: true
        }

    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 构造表格数据
            this.formData.dataList = this.fieldList.map((item) => {
                let value = this.modelValue.find(
                    (item2) => item2.key === item.key
                ).value;
                let hasData = value !== undefined && value !== null;
                let checked = hasData || item.noEmpty;
                // 时间选择器默认值
                let time = item.keyInputType === 4 ? { start: value } : undefined;
                // 呈现类场景value初始化
                if (this.extraType === "displayExtra" && value === null) {
                    value = {};
                    this.langList.forEach((langInfo) => (value[langInfo.key] = ""));
                }
                // 构造下拉框选项列表
                let options = [];
                if (item.keyInputType === 5) {
                    if (
                        this.dynamicOptionsMap &&
                        Object.keys(this.dynamicOptionsMap).includes(item.configKey)
                    ) {
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
            // 初始化表格数据
            this.formData = this.modelValue.reduce((acc, item) => {
                // 找到 array2 中 key 相同的元素
                const matchingItem = this.fieldList.find(
                    (item2) => item2.key === item.key
                );

                if (matchingItem) {
                    // 合并两个对象
                    acc.push({ ...item, ...matchingItem });
                } else {
                    // 如果没有找到匹配项，直接添加原对象
                    acc.push(item);
                }

                return acc;
            }, []);

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
        // 当 formData 或 selectedRows 发生变化时，表格会重新渲染，getComponentProps 会被重新调用
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

            // 判断行是否被选中
            const isSelected = this.selectedRows.some(
                (selectedRow) => selectedRow.key === row.key
            );
            if (!isSelected) {
                props.disabled = "true"; // 禁用组件
            }

            return props;
        },
        // 监听表格的选中事件
        handleSelectionChange(selection) {
            console.log("🚀 ~ handleSelectionChange ~ selection:", selection);
            this.selectedRows = selection;
            this.handleInputOrChange();
        },

        // 处理输入或更改事件
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
        },
        _MatchReg(str, sRegexp) {
            let gettype = Object.prototype.toString;
            if (gettype.call(str) === "[object Number]") {
                str = String(str);
            }
            str = str ? str.trim() : "";
            if (typeUtil.isEmpty(str)) return true;
            return str && new RegExp(sRegexp) && new RegExp(sRegexp).test(str);
        },
        _noMatchReg(item, sRegexp) {
            if (Object.prototype.toString.call(item) === "[object Number]") {
                item = String(item);
            }
            item = item ? item.trim() : "";
            if (typeUtil.isEmpty(item)) return true;
            return item && new RegExp(sRegexp) && !new RegExp(sRegexp).test(item);
        },
        logicExtraValid(extraItem) {
            const self = this;
            if (self.urlArrFlag === true) return;
            return new Promise((resolve, reject) => {
                if (extraItem.isUrl) {
                    let urlList = extraItem.value.split(",");
                    urlList.forEach(function (item) {
                        if (self._MatchReg(item, self.urlValidReg)) {
                            self.urlValidFun(urlList, false, undefined, resolve, reject);
                        } else {
                            reject({
                                message: i18n.$t("productmanage.package.url.valid.message"),
                            });
                        }
                    });
                } else {
                    if (this._noMatchReg(extraItem.value, /[#"\$^*<>\|]/)) {
                        resolve(true);
                    } else {
                        reject({
                            message: i18n.$t("productmanage.product.extravalid.message"),
                        });
                    }
                }
            });
        },
        // 校验URL是否合法的方法
        urlValidFun(urlList, needChange, lang, resolve, reject) {
            httpService.ajax({
                url: isCIBN ? 'cibn/urlDomainValidation' : 'aoi/urlDomainValidation',
                method: "post",
                headers: { isFlowReq: true },
                data: {
                    key: 'value',
                    name: i18n.$t('productmanage.oroductpresent.link.label'),
                    urlList: urlList
                },
                type: 1,
                successFunction: (res) => {
                    if (res && res.retCode === "0") {
                        needChange && changeValid(this.selectedValid);
                        resolve();
                    } else if (res && String(res.retCode) === "301320") {
                        // URL不在白名单
                        const errorMsg = getErrMsg(res);
                        needChange && changeValid(this.selectedValid, lang);
                        reject({ message: errorMsg });
                    } else {
                        needChange && changeValid(this.selectedValid, lang);
                        reject({
                            message: i18n.$t('productmanage.package.url.valid.message')
                        });
                    }
                }
            });
        },
        // 提供给外部调用的校验方法，返回一个promise
        validate() {
            return new Promise((resolve, reject) => {
                this.$refs.extraForm.submit(() => {
                    changeValid(this.selectedValid);
                    resolve();
                }, (valid, failedMessage) => {
                    // 找到第一个失败的表单项名称
                    const fields = Object.keys(failedMessage);
                    const fieldName = fields[0];
                    if (fieldName) {
                        if (this.extraType === 'logicExtra') {
                            formService.scrollToTarget('extraForm', fieldName);
                        } else {
                            const templList = fieldName.split('.');
                            const lang = templList[templList.length - 1];
                            if (this.currentLang !== lang) {
                                this.currentLang = lang;
                                this.langList.forEach((langInfo) => langInfo.current = langInfo.key === lang);
                                this.$nextTick(() => formService.scrollToTarget('extraForm', fieldName));
                            } else {
                                formService.scrollToTarget('extraForm', fieldName);
                            }
                            changeValid(this.selectedValid, [lang]);
                        }
                    }
                    reject(`Validate ${fieldName} failed.`);
                });
            });
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

        // 获取编辑类型
        getEditType(checked) {
            // 只有整体可编辑，且复选框勾选时，才允许编辑
            if (this.editType !== 'read' && checked === true) return 'edit';
            return 'read';
        },

        // 判断选择项是否禁用
        isDisabledSelect(item) {
            if (this.editType !== 'read' && (item.limitation === 0)) return 'edit';
            return 'read';
        },

        // 复选框值变化
        checkedChange(index, $event) {
            const extraItem = this.formData.dataList[index];
            extraItem.checked = $event;

            this.checkAll = this.formData.dataList.length === this.selectItems.length;
            this.isIndeterminate = this.selectItems.length > 0 && this.selectItems.length < this.formData.dataList.length;

            this.$nextTick(() => {
                this.valueChange();
            });
        },

        // 输入框或者选择框值变化
        valueChange() {
            if (this.hasUrl) return;

            if (this.$refs.extraForm) {
                // 数据变化时进行校验，改变hc-multichoice的语言的颜色
                this.$refs.extraForm.submit(() => { }, (valid, failedMessage) => {
                    const fields = Object.keys(failedMessage).map((fieldName) => {
                        const templList = fieldName.split('.');
                        return templList[templList.length - 1];
                    });
                    changeValid(this.selectedValid, fields);
                }).catch(() => { });
            }
        },
        // 处理全选框变化
        handleCheckAllChange($event) {
            if (this.editType === 'read') {
                return;
            }
            this.formData.dataList.forEach(item => {
                item.checked = $event;
            });
            this.isIndeterminate = false;
        },

        // 显示图片
        showDiagram(picture) {
            if (/^[1-9]_[A-Za-z0-9]*\.(png|jpg)$/.test(picture['diagram'])) {
                let src = `/images/diagram/${picture['diagram']}`;
                src = assembleDomain(src);
                this.pictureDiagramSrc = src;
                this.pictureDiagramVisible = true;
            } else if (/https:\/\//.test(picture.diagram)) {
                this.pictureDiagramSrc = picture.diagram;
                this.pictureDiagramVisible = true;
            }
        },

        // checkBox判断是否必填
        noEmptyFun(item) {
            if (this.iapModel === '2' || this.isPackage) {
                if (this.editType === 'read') {
                    return true;
                } else {
                    // 逻辑类没有这个字段 noEmpty 当前逻辑类展示默认放开复选框，如需修改就要添加特殊处理逻辑
                    return item.noEmpty && item.limitation === 1;
                }
            } else {
                return this.editType === 'read' || item.noEmpty;
            }
        },

        // 初始化选择项
        seletcInit(val, index) {
            // 处理切换时候只有key改变的value，而不是整条数据改变
            this.initNoRequiredArr(this.fieldList);
            if (this.supportIap4SpidFlag) {
                let field = {};
                for (let item of this.showNoRequiredRrr) {
                    if (val === item.configKey) {
                        field = item;
                    }
                }
                this.formData.dataList[index] = field;
            }
        },
        // 处理全选框变化
        handleCheckAllChange($event) {
            if (this.editType === 'read') {
                return;
            }
            this.formData.dataList.forEach(item => {
                item.checked = $event;
            });
            this.isIndeterminate = false;
        },

        // 显示图片
        showDiagram(picture) {
            if (/^[1-9]_[A-Za-z0-9]*\.(png|jpg)$/.test(picture['diagram'])) {
                let src = `/images/diagram/${picture['diagram']}`;
                src = assembleDomain(src);
                this.pictureDiagramSrc = src;
                this.pictureDiagramVisible = true;
            } else if (/https:\/\//.test(picture.diagram)) {
                this.pictureDiagramSrc = picture.diagram;
                this.pictureDiagramVisible = true;
            }
        },

        // checkBox判断是否必填
        noEmptyFun(item) {
            if (this.iapModel === '2' || this.isPackage) {
                if (this.editType === 'read') {
                    return true;
                } else {
                    // 逻辑类没有这个字段 noEmpty 当前逻辑类展示默认放开复选框，如需修改就要添加特殊处理逻辑
                    return item.noEmpty && item.limitation === 1;
                }
            } else {
                return this.editType === 'read' || item.noEmpty;
            }
        },

        // 初始化选择项
        seletcInit(val, index) {
            // 处理切换时候只有key改变的value，而不是整条数据改变
            this.initNoRequiredArr(this.fieldList);
            if (this.supportIap4SpidFlag) {
                let field = {};
                for (let item of this.showNoRequiredRrr) {
                    if (val === item.configKey) {
                        field = item;
                    }
                }
                this.formData.dataList[index] = field;
            }
        },
        // 增加非必填项
        addFun() {
            // 处理业务包场景过滤参数
            let length = this.fieldList.length;
            if (this.isPackage && this.iapModel === 2) {
                let allList = typeUtil.deepCopy(this.fieldList);
                let filterList = this.filterFiledList(allList);
                length = filterList.length;
                this.initNoRequiredArr(filterList);
            }

            if (this.formData.dataList.length >= length) {
                this.$services.remention.func({
                    type: 'error',
                    content: 'productmanage.product.extra.repeat.tips',
                    modal: true
                });
                return false;
            }

            let showNoRequiredRrr = [];
            showNoRequiredRrr = this.showNoRequiredRrr;
            let field = {};
            let hasDataNoRequiredRrr = [];
            // 跟已经添加的数据比较，如果不存在则添加进去
            hasDataNoRequiredRrr = this.formData.dataList.filter(item => item.limitation === 0);
            if (hasDataNoRequiredRrr.length > 0) {
                // 排除添加未选中的项
                let showArr = this.isPackage ? showNoRequiredRrr.reverse() : showNoRequiredRrr;
                showArr.forEach(val => {
                    if (hasDataNoRequiredRrr.findIndex(item => val.configKey === item.configKey) === -1) {
                        field = val;
                    }
                });
            } else {
                field = showNoRequiredRrr[0];
            }
            this.formData.dataList.push(field);
        },

        // 删除非必填项
        deleteItem(index) {
            const showFinalArr = this.formData.dataList;
            showFinalArr.splice(index, 1);
            this.formData.dataList = typeUtil.deepCopy(showFinalArr);
        },
        // 处理修改/查看场景数据，回显时默认展示有数据的无论必填非必填，如果有没数据的必填项也添加进来
        initEditData(dataBox) {
            let arr = [];
            dataBox.forEach((item) => {
                let hasContet = item.value;
                if (this.extraType === 'displayExtra') {
                    if (this.editType === ('edit' || 'copy')) {
                        if (hasContet[this.defaultLang] || item.limitation === 1) {
                            arr.push(item);
                        }
                    } else {
                        if (hasContet[this.defaultLang]) {
                            arr.push(item);
                        }
                    }
                } else {
                    if (this.editType === ('edit' || 'copy')) {
                        if (hasContet || item.limitation === 1) {
                            arr.push(item);
                        }
                    } else {
                        if (hasContet) {
                            arr.push(item);
                        }
                    }
                }
            });
            return arr;
        },
        initData() {
            if (this.editType === 'add') {
                this.formData.dataList = typeUtil.deepCopy(this.allDataFiedlist);
            } else {
                this.formData.dataList = this.formData.dataList?.filter(item => (item.configKey || item.key) !== 'descFor');

            }
        }
    }
};
</script>

<style scoped>
.el-table {
    width: 100%;
    margin-top: 20px;
}
</style>
