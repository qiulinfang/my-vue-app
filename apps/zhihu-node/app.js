// 导入 Koa 构造函数
const Koa = require('koa');

// 创建一个 Koa 应用实例
const app = new Koa();

// 定义中间件
// ctx (上下文) 对象包含了 request 和 response 的所有信息
app.use(async (ctx) => {
  // 设置响应体
  ctx.body = 'Hello, Koa!';
});

// 定义监听端口
const port = 3000;

// 启动服务器并监听端口
app.listen(port, () => {
  console.log(`Koa server is running at http://localhost:${port}`);
});