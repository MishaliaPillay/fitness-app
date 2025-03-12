import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation"; // For navigation
import { useTrainerActions, useTrainerState } from "@/providers/trainer";
import { useUserState } from "@/providers/userlogin";
import { Table, Button, message } from "antd";

const ClientList = () => {
  const { getTrainers } = useTrainerActions();
  const { user, isPending: userLoading, isError: userError } = useUserState();
  const { trainers, isPending, isError } = useTrainerState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      getTrainers(user.id);
    }
  }, [user?.id]);

  if (userLoading || isPending) return <p>Loading clients...</p>;
  if (userError || isError)
    return <p className="text-red-500">Error fetching clients.</p>;

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any[]
  ) => {
    if (newSelectedRowKeys.length > 1) return; // Ensure only one selection at a time
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedClient(selectedRows[0]); // Store selected client
  };

  const rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: any[]) => void;
    type: "radio";
  } = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio", // Explicitly typed
  };

  const handleCreateMealPlan = () => {
    if (!selectedClient) return; console.log(selectedClient)
    router.push(
      `/trainer/create-meal-plan?clientId=${selectedClient._id}&clientName=${selectedClient.fullName}`
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Client List</h2>
      <Table
        columns={columns}
        dataSource={trainers}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
        rowSelection={rowSelection}
      />
      <Button
        type="primary"
        disabled={!selectedClient}
        onClick={handleCreateMealPlan}
        className="mt-4"
      >
        Create Meal Plan
      </Button>
    </div>
  );
};

export default ClientList;
