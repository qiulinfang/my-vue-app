<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="输入框A">
      <el-input v-model.number="form.inputA"></el-input>
    </el-form-item>
    <el-form-item label="输入框B" :rules="inputBRules">
      <el-input v-model="form.inputB" :disabled="disabledB"></el-input>
    </el-form-item>
    <el-form-item label="单选框C">
      <el-radio-group v-model="form.radioC">
        <el-radio :label="99">选项1</el-radio>
        <el-radio :label="100">选项2</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        inputA: null,
        inputB: '',
        radioC: 100 // 默认值
      }
    };
  },
  computed: {
    inputBRules() {
      return this.form.inputA === 1 ? [{ required: true, message: '请输入内容', trigger: 'blur' }] : [];
    },
    disabledB() {
      return this.form.inputA !== 1;
    }
  },
  watch: {
    'form.inputA': {
      handler(value) {
        if (value === 1) {
          console.log('输入框A的值为1，禁用输入框B');
          this.form.radioC = 99;
        } else if (value === 2) {
          this.form.inputB = '';
          this.form.radioC = 100;
        }
      },
      immediate: true // 立即执行一次
    }
  }
};
</script>

<style scoped>
/* 添加一些样式 */
</style>