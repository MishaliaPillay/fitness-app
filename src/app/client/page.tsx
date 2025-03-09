// client page import React from "react";

"use client";
import ProtectedClientLayout from "./layout"; // Now protected

const ClientDashboard: React.FC = () => {
  return (
    <ProtectedClientLayout>
      <h2>Welcome, Client!</h2>
    </ProtectedClientLayout>
  );
};

export default ClientDashboard;
