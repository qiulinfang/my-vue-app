import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';



export default defineConfig({
  resolve: {
    alias: {
      '@images': './src/assets',
    },
  },
  plugins: [
    vue(),
    // 自动导入Vue和Element Plus相关函数如: ref, reactive, createElementVNode
    AutoImport({
      imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
      dts: true, // 如果你的项目使用了 TypeScript，设置为 true 可以生成对应的类型声明文件
      resolvers: [ElementPlusResolver()], // 解析Element Plus组件
    }),
    // 自动注册Element Plus组件
    Components({
      resolvers: [ElementPlusResolver()], // 解析Element Plus组件
      dts: true, // 同样适用于TypeScript项目
    }),

  ],
});
