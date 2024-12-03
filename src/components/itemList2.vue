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
      localStudentsCopy: this.modelValue.map((student) => ({
        ...student,
        ...this.getDefaultValues(),
      })),
    };
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
    getDefaultValues() {
      // 根据配置生成默认值
      return this.config.reduce((acc, field) => {
        if (!this.modelValue[0] || !this.modelValue[0][field.key]) {
          acc[field.key] =
            field.default || (field.type === "select" ? "" : null);
        }
        return acc;
      }, {});
    },
    getComponentType(type) {
      switch (type) {
        case "text":
          return "el-input";
        case "number":
          return "el-input-number";
        case "select":
          return "el-select";
        case "textarea":
          return "el-input";
        case "date":
          return "el-date-picker";
        default:
          return "el-input"; // 默认使用文本输入框
      }
    },
    getComponentProps(row, field) {
      const props = {};

      switch (field.type) {
        case "text":
          props.input = (value) =>
            this.handleInputChange(value, field.key, true);
          break;
        case "textarea":
          props.placeholder = field.placeholder;
          props.input = (value) =>
            this.handleInputChange(value, field.key, true);
          break;
        case "number":
          props.min = field.min;
          props.max = field.max;
          props.placeholder = field.placeholder;
          props.change = (value) =>
            this.handleInputChange(value, field.key, false);
          break;
        case "select":
          props.placeholder = field.placeholder;
          props.options = field.options;
          props.change = (value) =>
            this.handleInputChange(value, field.key, false);
          break;
        case "date":
          props.type = "date";
          props.format = field.format;
          props.valueFormat = field.valueFormat;
          props.placeholder = field.placeholder;
          props.change = (value) =>
            this.handleInputChange(value, field.key, false);
          break;
      }

      return props;
    },

    handleInputChange(index, key, value) {
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
    },
  },
};
</script>
