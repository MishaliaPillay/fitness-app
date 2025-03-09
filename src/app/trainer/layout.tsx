"use client"; // Required for client-side features like hooks

import React from "react";
import { Layout, Menu, Breadcrumb, Button, Form, Input } from "antd";
import { UserOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import withAuth from "@/hoc/with-auth";

const { Header, Content, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

// Wrap the layout component with withAuth HOC
const ProtectedTrainerLayout = withAuth(
  ({ children }: Props) => {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={250} theme="dark">
          <div
            className="logo"
            style={{ padding: "16px", color: "white", textAlign: "center" }}
          >
            <h2>Trainer Dashboard</h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
              Clients
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
              Meal Plans
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Header style={{ padding: 0, background: "#fff" }}>
            <h2>Trainer Dashboard</h2>
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 16 }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Trainer</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <h3>Client List</h3>
              <ul>
                <li>Client 1 - Meal Plan: Healthy Eating</li>
                <li>Client 2 - Meal Plan: Keto Diet</li>
                <li>Client 3 - Meal Plan: Vegan Plan</li>
              </ul>
              <h3>Create Meal Plan</h3>
              <Form layout="vertical">
                <Form.Item label="Plan Name">
                  <Input placeholder="Enter meal plan name" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Create Plan
                </Button>
              </Form>
            </div>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  },
  { allowedRoles: ["trainer"] }
); // Protected layout, only trainers can access this layout

export default ProtectedTrainerLayout;
