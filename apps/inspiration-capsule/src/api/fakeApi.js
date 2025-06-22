// src/api/fakeApi.js

// 模拟用户数据库
const users = {
  'user1': { password: 'password123', name: 'Alice' }
};

// 模拟每个用户的灵感数据库
const inspirationsDB = {
  'user1': [
    { id: 101, text: '学习 React Context API' },
    { id: 102, text: '构建一个带认证的应用' }
  ]
};

export const fakeApi = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users[username] && users[username].password === password) {
          resolve({ user: { id: username, name: users[username].name } });
        } else {
          reject(new Error('用户名或密码错误'));
        }
      }, 1000); // 模拟1秒延迟
    });
  },

  getInspirations: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inspirationsDB[userId]) {
          resolve(inspirationsDB[userId]);
        } else {
          reject(new Error('无法获取数据'));
        }
      }, 1500); // 模拟1.5秒延迟
    });
  }
};