// packages/components/src/components/Button/index.ts

// 1. 导入 Vue 组件本身
import IconComponent from './Icon.vue';

// 2. 导入并导出与 Button 相关的类型
// 假设 types.ts 定义了 export type ButtonProps = { ... }; export type ButtonSize = 'small' | 'medium' | 'large';
// export * from './types';
// 或者更精确地导出特定类型：
// export type { ButtonProps, ButtonEmits, ButtonSize } from './types';

// 3. 导入并导出与 Button 相关的常量 (如果存在)
// 假设 constants.ts 定义了 export const BUTTON_PREFIX_CLS = 'my-button';
// export * from './constants';
// 或者: export { BUTTON_PREFIX_CLS } from './constants';

// 4. 导出组件本身
// 推荐使用命名导出，保持一致性
export const Icon = IconComponent;

// (可选) 如果你想让 Button.vue 作为默认导出 (不常用，但可能)
// export default ButtonComponent;