<template>
  <div class="document-layout">
    <header>
      <h1>文档编辑器</h1>
    </header>
    <div class="editor-container">
      <router-view name="main"></router-view>
      <router-view name="sidebar"></router-view>
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  display: flex;
}
.editor-container > * {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
}
.editor-container > :first-child {
  flex-grow: 3; /* 主内容区更宽 */
}
.editor-container > :last-child {
  flex-grow: 1;
  background-color: #f9f9f9;
}
</style>