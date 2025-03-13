"use client";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Card,
  Row,
  Col,
  Progress,
  Tooltip,
  Badge,
  Avatar,
  Statistic,
  Popover,
  Typography,
} from "antd";
import {
  ContainerOutlined,
  FireOutlined,
  PieChartOutlined,
  CalendarOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import withAuth from "@/hoc/with-auth";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type Props = {
  children: React.ReactNode;
};

// Sample user profile component
const UserProfile = () => (
  <div>
    <p>Alex Johnson</p>
    <p>Premium Member</p>
  </div>
);

// Sample data


const workoutSessions = [
  { day: "Monday", type: "Upper Body", completed: true },
  { day: "Tuesday", type: "Lower Body", completed: true },
  { day: "Wednesday", type: "Rest Day", completed: true },
  { day: "Thursday", type: "HIIT", completed: false },
  { day: "Friday", type: "Core & Cardio", completed: false },
  { day: "Saturday", type: "Full Body", completed: false },
  { day: "Sunday", type: "Rest Day", completed: false },
];

const ProtectedClientLayout = withAuth(
  ({ children }: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [waterIntake, setWaterIntake] = useState(Array(8).fill(false));
  
    const [drawerVisible, setDrawerVisible] = useState(false);
    const router = useRouter();

    // Toggle drawer for mobile view
    const toggleDrawer = () => {
      setDrawerVisible(!drawerVisible);
    };

    const toggleWaterGlass = (index: number) => {
      const newWaterIntake = [...waterIntake];
      newWaterIntake[index] = !newWaterIntake[index];
      setWaterIntake(newWaterIntake);
    };

    const waterCount = waterIntake.filter(Boolean).length;
    const waterPercentage = (waterCount / 8) * 100;

    // Logout handler
    const handleLogout = () => {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // You might want to add any additional cleanup here

      // Redirect to login page
      router.push("/login");
    };

    return (
      <Layout className="min-h-screen">
        <Sider
          width={250}
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
        >
          <div className="p-4 text-center">
            {!collapsed && (
              <h2 className="text-white text-xl">FitTracker Pro</h2>
            )}
            {collapsed && <h2 className="text-white text-xl">FTP</h2>}
          </div>
          <div className="flex justify-center mb-6">
            <Avatar size={collapsed ? 40 : 64} icon={<UserOutlined />} />
          </div>
          {!collapsed && (
            <div className="text-center text-white mb-6">
              <p className="text-lg">Alex Johnson</p>
              <p className="text-xs opacity-70">Premium Member</p>
            </div>
          )}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", icon: <PieChartOutlined />, label: "Dashboard" },
              { key: "2", icon: <CalendarOutlined />, label: "Workout Plan" },
              { key: "3", icon: <FireOutlined />, label: "My Nutrition" },
              { key: "4", icon: <BellOutlined />, label: "Notifications" },
              {
                key: "5",
                icon: <LogoutOutlined />,
                label: "Sign Out",
                onClick: handleLogout,
              },
            ]}
          />
        </Sider>
        <Layout>
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
            { (
              <Button
                type="text"
                icon={
                  drawerVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                }
                onClick={toggleDrawer}
                style={{ marginRight: 16 }}
              />
            )}
            <Title
            
              style={{ margin: 0, color: "white" }}
            >
              Trainer Dashboard
            </Title>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* User Avatar with Profile Popup on Hover */}
              <Popover
                content={<UserProfile />}
                title="User Profile"
                trigger="hover"
                mouseEnterDelay={0.3}
                mouseLeaveDelay={0.5}
                placement="bottomRight"
                overlayStyle={{ width: "300px" }}
              >
                <Avatar
                  src="/images/trainer.jpg"
                  style={{ cursor: "pointer" }}
                  size="large"
                />
              </Popover>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ color: "white", marginLeft: 16 }}
              >
                Logout
              </Button>
            </div>
          </Header>
          <Content className="p-4 md:p-6">
            <Breadcrumb
              className="mb-4"
              items={[{ title: "Home" }, { title: "Dashboard" }]}
            />

            <Row gutter={[16, 16]}>
              {/* Stats Overview */}
              <Col xs={24} lg={8}>
                <Card title="Daily Overview" className="h-full">
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Statistic
                        title="Calories"
                        value={1250}
                        suffix="/ 2100"
                        valueStyle={{ color: "#3f8600", fontSize: "16px" }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Steps"
                        value={6542}
                        suffix="/ 10k"
                        valueStyle={{ color: "#1677ff", fontSize: "16px" }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Active"
                        value="45"
                        suffix="min"
                        valueStyle={{ color: "#fa8c16", fontSize: "16px" }}
                      />
                    </Col>
                  </Row>
                  <Progress
                    percent={60}
                    status="active"
                    strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                    className="mt-4"
                  />
                </Card>
              </Col>

              {/* Water Tracker */}
              <Col xs={24} lg={8}>
                <Card
                  title={
                    <div className="flex items-center">
                      <ContainerOutlined className="mr-2 text-blue-500" />
                      <span>Water Tracker</span>
                    </div>
                  }
                  className="h-full"
                >
                  <div className="text-center mb-4">
                    <Progress
                      type="circle"
                      percent={waterPercentage}
                      format={() => `${waterCount}/8`}
                      width={80}
                      strokeColor={{
                        "0%": "#87d4fa",
                        "100%": "#1890ff",
                      }}
                    />
                    <p className="mt-2 text-gray-500">Daily Goal: 8 glasses</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {waterIntake.map((filled, index) => (
                      <Tooltip
                        title={filled ? "Click to unfill" : "Click to fill"}
                        key={index}
                      >
                        <Button
                          type={filled ? "primary" : "default"}
                          shape="circle"
                          icon={<ContainerOutlined />}
                          onClick={() => toggleWaterGlass(index)}
                          className={filled ? "text-white" : "text-blue-400"}
                        />
                      </Tooltip>
                    ))}
                  </div>
                </Card>
              </Col>

              {/* Workout Schedule */}
              <Col xs={24} lg={8}>
                <Card title="Weekly Workouts" className="h-full">
                  <div className="flex flex-wrap gap-2">
                    {workoutSessions.map((session, index) => (
                      <Tooltip
                        title={`${session.day}: ${session.type}`}
                        key={index}
                      >
                        <Badge
                          status={session.completed ? "success" : "default"}
                          text={session.day.substring(0, 3)}
                          className="mb-2"
                        />
                      </Tooltip>
                    ))}
                  </div>
                  <p className="mt-2">
                    Today: <span className="font-bold">HIIT Training</span>
                  </p>
                  <Button type="primary" className="mt-4">
                    View Workout Details
                  </Button>
                </Card>
              </Col>

              {/* Rest of the component remains the same */}
              {children}
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  },
  { allowedRoles: ["client"] }
);

export default ProtectedClientLayout;
