<template>
    <div>
      <ul>
        <li v-for="(item, index) in modelValue" :key="index">
          {{ item.name }} - {{ item.value }}
          <button @click="removeItem(index)">Remove</button>
        </li>
      </ul>
      <input v-model="newItemName" placeholder="New item name" />
      <input v-model="newItemValue" type="number" placeholder="New item value" />
      <button @click="addItem">Add Item</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ItemList',
    props: {
      modelValue: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['update:modelValue'],
    data() {
      return {
        newItemName: '',
        newItemValue: null,
      };
    },
    methods: {
      addItem() {
        if (this.newItemName && this.newItemValue !== null) {
          const newItem = { name: this.newItemName, value: this.newItemValue };
          this.$emit('update:modelValue', [...this.modelValue, newItem]);
          this.newItemName = '';
          this.newItemValue = null;
        }
      },
      removeItem(index) {
        const updatedArray = this.modelValue.filter((_, i) => i !== index);
        this.$emit('update:modelValue', updatedArray);
      },
    },
  };
  </script>