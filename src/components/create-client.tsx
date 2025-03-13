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
  Row,
  Col,
  Divider,
  Space,
  Avatar,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  HeartOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useClientActions } from "../providers/client/index";
import dayjs from "dayjs";
import { IClient } from "@/providers/client/context";
import { useUserState, useUserActions } from "../providers/userlogin/index";

const { Title, Text, Paragraph } = Typography;

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
      activeState: values.activeState ?? true,
      trainerId: user.id,
    };

    try {
      await createClient(clientData);
      messageApi.success(
        "Client successfully registered! You can now start creating personalized fitness plans."
      );
      form.resetFields();
    } catch (error) {
      messageApi.error("Error registering client. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="fitness-client-page" style={{ padding: "24px" }}>
        <Row gutter={[24, 24]} justify="center" align="middle">
          {/* Left Column - Form */}
          <Col xs={24} sm={24} md={12} lg={10} xl={8}>
            <Card
              bordered={false}
              style={{
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                borderRadius: "12px",
              }}
              className="form-card"
            >
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div style={{ textAlign: "center" }}>
                  <Avatar
                    size={64}
                    icon={<TeamOutlined />}
                    style={{ marginBottom: "16px" }}
                  />
                  <Title level={2} style={{ margin: 0 }}>
                    Register New Client
                  </Title>
                  <Text type="secondary">
                    Add your client details to start their fitness journey
                  </Text>
                </div>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ activeState: true }}
                  requiredMark="optional"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter client's full name",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter full name"
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter valid email",
                            type: "email",
                          },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="Enter email"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="contactNumber"
                        label="Contact Number"
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact number",
                          },
                        ]}
                      >
                        <Input
                          prefix={<PhoneOutlined />}
                          placeholder="Phone number"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="sex"
                        label="Gender"
                        rules={[
                          { required: true, message: "Please select gender" },
                        ]}
                      >
                        <Select placeholder="Select gender">
                          <Select.Option value="male">Male</Select.Option>
                          <Select.Option value="female">Female</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="dateOfBirth"
                        label="Date of Birth"
                        rules={[
                          {
                            required: true,
                            message: "Please select date of birth",
                          },
                        ]}
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                          style={{ width: "100%" }}
                          placeholder="Select date"
                          suffixIcon={<CalendarOutlined />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="activeState"
                    label="Client Status"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="Active Client"
                      unCheckedChildren="Inactive"
                      style={{ width: "120px" }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      icon={<HeartOutlined />}
                      style={{
                        height: "46px",
                        fontWeight: 600,
                        borderRadius: "6px",
                      }}
                    >
                      Register Client
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </Card>
          </Col>

          {/* Right Column - Content */}
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div style={{ padding: "0 16px" }}>
              <Title level={2}>
                <TrophyOutlined
                  style={{ marginRight: "8px", color: "#1890ff" }}
                />
                Transform Your Clients&apos; Fitness Journey
              </Title>

              <Paragraph style={{ fontSize: "16px" }}>
                Welcome to our advanced client management system. Registering
                clients is the first step to providing them with personalized
                fitness plans and tracking their progress towards their health
                goals.
              </Paragraph>

              <Divider />

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Card className="info-card" style={{ height: "100%" }}>
                    <HeartOutlined
                      style={{
                        fontSize: "24px",
                        color: "#1890ff",
                        marginBottom: "12px",
                      }}
                    />
                    <Title level={4}>Personalized Plans</Title>
                    <Text>
                      Create custom workout routines tailored to each client&apos;s
                      needs and goals
                    </Text>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card className="info-card" style={{ height: "100%" }}>
                    <CalendarOutlined
                      style={{
                        fontSize: "24px",
                        color: "#1890ff",
                        marginBottom: "12px",
                      }}
                    />
                    <Title level={4}>Progress Tracking</Title>
                    <Text>
                      Monitor client improvements with comprehensive tracking
                      tools
                    </Text>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card className="info-card" style={{ height: "100%" }}>
                    <TeamOutlined
                      style={{
                        fontSize: "24px",
                        color: "#1890ff",
                        marginBottom: "12px",
                      }}
                    />
                    <Title level={4}>Client Management</Title>
                    <Text>
                      Easily manage all your clients in one centralized platform
                    </Text>
                  </Card>
                </Col>
              </Row>

              <Divider />

              <Card
                style={{
                  borderRadius: "12px",
                  marginTop: "16px",
                }}
              >
                <Title level={4}>Why Register Clients?</Title>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Text strong>Organized Information</Text> - Keep all client
                    data in one secure place
                  </li>
                  <li>
                    <Text strong>Better Communication</Text> - Stay connected
                    with automated notifications
                  </li>
                  <li>
                    <Text strong>Detailed Insights</Text> - Track progress and
                    adapt training plans
                  </li>
                  <li>
                    <Text strong>Professional Image</Text> - Provide a seamless,
                    digital experience for your clients
                  </li>
                </ul>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

      <style jsx global>{`
        .fitness-client-page {
          min-height: 100vh;
        }

        .form-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }

        .info-card {
          text-align: center;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .fitness-client-page {
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}
