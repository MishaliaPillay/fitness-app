"use client";

import { useEffect, useState } from "react";
import { useMealState, useMealActions } from "@/providers/meal-plans";
import { Button, Modal, Form, Input as AntInput, message } from "antd";
import { IMealPlan } from "@/providers/meal-plans/context";
const MealPlan = () => {
  const { mealPlan, isPending, isError } = useMealState();
  const { getMealPlan, createMealPlan } = useMealActions();
  const [isModalVisible, setIsModalVisible] = useState(false); // For modal visibility
  useEffect(() => {
    getMealPlan();
  }, []);

  if (isPending)
    return <p style={{ color: "red" }}>Loading mealPlan details...</p>;
  if (isError)
    return <p style={{ color: "red" }}>Error fetching mealPlan details.</p>;
  if (!mealPlan)
    return <p style={{ color: "red" }}>No mealPlan data available.</p>;

  const handleCreateMealPlan = async (values: IMealPlan) => {
    try {
      await createMealPlan(values); // Send the parsed food item data to the API
      message.success("Food item created successfully!");
      setIsModalVisible(false); // Close modal on success
    } catch (error) {
      message.error("Failed to create food item!", error);
    }
  };

  return (
    <div style={{ color: "red" }}>
      <h2>mealPlan Profile</h2>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setIsModalVisible(true)}
      >
        Create Meal Plan
      </Button>
      <Modal
        title="Create Food Item"
        open={isModalVisible} // Updated to open
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handleCreateMealPlan}
          layout="vertical"
          initialValues={{
            category: "veg", // Default category
          }}
        >
          <Form.Item
            label="Meal Name"
            name="name"
            rules={[{ required: true, message: "Please input Meal name!" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            label="Note"
            name="notes"
            rules={[{ required: true, message: "Please input notes" }]}
          >
            {" "}
            <AntInput />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please put description" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            label="Protein (g)"
            name="protein"
            rules={[
              { required: true, message: "Please input protein amount!" },
            ]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Carbs (g)"
            name="carbs"
            rules={[{ required: true, message: "Please input carbs amount!" }]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Sugar (g)"
            name="sugar"
            rules={[{ required: true, message: "Please input sugar amount!" }]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Fat (g)"
            name="fat"
            rules={[{ required: true, message: "Please input fat amount!" }]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Fiber (g)"
            name="fiber"
            rules={[{ required: true, message: "Please input fiber amount!" }]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Sodium (mg)"
            name="sodium"
            rules={[{ required: true, message: "Please input sodium amount!" }]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Potassium (mg)"
            name="potassium"
            rules={[
              { required: true, message: "Please input potassium amount!" },
            ]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Cholesterol (mg)"
            name="cholesterol"
            rules={[
              { required: true, message: "Please input cholesterol amount!" },
            ]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            label="Energy (kcal)"
            name="energy"
            rules={[{ required: true, message: "Please input energy value!" }]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create Food Item
          </Button>
        </Form>
      </Modal>
      <p></p>
    </div>
  );
};

export default MealPlan;
