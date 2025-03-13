"use client";
import "@ant-design/v5-patch-for-react-19";
import React from "react";
import { Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1 style={{ color: "#1890ff", marginBottom: "8px" }}>Welcome!</h1>
      <p style={{ color: "#595959", marginBottom: "24px" }}>
        We&apos;re glad you&apos;re here
      </p>

      <Button
        onClick={handleNavigate}
        type="primary"
        size="large"
        icon={<SmileOutlined />}
        style={{
          borderRadius: "8px",
          padding: "0 24px",
          height: "48px",
          fontSize: "16px",
          boxShadow: "0 2px 8px rgba(24, 144, 255, 0.2)",
          transition: "all 0.3s ease",
        }}
      >
        Let&apos;s Get Started
      </Button>

      <p style={{ fontSize: "14px", color: "#8c8c8c", marginTop: "16px" }}></p>
    </div>
  );
}
