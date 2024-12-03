<template>
  <el-table :data="localStudentsCopy" style="width: 100%">
    <el-table-column
      v-for="(field, index) in config"
      :key="index"
      :prop="field.key"
      :label="field.label"
      :width="field.width || 'auto'"
    >
      <template #default="scope">
        <component
          :is="getComponentType(field.type)"
          v-bind="getComponentProps(scope.row, field)"
          v-model="scope.row[field.key]"
          @input="
            handleInputOrChange(
              scope.$index,
              field.key,
              $event,
              shouldUseInputEvent(field.type)
            )
          "
          @change="
            handleInputOrChange(
              scope.$index,
              field.key,
              $event,
              shouldUseChangeEvent(field.type)
            )
          "
        ></component>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
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
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    config: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localStudentsCopy: null,
    };
  },
  created() {
    // 在组件创建时，根据配置生成默认值
    this.localStudentsCopy = this.modelValue.map((student) => {
      const defaultValues = this.getDefaultValues();
      return { ...student, ...defaultValues };
    });
  },
  computed: {
    localStudents: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        console.log("newValue", newValue);
        this.$emit("update:modelValue", newValue);
      },
    },
  },
  methods: {
    /**
     * 获取默认值
     * 根据配置生成默认值对象，用于初始化表单或其他结构
     * @returns {Object} 默认值对象，包含根据配置生成的所有默认值
     */
    getDefaultValues() {
      // 根据配置生成默认值
      return this.config.reduce((acc, field) => {
        // 如果模型值中不存在当前字段的值，则使用字段的默认值或根据类型设定空值
        if (!this.modelValue[0] || !this.modelValue[0][field.key]) {
          acc[field.key] =
            field.default || (field.type === "select" ? "" : null);
        }
        return acc;
      }, {});
    },
    /**
     * 根据类型获取相应的组件类型
     * 此函数用于根据不同的输入类型，返回对应的Element UI组件类型
     * @param {string} type - 输入类型，决定返回哪种组件类型
     * @returns {string} - 对应的Element UI组件类型
     */
    getComponentType(type) {
      switch (type) {
        case "text":
          return "el-input"; // 对于文本类型，返回文本输入框组件
        case "number":
          return "el-input-number"; // 对于数字类型，返回数字输入框组件
        case "select":
          return "el-select"; // 对于选择类型，返回选择框组件
        case "textarea":
          return "el-input"; // 对于多行文本类型，返回文本输入框组件
        case "date":
          return "el-date-picker"; // 对于日期类型，返回日期选择框组件
        default:
          return "el-input"; // 默认使用文本输入框组件
      }
    },
    /**
     * 根据行数据和字段配置获取组件的属性
     * 此函数用于根据字段类型生成相应组件所需的特定属性，确保组件能够根据配置正确渲染
     * @param {Object} row - 行数据，包含要显示的字段信息
     * @param {Object} field - 字段配置，包括字段类型、占位符、格式等
     * @returns {Object} props - 根据字段类型生成的组件属性对象
     */
    getComponentProps(row, field) {
      // 初始化一个空对象来存储组件属性
      const props = {};

      // 根据字段类型来决定组件的属性
      switch (field.type) {
        case "text":
          // 对于文本类型，不需要额外属性，直接跳过
          break;
        case "textarea":
          // 对于文本域类型，设置占位符
          props.placeholder = field.placeholder;
          break;
        case "number":
          // 对于数字类型，设置最小值、最大值和占位符
          props.min = field.min;
          props.max = field.max;
          props.placeholder = field.placeholder;
          break;
        case "select":
          // 对于选择框类型，设置占位符和选项
          props.placeholder = field.placeholder;
          props.options = field.options;
          break;
        case "date":
          // 对于日期类型，设置日期格式、值格式和占位符
          props.type = "date";
          props.format = field.format;
          props.valueFormat = field.valueFormat;
          props.placeholder = field.placeholder;
          break;
      }

      // 返回根据字段类型生成的组件属性
      return props;
    },
    /**
     * 判断是否应使用输入事件
     *
     * @param {string} type - 输入元素的类型，如 'text' 或 'textarea'
     * @returns {boolean} - 如果类型为 'text' 或 'textarea'，则返回 true；否则返回 false
     */
    shouldUseInputEvent(type) {
      return ["text", "textarea"].includes(type);
    },
    /**
     * 判断是否应使用 change 事件。
     *
     * @param {string} type - 组件的类型。
     * @returns {boolean} - 如果类型是 number、select 或 date，则返回 true；否则返回 false。
     */
    shouldUseChangeEvent(type) {
      return ["number", "select", "date"].includes(type);
    },
    /**
     * 处理输入或更改事件的函数
     *
     * 此函数根据 shouldUpdateImmediately 参数决定是否立即更新学生列表
     * 如果 shouldUpdateImmediately 为真，函数会立即根据输入对学生列表进行过滤和映射
     * 过滤条件是年龄不大于11岁，映射结果只包含父组件需要的属性
     *
     * @param {number} index - 学生在列表中的索引
     * @param {string} key - 学生对象的键
     * @param {any} value - 学生对象的值
     * @param {boolean} shouldUpdateImmediately - 是否立即更新学生列表
     */
    handleInputOrChange(index, key, value, shouldUpdateImmediately) {
      // 根据 shouldUpdateImmediately 决定是否立即触发更新
      if (shouldUpdateImmediately) {
        console.log("handleInputChange", index, key, value);
        // 过滤年龄不大于11岁的学生，并只保留父组件关心的属性
        const filteredStudents = this.localStudentsCopy
          .filter((student) => student.age <= 11)
          .map((student) => ({
            id: student.id,
            name: student.name,
            age: student.age,
            // 只选择父组件需要的属性
          }));
        this.localStudents = filteredStudents;
      }
    },
  },
};
</script>
