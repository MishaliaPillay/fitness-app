"use client";
import { Form, Input, Button, Select, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/interfaces/roles";
import { ITrainer } from "@/providers/trainer/context";
import { useTrainerActions } from "@/providers/trainer";
import React, { useState } from "react";
import { message } from "antd";

const { Title } = Typography;

export default function SignUp() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const router = useRouter();
  const { createTrainer } = useTrainerActions();
  const [loading, setLoading] = useState(false);

  const signUp = async (values: LoginForm) => {
    const { email, username, password, role } = values;
    setLoading(true);

    try {
      const newTrainer: ITrainer = {
        name: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.password,
        role: "admin",
        contactNumber: "",
        planType: "base",
        activeState: true,
        trial: false,
        policiesAccepted: true,
        fullName: "",
        id: "",
        date: "",
      };

      let signupSuccess = false;

      try {
        await createTrainer(newTrainer);
        messageApi.success("Account created successfully!");
        signupSuccess = true;
      } catch (error) {
        messageApi.error("Failed to create account. Please try again.");
        console.error("Trainer creation failed:", error);
        signupSuccess = false;
        setLoading(false);
        return; // Stop execution here on failed signup
      }

      // Only proceed with these steps if signup was successful
      if (signupSuccess) {
        const user = { email, username, password, role };
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Add a slight delay to allow the message to be seen before redirect
        setTimeout(() => {
          if (role === "trainer") {
            router.push("/trainer");
          } else if (role === "client") {
            router.push("/client");
          } else {
            // Handle invalid role
            messageApi.warning("Invalid role selected");
            router.push("/login");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to process signup:", error);
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
        <Card style={{ width: 400, padding: "24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
            Sign Up
          </Title>
          <Form form={form} name="signup" onFinish={signUp} layout="vertical">
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
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
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
                Sign Up
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Button type="link" onClick={() => router.push("/login")}>
                Log In
              </Button>
            </p>
          </Form>
        </Card>
      </div>
    </>
  );
}
