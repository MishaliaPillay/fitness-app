"use client";
import { Form, Input, Button, Select, Typography, Card, Col, Row } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/interfaces/roles";
import { IUser } from "@/providers/userlogin/context";
import { useUserActions } from "@/providers/userlogin";
import React, { useState } from "react";
import { message } from "antd";
import Image from "next/image"; // Import next/image component

const { Title } = Typography;

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const router = useRouter();
  const { verifyUser } = useUserActions();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginForm) => {
    const { email, password, role } = values;
    setLoading(true);

    try {
      const signedUser: IUser = {
        email: values.email,
        password: values.password,
      };

      let loginSuccess = false;

      try {
        verifyUser(signedUser);
        messageApi.success("Login successful");
        loginSuccess = true;
      } catch (error) {
        messageApi.error("Login failed. Please check your credentials.");
        console.error("Verification failed:", error);
        loginSuccess = false;
        setLoading(false);
        return;
      }

      if (loginSuccess) {
        const user = { email, password, role };
        localStorage.setItem("currentUser", JSON.stringify(user));

        setTimeout(() => {
          if (role === "trainer") {
            router.push("/trainer");
          } else if (role === "client") {
            router.push("/client");
          } else {
            messageApi.warning("Invalid role selected");
            router.push("/login");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to process login:", error);
      messageApi.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f2f5",
        }}
      >
        <Row gutter={24} style={{ width: "100%" }}>
          {/* Image Column */}
          <Col
            xs={0}
            sm={12}
            style={{
              position: "relative",
              height: "100vh",
            }}
          >
            <Image
              src="/images/login.jpg" // Path to your image in the public folder
              alt="Login Image"
              layout="fill"
              objectFit="cover"
            />
          </Col>

          {/* Form Column */}
          <Col
            xs={24}
            sm={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh", // To vertically center the form
            }}
          >
            <Card style={{ width: 400, padding: "24px" }}>
              <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
                Login
              </Title>
              <Form
                form={form}
                name="login"
                onFinish={handleLogin}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please input a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="role"
                  rules={[{ required: true, message: "Please select your role!" }]}
                >
                  <Select placeholder="Select your role" size="large">
                    <Select.Option value="trainer">Trainer</Select.Option>
                    <Select.Option value="client">Client</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                  >
                    Log in
                  </Button>
                </Form.Item>
                <p style={{ textAlign: "center" }}>
                  Don&apos;t have an account?{" "}
                  <Button type="link" onClick={() => router.push("/sign-up")}>
                    Sign Up
                  </Button>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
