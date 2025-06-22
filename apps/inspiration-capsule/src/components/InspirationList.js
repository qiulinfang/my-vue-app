// src/components/InspirationList.js
import React from 'react';
import InspirationItem from './InspirationItem'; // 导入子组件

// 接收两个 props:
// 1. inspirations: 整个灵感数组
// 2. onDelete: 删除函数，需要继续传递给子组件
function InspirationList({ inspirations, onDelete }) {
  return (
    <div className="inspiration-list">
      <ul>
        {inspirations.map(inspiration => (
          <InspirationItem 
            key={inspiration.id} 
            inspiration={inspiration} 
            onDelete={onDelete} // 将 onDelete 函数继续传递下去
          />
        ))}
      </ul>
    </div>
  );
}

export default InspirationList;