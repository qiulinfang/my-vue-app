<template>
    <el-table :data="localStudentsCopy" style="width: 100%">
      <!-- 姓名 -->
      <el-table-column prop="name" label="姓名" width="180">
        <template #default="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入姓名"
            @input="handleInputChange(scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
  
      <!-- 年龄 -->
      <el-table-column prop="age" label="年龄" width="180">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.age"
            :min="0"
            :max="150"
            @change="handleInputChange(scope.$index)"
          ></el-input-number>
        </template>
      </el-table-column>
  
      <!-- 性别 -->
      <el-table-column prop="gender" label="性别" width="120">
        <template #default="scope">
          <el-select
            v-model="scope.row.gender"
            placeholder="请选择性别"
            @change="handleInputChange(scope.$index)"
          >
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </template>
      </el-table-column>
  
      <!-- 地址 -->
      <el-table-column prop="address" label="地址" width="250">
        <template #default="scope">
          <el-input
            type="textarea"
            v-model="scope.row.address"
            placeholder="请输入地址"
            @input="handleInputChange(scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
  
      <!-- 班级 -->
      <el-table-column prop="class" label="班级" width="120">
        <template #default="scope">
          <el-select
            v-model="scope.row.class"
            placeholder="请选择班级"
            @change="handleInputChange(scope.$index)"
          >
            <el-option label="1A" value="1A"></el-option>
            <el-option label="2B" value="2B"></el-option>
            <el-option label="3C" value="3C"></el-option>
          </el-select>
        </template>
      </el-table-column>
  
      <!-- 入学日期 -->
      <el-table-column prop="enrollmentDate" label="入学日期" width="200">
        <template #default="scope">
          <el-date-picker
            v-model="scope.row.enrollmentDate"
            type="date"
            placeholder="选择入学日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="handleInputChange(scope.$index)"
          ></el-date-picker>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        // 创建一个本地副本，用于展示和编辑
        localStudentsCopy: null,
      };
    },
    created() {
      this.localStudentsCopy = this.modelValue.map((student) => ({
        ...student,
        gender: student.gender || "male", // 默认值
        address: student.address || "", // 默认值
        class: student.class || "1A", // 默认值
        enrollmentDate: student.enrollmentDate || "", // 默认值
      }));
    },
    computed: {
      localStudents: {
        get() {
          return this.modelValue;
        },
        set(newValue) {
          console.log("newValue", newValue);
          this.$emit("update:modelValue", newValue);
        },
      },
    },
    methods: {
      handleInputChange(index) {
        // 当任何输入发生变化时，立即检查并可能触发过滤
        const filteredStudents = this.localStudentsCopy
          .filter((student) => student.age <= 11)
          .map((student) => ({
            id: student.id,
            name: student.name,
            age: student.age,
            // 只选择父组件需要的属性
          }));
        console.log("filteredStudents", filteredStudents);
        this.localStudents = filteredStudents;
      },
    },
  };
  </script>
  