"use client";
import { useState, useEffect } from "react";
import { Table, Dropdown, Button, Input, message, Spin, Alert } from "antd";
import { useFoodState, useFoodActions } from "../providers/food-items/index";
import {
  AppleOutlined,
  EyeInvisibleOutlined,
  ShoppingOutlined,
  CoffeeOutlined,
  RiseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { IFood } from "@/providers/food-items/context";
// Category icons for filtering
const categoryIcons = {
  veg: <AppleOutlined style={{ color: "green" }} />,
  meat: <EyeInvisibleOutlined style={{ color: "brown" }} />,
  bnl: <ShoppingOutlined style={{ color: "blue" }} />,
  dairy: <CoffeeOutlined style={{ color: "purple" }} />,
  grains: <RiseOutlined style={{ color: "orange" }} />,
};

// Food categories for filtering
const filterCategories = ["veg", "meat", "bnl", "dairy", "grains"];

const FoodItems = () => {
  const { foods, isPending, isError } = useFoodState();
  const { getAllFood, getFoodCategory, searchFood } = useFoodActions();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IFood[]>([]);

  useEffect(() => {
    getAllFood();
  }, []);

  // Handle category filter
  const handleFilter = (category: string) => {
    setFilter(category);
    getFoodCategory(category);
  };

  // Reset the filter to show all items
  const handleShowAll = () => {
    setFilter(null);
    getFoodCategory("all");
  };

  // Handle row selection
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    message.info(`Selected ${newSelectedRowKeys.length} items`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Handle the search input
  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchFood(searchTerm); // Pass the search term to the searchFood action
    }
  };

  // Filtered food data based on selected category
  const filteredFoods = filter
    ? foods.filter((food) => food.category === filter)
    : foods;

  // Dropdown menu items with filter categories and "Show All"
  const dropdownItems = [
    ...filterCategories.map((category) => ({
      key: category,
      label: (
        <span>
          {categoryIcons[category] || category} {category}
        </span>
      ),
      onClick: () => handleFilter(category),
    })),
    {
      key: "showAll",
      label: <span>Show All</span>,
      onClick: handleShowAll,
    },
  ];

  // Handle the search action from searchFood API and update searchResults
  const handleSearchFood = async (term: string) => {
    const results = await searchFood(term);
    setSearchResults(results); // Update searchResults with the response
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => (
        <span>
          {categoryIcons[text] || text} {text}
        </span>
      ),
    },
    {
      title: "Serving Size (g)",
      dataIndex: "servingSize",
      key: "servingSize",
    },
    {
      title: "Protein (g)",
      dataIndex: "protein",
      key: "protein",
    },
    {
      title: "Carbs (g)",
      dataIndex: "carbs",
      key: "carbs",
    },
    {
      title: "Fat (g)",
      dataIndex: "fat",
      key: "fat",
    },
    {
      title: "Fiber (g)",
      dataIndex: "fiber",
      key: "fiber",
    },
    {
      title: "Sodium (mg)",
      dataIndex: "sodium",
      key: "sodium",
    },
    {
      title: "Potassium (mg)",
      dataIndex: "potassium",
      key: "potassium",
    },
    {
      title: "Cholesterol (mg)",
      dataIndex: "cholesterol",
      key: "cholesterol",
    },
    {
      title: "Energy (kcal)",
      dataIndex: "energy",
      key: "energy",
    },
  ];

  // Determine the food data to be displayed (either filtered or searched)
  const dataToDisplay =
    searchResults.length > 0 ? searchResults : filteredFoods;

  return (
    <div>
      <h2>Food Items</h2>

      {/* Filter Button with Dropdown */}
      <Dropdown trigger={["click"]} menu={{ items: dropdownItems }}>
        <Button style={{ marginBottom: 16 }}>
          Filter by Category <DownOutlined />
        </Button>
      </Dropdown>

      {/* Search Input */}
      <Input
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Search food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={handleSearch}
      />
      <Button
        style={{ marginLeft: 8, marginBottom: 16 }}
        onClick={() => handleSearchFood(searchTerm)}
      >
        Search
      </Button>

      {/* Loading state */}
      {isPending && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Spin size="large" />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <Alert
          message="Error"
          description="There was an error fetching the food items. Please try again."
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      {/* Table */}
      {!isPending && !isError && (
        <Table
          columns={columns}
          dataSource={dataToDisplay}
          rowKey={(record) => record.id || record.name} 
          pagination={{ pageSize: 5 }}
          rowSelection={rowSelection}
        />
      )}
    </div>
  );
};

export default FoodItems;
