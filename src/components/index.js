export * from './base';

import * as base from './base';
const install= (app, options) => {
    const componentPrefix = options.prefix || ''; // 获取前缀，默认为空
  for (const key in base) {
    const component = base[key];
    // 使用组件名或 key 注册组件
    if (component && (component.name || component.__name || component.setup || component.render)) {
      app.component(componentPrefix + (component.name || component.__name || key), component);
    }
  }
};

export default {
  install,
};
