<template>
  <div>
    <h2>WebSocket 示例</h2>
    <div>
      <span>连接状态: {{ isConnected ? '已连接' : '未连接' }}</span>
    </div>
    <div>
      <input v-model="inputMsg" placeholder="输入消息" @keyup.enter="sendMessage" />
      <button @click="sendMessage">发送</button>
      <button @click="closeConnection" :disabled="!isConnected">关闭连接</button>
    </div>
    <div>
      <h3>收到的消息：</h3>
      <ul>
        <li v-for="(msg, idx) in messages" :key="idx">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const wsUrl = 'ws://localhost:3001' // 改为你的 Node.js ws 服务地址
let ws = null

const isConnected = ref(false)
const inputMsg = ref('')
const messages = ref([])

const connectWebSocket = () => {
  ws = new WebSocket(wsUrl)
  ws.onopen = () => {
    isConnected.value = true
    messages.value.push('WebSocket 已连接')
  }
  ws.onmessage = (event) => {
    messages.value.push('收到: ' + event.data)
  }
  ws.onclose = () => {
    isConnected.value = false
    messages.value.push('WebSocket 已断开')
  }
  ws.onerror = (err) => {
    messages.value.push('WebSocket 错误: ' + err)
  }
}

const sendMessage = () => {
  if (ws && isConnected.value && inputMsg.value) {
    ws.send(inputMsg.value)
    messages.value.push('发送: ' + inputMsg.value)
    inputMsg.value = ''
  }
}

const closeConnection = () => {
  if (ws && isConnected.value) {
    ws.close()
  }
}

onMounted(() => {
  connectWebSocket()
})

onBeforeUnmount(() => {
  if (ws) ws.close()
})
</script>
