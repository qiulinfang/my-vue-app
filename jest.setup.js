import { config } from '@vue/test-utils'
import { createApp } from 'vue'

const app = createApp({})
config.global.plugins = [app]

config.global.compilerOptions = {
  whitespace: 'preserve' // 可选：控制模板空格处理
}
