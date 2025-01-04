export class IndexedDBHelper {
    constructor(dbName, version) {
      this.dbName = dbName;
      this.version = version;
      this.db = null;
    }
  
    // 打开数据库
    open() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
  
        request.onsuccess = (event) => {
          this.db = event.target.result;
          console.log("数据库打开成功");
          resolve(this.db);
        };
  
        request.onerror = (event) => {
          console.log("数据库打开失败", event.target.error);
          reject(event.target.error);
        };
  
        // 创建对象存储空间
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          console.log("数据库版本更新");
          this.onUpgradeNeeded(db, event);
        };
      });
    }
  
    // 数据库升级时创建对象存储空间
    onUpgradeNeeded(db, event) {
      // 创建对象存储空间（例如：users）
      const objectStore = db.createObjectStore("users", { keyPath: "id" });
      objectStore.createIndex("name", "name", { unique: false });
    }
  
    // 获取事务
    getTransaction(storeName, mode = "readonly") {
      const transaction = this.db.transaction([storeName], mode);
      return transaction.objectStore(storeName);
    }
  
    // 添加数据
    add(storeName, data) {
      return new Promise((resolve, reject) => {
        const objectStore = this.getTransaction(storeName, "readwrite");
        const request = objectStore.add(data);
  
        request.onsuccess = () => {
          console.log("数据添加成功");
          resolve(request.result);
        };
  
        request.onerror = (event) => {
          console.log("数据添加失败", event.target.error);
          reject(event.target.error);
        };
      });
    }
  
    // 获取数据
    get(storeName, key) {
      return new Promise((resolve, reject) => {
        const objectStore = this.getTransaction(storeName, "readonly");
        const request = objectStore.get(key);
  
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
  
        request.onerror = (event) => {
          console.log("数据获取失败", event.target.error);
          reject(event.target.error);
        };
      });
    }
  
    // 更新数据
    put(storeName, data) {
      return new Promise((resolve, reject) => {
        const objectStore = this.getTransaction(storeName, "readwrite");
        const request = objectStore.put(data);
  
        request.onsuccess = () => {
          console.log("数据更新成功");
          resolve(request.result);
        };
  
        request.onerror = (event) => {
          console.log("数据更新失败", event.target.error);
          reject(event.target.error);
        };
      });
    }
  
    // 删除数据
    delete(storeName, key) {
      return new Promise((resolve, reject) => {
        const objectStore = this.getTransaction(storeName, "readwrite");
        const request = objectStore.delete(key);
  
        request.onsuccess = () => {
          console.log("数据删除成功");
          resolve();
        };
  
        request.onerror = (event) => {
          console.log("数据删除失败", event.target.error);
          reject(event.target.error);
        };
      });
    }
  
    // 使用游标遍历数据
    openCursor(storeName) {
      return new Promise((resolve, reject) => {
        const objectStore = this.getTransaction(storeName, "readonly");
        const cursorRequest = objectStore.openCursor();
        const results = [];
  
        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            results.push(cursor.value); // 收集游标数据
            cursor.continue(); // 继续遍历
          } else {
            resolve(results); // 遍历完毕，返回结果
          }
        };
  
        cursorRequest.onerror = (event) => {
          console.log("遍历失败", event.target.error);
          reject(event.target.error);
        };
      });
    }
  
    // 关闭数据库
    close() {
      if (this.db) {
        this.db.close();
        console.log("数据库已关闭");
      }
    }
  }
  