import { mount } from '@vue/test-utils'
import Greeting from './Greeting.vue';

describe('Greeting.vue', () => {
  it('renders a greeting', async () => {
    try {
      const wrapper = mount(Greeting);
      await wrapper.vm.$nextTick(); // 确保异步操作完成
      console.log('Rendered text:', wrapper.text()); // 输出实际渲染的文本
      expect(wrapper.text()).toContain("Vue and TDD"); // 使用 contains 进行部分匹配
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error; // 重新抛出异常，确保测试框架能够捕获
    }
  });
});