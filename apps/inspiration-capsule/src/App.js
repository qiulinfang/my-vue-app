// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import GlobalNotification from './components/GlobalNotification'; // 我们稍后会创建它
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 1. 全局通知组件，用于显示 Redux 传来的消息 */}
      <GlobalNotification />

      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>灵感胶囊 💊</Title>
      </Header>
      
      <Content style={{ padding: '24px 48px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: 8 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Inspiration Capsule ©2025 Created with Ant Design
      </Footer>
    </Layout>
  );
}

export default App;