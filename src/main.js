import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router"; // 引入路由配置
import GlobalMethods from './plugins/globalMethods';
import '@/styles/global.css';

const app = createApp(App);

app.directive("click-log", {
  // 当被绑定的元素插入到 DOM 中时……
  mounted: function (el, binding, vnode) {
    console.log(el);
    el.addEventListener("click", function () {
      console.log(binding.value);
    });
  },
});
// 如果需要全局注册特定的功能，如 MessageBox、Message、Notification
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';
app.config.globalProperties.$msgbox = ElMessageBox;
app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$notify = ElNotification;

app.directive("compare-numbers", {
  // 当被绑定的元素插入到 DOM 中时……
  mounted: function (el, binding) {
    const [num1, num2] = binding.value;
    if (num1 !== num2) {
      el.style.border = "2px solid red";
    }
  },
});

app.use(router);
// 注册插件
app.use(GlobalMethods);




app.mount("#app");

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}