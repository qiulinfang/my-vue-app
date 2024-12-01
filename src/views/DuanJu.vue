<template>
  <div>
    <el-button @click="compare">sdf</el-button>
    <el-button @click="addShortPlay">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="短剧名称" width="180" />
      <el-table-column prop="viewlink" label="短剧链接" width="180" />
      <el-table-column prop="addtime" label="添加时间" />
    </el-table>

    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="pageSizes"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div>
      <el-button @click="showMessageBox">Show MessageBox</el-button>
      <global-drawer />

      <el-table :data="tableData1" style="width: 100%">
        <el-table-column prop="title" label="热搜标题" width="180" />
        <el-table-column prop="heat" label="热搜热度" width="180" />
        <el-table-column prop="link" label="b站链接" />
      </el-table>
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="pageSizes"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total1"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      array1: [
        {
          id: 1,
          name: "Alice",
          age: 25,
          details: {
            address: "123 Main St",
            contacts: {
              email: "alice@example.com",
              phone: "123-456-7890",
            },
          },
        },
        {
          id: 2,
          name: "Bob",
          age: 30,
          details: {
            address: "456 Elm St",
            contacts: {
              email: "bob@example.com",
              phone: "234-567-8901",
            },
          },
        },
      ],

      array2: [
        {
          id: 1,
          name: "Alice",
          age: 26,
          details: {
            address: "123 Main St",
            contacts: {
              email: "alice@example.com",
              phone: "123-456-7890",
            },
          },
        },
        {
          id: 2,
          name: "Bobby",
          age: 30,
          details: {
            address: "456 Elm St",
            contacts: {
              email: "bobby@example.com",
              phone: "234-567-8901",
            },
          },
        },
      ],

      // 表格数据，初始化为null，后续将被动态赋值
      allData: null, // 后台返回的所有结果
      allData1: null, // 后台返回的所有结果
      tableData: null, // 当前页码的表格数据
      tableData1: null, // 当前页码的表格数据

      // 分页功能相关的属性
      currentPage4: 1, // 当前页码，默认为第1页
      total: 0,
      total1: 0,
      pageSize4: 5, // 每页显示的数据条数，此处设置为5条
      pageSizes: [2, 3, 4, 5],
      size: "small", // 按钮大小，此处设置为小号
      disabled: false, // 按钮是否禁用，false表示不禁用
      background: true, // 是否显示按钮的背景色，true表示显示
    };
  },

  computed: {},
  watch: {},
  created() {
    this.fetchData();
  },
  methods: {
    compare() {
      console.log(this.$compare(this.array1, this.array2));
    },
    showMessageBox() {
      this.$msgbox({
        title: "Confirm",
        message: "Are you sure?",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((action) => {
        if (action === "confirm") {
          this.$message({
            type: "success",
            message: "Confirmed!",
          });
        } else {
          this.$message({
            type: "info",
            message: "Canceled",
          });
        }
      });
    },
    openCustomDrawer() {
      this.$myMethod();
    },
    addShortPlay() {
      console.log("addShortPlay");
    },
    async fetchData() {
      // 定义请求参数
      const params = {
        text: "爱情",
      };

      // 发送GET请求
      axios
        .get("https://api.kuleu.com/api/action", { params })
        .then((response) => {
          this.allData = response.data.data;
          this.total = response.data.data.length;
          this.tableData = this.getNeedArr(this.allData, this.pageSize4)[
            this.currentPage4 - 1
          ]; //当前页的表格数据
        })
        .catch((error) => {
          console.error("请求错误:", error);
        });

      // 发送GET请求
      axios
        .get("https://v.api.aa1.cn/api/bilibili-rs/")
        .then((response) => {
          this.allData1 = response.data.data;
          this.total1 = response.data.data.length;
          this.tableData1 = this.getNeedArr(this.allData1, this.pageSize4)[
            this.currentPage4 - 1
          ]; //当前页的表格数据
        })
        .catch((error) => {
          console.error("请求错误:", error);
        });
    },

    // 前端处理分页
    getNeedArr(array, size) {
      //获取所需指定长度分割的数组;参数1为用于分割的总数组,参数2为分割数组后每个小数组的长度
      const length = array.length;
      //判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return [];
      }

      let index = 0; //用来表示切割元素的范围start
      let resIndex = 0; //用来递增表示输出数组的下标

      //根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size));
      //进行循环
      while (index < length) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size));
      }
      //输出到新数组
      return result;
    },
    // 处理每页显示条数变化
    handleSizeChange(val) {
      this.pageSize4 = val;
      this.fetchData();
    },
    // 处理当前页码变化
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.fetchData();
    },
  },
  mounted() {},
};
</script>

<style></style>
