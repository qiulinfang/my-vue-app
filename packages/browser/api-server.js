// api-server.js

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // 仅处理对 /api/data 路径的请求
  if (req.url === '/api/data' && req.method === 'GET') {
    
    // --- 关键部分：这里我们【没有】设置任何 CORS 相关的响应头 ---

    // 设置响应头为 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000'); // 只允许来自 8000 端口的请求
    // 发送 JSON 数据
    res.end(JSON.stringify({
      message: '你好，这是来自端口 3000 的数据！',
      timestamp: new Date()
    }));

  } else {
    // 对于其他所有请求，返回 404
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`✅ API 服务正在运行在 http://localhost:${PORT}`);
  console.log('   它将拒绝来自其他源的请求。');
});