<template>
  <input
    @compositionstart="handleCompositionStart"
    @compositionupdate="handleCompositionUpdate"
    @compositionend="handleCompositionEnd"
    @input="handleInput"
    @change="handleChange"
    @keydown="handleKeydown"
  />
  <span class="f-shadow-dark">sdfs</span>
  <fbutton icon="f-fanhui" shadow="true"> 
    <template #icon>
      <f-icon type="f-fanhui" />
    </template>
    按钮
  </fbutton>
  sdf
</template>

<script>
import fbutton from '@/components/button/src/fbutton.vue'
import { FIcon} from 'f-ui';
export default {
  components: {
    fbutton,
    FIcon
  },
  methods: {
    handleCompositionStart(event) {
      console.log('Composition started:', event);
      // 处理复合输入开始的逻辑
    },
    handleCompositionUpdate(event) {
      console.log('Composition updated:', event);
      // 处理复合输入更新的逻辑
    },
    handleCompositionEnd(event) {
        console.log('Composition ended:', event);
      // 处理复合输入结束的逻辑
    },
    handleInput(event) {
      console.log('Input:', event);
      // 处理输入框内容变化的逻辑
    },
    handleChange(event) {
      console.log('Change:', event);
      // 处理输入框失去焦点或内容变化后的逻辑
    },
    handleKeydown(event) {
      console.log('Keydown:', event);
      // 处理键盘按键按下的逻辑
    }
  }
}
</script>