// src/components/InspirationItem.js
import React from 'react';

// 这个组件接收两个 props:
// 1. inspiration: 一个包含 id 和 text 的对象
// 2. onDelete: 一个从父组件传来的函数，用于删除
function InspirationItem({ inspiration, onDelete }) {
  return (
    <li>
      <span>{inspiration.text}</span>
      <button onClick={() => onDelete(inspiration.id)} className="delete-btn">
        删除
      </button>
    </li>
  );
}

export default InspirationItem;