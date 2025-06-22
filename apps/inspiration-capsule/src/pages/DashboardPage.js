// src/pages/DashboardPage.jsx

import React from 'react'; // 确保导入 React
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Spin, Alert, List, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fakeApi } from '../api/fakeApi';
import { showNotification } from '../features/ui/uiSlice';
// 假设你的组件也已经迁移到了 components 文件夹

function DashboardPage() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // (这里是你所有的 useQuery, useMutation, 和组件逻辑...)
  // ...
  // ...
  const { data: inspirations, isLoading, error } = useQuery({
    queryKey: ['inspirations'], 
    queryFn: () => fakeApi.getInspirations('user1'),
  });

  const deleteMutation = useMutation({
    mutationFn: (inspirationId) => fakeApi.deleteInspiration(inspirationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspirations'] });
      dispatch(showNotification({ message: '删除成功!', type: 'success' }));
    },
    onError: () => {
      dispatch(showNotification({ message: '删除失败!', type: 'error' }));
    }
  });

  if (isLoading) return <Spin tip="加载中..." size="large" />;
  if (error) return <Alert message="错误" description={error.message} type="error" />;

  return (
    <div>
      <List
        dataSource={inspirations}
        renderItem={(item) => (
          <List.Item
            actions={[<Button type="link" danger onClick={() => deleteMutation.mutate(item.id)}>删除</Button>]}
          >
            {item.text}
          </List.Item>
        )}
      />
    </div>
  );
}

// 关键！确保这一行存在！
export default DashboardPage;