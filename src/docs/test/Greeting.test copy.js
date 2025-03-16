import { mount } from '@vue/test-utils';
import ComplexForm from './Greeting.vue';
import ElementPlus from 'element-plus';
import { nextTick } from 'vue';

describe('ComplexForm', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = mount(ComplexForm, {
      global: {
        plugins: [ElementPlus],
      },
    });
  });

  it('should render the form', () => {
    expect(wrapper.find('input').exists()).toBe(true);
    console.log(wrapper.html());  
  });

  it('should render all inputs', () => {
    expect(wrapper.find({ ref: 'span' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input112' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input2' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input3' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input4' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input5' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input6' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input7' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input8' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input9' }).exists()).toBe(true);
    expect(wrapper.find({ ref: 'input10' }).exists()).toBe(true);
  });

  it('should update input2 and input3 when input1 changes', async () => {
    const input1 = wrapper.find({ ref: 'input1' }).find('input');
    await input1.setValue('5');
    await nextTick();

    expect(wrapper.vm.form.input2).toBe('5 - Linked');
    expect(wrapper.vm.form.input3).toBe(15);
  });

  it('should update input4 when input3 changes', async () => {
    const input3 = wrapper.find({ ref: 'input3' }).find('input');
    await input3.setValue('20');
    await nextTick();

    expect(wrapper.vm.form.input4).toBe(30);
  });

  it('should update input6 when input5 and input7 changes', async () => {
    const input5 = wrapper.find({ ref: 'input5' }).find('input');
    const input7 = wrapper.find({ ref: 'input7' }).find('input');

    await input5.setValue('test');
    await input7.setValue('value');
    await nextTick();

    expect(wrapper.vm.form.input6).toBe('testvalue');

    await input7.setValue('newvalue');
    await nextTick();
    expect(wrapper.vm.form.input6).toBe('testnewvalue');
  });

    it('should update input10 when input8 and input9 changes', async () => {
    const input8 = wrapper.find({ ref: 'input8' }).find('input');
    const input9 = wrapper.find({ ref: 'input9' }).find('input');

    await input9.setValue('test');
    await input8.setValue('value');
    await nextTick();

    expect(wrapper.vm.form.input10).toBe('testvalue');

    await input8.setValue('newvalue');
    await nextTick();
    expect(wrapper.vm.form.input10).toBe('testnewvalue');
  });
});