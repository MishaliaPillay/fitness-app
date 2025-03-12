"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFoodState, useFoodActions } from "@/providers/food-items";
import { Table, Button, message } from "antd";

const CreateMealPlan = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const clientName = searchParams.get("clientName");

  const { foods, isPending, isError } = useFoodState();
  const { getAllFood } = useFoodActions();
  const [selectedFood, setSelectedFood] = useState<React.Key[]>([]);

  useEffect(() => {
    if (!foods || foods.length === 0) {
      getAllFood();
    }
  }, [foods]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Calories", dataIndex: "calories", key: "calories" },
    { title: "Protein (g)", dataIndex: "protein", key: "protein" },
    { title: "Carbs (g)", dataIndex: "carbs", key: "carbs" },
    { title: "Fat (g)", dataIndex: "fat", key: "fat" },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedFood(newSelectedRowKeys);
    message.info(`Selected ${newSelectedRowKeys.length} item(s)`);
  };

  const rowSelection = {
    selectedRowKeys: selectedFood,
    onChange: onSelectChange,
  };

  const handleSubmitMealPlan = async () => {
    if (!clientId || !foods || selectedFood.length === 0) {
      message.error("Please select food items for the meal plan.");
      return;
    }

    // Create meal plan data structure
    const mealPlan = {
      name: `${clientName}'s Meal Plan`,
      clientId,
      trainerId: "trainer_id", // Replace with actual trainer ID
      clientName,
      description: "Sample description", // Add the description as needed
      notes: "Sample notes", // Add any notes if needed
      clientNotes: [], // You can update this based on client feedback
      meals: [
        {
          name: "Sample Meal", // You can set specific meal names if needed
          id: Date.now(), // Unique ID for each meal
          note: "Meal note", // Meal-specific note
          clientNotes: [], // Notes for client
          items: selectedFood
            .map((foodId) => {
              const food = foods.find((item) => item.id === foodId);
              if (!food) return null;
              return {
                name: food.name,
                quantity: 1,
                unit: "g", // or another unit you prefer
                calories: Number(food.energy) || 0, // Ensure it's a number
                carbs: Number(food.carbs) || 0, // Ensure it's a number
                protein: Number(food.protein) || 0, // Ensure it's a number
                fat: Number(food.fat) || 0, // Ensure it's a number
                note: null,
              };
            })
            .filter(Boolean), // Filter out null values if food is not found
          itemTotals: {
            calories: selectedFood.reduce((total: number, foodId) => {
              const food = foods.find((item) => item.id === foodId);
              return total + (Number(food?.energy) || 0); // Ensure it's a number
            }, 0),
            protein: selectedFood.reduce((total: number, foodId) => {
              const food = foods.find((item) => item.id === foodId);
              return total + (Number(food?.protein) || 0); // Ensure it's a number
            }, 0),
            carbs: selectedFood.reduce((total: number, foodId) => {
              const food = foods.find((item) => item.id === foodId);
              return total + (Number(food?.carbs) || 0); // Ensure it's a number
            }, 0),
            fat: selectedFood.reduce((total: number, foodId) => {
              const food = foods.find((item) => item.id === foodId);
              return total + (Number(food?.fat) || 0); // Ensure it's a number
            }, 0),
          },
        },
      ],
      mealTotals: {
        calories: selectedFood.reduce((total: number, foodId) => {
          const food = foods.find((item) => item.id === foodId);
          return total + (Number(food?.energy) || 0); // Ensure it's a number
        }, 0),
        carbs: selectedFood.reduce((total: number, foodId) => {
          const food = foods.find((item) => item.id === foodId);
          return total + (Number(food?.carbs) || 0); // Ensure it's a number
        }, 0),
        protein: selectedFood.reduce((total: number, foodId) => {
          const food = foods.find((item) => item.id === foodId);
          return total + (Number(food?.protein) || 0); // Ensure it's a number
        }, 0),
        fat: selectedFood.reduce((total: number, foodId) => {
          const food = foods.find((item) => item.id === foodId);
          return total + (Number(food?.fat) || 0); // Ensure it's a number
        }, 0),
      },
      base: 1, // Assuming all plans are basic. Adjust if needed
    };

    try {
      console.log(mealPlan);
      const token = sessionStorage.getItem("jwt")?.trim();
      const response = await fetch(
        "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/mealplan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(mealPlan),
        }
      );
      console.log(mealPlan);
      if (!response.ok) throw new Error("Failed to create meal plan");

      message.success("Meal plan created successfully!");
      router.push("/trainer"); // Navigate back to trainer dashboard
    } catch (error) {
      message.error("Failed to create meal plan." , error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4" style={{ color: "white" }}>
        Create Meal Plan for {clientName}
      </h2>

      {isPending && <p style={{ color: "white" }}>Loading food items...</p>}
      {isError && (
        <p className="text-red-500" style={{ color: "white" }}>
          Error fetching food items.
        </p>
      )}

      <Table
        columns={columns}
        dataSource={
          foods ? foods.map((food) => ({ ...food, key: food.id })) : []
        }
        rowKey={(record) => record.id || record.name}
        rowSelection={rowSelection}
        pagination={{ pageSize: 5 }}
      />

      <Button
        type="primary"
        disabled={selectedFood.length === 0}
        onClick={handleSubmitMealPlan}
        className="mt-4"
      >
        Submit Meal Plan
      </Button>
    </div>
  );
};

export default CreateMealPlan;
