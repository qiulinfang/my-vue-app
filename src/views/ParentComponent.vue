<template>
  <div>
    <h2>学生信息表单</h2>
    <itemList2 :config="formConfig" v-model="students" />
    {{ students }}
    <!-- 动态组件 -->
    <!-- <componentISS /> -->
  </div>
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
  setup() {
    // 定义学生对象数组
    const students = ref([
      { id: 1, name: "张三", age: 1 },
      { id: 2, name: "李四", age: 2 },
      { id: 3, name: "王五", age: 3 },
    ]);

    // 定义表单配置
    const formConfig = [
      { key: "name", label: "姓名", type: "text", placeholder: "请输入姓名" },
      {
        key: "age",
        label: "年龄",
        type: "number",
        min: 0,
        max: 150,
        placeholder: "请输入年龄",
      },
      {
        key: "gender",
        label: "性别",
        type: "select",
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
      },
      {
        key: "address",
        label: "地址",
        type: "textarea",
        placeholder: "请输入地址",
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
      },
      {
        key: "enrollmentDate",
        label: "入学日期",
        type: "date",
        format: "YYYY-MM-DD",
        valueFormat: "YYYY-MM-DD",
      },
    ];

    return {
      students,
      formConfig,
    };
  },
};
</script>
