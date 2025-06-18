// src/store/index.js
// 这个文件不是必需的，你可以直接在组件中导入具体的 store

// 导入各个 store hook
import { useUserStore } from './modules/user';
// import { useAppStore } from './modules/app';
// import { useSettingsStore } from './modules/settings';
// import { usePermissionStore } from './modules/permission';

export {
  useUserStore,
//   useAppStore,
//   useSettingsStore,
  // usePermissionStore,
};

// 如果你需要 Pinia 插件，可以在 main.js 创建 pinia 实例后配置
// 或者在这里导出配置好的 pinia 实例，但不常见