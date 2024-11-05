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
    async fetchData() {
      let res1 = axios.get("https://api.kuleu.com/api/getGreetingMessage");
      console.log("🚀 ~ fetchData ~ res1:", res1); //🚀 ~ fetchData ~ res1: Promise {<pending>}
      console.log("🚀 ~ fetchData ~ res1:", res1.data); //undefined
      // 你可以在这里使用 res1.data，但是它目前还是 undefined，因为 res1 是一个 Promise 对象，你需要使用 then() 方法来获取实际的数据。
      
      axios
        .get("https://api.kuleu.com/api/getGreetingMessage")
        .then((response) => {
          console.log("🚀 ~ res1 ~ response:", response); //{data: '现在是 22:35:05，很晚啦，在夜的怀抱中，愿你找到安宁，晚安，好梦。', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, 
        });

      let res2 = await axios.get(
        "https://api.kuleu.com/api/getGreetingMessage"
      );
      console.log("🚀 ~ fetchData ~ res2:", res2); //🚀 ~ fetchData ~ res2: {data: '现在是 22:33:33，很晚啦，深夜了，好好休息吧，明天会更好！', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
    },
  },
};
</script>