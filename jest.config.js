const config = {
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
  testEnvironment: "jsdom", // 使用 jsdom 环境
  moduleFileExtensions: [
    // 识别的文件扩展名
    "vue",
    "js",
    "cjs",
    "mjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "vue", // 重复 'vue' 是为了确保 Vue 文件被优先处理
  ],
  transform: {
    // 文件转换配置
    "^.+\\.vue$": "@vue/vue3-jest", // 使用 vue3-jest 处理 .vue 文件
    "^.+\\.(js|cjs|mjs|jsx|ts|tsx)$": "babel-jest", // 使用 babel-jest 处理 js/ts 等文件
  },
  moduleNameMapper: {
    // 模块名映射，用于处理路径别名 (例如 @/*)
    "^@/(.*)$": "<rootDir>/src/$1", // 将 @/* 映射到 src 目录
  },
  testMatch: [
    // 测试文件匹配规则
    "**/*.test.js",
  ],
  // ... 其他 Jest 配置
};

export default config;
