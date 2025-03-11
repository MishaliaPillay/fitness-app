"use client";

import { useEffect } from "react";
import { useFoodState, useFoodActions } from "../providers/food-items/index";

const FoodItems = () => {
  const { food, isPending, isError } = useFoodState();
  const { getAllFood } = useFoodActions();

  useEffect(() => {
    getAllFood();
  }, []);

  if (isPending) return <p style={{ color: "red" }}>Loading food details...</p>;
  if (isError)
    return <p style={{ color: "red" }}>Error fetching food details.</p>;
  if (!food) return <p style={{ color: "red" }}>No food data available.</p>;

  return (
    <div style={{ color: "red" }}>
      <h2>food Profile</h2>
      <ul>
        <li>
          <strong>Name:</strong> {food.name}
        </li>
        <li>
          <strong>Category</strong> {food.category}
        </li>
      </ul>
    </div>
  );
};

export default FoodItems;
