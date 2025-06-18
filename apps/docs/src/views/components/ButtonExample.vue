<template>
  <div class="button-examples">
    <h2>按钮类型 (Type)</h2>
    <MyButton>默认按钮</MyButton>
    <MyButton type="primary" size="small" plain round circle disabled loading icon>主要按钮</MyButton>
    <MyButton type="success">成功按钮</MyButton>
    <MyButton type="warning">警告按钮</MyButton>
    <MyButton type="danger">危险按钮</MyButton>
    <MyButton type="info">信息按钮</MyButton>
    <MyButton type="text">文本按钮</MyButton>

    <h2>朴素按钮 (Plain)</h2>
    <MyButton plain>朴素按钮</MyButton>
    <MyButton type="primary" plain>主要朴素</MyButton>
    <MyButton type="success" plain>成功朴素</MyButton>
    <MyButton type="info" plain>信息朴素</MyButton>
    <MyButton type="danger" plain>危险朴素</MyButton>
    <MyButton type="warning" plain>警告朴素</MyButton>

    <h2>圆角按钮 (Round)</h2>
    <MyButton type="primary" round>主要圆角</MyButton>
    <MyButton type="success" round>成功圆角</MyButton>
    <MyButton type="info" round>信息圆角</MyButton>

    <h2>圆形按钮 (Circle)</h2>
    <MyButton type="primary" circle>主</MyButton>
    <MyButton type="success" circle>✓</MyButton>
    <MyButton type="info" circle>i</MyButton>
    <MyButton type="danger" circle>✕</MyButton>
    <MyButton type="warning" circle>!</MyButton>

    <h2>按钮尺寸 (Size)</h2>
    <MyButton type="primary" size="large">大型按钮</MyButton>
    <MyButton type="primary">默认尺寸</MyButton>
    <MyButton type="primary" size="small">小型按钮</MyButton>
    <br><br>
    <MyButton type="success" size="large" round>大型成功圆角</MyButton>
    <MyButton type="warning" size="small" round>小型警告圆角</MyButton>
    <MyButton type="danger" size="small" circle>x</MyButton> <h2>禁用状态 (Disabled)</h2>
    <MyButton disabled>默认禁用</MyButton>
    <MyButton type="primary" disabled>主要禁用</MyButton>
    <MyButton type="success" plain disabled>成功朴素禁用</MyButton>
    <MyButton type="info" round disabled>信息圆角禁用</MyButton>
    <MyButton type="danger" circle disabled>x</MyButton>

    <h2>加载中状态 (Loading)</h2>
    <MyButton type="primary" loading>加载中...</MyButton>
    <MyButton type="success" loading plain>加载中...</MyButton>
    <MyButton type="info" loading round>加载中...</MyButton>
    <h2>点击事件 (@click)</h2>
    <MyButton type="primary" @click="handleButtonClick">点我触发事件</MyButton>
    <MyButton type="danger" @click="handleSpecialClick('危险操作')" :disabled="isActionDisabled">
      危险操作 ({{ isActionDisabled ? '已禁用' : '可点击' }})
    </MyButton>
    <button @click="toggleActionDisabled">切换危险操作禁用状态</button>

    <h2>按钮组</h2>
    <br><br>
    <my-button-group>
      <my-button type="primary" icon="Edit">编辑</my-button>
      <my-button type="primary" icon="Share">分享</my-button>
      <my-button type="primary" icon="Delete">删除</my-button>
    </my-button-group>
    <br><br>
    <my-button-group>
      <my-button>按钮1</my-button>
      <my-button disabled>按钮2</my-button>
      <my-button>按钮3</my-button>
    </my-button-group>
    <p>上次点击消息: {{ clickMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 1. 导入 MyButton 组件
import {MyButton,MyButtonGroup } from "myComponent";; // 确保路径正确

// 2. 定义响应式数据和方法用于事件处理
const clickMessage = ref('暂无点击');
const isActionDisabled = ref(false);

const handleButtonClick = (event) => {
  console.log('按钮被点击!', event);
  clickMessage.value = `主要按钮在 ${new Date().toLocaleTimeString()} 被点击`;
  alert('主要按钮被点击!');
};

const handleSpecialClick = (message) => {
  console.log('执行特殊操作:', message);
  clickMessage.value = `特殊操作 "${message}" 在 ${new Date().toLocaleTimeString()} 被触发`;
  alert(`执行了: ${message}`);
};

const toggleActionDisabled = () => {
  isActionDisabled.value = !isActionDisabled.value;
};
</script>

<style scoped>
/* 为示例添加一些间距，方便查看 */
.button-examples h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

/* 让按钮之间有空隙 */
.button-examples > button,
.button-examples > .my-button { /* MyButton 组件最终渲染为 button */
  margin-right: 8px;
  margin-bottom: 8px;
}

/* 父组件的样式不会影响 MyButton 内部 (因为 MyButton 使用了 scoped CSS) */
p {
  margin-top: 15px;
  font-family: sans-serif;
}
</style>