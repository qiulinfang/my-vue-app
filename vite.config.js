import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";
export default defineConfig({
  resolve: {
    alias: { 
      "@": resolve(__dirname, "src"),
      "@utils": '/src/common/utils',
      'f-ui': '/src/common/components'
     }, //把 src 的别名设置为 @}
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 包含常见扩展名和 .vue
  },
  optimizeDeps: {
    force: true // 强制进行依赖预构建
  },
  server: {
    host: true // 监听所有地址
    // 或者
    // host: '0.0.0.0' // 明确指定监听所有地址
  },
  plugins: [
    vue(),
    // 自动导入Vue和Element Plus相关函数如: ref, reactive, createElementVNode
    AutoImport({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
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
