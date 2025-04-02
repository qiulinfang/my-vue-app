<template>
    <div class="parent-container">
      <h1>产品数据列表</h1>
      <p>
        <i>Generated on: Wednesday, April 2, 2025, Singapore</i>
      </p>
  
      <FTable
        :data="tableData"
        :columns="tableColumns"
        :loading="isLoading"
        :items-per-page="5"
        @update:sort="handleSort"
        @update:page="handlePageChange"
        @row:click="handleRowClick"
        class="my-custom-table-style"
      >
        <template #statusCell="{ value }">
          <span :class="['status-badge', getStatusClass(value)]">
            {{ value }}
          </span>
        </template>
  
        <template #cell-actions="{ row }">
          <button class="action-button view-button" @click.stop="viewDetails(row)">查看</button>
          <button class="action-button edit-button" @click.stop="editItem(row)">编辑</button>
          <button class="action-button delete-button" @click.stop="deleteItem(row)">删除</button>
        </template>
  
        <template #loading>
          <div class="custom-loading">
            <div class="spinner"></div>
            <span>正在加载数据，请稍候...</span>
          </div>
        </template>
  
        <template #empty>
          <div class="custom-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            <p>抱歉，没有找到符合条件的数据。</p>
          </div>
        </template>
  
      </FTable>
  
      <div v-if="clickedRowInfo" class="clicked-info">
          <h3>最近点击的行:</h3>
          <pre>{{ clickedRowInfo }}</pre>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  // 1. 导入表格组件
  import {FTable} from 'f-ui'; // 确保路径正确
  
  // 2. 定义响应式状态
  const isLoading = ref(false);
  const tableData = ref([]);
  const clickedRowInfo = ref(null);
  
  // 3. 定义列配置
  const tableColumns = ref([
    { key: 'id', label: '#', sortable: true, searchable: false, }, // 不参与搜索
    { key: 'name', label: '名称', sortable: true, searchable: true },
    { key: 'category', label: '类别', sortable: true, searchable: true },
    { key: 'price', label: '价格 (SGD)', sortable: true, searchable: false },
    { key: 'stock', label: '库存', sortable: true, searchable: false },
    { key: 'status', label: '状态', sortable: true, slotName: 'statusCell' }, // 使用自定义插槽 'statusCell'
    { key: 'actions', label: '操作', sortable: false, searchable: false } // 用于放置按钮
  ]);
  
  // 4. 模拟数据获取
  onMounted(() => {
    fetchData();
  });
  
  async function fetchData() {
    isLoading.value = true;
    console.log("开始获取数据...");
    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    // 生成一些模拟数据
    tableData.value = [
      { id: 101, name: 'Merlion Figurine', category: 'Souvenir', price: 25.50, stock: 150, status: '在售' },
      { id: 102, name: 'Orchid Perfume', category: 'Cosmetics', price: 75.00, stock: 80, status: '在售' },
      { id: 103, name: 'Kaya Jar', category: 'Food', price: 8.90, stock: 0, status: '缺货' },
      { id: 104, name: 'Singapore Sling Mix', category: 'Beverage', price: 30.00, stock: 200, status: '在售' },
      { id: 105, name: 'Batik Shirt', category: 'Apparel', price: 55.00, stock: 45, status: '清仓' },
      { id: 106, name: 'Durian Candy', category: 'Food', price: 12.50, stock: 300, status: '在售' },
      { id: 107, name: 'Cheongsam Dress', category: 'Apparel', price: 120.00, stock: 15, status: '清仓' },
      { id: 108, name: 'Instant Laksa', category: 'Food', price: 5.50, stock: 500, status: '在售' },
    ];
    isLoading.value = false;
    console.log("数据获取完成.");
  }
  
  // 5. 定义事件处理函数
  function handleSort(sortInfo) {
    console.log('父组件收到排序变更:', sortInfo);
    // 提示：如果需要服务器端排序，在这里触发 API 调用
  }
  
  function handlePageChange(pageNumber) {
    console.log('父组件收到页码变更:', pageNumber);
    // 提示：如果需要服务器端分页，在这里触发 API 调用
  }
  
  function handleRowClick(row) {
    console.log('父组件收到行点击:', row);
    clickedRowInfo.value = row; // 显示点击的行信息
  }
  
  // 操作按钮的处理函数
  function viewDetails(row) {
    console.log('查看详情:', row.id, row.name);
    alert(`查看 ${row.name} 的详细信息。`);
  }
  
  function editItem(row) {
    console.log('编辑项目:', row.id, row.name);
    alert(`编辑 ${row.name}。`);
  }
  
  function deleteItem(row) {
    console.log('删除项目:', row.id, row.name);
    if (confirm(`确定要删除 ${row.name} 吗？`)) {
      // 从数据中移除项（在实际应用中，你可能需要调用 API）
      tableData.value = tableData.value.filter(item => item.id !== row.id);
      alert(`${row.name} 已删除。`);
    }
  }
  
  // 辅助函数，用于状态样式
  function getStatusClass(status) {
    switch (status?.toLowerCase()) {
      case '在售': return 'status-active';
      case '缺货': return 'status-inactive';
      case '清仓': return 'status-clearance';
      default: return 'status-unknown';
    }
  }
  
  </script>
  
  <style scoped>
  .parent-container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 5px;
  }
  .parent-container > p {
      text-align: center;
      font-size: 0.8em;
      color: #666;
      margin-bottom: 30px;
  }
  
  /* 为表格组件本身添加一些外层样式 */
  .my-custom-table-style {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden; /* 配合 border-radius */
  }
  
  /* 自定义插槽样式 */
  .status-badge {
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.85em;
    color: white;
    white-space: nowrap;
  }
  .status-active { background-color: #4CAF50; } /* Green */
  .status-inactive { background-color: #f44336; } /* Red */
  .status-clearance { background-color: #ff9800; } /* Orange */
  .status-unknown { background-color: #777; } /* Gray */
  
  .action-button {
    padding: 4px 8px;
    margin-right: 5px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 0.85em;
  }
  .action-button:last-child {
    margin-right: 0;
  }
  .view-button { border-color: #2196F3; color: #2196F3; background: white;}
  .edit-button { border-color: #FFC107; color: #FFC107; background: white;}
  .delete-button { border-color: #f44336; color: #f44336; background: white;}
  .view-button:hover { background: #e3f2fd; }
  .edit-button:hover { background: #fff8e1; }
  .delete-button:hover { background: #ffebee; }
  
  .custom-loading, .custom-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    color: #666;
    text-align: center;
  }
  .custom-empty svg {
      margin-bottom: 15px;
      color: #aaa;
  }
  .spinner {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .clicked-info {
      margin-top: 20px;
      padding: 15px;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px;
  }
  .clicked-info h3 {
      margin-top: 0;
  }
  .clicked-info pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      background: #fff;
      padding: 10px;
      border-radius: 4px;
  }
  
  </style>