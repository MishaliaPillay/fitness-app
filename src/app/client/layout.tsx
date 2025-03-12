"use client"; // Required for client-side features like hooks

import React from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";

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
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", label: "Dashboard" },
              { key: "2", label: "Clients" },
              { key: "3", label: "Meal Plans" },
            ]}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Header style={{ padding: 0, background: "#fff" }}>
            <h2>Client Dashboard</h2>
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 16 }}>
            <Breadcrumb items={[{ title: "Home" }, { title: "Trainer" }]} />

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
