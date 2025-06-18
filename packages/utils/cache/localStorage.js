export class LocalStorageHelper {
    constructor() {
      // 检查localStorage是否可用
      if (typeof Storage === "undefined") {
        console.error("当前浏览器不支持localStorage");
        return;
      }
    }
  
    // 存储数据
    setItem(key, value) {
      return new Promise((resolve, reject) => {
        try {
          const data = JSON.stringify(value);  // 将对象转为字符串存储
          localStorage.setItem(key, data);
          console.log(`数据已存储：${key}`);
          resolve();
        } catch (error) {
          console.error("数据存储失败", error);
          reject(error);
        }
      });
    }
  
    // 获取数据
    getItem(key) {
      return new Promise((resolve, reject) => {
        try {
          const data = localStorage.getItem(key);
          if (data === null) {
            resolve(null); // 如果没有找到该项，返回null
          } else {
            resolve(JSON.parse(data));  // 将字符串解析为原始对象
          }
        } catch (error) {
          console.error("数据获取失败", error);
          reject(error);
        }
      });
    }
  
    // 更新数据（与 setItem 相同，覆盖原数据）
    updateItem(key, value) {
      return this.setItem(key, value);  // 使用 setItem 方法更新数据
    }
  
    // 删除数据
    removeItem(key) {
      return new Promise((resolve, reject) => {
        try {
          localStorage.removeItem(key);
          console.log(`数据已删除：${key}`);
          resolve();
        } catch (error) {
          console.error("数据删除失败", error);
          reject(error);
        }
      });
    }
  
    // 清空所有数据
    clear() {
      return new Promise((resolve, reject) => {
        try {
          localStorage.clear();
          console.log("所有数据已清空");
          resolve();
        } catch (error) {
          console.error("清空数据失败", error);
          reject(error);
        }
      });
    }
  
    // 检查某个键是否存在
    containsKey(key) {
      return localStorage.getItem(key) !== null;
    }
  
    // 获取所有的键
    getAllKeys() {
      return new Promise((resolve, reject) => {
        try {
          const keys = [];
          for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
          }
          resolve(keys);
        } catch (error) {
          console.error("获取所有键失败", error);
          reject(error);
        }
      });
    }
  }
  