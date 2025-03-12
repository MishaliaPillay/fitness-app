"use client";
import React, { useState } from "react";
import { Layout, Menu, Button, Row, Col, Typography, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons"; // Optional icons for profile
import UserProfile from "@/components/user-profile";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const { Header, Content } = Layout;

const ClientDashboard: React.FC = () => {
  const [filledGlasses, setFilledGlasses] = useState<number>(0);
  const router = useRouter(); // For routing

  // Handle clicking to fill a glass
  const handleClick = (glassIndex: number) => {
    if (glassIndex <= filledGlasses) {
      return; // Prevent clicking a glass that's already filled
    }
    setFilledGlasses(glassIndex);
  };

  const renderGlass = (index: number) => {
    const isFilled = index <= filledGlasses;
    return (
      <Col
        span={3}
        key={index}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          style={{
            width: 50,
            height: 100,
            borderRadius: 8,
            backgroundColor: isFilled ? "#00aaff" : "#e0e0e0", // Blue if filled, gray if not
            borderColor: isFilled ? "#00aaff" : "#d0d0d0",
            transition: "background-color 0.3s",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            fontSize: "1.5rem",
            color: isFilled ? "white" : "transparent",
          }}
          onClick={() => handleClick(index)}
        >
          {isFilled && "💧"} {/* Display water drop emoji when filled */}
        </Button>
      </Col>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header with Nav Bar */}
      <Header style={{ background: "#fff", padding: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
            <Title level={3} style={{ margin: 0 }}>
              Client Dashboard
            </Title>
          </div>
          <Menu
            mode="horizontal"
            theme="light"
            style={{ lineHeight: "64px" }}
            onClick={({ key }) => router.push(`/${key}`)} // Menu routing
            items={[
              { key: "home", label: "Home" },
              { key: "meal-plans", label: "Meal Plans" },
              { key: "profile", label: "Profile" },
            ]}
          ></Menu>
        </div>
      </Header>

      {/* Content */}
      <Content style={{ padding: "0 50px", marginTop: 16 }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Title level={4}>
            <UserProfile />
          </Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              icon={<UserOutlined />}
              size={64}
              style={{ marginRight: 20 }}
            />
            <div>
              <h3>John Doe</h3>
              <p>Email: john.doe@example.com</p>
            </div>
          </div>
        </div>

        {/* Trainer Tips Section */}
        <div style={{ marginTop: 40 }}>
          <Title level={2}>Trainer’s Tips</Title>
          <Card style={{ backgroundColor: "#f9f9f9", marginBottom: 16 }}>
            <p>
              <strong>Tip #1:</strong> Drink water regularly to stay hydrated!
            </p>
            <p>
              <strong>Tip #2:</strong> Focus on proper form to avoid injuries.
            </p>
            <p>
              <strong>Tip #3:</strong> Include a balanced mix of protein, carbs,
              and fats in your diet.
            </p>
          </Card>
        </div>

        {/* Exercise Schedule Section */}
        <div style={{ marginTop: 40 }}>
          <Title level={2}>Your Workout Schedule</Title>
          <ul>
            <li key={1}>Monday: 30-minute Cardio - 8:00 AM</li>
            <li key={2}>Wednesday: 45-minute Strength Training - 10:00 AM</li>
            <li key={3}>Friday: Yoga - 5:00 PM</li>
          </ul>
        </div>

        {/* Hydration Tracker Section */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Title level={2}>Stay Hydrated! Track your water intake.</Title>
          <Row gutter={[16, 16]} justify="center">
            {[...Array(8)].map((_, index) => renderGlass(index + 1))}
          </Row>
          <div style={{ marginTop: 20 }}>
            <p>{`You have drunk ${filledGlasses} out of 8 glasses today.`}</p>
            <Button
              type="primary"
              onClick={() => setFilledGlasses(0)}
              style={{ marginTop: 20 }}
            >
              Reset Tracker
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ClientDashboard;
