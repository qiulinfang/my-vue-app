import { createApp } from 'vue'

// 1. 导入根组件
import App from './App.vue'

// 2. 导入路由配置
// 假设你的路由配置文件是 src/router/index.js
import router from './router'

// 3. 导入 Pinia 状态管理
// 假设你可能在 src/store/index.js 中配置了 Pinia，或者直接在这里创建
import { createPinia } from 'pinia'
const pinia = createPinia() // 创建 Pinia 实例

// 4. 导入并配置 UI 库 (以 Element Plus 为例)
import ElementPlus from 'element-plus'
// 导入 Element Plus 的基础样式文件
import 'element-plus/dist/index.css'
// （可选）如果你需要 Element Plus 的暗黑模式，取消下一行注释
// import 'element-plus/theme-chalk/dark/css-vars.css'
// （可选）导入 Element Plus 的国际化语言包（例如中文）
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 5. 导入全局样式文件 (通常在 UI 库样式之后导入，以便覆盖)
// 假设你的全局样式文件是 src/styles/index.css
import './styles/index.css' 

// （可选）如果你使用了 SVG 图标或其他需要全局注册的资源
// import installIcons from './icons' // 假设有图标注册逻辑

// --------------------------------------------------

// 创建 Vue 应用实例
const app = createApp(App)

// --------------------------------------------------
// 安装插件 (使用 app.use())

// 安装 Pinia
app.use(pinia)

// 安装 Vue Router
app.use(router)

// 安装 Element Plus
// （可选）传入配置对象，例如设置默认语言
app.use(ElementPlus, {
  // locale: zhCn, // 如果导入了中文语言包，可以在这里设置
})

// （可选）安装其他插件或全局资源
// installIcons(app) // 例如，全局注册 SVG 图标组件

// --------------------------------------------------

// 挂载应用
// 确保你的 public/index.html 文件中有一个 <div id="app"></div>
app.mount('#app')

// （可选）你可以在挂载后执行一些操作，但不常见
// router.isReady().then(() => {
//   console.log('Router is ready, App mounted.');
//   app.mount('#app');
// });