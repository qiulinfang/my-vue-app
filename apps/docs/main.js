import { createApp } from 'vue'
import App from './apps/docs/App.vue'
import router from './router' // 确保导入了配置好的 router
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.css'
// 引入 Element Plus 图标（如果 Sidebar 中使用了）
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import components from '../../packages/components'

const app = createApp(App)

// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router) // 使用路由
app.use(ElementPlus)
app.use(components, {
  prefix: 'My',
}) // 使用自定义组件库

app.mount('#app')