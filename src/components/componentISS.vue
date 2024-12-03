<template>
  <div style="margin: 20px;">
    <h2>动态组件示例</h2>

    <!-- 选择要渲染的组件类型 -->
    <el-select v-model="selectedComponent" placeholder="请选择组件类型">
      <el-option label="按钮" value="button"></el-option>
      <el-option label="输入框" value="input"></el-option>
      <el-option label="选择框" value="select"></el-option>
    </el-select>

    <!-- 动态渲染组件 -->
    <component :is="getComponentType(selectedComponent)" class="dynamic-component" />

    <!-- 操作按钮 -->
    <el-button @click="handleClick" style="margin-top: 10px;">点击我</el-button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElButton, ElInput, ElSelect, ElOption, ElMessageBox } from 'element-plus';

export default {
  components: {
    ElButton,
    ElInput,
    ElSelect,
    ElOption
  },
  setup() {
    const selectedComponent = ref('button');

    // 根据选择的组件类型返回相应的组件名称
    const getComponentType = (type) => {
      switch (type) {
        case 'button':
          return 'el-button';
        case 'input':
          return 'el-input';
        case 'select':
          return 'el-select';
        default:
          return 'el-button'; // 默认使用按钮
      }
    };

    // 处理点击事件
    const handleClick = () => {
      ElMessageBox.alert(`你选择了 ${selectedComponent.value} 组件`, '提示', {
        confirmButtonText: '确定',
        callback: () => {
          console.log('消息框关闭');
        }
      });
    };

    return {
      selectedComponent,
      getComponentType,
      handleClick
    };
  }
};
</script>

<style scoped>
.dynamic-component {
  margin-top: 20px;
}
</style>