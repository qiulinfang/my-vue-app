<template>
  <layout></layout>
</template>
  
<script>
import children from "./views/children.vue";
import coin from "./views/coin.vue";
import layout from "./components/custom/Layout.vue";

export default {
  components: {
    children,
    coin,
    layout,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
  
<style>
</style>