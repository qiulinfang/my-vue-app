<template>
    <div>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <input
        :value="secondModelValue"
        @input="$emit('update:secondModelValue', $event.target.value)"
      >
    </div>
  </template>
  
  <script>
  export default {
    name: "APITestChildComponent",
    props: ['modelValue', 'secondModelValue']
  };
  </script>
  