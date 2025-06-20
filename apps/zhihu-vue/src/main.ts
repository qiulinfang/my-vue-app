import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store, key } from './vuex';
import { createPinia } from 'pinia' // <-- 第 1 步：从 pinia 导入 createPinia

const app = createApp(App);

// 2. 使用 .use() 方法将 store 实例注入到整个应用中
//    这一步至关重要！它会把 store 实例挂载到所有组件的 this.$store 上。
app.use(store, key);
const pinia = createPinia()     // <-- 第 2 步：创建一个 Pinia 实例
app.use(pinia)                  // <-- 第 3 步：将 Pinia 实例安装到应用中

app.mount('#app');