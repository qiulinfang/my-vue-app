// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Spin, Alert, List, Button, Typography, Input, Divider, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { fakeApi } from '../api/fakeApi';
import { showNotification } from '../features/ui/uiSlice';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;
const { Search } = Input;

function DashboardPage() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { user, logout } = useAuth();

  // React Query 数据获取逻辑 (保持不变)
  const { data: inspirations, isLoading, error } = useQuery({
    queryKey: ['inspirations', user.id], 
    queryFn: () => fakeApi.getInspirations(user.id),
  });

  // 使用 React Query 的 useMutation 进行添加
  const addMutation = useMutation({
    mutationFn: (newText) => fakeApi.addInspiration(user.id, newText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspirations', user.id] });
      dispatch(showNotification({ message: '灵感已添加!', type: 'success' }));
    },
  });
  
  // 删除逻辑 (保持不变)
  const deleteMutation = useMutation({
    mutationFn: (inspirationId) => fakeApi.deleteInspiration(user.id, inspirationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspirations', user.id] });
      dispatch(showNotification({ message: '已删除', type: 'info' }));
    },
  });

  // 处理添加灵感的函数
  const handleAdd = (value) => {
    if (value.trim()) {
      addMutation.mutate(value);
    }
  };

  // 1. 使用 <Spin> 组件显示加载状态
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // 2. 使用 <Alert> 组件显示错误信息
  if (error) {
    return <Alert message="数据加载失败" description={error.message} type="error" showIcon />;
  }

  return (
    <div>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>欢迎, {user.name}!</Title>
        <Button onClick={logout}>退出登录</Button>
      </Space>

      <Search
        placeholder="输入你的新灵感，然后按回车键添加..."
        enterButton="添加灵感"
        size="large"
        onSearch={handleAdd}
        loading={addMutation.isLoading}
      />
      
      <Divider />

      {/* 3. 使用 <List> 组件渲染数据 */}
      <List
        header={<Text strong>我的灵感列表</Text>}
        bordered
        dataSource={inspirations}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button 
                type="link" 
                danger 
                onClick={() => deleteMutation.mutate(item.id)}
                loading={deleteMutation.isLoading && deleteMutation.variables === item.id}
              >
                删除
              </Button>
            ]}
          >
            <Text>{item.text}</Text>
          </List.Item>
        )}
      />
    </div>
  );
}

export default DashboardPage;