<template>
  <el-form :model="parentForm" ref="parentFormRef">
    <!-- 父组件表单项 -->
    <h2>学生信息表单</h2>
    <itemList2 :config="formConfig" v-model="students" ref="itemList2" />
    {{ students }}
    <!-- 动态组件 -->
    <!-- <componentISS /> -->
    <el-button type="primary" @click="submitForm">提交</el-button>
  </el-form>
</template>

<script>
import { ref } from "vue";
import itemList2 from "../components/itemList2.vue";
import componentISS from "../components/componentISS.vue";
export default {
  components: {
    itemList2,
    componentISS,
  },
  methods: {
    async submitForm() {
      console.log("submitform");
      try {
        // 验证父组件表单
        const parentValid = await this.validateParentForm();
        console.log("🚀 ~ submitForm ~ parentValid:", parentValid);
        if (!parentValid) {
          console.log("父组件表单验证失败");
          return;
        }

        // 验证子组件表单
        const childValid = await this.$refs.itemList2.validateForm();
        if (!childValid) {
          console.log("子组件表单验证失败");
          return;
        }

        // 表单验证通过，执行提交操作
        console.log("所有表单验证通过，可以提交");
      } catch (error) {
        console.error("表单验证失败", error);
      }
    },
    validateParentForm() {
      return new Promise((resolve, reject) => {
        this.$refs.parentFormRef.validate((valid) => {
          console.log("🚀 ~ this.$refs.parentFormRef.validate ~ valid:", valid);
          if (valid) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    },
  },
  setup() {
    // 定义学生对象数组
    const students = ref([
      { id: 1, name: "张三", age: 1 },
      { id: 2, name: "李四", age: 2 },
      { id: 3, name: "王五", age: 4 },
    ]);

    // 定义表单配置
    const formConfig = [
      {
        key: "name",
        label: "姓名",
        type: "text",
        placeholder: "请输入姓名",
        rules: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "姓名长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      {
        key: "age",
        label: "年龄",
        type: "number",
        min: 0,
        max: 150,
        placeholder: "请输入年龄",
        rules: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            type: "number",
            min: 0,
            max: 150,
            message: "年龄必须在 0 到 150 之间",
            trigger: "blur",
          },
        ],
      },
      {
        key: "gender",
        label: "性别",
        type: "select",
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
        rules: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      {
        key: "address",
        label: "地址",
        type: "textarea",
        placeholder: "请输入地址",
        rules: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 5,
            max: 100,
            message: "地址长度在 5 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      {
        key: "class",
        label: "班级",
        type: "select",
        options: [
          { label: "1A", value: "1A" },
          { label: "2B", value: "2B" },
          { label: "3C", value: "3C" },
        ],
        rules: [{ required: true, message: "请选择班级", trigger: "change" }],
      },
      {
        key: "enrollmentDate",
        label: "入学日期",
        type: "date",
        format: "YYYY-MM-DD",
        valueFormat: "YYYY-MM-DD",
        rules: [
          { required: true, message: "请选择入学日期", trigger: "change" },
        ],
      },
    ];

    return {
      students,
      formConfig,
    };
  },
};
</script>
