<template>
  <children :tabledata="tableData"></children>
  <coin></coin>
  <direct></direct>
  <GreetingComponent></GreetingComponent>
</template>
  
<script>
import children from "./components/children.vue";
import coin from "./components/coin.vue";
import direct from "./components/direct.vue"; 
import GreetingComponent from "./components/async/GreetingComponent.vue";

export default {
  components: {
    children,
    coin,
    direct,
    GreetingComponent,
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