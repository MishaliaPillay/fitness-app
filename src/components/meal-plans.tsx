"use client";

import { useEffect } from "react";
import { useMealState, useMealActions } from "@/providers/meal-plans";

const MealPlan = () => {
  const { mealPlan, isPending, isError } = useMealState();
  const { getMealPlan } = useMealActions();

  useEffect(() => {
    getMealPlan();
  }, []);

  if (isPending)
    return <p style={{ color: "red" }}>Loading mealPlan details...</p>;
  if (isError)
    return <p style={{ color: "red" }}>Error fetching mealPlan details.</p>;
  if (!mealPlan)
    return <p style={{ color: "red" }}>No mealPlan data available.</p>;

  return (
    <div style={{ color: "red" }}>
      <h2>mealPlan Profile</h2>
      <ul>
        <li>
          <strong>Name:</strong> {mealPlan.name}
        </li>
      </ul>
    </div>
  );
};

export default MealPlan;
