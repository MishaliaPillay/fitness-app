"use client"; // Required for client-side features like hooks

import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Card,
  Statistic,
  Avatar,
  Image,
  Space,
  Typography,
  Progress,
  Button,
  Divider,
  Drawer,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserAddOutlined,
  BarsOutlined,
  AppleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/with-auth";
import CreateClientForm from "@/components/create-client";
import ClientList from "@/components/client-list";
import MealPlan from "@/components/meal-plans";
import FoodItems from "@/components/food-items";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

type Props = {
  children: React.ReactNode;
};

const ProtectedTrainerLayout = withAuth(
  ({ children }: Props) => {
    const [currentPage, setCurrentPage] = useState("home");
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if window exists (client-side)
    useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth <= 768) {
          setCollapsed(true);
        }
      };

      // Initial check
      checkIsMobile();

      // Add event listener
      window.addEventListener("resize", checkIsMobile);

      // Cleanup
      return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const toggleDrawer = () => {
      setDrawerVisible(!drawerVisible);
    };

    // Dummy data for the dashboard
    const trainerData = {
      totalClients: 10,
      totalMealPlans: 5,
      upcomingAppointments: 3,
      totalSessions: 15,
      averageSatisfaction: 4.8,
      newClients: 2,
    };

    // Client progress data with visual progress
    const clientProgress = [
      {
        name: "Sarah Miller",
        progress: 80,
        description: "Weight Loss",
        progressType: "weight-loss",
        image: "/images/sarah-profile.jpg",
      },
      {
        name: "John Davis",
        progress: 15,
        description: "Strength Gain",
        progressType: "strength-gain",
        image: "/images/john-profile.jpg",
      },
      {
        name: "Emily Chen",
        progress: 90,
        description: "Workout Adherence",
        progressType: "workout-adherence",
        image: "/images/emily-profile.jpg",
      },
    ];

    // Client notes
    const clientNotes = {
      "Sarah Miller":
        "Mentioned slight knee pain during warm-up. Adjust exercises next session.",
      "John Davis":
        "Responds well to motivational cues. Increase intensity gradually.",
      "Emily Chen": "90% adherence to workout plan.",
    };

    // Handle sidebar menu click to change content
    const handleMenuClick = (e: { key: string }) => {
      setCurrentPage(e.key);
      if (isMobile) {
        setDrawerVisible(false);
      }
    };

    const renderContent = () => {
      switch (currentPage) {
        case "home":
          return (
            <div>
              <Title level={3} className="welcome-title">
                Welcome back, Alex! Let's make today a strong one.
              </Title>
              <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
                <Col xs={24} md={12}>
                  <Image
                    src="/images/alex-leading-class.jpg"
                    alt="Alex leading a fitness class"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Title level={4}>Today's Schedule</Title>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                      <Text>
                        9:00 AM - 10:00 AM: Group Fitness - HIIT Circuit
                      </Text>
                    </li>
                    <li>
                      <Text>
                        10:30 AM - 11:30 AM: Personal Training - Sarah Miller
                      </Text>
                    </li>
                    <li>
                      <Text>
                        12:00 PM - 1:00 PM: Personal Training - John Davis
                      </Text>
                    </li>
                    <li>
                      <Text>
                        5:00 PM - 6:00 PM: Group Fitness - Strength Training
                      </Text>
                    </li>
                  </ul>
                  <Title level={4}>Upcoming Appointments</Title>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                      <Text>
                        Tomorrow, 11:00 AM: Personal Training - Emily Chen
                      </Text>
                    </li>
                    <li>
                      <Text>Wednesday, 6:00 PM: Group Fitness - Yoga Flow</Text>
                    </li>
                  </ul>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ textAlign: isMobile ? "center" : "left" }}>
                    <Avatar
                      size={isMobile ? 96 : 128}
                      src="/images/trainer-profile.jpg"
                      style={{ marginBottom: 20 }}
                    />
                  </div>
                  <Title level={4}>Notifications</Title>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Avatar
                        src="/images/client-profile.jpg"
                        style={{ marginRight: 10 }}
                      />
                      <Text>Sarah Miller has updated her food log.</Text>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Avatar
                        src="/images/client-profile.jpg"
                        style={{ marginRight: 10 }}
                      />
                      <Text>
                        John Davis has requested a change to his workout
                        schedule.
                      </Text>
                    </li>
                  </ul>
                  <Title level={4}>Performance Metrics (This Week)</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                      <Card>
                        <Statistic
                          title="Total Sessions"
                          value={trainerData.totalSessions}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card>
                        <Statistic
                          title="Client Satisfaction"
                          value={trainerData.averageSatisfaction}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card>
                        <Statistic
                          title="New Clients"
                          value={trainerData.newClients}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Divider />
              <Title level={4}>Client Progress</Title>
              <Row gutter={[16, 16]}>
                {clientProgress.map((client, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <Card title={client.name}>
                      <Row gutter={[16, 16]} align="middle">
                        <Col xs={8}>
                          <Avatar size={64} src={client.image} />
                        </Col>
                        <Col xs={16}>
                          <Text>{client.description}: </Text>
                          {client.progressType === "weight-loss" && (
                            <Progress percent={client.progress} size="small" />
                          )}
                          {client.progressType === "strength-gain" && (
                            <Space>
                              <Text>+{client.progress} lbs</Text>
                            </Space>
                          )}
                          {client.progressType === "workout-adherence" && (
                            <Progress type="circle" percent={client.progress} />
                          )}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Divider />
              <Title level={4}>Client Notes</Title>
              <Row gutter={[16, 16]}>
                {Object.entries(clientNotes).map(
                  ([clientName, note], index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                      <Card title={clientName}>
                        <Text>{note}</Text>
                      </Card>
                    </Col>
                  )
                )}
              </Row>
              <Divider />
              <Title level={4}>Quick Access</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Button block>Create New Workout Plan</Button>
                </Col>
                <Col xs={24} sm={8}>
                  <Button block>Schedule Appointment</Button>
                </Col>
                <Col xs={24} sm={8}>
                  <Button block>View Client Food Log</Button>
                </Col>
              </Row>
            </div>
          );
        case "create-client":
          return <CreateClientForm />;
        case "clients":
          return <ClientList />;
        case "meal-plans":
          return <MealPlan />;
        case "food-items":
          return <FoodItems />;
        default:
          return null;
      }
    };

    // Main menu items
    const menuItems = [
      {
        key: "home",
        icon: <HomeOutlined />,
        label: "Home",
      },
      {
        key: "create-client",
        icon: <UserAddOutlined />,
        label: "Create Client",
      },
      {
        key: "meal-plans",
        icon: <BarsOutlined />,
        label: "Meal Plans",
      },
      {
        key: "food-items",
        icon: <AppleOutlined />,
        label: "Food Items",
      },
      {
        key: "clients",
        icon: <TeamOutlined />,
        label: "Client List",
      },
    ];

    // Mobile and desktop layouts
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {/* Mobile Drawer for Navigation */}
        {isMobile && (
          <Drawer
            title="Menu"
            placement="left"
            onClose={toggleDrawer}
            open={drawerVisible}
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[currentPage]}
              onClick={handleMenuClick}
              items={menuItems}
            />
          </Drawer>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sider
            width={200}
            theme="dark"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 1000,
            }}
          >
            <div style={{ padding: "16px", textAlign: "center" }}>
              <Title level={4} style={{ color: "white", margin: "10px 0" }}>
                {collapsed ? "TD" : "Trainer Dashboard"}
              </Title>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[currentPage]}
              onClick={handleMenuClick}
              items={menuItems}
            />
          </Sider>
        )}

        <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 200 }}>
          <Header
            style={{
              padding: "0 16px",
              background: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            {isMobile && (
              <Button
                type="text"
                icon={
                  drawerVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                }
                onClick={toggleDrawer}
                style={{ marginRight: 16 }}
              />
            )}
            <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
              Trainer Dashboard
            </Title>
            <div style={{ marginLeft: "auto" }}>
              <Avatar src="/images/trainer-profile.jpg" />
            </div>
          </Header>
          <Content
            style={{
              padding: isMobile ? "0 16px" : "0 30px",
              marginTop: 16,
              transition: "all 0.2s",
            }}
          >
            <Breadcrumb
              items={[
                { title: "Home" },
                {
                  title:
                    currentPage.charAt(0).toUpperCase() +
                    currentPage.slice(1).replace("-", " "),
                },
              ]}
              style={{ margin: "16px 0" }}
            />
            <div
              style={{
                padding: isMobile ? 16 : 24,
                minHeight: 280,

                borderRadius: 4,
              }}
            >
              {renderContent()}
            </div>
          </Content>
          <footer
            style={{
              padding: "16px",
              textAlign: "center",
              backgroundColor: "#f0f2f5",
            }}
          >
            <Text>
              Trainer Dashboard - Your platform for managing clients and meal
              plans
            </Text>
          </footer>
        </Layout>
      </Layout>
    );
  },
  { allowedRoles: ["trainer"] }
);

export default ProtectedTrainerLayout;
