import { useState, useEffect } from "react";
import {
  Table,
  Dropdown,
  Button,
  Input,
  message,
  Spin,
  Alert,
  Modal,
  Form,
  Input as AntInput,
  Select,
} from "antd";
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

const filterCategories = ["veg", "meat", "bnl", "dairy", "grains"];

const FoodItems = () => {
  const { foods, isPending, isError } = useFoodState();
  const { getAllFood, getFoodCategory, searchFood, createFood } =
    useFoodActions();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IFood[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false); // For modal visibility
  const [form] = Form.useForm(); // To handle form inputs

  useEffect(() => {
    getAllFood();
  }, []);

  const handleFilter = (category: string) => {
    setFilter(category);
    getFoodCategory(category);
  };

  const handleShowAll = () => {
    setFilter(null);
    getFoodCategory("all");
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    message.info(`Selected ${newSelectedRowKeys.length} items`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchFood(searchTerm);
    }
  };

  const filteredFoods = filter
    ? foods.filter((food) => food.category === filter)
    : foods;

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

  const handleSearchFood = async (term: string) => {
    const results = await searchFood(term);
    setSearchResults(results);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
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
    { title: "Serving Size (g)", dataIndex: "servingSize", key: "servingSize" },
    { title: "Protein (g)", dataIndex: "protein", key: "protein" },
    { title: "Carbs (g)", dataIndex: "carbs", key: "carbs" },
    { title: "Fat (g)", dataIndex: "fat", key: "fat" },
    { title: "Fiber (g)", dataIndex: "fiber", key: "fiber" },
    { title: "Sodium (mg)", dataIndex: "sodium", key: "sodium" },
    { title: "Potassium (mg)", dataIndex: "potassium", key: "potassium" },
    { title: "Cholesterol (mg)", dataIndex: "cholesterol", key: "cholesterol" },
    { title: "Energy (kcal)", dataIndex: "energy", key: "energy" },
  ];

  const dataToDisplay =
    searchResults.length > 0 ? searchResults : filteredFoods;

  const handleCreateFood = async (values: IFood) => {
    // Parse numeric fields to numbers before submitting
    const parsedValues = {
      ...values,
      servingSize: Number(values.servingSize),
      protein: Number(values.protein),
      carbs: Number(values.carbs),
      sugar: Number(values.sugar),
      fat: Number(values.fat),
      fiber: Number(values.fiber),
      sodium: Number(values.sodium),
      potassium: Number(values.potassium),
      cholesterol: Number(values.cholesterol),
      energy: Number(values.energy),
    };

    try {
      await createFood(parsedValues); // Send the parsed food item data to the API
      message.success("Food item created successfully!");
      setIsModalVisible(false); // Close modal on success
      form.resetFields(); // Reset form fields
      getAllFood(); // Refresh the table data
    } catch (error) {
      message.error("Failed to create food item!", error);
    }
  };

  return (
    <div>
      <h2>Food Items</h2>
      {/* Create Food Item Button */}
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setIsModalVisible(true)}
      >
        Create Food Item
      </Button>

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

      {/* Modal to Create Food Item */}
      <Modal
        title="Create Food Item"
        open={isModalVisible} // Updated to open
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateFood}
          layout="vertical"
          initialValues={{
            category: "veg", // Default category
          }}
        >
          <Form.Item
            label="Food Name"
            name="name"
            rules={[{ required: true, message: "Please input food name!" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select>
              <Select.Option value="veg">Veg</Select.Option>
              <Select.Option value="meat">Meat</Select.Option>
              <Select.Option value="bnl">Beverages</Select.Option>
              <Select.Option value="dairy">Dairy</Select.Option>
              <Select.Option value="grains">Grains</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Serving Size (g)"
            name="servingSize"
            rules={[{ required: true, message: "Please input serving size!" }]}
          >
            <AntInput type="number" />
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
    </div>
  );
};

export default FoodItems;
