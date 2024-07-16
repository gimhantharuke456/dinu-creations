"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  Card,
  Modal,
} from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import Title from "antd/es/typography/Title";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

interface SiteDescription {
  _id: string;
  section: string;
  description: string;
  imagePath: string | null;
}

const SiteDescriptionHandler: React.FC = () => {
  const [form] = Form.useForm();
  const [descriptions, setDescriptions] = useState<SiteDescription[]>([]);
  const [editingDescription, setEditingDescription] =
    useState<SiteDescription | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchDescriptions();
  }, []);

  const fetchDescriptions = async () => {
    try {
      const response = await axios.get("/api/site-description");
      setDescriptions(response.data);
    } catch (error) {
      message.error("Failed to fetch site descriptions");
    }
  };

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("section", values.section);
      formData.append("description", values.description);
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj);
      }

      if (editingDescription) {
        formData.append("id", editingDescription._id);
        await axios.put("/api/site-description", formData);
        message.success("Site description updated successfully");
      } else {
        await axios.post("/api/site-description", formData);
        message.success("Site description added successfully");
      }

      form.resetFields();
      setEditingDescription(null);
      fetchDescriptions();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save site description");
    }
  };

  const handleEdit = (record: SiteDescription) => {
    setEditingDescription(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  return (
    <div>
      <Title>Site Description Handler</Title>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Description
      </Button>
      {descriptions.map((description) => (
        <Card
          key={description._id}
          title={description.section}
          extra={
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(description)}
            >
              Edit
            </Button>
          }
          style={{ marginBottom: 16 }}
        >
          <div dangerouslySetInnerHTML={{ __html: description.description }} />
          {description.imagePath && (
            <img
              src={description.imagePath}
              alt="Section"
              style={{ width: 200, marginTop: 16 }}
            />
          )}
        </Card>
      ))}

      <Modal
        title={
          editingDescription ? "Edit Site Description" : "Add Site Description"
        }
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingDescription(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="section"
            label="Section"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingDescription ? "Update Description" : "Add Description"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SiteDescriptionHandler;
