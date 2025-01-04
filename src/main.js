import { createApp } from "vue";
import App from "./App.vue";
import router from "@/common/router/router"; // 引入路由配置
import GlobalMethods from '@/common/plugins/globalMethods';
import '@/common/styles/global.css';
import plugins from '@/common/plugins';
import directives from '@/common/directives';
const app = createApp(App);

plugins.install(app);
directives.install(app);

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