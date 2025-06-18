<template>
  <div class="my-select" ref="selectWrapperRef">
    <MySelectTrigger
      :model-value="modelValue"
      :selected-option="selectedOption"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :menu-open="showMenu"
      @click="toggleMenu"
      />

    <Teleport to="body">
      <div
        v-show="showMenu"
        class="my-select-popper"
        ref="menuWrapperRef"
        :style="popperStyle"
      >
        <MySelectMenu
          :options="options"
          :model-value="modelValue"
          @select-option="handleOptionSelect"
          />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core' // 需要安装 @vueuse/core
import { computePosition, flip, shift, offset } from '@floating-ui/dom' // 需要安装 @floating-ui/dom
import MySelectTrigger from './MySelectTrigger.vue'
import MySelectMenu from './MySelectMenu.vue'

// --- Props ---
// 使用对象形式定义 props 以便设置 type 和 default
const props = defineProps({
  modelValue: {
    type: [String, Number, null, undefined],
    default: undefined
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

// --- Emits ---
const emit = defineEmits(['update:modelValue']) // 定义 v-model 的事件

// --- Refs ---
const selectWrapperRef = ref(null) // Select 整体容器 ref
const menuWrapperRef = ref(null) // 菜单容器 ref
const showMenu = ref(false) // 控制菜单显示

// --- State ---
const internalOptions = ref(props.options)

// --- Computed ---
const selectedOption = computed(() => {
  // 使用 ?. 防止 internalOptions.value 为空时出错
  return internalOptions.value?.find(opt => opt.value === props.modelValue) ?? null
})

// 菜单定位样式
const popperStyle = reactive({
  position: 'absolute',
  left: '0px',
  top: '0px',
  width: 'auto',
  zIndex: '9999'
})

// --- Watch ---
watch(() => props.options, (newOptions) => {
  internalOptions.value = newOptions || []
}, { deep: true, immediate: true })

watch(showMenu, async (isVisible) => {
  if (isVisible) {
    await nextTick()
    updatePopperPosition()
  }
})

// --- Methods ---
function toggleMenu() {
  if (props.disabled) return
  showMenu.value = !showMenu.value
}

function closeMenu() {
  showMenu.value = false
}

function handleOptionSelect(option) {
  emit('update:modelValue', option.value) // 更新 v-model
  closeMenu()
}

async function updatePopperPosition() {
  if (!selectWrapperRef.value || !menuWrapperRef.value) return

  const triggerWidth = selectWrapperRef.value.offsetWidth
  popperStyle.width = `${triggerWidth}px`

  try {
    const { x, y } = await computePosition(selectWrapperRef.value, menuWrapperRef.value, {
      placement: 'bottom-start',
      middleware: [
        offset(4),
        flip(),
        shift({ padding: 5 }),
      ],
    })
    popperStyle.left = `${x}px`
    popperStyle.top = `${y}px`
  } catch (error) {
    console.error('Popper positioning failed:', error)
    const rect = selectWrapperRef.value.getBoundingClientRect()
    popperStyle.left = `${rect.left}px`
    popperStyle.top = `${rect.bottom + 4 + window.scrollY}px`
  }
}

// --- Lifecycle and Event Listeners ---
onClickOutside(selectWrapperRef, closeMenu, { ignore: [menuWrapperRef] })

let resizeObserver = null;
const onResizeOrScroll = () => {
  if (showMenu.value) {
    updatePopperPosition();
  }
};

onMounted(() => {
  window.addEventListener('resize', onResizeOrScroll)
  window.addEventListener('scroll', onResizeOrScroll, true)
  if (selectWrapperRef.value) {
    resizeObserver = new ResizeObserver(onResizeOrScroll);
    resizeObserver.observe(selectWrapperRef.value);
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResizeOrScroll)
  window.removeEventListener('scroll', onResizeOrScroll, true)
  if (resizeObserver && selectWrapperRef.value) {
    resizeObserver.unobserve(selectWrapperRef.value);
  }
  resizeObserver = null;
})
</script>

<style scoped>
/* 样式与之前 TypeScript 版本相同 */
.my-select {
  position: relative;
  display: inline-block; /* 或者 block，根据需要 */
  width: 200px; /* 示例宽度 */
}
.my-select-popper {
  /* 初始可以不设置 left/top，由 JS 计算 */
}
</style>
