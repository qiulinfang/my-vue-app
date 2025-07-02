<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/types/user'

// 创建一个响应式引用来存储用户列表。
const users = ref<User[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    users.value = (await response.json()) as User[]
  } catch (e) {
    // 类型守卫，确保 e 是一个 Error 对象
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'An unknown error occurred'
    }
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
