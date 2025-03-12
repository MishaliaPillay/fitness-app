"use client";

import { useEffect } from "react";
import { useUserState, useUserActions } from "../providers/userlogin/index";
import { Skeleton, Divider, Typography, Space } from "antd";

const { Text, Title } = Typography;

const UserProfile = () => {
  const { user, isPending, isError } = useUserState();
  const { getUser } = useUserActions();

  useEffect(() => {
    getUser();
  }, []);

  if (isPending) return <Skeleton active avatar paragraph={{ rows: 3 }} />;
  if (isError) return <Text type="danger">Error fetching user details.</Text>;
  if (!user) return <Text type="warning">No user data available.</Text>;

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }} size="small">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {user.name}
            </Title>
            <Text type="secondary">{user.role}</Text>
          </div>
        </div>

        <Divider style={{ margin: "8px 0" }} />

        <div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text strong>Email:</Text>
              <Text> {user.email}</Text>
            </div>
            <div>
              <Text strong>User ID:</Text>
              <Text> {user.id}</Text>
            </div>
          </Space>
        </div>
      </Space>
    </div>
  );
};

export default UserProfile;
