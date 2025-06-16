

# My Vue App - 高级组件库与应用集成平台

这是一个基于 **Vue 3** 和 **Vite** 构建的、高度模块化的 Monorepo 项目。它不仅仅是一个单一的应用，而是一个集成了以下多个部分的综合性平台：

1.  一个**功能丰富的自研UI组件库** (`src/components`)。
2.  一个用于展示和测试该组件库的**交互式文档站点** (`src/views`)。
3.  一个完整的、作为子模块集成的**“者也”仿知乎专栏应用**。
4.  一个用于学习和探索 Vue 核心原理的**迷你版 Vue 实现** (`packages/mini-vue`)。

## ✨ 主要特性

* **丰富的组件库**: 包含从`Alert`、`Button`到`Table`、`Upload`等数十个高质量的基础UI组件。
* **模块化与工程化**: 采用 Monorepo 结构，通过 `pnpm/yarn/npm workspaces` 管理多个内部包和应用。
* **Vue 3 最佳实践**: 广泛使用 Composition API (`setup`语法糖、自定义 Hooks) 进行逻辑复用和组织。
* **自动化测试**: 为核心组件编写了完善的单元测试 (`Jest`)，保障代码质量。
* **前端工程化**: 使用 Vite 作为开发和构建工具，提供极速的开发体验。
* **状态管理**: 使用 Vuex 进行模块化的状态管理。
* **路由管理**: 使用 Vue Router 进行清晰的、按模块划分的路由配置。
* **自定义指令**: 包含如权限控制、点击防抖等实用的自定义指令。

## 🏛️ 项目结构

本项目采用 Monorepo 结构，将不同的功能模块分离到独立的包和应用中，使项目结构清晰，易于维护。

```
my-vue-app/
├── apps/
│   ├── zhihu/             # “者也”仿知乎专栏应用模块
│   └── docs/              # (推荐) 组件库的文档站点应用
├── packages/
│   ├── components/        # 核心：可被多个应用共享的UI组件库
│   ├── mini-vue/          # 独立的、用于学习的迷你版Vue实现
│   ├── utils/             # 共享的工具函数库
│   └── hooks/             # 共享的自定义Hooks
├── public/                # 静态资源目录
├── package.json           # 项目依赖和脚本
└── vite.config.js         # Vite 配置文件
```

* **`apps/`**: 存放可独立部署的应用。例如，`zhihu` 应用和组件库的文档站点。
* **`packages/`**: 存放可被共享的包，这是 Monorepo 的核心。
    * **`components`**: 所有UI组件的源代码、样式和单元测试。
    * **`mini-vue`**: 独立于主应用的Vue核心原理解析与实现。
    * **`utils`**, **`hooks`**: 可在所有 `apps` 和其他 `packages` 中复用的工具和逻辑。

## 🚀 技术栈

* **核心框架**: Vue 3
* **构建工具**: Vite
* **编程语言**: JavaScript / TypeScript
* **路由**: Vue Router 4
* **状态管理**: Vuex 4
* **UI组件库**: 自研 + (集成的`zheye`模块中使用了 `bootstrap`, `easymde`)
* **CSS预处理器**: SCSS/Sass
* **单元测试**: Jest

## ⚡ 快速上手

### 环境准备

-   Node.js >= 16
-   pnpm (推荐) / yarn / npm

### 安装

1.  **克隆项目到本地**
    ```bash
    git clone <your-repository-url>
    cd my-vue-app
    ```

2.  **安装依赖**
    在根目录执行安装命令，会自动安装所有 `workspaces`（即`apps`和`packages`下所有模块）的依赖。
    ```bash
    # 推荐使用 pnpm
    pnpm install

    # 或者使用 yarn
    yarn

    # 或者使用 npm
    npm install
    ```

### 运行

* **启动开发服务器**
    ```bash
    npm run dev
    ```
    此命令会启动 Vite 开发服务器，您可以在浏览器中访问 `http://localhost:5173` (或其他指定端口) 查看效果。

* **构建生产环境包**
    ```bash
    npm run build
    ```
    构建后的文件将输出到 `dist` 目录。

* **运行单元测试**
    ```bash
    npm run test
    ```
    此命令会使用 Jest 运行所有 `*.test.js(x)` 文件。

## 📜 可用脚本

在 `package.json` 中定义了以下常用脚本：

* `"dev"`: 启动本地开发服务器。
* `"build"`: 将项目打包构建为生产环境代码。
* `"preview"`: 预览生产环境构建后的应用。
* `"test"`: 运行所有单元测试。

---