import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation"; // For navigation
import { useTrainerActions, useTrainerState } from "@/providers/trainer";
import { useUserState } from "@/providers/userlogin";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Breakpoint } from "antd/es/_util/responsiveObserver";
import { ITrainer } from "@/providers/trainer/context"; // Assuming ITrainer type

const ClientList = () => {
  const { getTrainers } = useTrainerActions();
  const { user, isPending: userLoading, isError: userError } = useUserState();
  const { trainers, isPending, isError } = useTrainerState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedClient, setSelectedClient] = useState<ITrainer | null>(null); // Ensure selectedClient is ITrainer
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      getTrainers(user.id);
    }
  }, [user?.id]);

  if (userLoading || isPending)
    return <p className="text-center p-4">Loading clients...</p>;
  if (userError || isError)
    return (
      <p className="text-red-500 text-center p-4">Error fetching clients.</p>
    );

  // Properly typed responsive columns configuration
  const columns: ColumnsType<ITrainer> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      responsive: ["xs", "sm", "md", "lg", "xl"] as Breakpoint[],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "md", "lg", "xl"] as Breakpoint[],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["md", "lg", "xl"] as Breakpoint[],
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      responsive: ["lg", "xl"] as Breakpoint[],
    },
  ];

  // Adjusted onSelectChange to work with ITrainer[]
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: ITrainer[]
  ) => {
    if (newSelectedRowKeys.length > 1) return; // Ensure only one selection at a time
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedClient(selectedRows[0]); // Store selected trainer (ITrainer)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio" as const, // Explicitly typed as 'radio'
  };

  const handleCreateMealPlan = () => {
    if (!selectedClient) return;
    console.log(selectedClient);
    router.push(
      `/trainer/create-meal-plan?clientId=${selectedClient._id}&clientName=${selectedClient.fullName}`
    );
  };

  return (
    <div className="p-2 md:p-4 w-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
        Client List
      </h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={trainers}
          rowKey={(record) => record._id}
          pagination={{
            pageSize: 5,
            responsive: true,
            // Remove the window.innerWidth reference as it won't work server-side
            size: "default",
          }}
          rowSelection={rowSelection}
          size="middle"
          scroll={{ x: "max-content" }}
        />
      </div>
      <div className="flex justify-center md:justify-start mt-4">
        <Button
          type="primary"
          disabled={!selectedClient}
          onClick={handleCreateMealPlan}
          className="w-full md:w-auto"
        >
          Create Meal Plan
        </Button>
      </div>
    </div>
  );
};

export default ClientList;
