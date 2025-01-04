// src/plugins/logPlugin.js

export default {
    install(app) {
      // 给 Vue 实例添加一个全局方法 $log
      app.config.globalProperties.$log = function (message) {
        console.log(`[LOG]: ${message}`);
      };
    }
  };
  