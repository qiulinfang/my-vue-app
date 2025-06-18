// packages/components/vite.config.js (修正后的版本)
import { defineConfig } from 'vite'
import path from 'path'; // 1. 导入 path 模块

export default defineConfig({
  resolve: {
    alias: {
      'myComponent': path.resolve(__dirname, './src'), 
      'utils': path.resolve(__dirname, '../utils'), 
    },
  },
})