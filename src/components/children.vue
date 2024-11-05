<template>
  <el-table :data="tabledata" style="width: 100%">
    <el-table-column label="Date" width="180">
      <template #default="scope">
        <button @click="drawer = true">{{ scope.row.date }}</button>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <el-drawer
    v-model="drawer"
    title="I am the title"
    direction="rtl"
    :before-close="handleClose"
  >
    <span>Hi, there!</span>
    <template #header>
      <childeren2 :tabdata="tabledata"></childeren2>
    </template>
  </el-drawer>
  {{ data }} 
  sdfsdf
</template>

<script>
import axios from "axios";
import childeren2 from "./children2.vue";

export default {
  props: {
    tabledata: {
      type: Array,
      required: true,
    },
  },
  components: {
    childeren2,
  },
  data() {
    return {
      drawer: false,
      data: null,
      datsdfsa: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let res = axios.get("https://api.kuleu.com/api/getGreetingMessage")
      this.data = res.data;
    },
  },
};
</script>