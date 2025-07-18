import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3001 })

wss.on('connection', function connection(ws) {
  console.log('客户端已连接')

  ws.on('message', function incoming(message) {
    console.log('收到消息: %s', message)
    ws.send(`服务端收到: Node-${message}`)
  })

  ws.on('close', () => {
    console.log('客户端已断开')
  })

  ws.send('欢迎连接到 Node.js WebSocket 服务端！')
})

console.log('WebSocket 服务已启动，端口 3001')