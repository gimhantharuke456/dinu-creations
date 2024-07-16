"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Typography, message, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

interface Review {
  _id: string;
  name: string;
  position: string;
  content: string;
}

const ReviewHandler: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form] = Form.useForm();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await fetch("/api/reviews");
    const data = await response.json();
    setReviews(data);
  };

  const onFinish = async (values: any) => {
    if (editingReview) {
      await updateReview(editingReview._id, values);
    } else {
      await addReview(values);
    }
    form.resetFields();
    setEditingReview(null);
    setIsModalVisible(false);
    fetchReviews();
  };

  const addReview = async (review: Omit<Review, "_id">) => {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (response.ok) {
      message.success("Review added successfully");
    } else {
      message.error("Failed to add review");
    }
  };

  const updateReview = async (id: string, review: Omit<Review, "_id">) => {
    const response = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (response.ok) {
      message.success("Review updated successfully");
    } else {
      message.error("Failed to update review");
    }
  };

  const deleteReview = async (id: string) => {
    const response = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (response.ok) {
      message.success("Review deleted successfully");
      fetchReviews();
    } else {
      message.error("Failed to delete review");
    }
  };

  const editReview = (review: Review) => {
    setEditingReview(review);
    form.setFieldsValue(review);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Review) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => editReview(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteReview(record._id)}
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Review Handler</Title>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Review
      </Button>
      <Table columns={columns} dataSource={reviews} rowKey="_id" />

      <Modal
        title={editingReview ? "Edit Review" : "Add New Review"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingReview(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Reviewer Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Reviewer Position"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Review Content"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingReview ? "Update Review" : "Add Review"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReviewHandler;
