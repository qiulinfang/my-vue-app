// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await auth.login(username, password);
      navigate('/dashboard'); // 登录成功后，跳转到仪表盘
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="用户名 (user1)" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="密码 (password123)" required />
        <button type="submit">登录</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default LoginPage;