import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  PictureOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const DashboardContent: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Staff Members"
              value={5}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Gallery Images"
              value={20}
              prefix={<PictureOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Reviews"
              value={50}
              prefix={<CommentOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
