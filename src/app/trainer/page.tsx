"use client";
import React from "react";
import ProtectedTrainerLayout from "./layout"; // Now protected
import UserProfile from "@/components/user-profile";
import FoodItems from "@/components/food-items";
import ClientList from "@/components/client-list";
import MealPlan from "@/components/meal-plans";

const TrainerDashboard: React.FC = () => {
  return (
    <ProtectedTrainerLayout>
    
      <FoodItems />
      <h2>Welcome, Trainer!</h2>
      <div>
        <h3>Manage Clients and Meal Plans</h3>
        <p>Here you can manage your clients and assign meal plans.</p>
      </div><MealPlan/>
      <UserProfile />
      <ClientList/>
    </ProtectedTrainerLayout>
  );
};

export default TrainerDashboard;
