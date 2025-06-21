// 模拟的博客文章数据库
const posts = {
  '1': { id: 1, title: 'Vue Router 深入指南', content: '这是一篇关于 Vue Router 的深度文章...' },
  '2': { id: 2, title: 'Vue 3 组合式 API 探秘', content: '组合式 API 是 Vue 3 的一大亮点...' },
  '3': { id: 3, title: 'Pinia 状态管理实践', content: 'Pinia 是新一代的 Vue 状态管理库...' }
};

// 模拟一个异步获取文章的函数
export const getPostById = (id) => {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      if (posts[id]) {
        console.log(`API: 成功获取文章 ${id}`);
        resolve(posts[id]);
      } else {
        console.error(`API: 文章 ${id} 未找到`);
        reject(new Error('Post not found'));
      }
    }, 800); // 模拟 800ms 的网络延迟
  });
};

// src/api.js
const articles = {
  '1': { id: 1, title: '深入 Vue.js 3', content: 'Vue 3 带来了许多激动人心的变化...', premium: true },
  '2': { id: 2, title: 'TypeScript 实战指南', content: 'TypeScript 提供了强大的类型系统...', premium: true },
  '3': { id: 3, title: '公共文章：前端简史', content: '从早期网页到现代框架...', premium: false }
};

// 模拟获取单篇文章
export const getArticleById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (articles[id]) {
        resolve(articles[id]);
      } else {
        reject(new Error('Article not found'));
      }
    }, 500);
  });
};