// src/directives/focusDirective.js

export const focus = {
  mounted(el) {
    console.log(el);
    // 当元素挂载到 DOM 后，自动给该元素设置焦点
    el.focus();
  },
};
