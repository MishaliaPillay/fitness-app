"use client"; // Required for client-side features like hooks

import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Card, Statistic } from "antd";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/with-auth";
import CreateClientForm from "@/components/create-client"; // Import Create Client Form
import ClientList from "@/components/client-list";
import MealPlan from "@/components/meal-plans";
import FoodItems from "@/components/food-items";

const { Header, Content, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

const ProtectedTrainerLayout = withAuth(
  ({ children }: Props) => {
    const [currentPage, setCurrentPage] = useState("home");

    // Dummy data
    const trainerData = {
      totalClients: 10,
      totalMealPlans: 5,
      upcomingAppointments: 3,
    };

    // Handle sidebar menu click to change content
    const handleMenuClick = (e: { key: string }) => {
      setCurrentPage(e.key);
    };

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={250} theme="dark">
          <div
            className="logo"
            style={{ padding: "16px", textAlign: "center" }}
          >
            <h2 style={{ color: "white" }}>Trainer Dashboard</h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentPage]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="create-client">Create Client</Menu.Item>
            <Menu.Item key="meal-plans">Meal Plans</Menu.Item>
            <Menu.Item key="food-items">Food Items</Menu.Item>
            <Menu.Item key="clients">Client List</Menu.Item>
          </Menu>
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
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 16 }}>
            <Breadcrumb
              items={[{ title: "Home" }, { title: "Trainer Dashboard" }]}
            />
            <div style={{ padding: 24, minHeight: 280 }}>
              {/* Data Cards */}
              <Row gutter={16} style={{ marginBottom: "20px" }}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total Clients"
                      value={trainerData.totalClients}
                      valueStyle={{ color: "#3f8600" }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total Meal Plans"
                      value={trainerData.totalMealPlans}
                      valueStyle={{ color: "#3f8600" }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Upcoming Appointments"
                      value={trainerData.upcomingAppointments}
                      valueStyle={{ color: "#1890ff" }}
                    />
                  </Card>
                </Col>
              </Row>

              {/* Content Display Based on Menu Selection */}
              {currentPage === "home" && (
                <div style={{}}>
                  <h3>Latest Trainer News</h3>
                  <p>New training techniques are available. Check them out!</p>
                  <h3>Notifications</h3>
                  <ul>
                    <li>New client registered: John Doe</li>
                    <li>Meal plan updated for Sarah</li>
                    <li>Upcoming training session in 2 hours</li>
                  </ul>
                </div>
              )}

              {currentPage === "create-client" && <CreateClientForm />}
              {currentPage === "clients" && <ClientList />}
              {currentPage === "meal-plans" && <MealPlan />}
              {currentPage === "food-items" && <FoodItems />}
            </div>
          </Content>
          <footer style={{ padding: "16px", textAlign: "center" }}>
            <p>
              Trainer Dashboard - Your platform for managing clients and meal
              plans
            </p>
          </footer>
        </Layout>
      </Layout>
    );
  },
  { allowedRoles: ["trainer"] }
); // Protected layout, only trainers can access this layout

export default ProtectedTrainerLayout;
