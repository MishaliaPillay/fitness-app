"use client";
import React from "react";
import ProtectedTrainerLayout from "./layout"; // Now protected
import UserProfile from "@/components/user-profile";

const TrainerDashboard: React.FC = () => {
  return (
    <ProtectedTrainerLayout>
      <h2>Welcome, Trainer!</h2>
      <div>
        <h3>Manage Clients and Meal Plans</h3>
        <p>Here you can manage your clients and assign meal plans.</p>
      </div>
      <UserProfile />
    </ProtectedTrainerLayout>
  );
};

export default TrainerDashboard;
