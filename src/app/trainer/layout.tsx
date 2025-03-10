"use client"; // Required for client-side features like hooks

import React from "react";
import {
  Form,
  Input,
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Row,
  Col,
  Card,
  Statistic,
} from "antd";
import withAuth from "@/hoc/with-auth";
import UserProfile from "@/components/user-profile";
import CreateClientForm from "@/components/create-client"; // Import Create Client Form

const { Header, Content, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

const ProtectedTrainerLayout = withAuth(
  ({}: Props) => {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={250} theme="dark">
          <div
            className="logo"
            style={{ padding: "16px", color: "white", textAlign: "center" }}
          >
            <h2>Trainer Dashboard</h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", label: "Home" },
              { key: "2", label: "Create Client" },
              { key: "3", label: "Meal Plans" },
            ]}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Header
            style={{
              padding: 0,
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ margin: 0 }}>Trainer Dashboard</h2>
            <UserProfile /> {/* User Profile in the Header */}
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 16 }}>
            <Breadcrumb
              items={[{ title: "Home" }, { title: "Trainer Dashboard" }]}
            />
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              {/* Data Cards */}
              <Row gutter={16} style={{ marginBottom: "20px" }}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total Clients"
                      value={10} // Replace with dynamic data
                      valueStyle={{ color: "#3f8600" }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total Meal Plans"
                      value={5} // Replace with dynamic data
                      valueStyle={{ color: "#3f8600" }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Upcoming Appointments"
                      value={3} // Replace with dynamic data
                      valueStyle={{ color: "#1890ff" }}
                    />
                  </Card>
                </Col>
              </Row>

              {/* Create Meal Plan */}
              <h3>Create Meal Plan</h3>
              <Form layout="vertical">
                <Form.Item label="Plan Name">
                  <Input placeholder="Enter meal plan name" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Create Plan
                </Button>
              </Form>

              <h3 style={{ marginTop: "30px" }}>Client List</h3>
              <ul>
                <li>Client 1 - Meal Plan: Healthy Eating</li>
                <li>Client 2 - Meal Plan: Keto Diet</li>
                <li>Client 3 - Meal Plan: Vegan Plan</li>
              </ul>

              {/* Create Client Form Display */}
              <CreateClientForm />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  },
  { allowedRoles: ["trainer"] }
); // Protected layout, only trainers can access this layout

export default ProtectedTrainerLayout;
