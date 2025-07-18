// index.js (使用 Express 版本)
const express = require('express');
const app = express();
const port = 3000;

// 当用户访问根路径 ('/') 时，执行回调函数
app.get('/', (req, res) => {
  res.send('Hello, this is my first Express Server!');
});

// 让服务器开始监听指定的端口
app.listen(port, () => {
  console.log(`Express 服务器正在 http://localhost:${port} 上运行`);
});