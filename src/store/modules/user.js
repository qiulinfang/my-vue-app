// src/store/modules/user.js

import { defineStore } from 'pinia';
// 导入你的 API 请求函数 (需要自行创建)
import { login as loginApi, getUserInfo as getUserInfoApi, logout as logoutApi } from '@/api/user';
// 导入操作 Token 的工具函数 (需要自行创建)
import { getToken, setToken, removeToken } from '@/utils/auth';
// 导入路由实例，可能在登出时需要重置路由
import router, { resetRouter } from '@/router'; // 假设 router/index.js 导出了 resetRouter 方法

// 使用 defineStore 定义一个 store
// 第一个参数是 store 的唯一 ID，Pinia 用它连接 devtools
// 第二个参数是一个选项对象 (Option Store) 或一个 Setup 函数 (Setup Store)
// 这里我们使用 Option Store 风格
export const useUserStore = defineStore('user', {
  /* State: 定义状态的地方
   * 必须是一个函数，返回一个对象，避免跨请求状态污染 (特别是 SSR)
   */
  state: () => ({
    // 从本地存储读取初始 token，或为 null
    token: getToken(),
    // 用户名
    name: '',
    // 头像 URL
    avatar: '',
    // 角色列表 (例如 ['admin', 'editor'])
    roles: [],
    // 权限标识列表 (例如 ['user:list', 'user:create'])
    permissions: [],
  }),

  /* Getters: 类似于 Vue 组件的 computed 计算属性
   * 用于从 state 派生出一些状态，具有缓存特性
   */
  getters: {
    // 示例：判断用户是否登录
    isLoggedIn: (state) => !!state.token,
    // 示例：获取用户信息对象
    userInfo: (state) => ({
      name: state.name,
      avatar: state.avatar,
      roles: state.roles,
      permissions: state.permissions,
    }),
  },

  /* Actions: 定义业务逻辑和异步操作的地方
   * 可以在 actions 中直接修改 state (通过 this 访问)
   */
  actions: {
    // 用户登录 Action
    async login(loginData) {
      try {
        // 调用登录 API
        const response = await loginApi(loginData); // loginData 通常包含 { username, password }
        // 假设 API 成功后返回 { token: '...' }
        const { token } = response.data; 
        
        // 更新 Pinia state 中的 token
        this.token = token;
        // 将 token 存储到本地存储 (例如 Cookies 或 LocalStorage)
        setToken(token);

        // 返回成功状态或数据
        return Promise.resolve(response); // 或者直接返回 true/其他需要的数据
      } catch (error) {
        // 处理登录失败
        console.error('登录失败:', error);
        return Promise.reject(error);
      }
    },

    // 获取用户信息 Action
    async getInfo() {
      // 如果没有 token，则无法获取用户信息
      if (!this.token) {
        return Promise.reject('无法获取用户信息：Token 不存在');
      }
      try {
        // 调用获取用户信息的 API
        const response = await getUserInfoApi(); // 通常 API 会根据请求头中的 Token 返回用户信息
        // 假设 API 成功后返回 { name: '...', avatar: '...', roles: [...], permissions: [...] }
        const { name, avatar, roles, permissions } = response.data;

        // 检查返回的角色或权限是否有效
        if (!roles || roles.length <= 0) {
           throw new Error('获取用户信息失败：角色列表为空！');
        }

        // 更新 Pinia state
        this.name = name;
        this.avatar = avatar;
        this.roles = roles;
        this.permissions = permissions;
        
        return Promise.resolve(response.data); // 返回用户信息数据
      } catch (error) {
        console.error('获取用户信息失败:', error);
        // 获取失败时，可能需要清除本地 token 并强制重新登录
        // await this.resetToken(); // 调用下面的 resetToken action
        return Promise.reject(error);
      }
    },

    // 用户登出 Action
    async logout() {
      try {
        // 如果后端有登出接口，则调用它
        // await logoutApi(); // 可选

        // 清除 Pinia state 中的用户信息
        this.token = null;
        this.name = '';
        this.avatar = '';
        this.roles = [];
        this.permissions = [];

        // 清除本地存储的 token
        removeToken();
        // 重置路由（清除动态添加的路由）
        resetRouter(); 

        // 可以选择性地跳转到登录页
        // router.push('/login'); 

        return Promise.resolve();
      } catch (error) {
        console.error('登出失败:', error);
        return Promise.reject(error);
      }
    },

    // (可选) 重置 Token 和状态 Action (通常在 getInfo 失败或 token 失效时调用)
    async resetToken() {
        this.token = null;
        this.name = '';
        this.avatar = '';
        this.roles = [];
        this.permissions = [];
        removeToken();
        return Promise.resolve();
    }
  },
});
