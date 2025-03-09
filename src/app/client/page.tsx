// client page import React from "react";

"use client";
import ProtectedClientLayout from "./layout"; // Now protected

const ClientDashboard: React.FC = () => {
  return (
    <ProtectedClientLayout>
      <h2>Welcome, Client!</h2>
      <div>
        <h3>Your Meal Plan Progress</h3>
        <p>Here you can track your meal plans and progress.</p>
      </div>
    </ProtectedClientLayout>
  );
};

export default ClientDashboard;
