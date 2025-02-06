<template>
    <div>
      <table border="1">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(column, colIndex) in columns" :key="colIndex">{{ row[column] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 定义列名
  const columns = ref(['Name', 'Age', 'City'])
  
  // 定义数据
  const data = ref([
    { Name: 'John', Age: 30, City: 'New York' },
    { Name: 'Jane', Age: 25, City: 'Los Angeles' },
    { Name: 'Jack', Age: 35, City: 'Chicago' }
  ])
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  