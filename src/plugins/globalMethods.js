// src/plugins/globalMethods.js

export default {
  install: (app, options) => {
    // 添加全局方法
    app.config.globalProperties.$helloWorld = function (name) {
      console.log(`Hello, ${name}! Welcome to our application.`);
    };

    // 添加另一个全局方法
    app.config.globalProperties.$calculateAge = function (birthYear) {
      const currentYear = new Date().getFullYear();
      return currentYear - birthYear;
    };
  }
};