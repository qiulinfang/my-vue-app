const targetUser = {
  name: "name",
  age: 30,
  email: "zhangsan@example.com",
  _secret: "secret",
  balance: 1000,
};

const setTrapHandler = {
  get(target, property, receiver) {
    console.log(`[GET陷阱] 正在尝试访问属性: "${String(property)}"`);
    if (property === "balance") {
      console.log("访问余额，进行权限检查或格式化...");
      return `${Reflect.get(target, property, receiver).toFixed(2)}`;
    }
    if (property === "nonExistentProperty") {
      return "该属性不存在，返回默认值";
    }
    return Reflect.get(target, property, receiver);
  },

  set(target, property, value, receiver) {
    console.log(`[SET陷阱] 正在尝试设置属性 "${String(property)}" 为 "${value}"`);
    if (property === "age") {
      if (typeof value !== "number" || value < 0 || value > 150) {
        console.error("[SET陷阱] 错误：年龄必须是一个0到150之间的数字。");
        return false; // 表示设置失败
      }
    }
    if (property === "username" && typeof value === "string") {
      // 示例：将用户名统一转换为大写
      value = value.toUpperCase();
    }
    // 执行默认的设置行为，并返回操作结果
    // target[property] = value; // 可以直接赋值
    // return true;
    // 或者更推荐使用 Reflect.set，它会返回操作是否成功的布尔值
    const success = Reflect.set(target, property, value, receiver);
    if (success) {
      console.log(
        `[SET陷阱] 属性 "${String(property)}" 已成功设置为 (处理后为) "${target[property]}"`
      );
    } else {
      console.log(`[SET陷阱] 属性 "${String(property)}" 设置失败`);
    }
    return success;
  },

  has(target, property){
        console.log(`[HAS] 检查属性是否存在: ${String(property)}`);
    if (String(property).startsWith('_')) {
      return false; // 对 'in' 操作符隐藏私有属性
    }
    return Reflect.has(target, property);
  },

  deleteProperty(target, property) {
    console.log(`[DELETE] 删除属性: ${String(property)}`);
    if (String(property).startsWith('_')) {
      console.warn(`[DELETE] 无法删除私有属性 "${String(property)}"`);
      return false;
    }
    return Reflect.deleteProperty(target, property);
  },

  ownKeys(target) {
    console.log(`[OWNKEYS] 获取所有自身属性键`);
    // 过滤掉以下划线开头的属性
    return Reflect.ownKeys(target).filter(key => typeof key === 'string' ? !key.startsWith('_') : true);
  }


};

const proxyWithSetTrap  = new Proxy(targetUser, setTrapHandler);

// 4. 操作代理对象
console.log("--- 操作组合陷阱的代理 ---");
// Get
console.log("ID:", proxyWithSetTrap.id);         // 触发 GET
console.log("Data:", proxyWithSetTrap.data);       // 触发 GET
console.log("Internal:", proxyWithSetTrap._internalKey); // 触发 GET, 返回 undefined

// Set
proxyWithSetTrap.data = "更新后的数据"; // 触发 SET
console.log("更新后的 Data:", proxyWithSetTrap.data);
proxyWithSetTrap.id = "002";             // 触发 SET, 但被阻止
console.log("尝试修改后的 ID:", proxyWithSetTrap.id); // 仍然是 "001"

// Has
console.log("'data' in proxyWithSetTrap:", 'data' in proxyWithSetTrap); // 触发 HAS
console.log("'_internalKey' in proxyWithSetTrap:", '_internalKey' in proxyWithSetTrap); // 触发 HAS, 返回 false

// Delete
delete proxyWithSetTrap.data; // 触发 DELETE
console.log("删除 data 后的代理:", proxyWithSetTrap);
// delete proxyWithSetTrap._internalKey; // 触发 DELETE, 但被阻止

// OwnKeys (影响 Object.keys, Object.getOwnPropertyNames, for...in 等)
console.log("Object.keys(proxyWithSetTrap):", Object.keys(proxyWithSetTrap)); // 触发 OWNKEYS, _internalKey 被过滤
for (const key in proxyWithSetTrap) { // 也会间接触发 OWNKEYS 和 HAS
  console.log(`for...in loop key: ${key}`);
}