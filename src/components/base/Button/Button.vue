<template>
    <el-button
      :class="[ns.b(), ns.m(type), ns.m(size), ns.is('disabled', disabled), ns.is('loading', loading), ns.is('plain', plain), ns.is('round', round), ns.is('circle', circle)]"
      :type="type"
      :size="size"
      :disabled="disabled || loading"
      :loading="loading"
      :native-type="nativeType"
      :plain="plain"
      :round="round"
      :circle="circle"
      :icon="loading ? '' : iconComponent"
      @click="handleClick"
    >
      <template #loading v-if="loading">
        <slot name="loading">
          <el-icon :class="ns.is('loading')" ><Loading /></el-icon>
        </slot>
      </template>
  
      <span v-if="$slots.default">
        <slot></slot>
      </span>
    </el-button>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { ElButton, ElIcon } from 'element-plus';
  // 假设 Element Plus 图标已全局注册 (如 Loading)
  // 如果没有全局注册 Loading, 需要单独 import { Loading } from '@element-plus/icons-vue';
  import { useNamespace } from '@/utils/class'; // 引入 BEM 工具
  
  // 1. 定义 Props
  const props = defineProps({
    /**
     * @description 按钮类型
     */
    type: {
      type: String,
      values: ['primary', 'success', 'warning', 'danger', 'info', 'default', 'text'], // 包含 'default' 和 'text'
      default: 'default',
    },
    /**
     * @description 按钮尺寸
     */
    size: {
      type: String,
      values: ['large', 'default', 'small'],
      default: 'default', // Element Plus 默认是 'default'
    },
    /**
     * @description 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否加载中状态
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 图标组件 (Element Plus 图标名称字符串或组件对象)
     */
    icon: {
      type: [String, Object], // 可以接受字符串名称或导入的组件
      default: '',
    },
    /**
     * @description 原生 type 属性
     */
    nativeType: {
      type: String,
      values: ['button', 'submit', 'reset'],
      default: 'button',
    },
    /**
     * @description 是否朴素按钮
     */
    plain: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否圆角按钮
     */
    round: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否圆形按钮 (通常只包含图标)
     */
    circle: {
      type: Boolean,
      default: false,
    },
  });
  
  // 2. 定义 Emits
  const emit = defineEmits(['click']);
  
  // 3. 使用 useNamespace 创建 BEM 类名辅助函数
  const ns = useNamespace('button'); // block name is 'button' -> 'f-button'
  
  // 4. 处理图标 (ElButton 会自动处理字符串名称)
  const iconComponent = computed(() => props.icon);
  
  // 5. 处理点击事件
  const handleClick = (evt) => {
    if (props.disabled || props.loading) {
      // 如果按钮是禁用或加载状态，阻止事件进一步处理
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }
    // 触发自定义的 click 事件
    emit('click', evt);
  };
  
  </script>
  
  <style lang="scss" scoped>
  // 使用 useNamespace 生成的类名来添加自定义样式（如果需要）
  // .f-button {
  //   /* 自定义基础样式 */
  //   &.is-loading {
  //     /* 自定义加载状态样式 */
  //   }
  //   &--primary {
  //      /* 自定义 primary 类型样式 */
  //   }
  // }
  
  // 通常，如果只是封装 ElButton，可能不需要太多自定义样式
  // 但可以用来微调间距或特定状态下的表现
  // 例如，确保图标和文字之间有合适的间距（虽然 ElButton 通常处理得很好）
  :deep(.el-icon + span), :deep(span + .el-icon) {
     margin-left: 4px; // 给图标和文字之间加一点点间距示例
  }
  
  // 加载图标的样式 (如果需要覆盖 ElButton 的)
  // .f-button .f-button--loading-icon {
  //    animation: rotating 2s linear infinite;
  // }
  
  </style>