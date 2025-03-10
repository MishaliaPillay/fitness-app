// client page import React from "react";

"use client";
import UserProfile from "@/components/user-profile";
import ProtectedClientLayout from "./layout"; // Now protected


const ClientDashboard: React.FC = () => {
  return (
    <ProtectedClientLayout>
     
      <h2>Welcome, Client!</h2>
      <UserProfile />
    </ProtectedClientLayout>
  );
};

export default ClientDashboard;
