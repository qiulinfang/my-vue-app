<template>
  <div ref="scrollbarRef" :class="ns.b()">
    <div
      ref="wrapRef"
      :class="wrapKls"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onActivated,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import { useNamespace, addUnit,throttle, debounce } from "@utils";
import { scrollbarProps, scrollbarEmits } from "./propsemit";
const ns = useNamespace("scrollbar");
const props = defineProps(scrollbarProps);
const emit = defineEmits(scrollbarEmits);
const scrollbarRef = ref(null);
const wrapRef = ref(null);
let wrapScrollTop = 0;
let wrapScrollLeft = 0;
const handleScroll = throttle(() => {
  if (wrapRef.value) {
    wrapScrollTop = wrapRef.value.scrollTop;
    wrapScrollLeft = wrapRef.value.scrollLeft;
    console.log(wrapScrollTop, wrapScrollLeft);
    emit("scroll", {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    });
  }
},500);

const wrapKls = computed(() => {
  return [
    props.wrapClass,
    ns.e('wrap'),
    { [ns.em('wrap', 'hidden-default')]: !props.native },
  ]
})
const wrapStyle = computed(() => {
  const style = {}
  if (props.height) style.height = addUnit(props.height)
  console.log(style.height)
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
  return [props.wrapStyle, style]
})

const scrollTo =  (arg1, arg2)=> {
  if (typeof arg1 === 'object') {
    wrapRef.value.scrollTo(arg1)
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    wrapRef.value.scrollTo(arg1, arg2)
  }
}

const setScrollTop = (value) => {
  if (typeof value !== 'number') {
    console.warn(COMPONENT_NAME, 'value must be a number');
    return;
  }
  wrapRef.value.scrollTop = value;
};

const setScrollLeft = (value) => {
  if (typeof value !== 'number') {
    console.warn(COMPONENT_NAME, 'value must be a number');
    return;
  }
  wrapRef.value.scrollLeft = value;
};

defineExpose({
    scrollTo,
    setScrollTop,
    setScrollLeft
})
</script>

<style lang="scss" scoped>
@use '@styles/mixins.scss' as *;
@include b(scrollbar){
    overflow: hidden;
    position: relative;
    background-color: aquamarine;
    height: 100%;

    @include e(wrap) {
        overflow: auto;
        height: 100%;
        background-color: aquamarine;
    }
}
</style>