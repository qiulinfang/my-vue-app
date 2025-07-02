import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import UserManagement from '../pages/UserManagement';

// 使用对象式路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 使用主布局作为父路由的元素
    children: [ // 子路由会渲染在 MainLayout 的 Outlet 中
      {
        index: true, // index: true 表示这是默认的子路由
        element: <Home />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'settings',
        // 你可以在这里创建 Settings.jsx 页面
        element: <div>这里是系统设置页面</div>,
      }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
}

export default AppRouter;