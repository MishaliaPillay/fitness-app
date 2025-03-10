"use client";

import { Form, Input, Select, DatePicker, Button, Switch } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import { useClientActions } from "../providers/client/index";

interface ClientFormValues {
  fullname: string;
  email: string;
  contactNumber: string;
  sex: string;
  dateOfBirth: string;
  activeState: boolean;
  trainerId: string;
}

const trainers = [
  { id: "trainer1", name: "Trainer 1" },
  { id: "trainer2", name: "Trainer 2" },
];

const ClientForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { createClient } = useClientActions(); // Access createClient action from context

  const onFinish: FormProps<ClientFormValues>["onFinish"] = async (values) => {
    setLoading(true);

    // Map the form values to match the IClient interface
    const clientData = {
      fullName: values.fullname, // map 'fullname' to 'fullName'
      email: values.email,
      contactNumber: values.contactNumber,
      sex: values.sex,
      dateOfBirth: values.dateOfBirth,
      activeState: values.activeState,
      trainerId: values.trainerId,
    };

    console.log(" Submitted Values:", clientData);

    // Call createClient with the data
    try {
      await createClient(clientData);
      setLoading(false);
      console.log(" Client created successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error creating client:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        activeState: true,
      }}
    >
      {/* Full Name */}
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[{ required: true, message: "Please enter full name" }]}
      >
        <Input placeholder="Enter full name" />
      </Form.Item>

      {/* Email */}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter email", type: "email" },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      {/* Contact Number */}
      <Form.Item
        label="Contact Number"
        name="contactNumber"
        rules={[{ required: true, message: "Please enter contact number" }]}
      >
        <Input placeholder="Enter contact number" />
      </Form.Item>

      {/* Sex */}
      <Form.Item
        label="Sex"
        name="sex"
        rules={[{ required: true, message: "Please select gender" }]}
      >
        <Select placeholder="Select gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      {/* Date of Birth */}
      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: "Please select date of birth" }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      {/* Active State */}
      <Form.Item
        label="Active State"
        name="activeState"
        valuePropName="checked"
      >
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
      </Form.Item>

      <Form.Item
        label="Trainer"
        name="trainerId"
        rules={[{ required: true, message: "Please select trainer" }]}
      >
        <Select placeholder="Select trainer">
          {trainers.map((trainer) => (
            <Select.Option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClientForm;
