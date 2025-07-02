import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  // 点击菜单项的回调
  const onMenuClick = (e) => {
    // e.key 就是我们在菜单项中定义的 key，即路由路径
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, .2)", borderRadius: 6 }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          onClick={onMenuClick}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "首页",
            },
            {
              key: "/users",
              icon: <UserOutlined />,
              label: "用户管理",
            },
            {
              key: "/settings",
              icon: <UploadOutlined />,
              label: "系统设置",
            },
          ]}
        />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* 这里是关键：用于渲染子路由对应的页面组件 */}
            <Outlet />
          </Content>
        </Layout>
      </Sider>
    </Layout>
  );
};
export default MainLayout;
