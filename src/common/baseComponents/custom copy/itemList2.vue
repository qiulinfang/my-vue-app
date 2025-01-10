<template>
  <el-form :model="localStudentsCopy" ref="formRef">
    <el-table :data="localStudentsCopy" style="width: 100%">
      <el-table-column
        v-for="(field, index) in config"
        :key="index"
        :prop="field.key"
        :label="field.label"
        :width="getColumnWidth(field)"
      >
        <template #default="scope">
          <el-form-item :prop="`${scope.$index}.${field.key}`" :rules="field.rules">
            <component
              :is="getComponentType(field.type)"
              v-bind="getComponentProps(scope.row, field)"
              v-model="scope.row[field.key]"
              :options="field.options"
              @input="handleInputOrChange(scope.$index, field.key, $event, shouldUseInputEvent(field.type))"
              @change="handleInputOrChange(scope.$index, field.key, $event, shouldUseChangeEvent(field.type))"
              v-bind:v-custom-directive="getCustomDirectiveParams(scope.row, field)"
            >
              <el-option
                v-if="field.type === 'select'"
                v-for="option in field.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </component>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
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
    // 根据配置生成默认值
    getDefaultValues() {
      return this.config.reduce((acc, field) => {
        // 如果模型值中不存在当前字段的值，则使用字段的默认值或根据类型设定空值
        if (!this.modelValue[0] || !this.modelValue[0][field.key]) {
          acc[field.key] =
            field.default || (field.type === "select" ? "" : null);
        }
        return acc;
      }, {});
    },
    // 根据类型获取相应的组件类型
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
    // 根据行数据和字段配置获取组件的属性 
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
    getColumnWidth(field) {
      // 如果父组件没有传入 width，则根据输入组件类型设置默认宽度
      if (field.width) {
        return field.width;
      }
      // 根据输入组件类型设置默认宽度
      switch (field.type) {
        case 'text':
        case 'textarea':
          return 'auto'; // 文本输入框和文本区域默认宽度为 auto
        case 'number':
          return '100px'; // 数字输入框默认宽度为 100px
        case 'select':
          return '150px'; // 下拉选择框默认宽度为 150px
        case 'date':
          return '200px'; // 日期选择器默认宽度为 200px
        default:
          return 'auto'; // 默认宽度为 auto
      }
    },
    // 判断是否应使用输入事件
    shouldUseInputEvent(type) {
      return ["text", "textarea"].includes(type);
    },
    // 判断是否应使用 change 事件
    shouldUseChangeEvent(type) {
      return ["number", "select", "date"].includes(type);
    },
    // 处理输入或更改事件的函数
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
    // 获取自定义指令的参数
    getCustomDirectiveParams(row, field) {
      // 根据需要返回自定义指令的参数
      return {
        row,
        field,
        // 其他需要传递的参数
      };
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formRef.validate((valid) => {
          console.log("🚀 ~ this.$refs.formRef.validate ~ valid:", valid)
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
/* 你的样式 */
</style>