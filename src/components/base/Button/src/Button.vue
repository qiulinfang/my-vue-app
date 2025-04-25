<template>
  <button :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </button>
  </template>
  
  <script setup>
  const props = defineProps({
    /**
     * @description 按钮类型
     */
    type: {
      type: String,
    },


   
  });
  
  // 2. 定义 Emits
  const emit = defineEmits(['click']);
  
  
  const buttonClasses = computed(() => {
  return [
    'my-button', // Base class
    `my-button--${props.type}`, // Type class e.g., el-button--primary
    props.size ? `my-button--${props.size}` : '', // Size class
    {
      'is-plain': props.plain, // Plain style modifier
      'is-round': props.round, // Round shape modifier
      'is-circle': props.circle, // Circle shape modifier
      'is-disabled': props.disabled, // Disabled state class
      'is-loading': props.loading, // Loading state class
    }
  ];
});


  const handleClick = (evt) => {
    emit('click', evt)
  }



  </script>
 