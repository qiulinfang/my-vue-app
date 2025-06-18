export * from "./base";
export * from "./features";
export * from "./layout";

import * as base from "./base";
import * as features from "./features";
import * as layout from "./layout";
const install = (app, options) => {
  const componentPrefix = options.prefix || ""; // 获取前缀，默认为空
  const allComponents = { ...base, ...features, ...layout };

  for (const key in allComponents) {
    const component = allComponents[key];
    // 使用组件名或 key 注册组件
    if (component && (component.name || component.__name || component.setup || component.render)) {
      app.component(componentPrefix + (component.name || component.__name || key), component);
    }
  }
};

export default {
  install,
};
