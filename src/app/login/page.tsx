"use client";
import { Form, Input, Button, Select, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/interfaces/roles";

const { Title } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleLogin = (values: LoginForm) => {
    const { email, username, password, role } = values;

    // Store the entire user object in localStorage
    const user = { email, username, password, role };
    localStorage.setItem("currentUser", JSON.stringify(user)); // Save the full user object as a string in localStorage

    console.log(localStorage.getItem("currentUser")); // Check if data is stored correctly

    // Redirect based on the role of the user
    if (role === "trainer") {
      router.push("/trainer");
    } else if (role === "client") {
      router.push("/client");
    } else {
      // Handle invalid role
      router.push("/login");
    }
  };

  return (
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
          Login
        </Title>
        <Form form={form} name="login" onFinish={handleLogin} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
            <Button type="primary" htmlType="submit" size="large" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
