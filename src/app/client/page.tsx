// client page import React from "react";

"use client";
import UserProfile from "@/components/user-profile";

import ClientDashboardLayout from "./layout";

const ClientDashboard: React.FC = () => {
  return (
    <ClientDashboardLayout>
      <h2>Welcome, Client!</h2>
      <UserProfile />
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
