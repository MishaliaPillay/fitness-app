"use client";
import { Form, Input, Button, Typography, Card, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/interfaces/roles";
import { ITrainer } from "@/providers/trainer/context";
import { useTrainerActions } from "@/providers/trainer";
import { useClientActions } from "@/providers/client";
import React, { useState } from "react";
import { message } from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function SignUp() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const router = useRouter();
  const { createTrainer } = useTrainerActions();
  const { registerClient } = useClientActions();
  const [loading, setLoading] = useState(false);

  const signUp = async (values: LoginForm) => {
    setLoading(true);

    if (values.role === "trainer") {
      console.log("Creating trainer");
      try {
        const newTrainer: ITrainer = {
          name: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.password,
          role: "admin",
          contactNumber: values.contactNumber,
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
          if (error.response != null) {
            let errorMessages;
            try {
              errorMessages = error.response.data.data.message
                .map((errorObj) => {
                  return Object.values(errorObj).join(", ");
                })
                .join("; ");
            } catch (e) {
              // If error format is different than expected
              errorMessages =
                error.response.data?.message || "Unknown error occurred";
              throw e;
            }

            messageApi.error(`Trainer creation failed: ${errorMessages}`);
            console.log(error.response.data);
          } else {
            messageApi.error(
              "Server not responding: " + (error.message || String(error))
            );
            console.log(error);
          }

          signupSuccess = false;
        }
        if (signupSuccess) {
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
        messageApi.error(
          typeof error === "string"
            ? error
            : error.message || "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    } else if (values.role === "client") {
      console.log("Creating client");
      try {
        const newClient = {
          _id:0,
          name: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.password,
          dateOfBirth: new Date().toISOString().split("T")[0], // Default to today's date
          contactNumber: values.contactNumber,
          policiesAccepted: true,
        };

        try {
          await registerClient(newClient);
          messageApi.success("Account created successfully!");
          router.push("/login");
        } catch (error) {
          if (typeof error === "string") {
            console.log("Error: " + error);
            if (error === "Bad Request") {
              messageApi.error("This email is already in use");
            } else {
              messageApi.error(error);
            }
          } else if (error.response) {
            messageApi.error(
              "Client creation failed: " + extractErrorMessage(error)
            );
          } else {
            messageApi.error(
              "Server not responding: " + (error.message || String(error))
            );
          }
        }
      } catch (error) {
        console.error("Outer catch error:", error);
        messageApi.error(
          typeof error === "string" ? error : error.message || String(error)
        );
      } finally {
        setLoading(false);
      }
    }
  };

  function extractErrorMessage(error) {
    try {
      if (
        error.response?.data?.data?.message &&
        Array.isArray(error.response.data.data.message) &&
        error.response.data.data.message.length > 0
      ) {
        const firstError = error.response.data.data.message[0];

        if (typeof firstError === "object") {
          const firstErrorKey = Object.keys(firstError)[0];
          if (firstErrorKey) {
            return firstError[firstErrorKey];
          }
        } else if (typeof firstError === "string") {
          return firstError;
        }
      }

      if (error.response?.data?.message) {
        return error.response.data.message;
      }

      return "An error occurred. Please try again.";
    } catch (e) {
      return "An error occurred. Please try again.";
      throw e;
    }
  }

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
            {/* Role Selection Dropdown */}
            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select placeholder="Select your role" size="large">
                <Option value="trainer">Trainer</Option>
                <Option value="client">Client</Option>
              </Select>
            </Form.Item>

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
              name="contactNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern:
                    /^(\+\d{1,3}[-\s]?)?\(?(\d{3})\)?[-\s]?(\d{3})[-\s]?(\d{4})$/,
                  message: "Please input a valid phone number!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Phone Number"
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
