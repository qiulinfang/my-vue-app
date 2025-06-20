import { defineStore } from 'pinia';

// 为单个待办事项定义类型接口
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 为整个 store 的 state 定义类型接口
interface TodoState {
  todos: Todo[];
  nextId: number;
}

// 使用 defineStore 创建一个 store
export const useTodoStore = defineStore('todo', {
  // 1. State: 定义初始状态
  state: (): TodoState => ({
    todos: [
      { id: 1, text: '学习 Pinia', completed: true },
      { id: 2, text: '创建一个待办事项应用', completed: false },
    ],
    nextId: 3,
  }),

  // 2. Getters: store 的计算属性
  getters: {
    // 获取已完成的列表
    completedTodos(state): Todo[] {
      return state.todos.filter(todo => todo.completed);
    },
    // 获取未完成的列表
    incompleteTodos(state): Todo[] {
      return state.todos.filter(todo => !todo.completed);
    },
  },

  // 3. Actions: store 的方法
  actions: {
    // 添加一个新的待办事项
    addTodo(text: string) {
      if (!text.trim()) return; // 不添加空内容

      this.todos.push({
        id: this.nextId++,
        text: text,
        completed: false,
      });
    },

    // 切换待办事项的完成状态
    toggleTodo(id: number) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    // 移除一个待办事项
    removeTodo(id: number) {
      this.todos = this.todos.filter(t => t.id !== id);
    },
  },
});