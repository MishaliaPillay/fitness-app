"use client";

import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Switch,
  Typography,
  Card,
  message,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useClientActions } from "../providers/client/index";
import dayjs from "dayjs";
import { useEffect } from "react";
import { IClient } from "@/providers/client/context";
import { useUserState, useUserActions } from "../providers/userlogin/index";
const { Title } = Typography;

export default function ClientForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { createClient } = useClientActions();
  const [messageApi, contextHolder] = message.useMessage();

  const { user } = useUserState();
  const { getUser } = useUserActions();

  useEffect(() => {
    getUser();
  }, []);
  const onFinish = async (values: IClient) => {
    setLoading(true);

    const clientData: IClient = {
      _id: "",
      fullName: values.fullName,
      email: values.email,
      contactNumber: values.contactNumber,
      sex: values.sex,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
        : "",
      activeState: true,
      trainerId: user.id,
    };

    try {
      createClient(clientData);
      messageApi.success("Client created successfully!");
      // form.resetFields();
    } catch (error) {
      messageApi.error("Error creating client. Please try again.");
      console.error("Error:", error);
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
            Register Client
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ activeState: true }}
          >
            {/* Full Name */}
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter full name"
                size="large"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter email"
                size="large"
              />
            </Form.Item>

            {/* Contact Number */}
            <Form.Item
              name="contactNumber"
              label="Contact Number"
              rules={[
                { required: true, message: "Please enter contact number" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter contact number"
                size="large"
              />
            </Form.Item>

            {/* Sex */}
            <Form.Item
              name="sex"
              label="Sex"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender" size="large">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>

            {/* Date of Birth */}
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Active State */}
            <Form.Item
              name="activeState"
              label="Active State"
              valuePropName="checked"
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>

            {/* Trainer */}

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                Register Client
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
