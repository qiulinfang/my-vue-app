<template>
    <!-- 需求1：一个手风琴
     需求2：一个多语言
     需求3：一个表格
        element表格第一列是多选，这一行多选的时候其中参数列输入框可以编辑，而且是必选，取消多选的时候参数列置灰
        3.1 每一行的元素通过后端渲染出来
        3.2 表格的参数值列的值和外部双向绑定
        3.3 表格校验

      -->
    <el-form name="myForm"  label-width="100px" class="demo-ruleForm">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" /><br><br>

        <label for="email">电子邮件:</label>
        <input type="email" id="email" name="email" /><br><br>

        <label for="password">密码:</label>
        <input type="password" id="password" name="password" /><br><br>

        <button type="button" @click="testFindFormElement">查找表单元素</button>
    </el-form>

    <button @click="myForm">Find myForm</button>
    <button @click="findParent">Find Parent Component</button>
    <button @click="scroll"> scroll to buttom</button>
    <input type="checkbox" :checked="checked" @change="updateChecked" />
    <mark-tip :mark-tip="markTip" :needSymbol="true" v-if="markTip"></mark-tip>
    <!--多语言选择 -->
    <hc-multi-choise></hc-multi-choise>
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
                    v-model="scope.row.value" :placeholder="scope.row.placeholder || '请输入内容'"
                    :options="scope.row.options" @change="handleInputOrChange()" />
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
    <el-form ref="formRef" name="myForm11" :model="formData">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" name="username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" name="email"></el-input>
        </el-form-item>
    </el-form>
    <div v-for="item in new Array(100)" :key="item">sdfsdf</div>
    <div id="100">sdfsdf</div>
    <button @click="scroll"> scroll to buttom</button>

</template>

<script>
import { findFormElementByName } from "@/utils/util";
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
        };
    },
    created() {
        this.init();
    },
    methods: {
        testFindFormElement() {
            // const form = document.getElementById('myForm');
            const form = document.forms['myForm'];
            const usernameInput = findFormElementByName(form, 'username');
            if (usernameInput) {
                console.log('找到的用户名输入框:', usernameInput);
                usernameInput.value = 'default value';
            }

            const emailInput = findFormElementByName(form, 'email');
            if (emailInput) {
                console.log('找到的电子邮件输入框:', emailInput);
                emailInput.value = 'user@example.com';
            }

            const passwordInput = findFormElementByName(form, 'password');
            if (passwordInput) {
                console.log('找到的密码输入框:', passwordInput);
                passwordInput.value = 'securepassword';
            }

            // 尝试查找一个不存在的元素
            const nonExistentInput = findFormElementByName(form, 'nonexistent');
            if (!nonExistentInput) {
                console.log('未找到 name 为 "nonexistent" 的元素');
            }
        },
        init() {
            // 构造表格数据
            this.formData.dataList = this.fieldList.map((item) => {
                let value = this.modelValue.find((item2) => item2.key === item.key).value;
                let hasData = value !== undefined && value !== null;
                let checked = hasData || item.noEmpty;
                // 时间选择器默认值
                let time = item.keyInputType === 4 ? { start: value } : undefined;
                // 呈现类场景value初始化
                if (this.extraType === 'displayExtra' && value === null) {
                    value = {};
                    this.langList.forEach(langInfo => value[langInfo.key] = '');
                }
                // 构造下拉框选项列表
                let options = [];
                if (item.keyInputType === 5) {
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
            // 初始化表格数据
            this.formData = this.modelValue.reduce((acc, item) => {
                // 找到 array2 中 key 相同的元素
                const matchingItem = this.fieldList.find((item2) => item2.key === item.key);

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

            // 如果存在活动场景，需要对表格数据进行过滤
        },
        updateChecked(event) {
            this.$emit("update:checked", event.target.checked);
        },
        handleSelectionChange(selection) {
            console.log(selection)
            this.selectedRows = selection;
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
        scroll() {
            // 通过表单名称获取表单
            const form = document.forms['myForm11'];

            // 通过控件名称获取特定元素
            const usernameInput = form.elements['username'];
            const emailInput = form.elements['email'];
            const passwordInput = form.elements['password'];
            const targetPosition = usernameInput.offsetTop;

            // 获取目标元素相对于视口的位置
            var rect = usernameInput.getBoundingClientRect();

            // 滚动到目标元素的位置
            window.scrollTo({
                top: rect.top + window.scrollY, // 计算从文档顶部到目标元素的距离
                left: 0,
                behavior: 'smooth' // 平滑滚动
            });
            console.log("🚀 ~ scroll ~ window.scrollY:", window.scrollY)
            console.log("🚀 ~ scroll ~ rect.top:", rect.top)

            console.log(usernameInput, emailInput, passwordInput);

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
        },
        // 处理输入或更改事件的函数
        handleInputOrChange() {
            const filteredFormData = this.formData.map((item) => ({
                key: item.key,
                value: item.value,
                // 只选择父组件需要的属性
            }));
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
