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

// Define an interface for the getUser response
interface UserResponse {
  data: {
    data: IUser;
  };
}

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const router = useRouter();
  const { verifyUser, getUser } = useUserActions();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginForm) => {
    const { email } = values;
    setLoading(true);

    try {
      const signedUser: IUser = {
        email: values.email,
        password: values.password,
      };

      try {
        await verifyUser(signedUser);

        messageApi.success("Login successful");

        const userInfo = { email };
        localStorage.setItem("currentUser", JSON.stringify(userInfo));

        setTimeout(async () => {
          console.log("Calling getUser...");

          try {
            const response: UserResponse = await getUser();

            console.log("getUser raw response:", response);

            let extractedRole: string | null = null;

            if (response && response.data && response.data.data) {
              extractedRole = response.data.data.role || null;
              console.log("Extracted user role:", extractedRole);
              localStorage.setItem(
                "currentUser",
                JSON.stringify(response.data.data)
              );
            }

            const finalRole = extractedRole;
            console.log("Final role used for navigation:", finalRole);
            if (finalRole === "admin") {
              router.push("/trainer");
              console.log("goin gto admin page");
            } else if (finalRole == "user") {
              router.push("/client");
              console.log("going to client page");
            } else {
              console.log("idk why it doesnt want to route");
            }
          } catch (error) {
            console.error("Error calling getUser:", error);
            messageApi.warning("Proceeding with form-selected role");
          }
        }, 1000);
      } catch (error: unknown) {
        console.error("Login error:", error);

        if (error && typeof error === 'object' && 'response' in error) {
          const errorObj = error as { response: { status: number; data?: { data?: { message?: string | string[] } } } };
          
          switch (errorObj.response.status) {
            case 401:
              messageApi.error("Email doesn't exist");
              break;
            case 403:
              messageApi.error("Incorrect password");
              break;
            default:
              if (errorObj.response.data?.data?.message) {
                const errorData = errorObj.response.data.data.message;
                if (Array.isArray(errorData)) {
                  const errorMsg = errorData
                    .map((err) => Object.values(err).join(" "))
                    .join("; ");
                  messageApi.error(errorMsg);
                } else {
                  messageApi.error(errorData);
                }
              } else {
                messageApi.error("Server error");
              }
          }
        } else {
          messageApi.error("Server not responding");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
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
              <Title
                level={2}
                style={{ textAlign: "center", marginBottom: 32 }}
              >
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
                  rules={[
                    { required: true, message: "Please select your role!" },
                  ]}
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