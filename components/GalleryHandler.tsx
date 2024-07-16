"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  Modal,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const GalleryHandler: React.FC = () => {
  const [form] = Form.useForm();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get("/api/gallery");
      setGalleryItems(response.data);
    } catch (error) {
      message.error("Failed to fetch gallery items");
    }
  };

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);

      if (values.image && values.image.fileList) {
        formData.append("image", values.image.fileList[0].originFileObj);
      }

      if (editingItem) {
        await axios.put(`/api/gallery`, { ...values, _id: editingItem._id });
        message.success("Gallery item updated successfully");
      } else {
        await axios.post("/api/gallery", formData);
        message.success("Gallery item added successfully");
      }

      form.resetFields();
      setEditingItem(null);
      fetchGalleryItems();
    } catch (error) {
      message.error("Failed to save gallery item");
    }
  };

  const handleEdit = (record: GalleryItem) => {
    setEditingItem(record);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      onOk: async () => {
        try {
          await axios.delete("/api/gallery", { data: { id } });
          message.success("Gallery item deleted successfully");
          fetchGalleryItems();
        } catch (error) {
          message.error("Failed to delete gallery item");
        }
      },
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "imagePath",
      key: "imagePath",
      render: (imagePath: string) => (
        <img src={imagePath} alt="Gallery item" style={{ width: 100 }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: GalleryItem) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Gallery Handler</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="events by dinu">Events by Dinu</Option>
            <Option value="dinu creations">Dinu Creations</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: !editingItem }]}
        >
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingItem ? "Update Gallery Item" : "Add Gallery Item"}
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={galleryItems} rowKey="_id" />
    </div>
  );
};

export default GalleryHandler;
