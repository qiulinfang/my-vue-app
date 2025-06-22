// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { fakeApi } from '../api/fakeApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const { user } = await fakeApi.login(username, password);
    setUser(user);
    return user;
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 创建一个自定义 Hook，方便其他组件使用 context
export function useAuth() {
  return useContext(AuthContext);
}