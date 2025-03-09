"use client";
import "@ant-design/v5-patch-for-react-19";
import React from "react";
import { Button } from "antd";

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
      }}
    >
      {" "}
      <Button onClick={handleNavigate} type="primary">
        Go To login
      </Button>
    </div>
  );
}
