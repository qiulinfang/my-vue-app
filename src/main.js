import { createApp } from "vue";
import App from "./App.vue";

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

app.directive("compare-numbers", {
  // 当被绑定的元素插入到 DOM 中时……
  mounted: function (el, binding) {
    const [num1, num2] = binding.value;
    if (num1 !== num2) {
      el.style.border = "2px solid red";
    }
  },
});

app.mount("#app");
