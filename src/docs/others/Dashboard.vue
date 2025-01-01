<template>
  <div>
    <h1>仪表盘</h1>
    <p>这里是仪表盘页面的内容。</p>
  </div>

  <el-button type="primary" style="margin-left: 16px" @click="fetchData">
    open
  </el-button>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
    <div>
      <p>{{ data }}</p>
    </div>
  </el-drawer>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      drawer: false,
      data: null,
      isFetching: false, // 新增状态，用于防止多次请求
    };
  },
  methods: {
    async fetchData() {
      // 防止多次点击按钮
      if (this.isFetching) {
        console.warn("Already fetching data, please wait.");
        return;
      }

      this.isFetching = true;
      this.drawer = true;

      try {
        const url = "https://api.kuleu.com/api/getGreetingMessage";
        if (!url) {
          throw new Error("Invalid API URL");
        }

        const res2 = await axios.get(url);
        console.log("🚀 ~ fetchData ~ res2:", res2);

        if (res2.data && typeof res2.data === "string") {
          this.data = res2.data;
        } else {
          this.data = "无法获取数据，请稍后再试。";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.data = "无法获取数据，请稍后再试。";
      } finally {
        this.isFetching = false;
      }
    },
  },
};
</script>