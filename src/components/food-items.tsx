"use client";
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
  Card,
  Space,
  Row,
  Col,
  Tag,
} from "antd";
import { useFoodState, useFoodActions } from "../providers/food-items/index";
import {
  AppleOutlined,
  EyeInvisibleOutlined,
  ShoppingOutlined,
  CoffeeOutlined,
  RiseOutlined,
  DownOutlined,
  PlusOutlined,
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Simple responsive check based on window width
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const results = await searchFood(searchTerm);
      setSearchResults(results || []);
    } else {
      setSearchResults([]);
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
          {categoryIcons[category]} {category}
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

  // Responsive columns based on screen size
  const getColumns = () => {
    const baseColumns = [
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (text: string) => (
          <Tag
            color={
              text === "veg"
                ? "green"
                : text === "meat"
                ? "volcano"
                : text === "bnl"
                ? "blue"
                : text === "dairy"
                ? "purple"
                : "orange"
            }
          >
            {categoryIcons[text]} {text}
          </Tag>
        ),
      },
      { title: "Energy (kcal)", dataIndex: "energy", key: "energy" },
    ];

    // Add more columns for larger screens
    if (!isMobile) {
      baseColumns.push(
        { title: "Protein (g)", dataIndex: "protein", key: "protein" },
        { title: "Carbs (g)", dataIndex: "carbs", key: "carbs" },
        { title: "Fat (g)", dataIndex: "fat", key: "fat" }
      );
    }

    return baseColumns;
  };

  // Expandable row for mobile view
  const expandableConfig = isMobile
    ? {
        expandedRowRender: (record) => (
          <ul style={{ padding: "0 16px", margin: 0 }}>
            <li>
              <strong>Serving:</strong> {record.servingSize}g
            </li>
            <li>
              <strong>Protein:</strong> {record.protein}g
            </li>
            <li>
              <strong>Carbs:</strong> {record.carbs}g
            </li>
            <li>
              <strong>Fat:</strong> {record.fat}g
            </li>
            <li>
              <strong>Fiber:</strong> {record.fiber}g
            </li>
          </ul>
        ),
      }
    : {};

  const dataToDisplay =
    searchResults.length > 0 ? searchResults : filteredFoods;

  const handleCreateFood = async (values: IFood) => {
    const parsedValues = {
      ...values,
      servingSize: Number(values.servingSize),
      protein: Number(values.protein),
      carbs: Number(values.carbs),
      sugar: Number(values.sugar || 0),
      fat: Number(values.fat),
      fiber: Number(values.fiber),
      sodium: Number(values.sodium),
      potassium: Number(values.potassium),
      cholesterol: Number(values.cholesterol),
      energy: Number(values.energy),
    };

    try {
      await createFood(parsedValues);
      message.success("Food item created successfully!");
      setIsModalVisible(false);
      form.resetFields();
      getAllFood();
    } catch (error) {
      message.error("Failed to create food item!");
    }
  };

  // Create a compact form layout using rows and columns
  const renderModalForm = () => (
    <Form
      form={form}
      onFinish={handleCreateFood}
      layout="vertical"
      initialValues={{ category: "veg" }}
    >
      <Form.Item name="name" label="Food Name" rules={[{ required: true }]}>
        <AntInput />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {filterCategories.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {categoryIcons[cat]} {cat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="servingSize"
            label="Serving (g)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="protein"
            label="Protein (g)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="carbs"
            label="Carbs (g)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="fat" label="Fat (g)" rules={[{ required: true }]}>
            <AntInput type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="fiber"
            label="Fiber (g)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="sugar"
            label="Sugar (g)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="energy"
            label="Energy (kcal)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="sodium"
            label="Sodium (mg)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="potassium"
            label="Potassium (mg)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="cholesterol"
            label="Cholesterol (mg)"
            rules={[{ required: true }]}
          >
            <AntInput type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" block>
        Create Food Item
      </Button>
    </Form>
  );

  return (
    <Card title="Food Items Database" style={{ margin: "16px" }}>
      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        style={{ width: "100%", marginBottom: 16 }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Food
        </Button>

        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
          <Button>
            Filter <DownOutlined />
          </Button>
        </Dropdown>

        <Input.Search
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          style={{ width: isMobile ? "100%" : 200 }}
        />
      </Space>

      {isPending && (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}

      {isError && (
        <Alert
          message="Error loading food items"
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {!isPending && !isError && (
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={getColumns()}
            dataSource={dataToDisplay}
            rowKey={(record) => record.id || record.name}
            pagination={{ pageSize: 8 }}
            rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
            size={isMobile ? "small" : "middle"}
            {...expandableConfig}
          />
        </div>
      )}

      <Modal
        title="Add New Food Item"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={isMobile ? "95%" : 700}
      >
        {renderModalForm()}
      </Modal>
    </Card>
  );
};

export default FoodItems;
