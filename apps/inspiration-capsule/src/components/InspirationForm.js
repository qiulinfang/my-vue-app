// src/components/InspirationForm.js
import React, { useState } from 'react';

// 接收一个 prop:
// onAdd: 一个从父组件传来的函数，用于添加新灵感
function InspirationForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表单提交导致的页面刷新
    if (inputValue.trim() === '') return;
    
    onAdd(inputValue); // 调用父组件传来的函数，并将输入值作为参数
    setInputValue(''); // 清空输入框
  };

  return (
    <form onSubmit={handleSubmit} className="input-area">
      <input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="写下你的新灵感..."
      />
      <button type="submit">添加</button>
    </form>
  );
}

export default InspirationForm;