<template>
  <transition
    :name="transitionName"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot>
  </transition>
</template>

<script>
// 使用命名导出整个组件
export default {
  name: "FadeTransition",
  props: {
    duration: {
      type: [Number, Object],
      default: 500, // 默认500ms
    },
    transitionName: {
      type: String,
      default: "fade",
    },
  },
  setup(props) {
    const beforeEnter = (el) => {
      el.style.opacity = 0;
    };

    const enter = (el, done) => {
      el.offsetHeight; // 强制重排，确保动画触发
      el.style.transition = `opacity ${props.duration}ms`;
      el.style.opacity = 1;
      el.addEventListener("transitionend", done);
    };

    const leave = (el, done) => {
      el.style.transition = `opacity ${props.duration}ms`;
      el.style.opacity = 0;
      el.addEventListener("transitionend", done);
    };

    return {
      beforeEnter,
      enter,
      leave,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
