import { h, ref } from 'vue'
import { FText } from 'f-ui'
import { withDirectives } from 'vue'

// 自定义指令
const focus = {
  mounted(el, binding) {
    el.focus()
  }
};

// 使用 `withDirectives` 应用 `v-pin` 指令
const vnode = withDirectives(h('input', { class: 'my-element' }), [
  [focus, true]  // 指令的绑定参数
]);

export default {
  setup() {
    // 动态数据
    const message = ref('Hello, Vue with h() function!')
    const items = ref(['Item 1', 'Item 2', 'Item 3'])

    // 改变消息
    const changeMessage = () => {
      message.value = 'The message has been changed!'
    }

    // 页面结构
    return () => {
      return h('div', { class: 'page' }, [
        // 页面标题
        h('h1', 'Welcome to my page created with h()'),

        // 动态文本
        h('p', message.value),

        h(
            FText,
            {
                color:'red',
                fontSize:'14px'
            },
            [
                h('p', 'First paragraph'),
                h('p', 'Second paragraph'),
                h('div', [
                  h('span', 'Nested span inside div')
                ])
              ]
                
        ),

        vnode,

        // 按钮，点击时更新 message
        h('button', { onClick: changeMessage }, 'Change Message'),

        // 列表，动态渲染 items
        h('ul', items.value.map(item => 
          h('li', item)
        ))
      ])
    }
  }
}
