<template>
<label for="name">姓名:</label>
<input type="text" id="name" name="name" placeholder="请输入您的姓名">

<label for="password">密码:</label>
<input type="password" id="password" name="password">
</template>

<script setup>
import { ElInput, ElIcon } from 'element-plus';
import { useNamespace } from '@/utils/class';

// 1. 定义 Props
const props = defineProps({
  /**
   * @description 绑定值 (v-model)
   */
  modelValue: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 输入框类型
   */
  type: {
    type: String,
    values: ['text', 'textarea', 'password', 'number', 'email', 'url', 'tel'],
    default: 'text',
  },
  /**
   * @description 输入框占位文本
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否可清空
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示切换密码图标 (仅 type='password' 时有效)
   */
  showPassword: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 输入框尺寸
   */
  size: {
    type: String,
    values: ['large', 'default', 'small'],
    default: 'default',
  },
  /**
   * @description 输入框前缀图标 (Element Plus 图标名称或组件)
   */
  prefixIcon: {
    type: [String, Object],
    default: '',
  },
  /**
   * @description 输入框后缀图标 (Element Plus 图标名称或组件)
   */
  suffixIcon: {
    type: [String, Object],
    default: '',
  },
  /**
   * @description 输入框行数 (仅 type='textarea' 时有效)
   */
  rows: {
    type: Number,
    default: 2, // Element Plus 默认值
  },
  /**
   * @description 自适应内容高度 (仅 type='textarea' 时有效，可传入对象 { minRows: 2, maxRows: 6 })
   */
  autosize: {
    type: [Boolean, Object],
    default: false,
  },
  /**
   * @description 最大输入长度
   */
  maxlength: {
    type: [String, Number],
    default: null,
  },
   /**
   * @description 最小输入长度
   */
  minlength: {
    type: [String, Number],
    default: null,
  },
  /**
   * @description 原生 autocomplete 属性
   */
  autocomplete: {
    type: String,
    default: 'off', // Element Plus 默认值
  },
  /**
   * @description 原生 name 属性
   */
  name: {
    type: String,
    default: null,
  },
  // 可以根据需要添加更多 ElInput 支持的 props
});

// 2. 定义 Emits
const emit = defineEmits([
  'update:modelValue', // 用于 v-model
  'input',             // 在值改变时触发 (与 update:modelValue 同时，但提供原始事件)
  'change',            // 在值改变并且失焦时触发
  'focus',             // 获取焦点时触发
  'blur',              // 失去焦点时触发
  'clear'              // 点击清空按钮时触发
]);

// 3. 使用 useNamespace
const ns = useNamespace('input'); // block name is 'input' -> 'f-input'

// 4. 事件处理函数 (主要用于重新触发事件)
const handleInput = (value) => {
  emit('update:modelValue', value);
};

const handleRawInput = (value) => {
  // ElInput 的 @input 事件可能与 @update:modelValue 重复，根据需要决定是否 emit
  // 如果你想让使用者能区分 v-model 更新和原始 input 事件，可以 emit
  emit('input', value);
}

const handleChange = (value) => {
  emit('change', value);
};

const handleFocus = (event) => {
  emit('focus', event);
};

const handleBlur = (event) => {
  emit('blur', event);
};

const handleClear = () => {
  emit('clear');
};

</script>

<style lang="scss" scoped>
// 使用 BEM 添加自定义样式
// .f-input {
//   /* 自定义样式 */
//   &:deep(.el-input__wrapper) { // 示例：修改 Element Plus 内部元素的样式
//
//   }
// }

// 通常封装 ElInput 时不需要太多自定义样式
</style>