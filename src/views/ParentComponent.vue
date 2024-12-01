<template>
    <div>
      <child-component v-model="items" />
      <pre>{{ items }}</pre>
    </div>
  </template>
  
  <script>
  import ChildComponent from '@/components/ItemList.vue';
  
  export default {
    name: 'ParentComponent',
    components: {
      ChildComponent,
    },
    data() {
      return {
        items: [
          { name: 'Item 1', value: 10 },
          { name: 'Item 2', value: 20 },
        ],
      };
    },
  };
  </script>