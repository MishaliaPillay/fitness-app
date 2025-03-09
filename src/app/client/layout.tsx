"use client"; // Required for client-side features like hooks

import React from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import withAuth from "@/hoc/with-auth";
const { Header, Content, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

// Wrap the layout component with withAuth HOC
const ProtectedClientLayout = withAuth(
  ({ children }: Props) => {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={250} theme="dark">
          <div
            className="logo"
            style={{ padding: "16px", color: "white", textAlign: "center" }}
          >
            <h2>Client Dashboard</h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              Meal Plans
            </Menu.Item>
            <Menu.Item key="3" icon={<UnorderedListOutlined />}>
              Progress
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Header style={{ padding: 0, background: "#fff" }}>
            <h2>Client Dashboard</h2>
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 16 }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Client</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <h3>Your Meal Plans</h3>
              <ul>
                <li>Healthy Eating - Assigned by Trainer: Trainer Name</li>
                <li>Keto Diet - Assigned by Trainer: Trainer Name</li>
                <li>Vegan Plan - Assigned by Trainer: Trainer Name</li>
              </ul>
              <h3>Track Progress</h3>
              <p>Progress: 60% complete</p>
              <Button type="primary">Update Progress</Button>
            </div>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  },
  { allowedRoles: ["client"] }
); // Protected layout, only clients can access this layout
export default ProtectedClientLayout;