"use client";
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  PictureOutlined,
  TeamOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider, Content } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      setSelectedKey("1");
    } else if (pathname === "/admin/site-description") {
      setSelectedKey("2");
    } else if (pathname === "/admin/gallery") {
      setSelectedKey("3");
    } else if (pathname === "/admin/staff") {
      setSelectedKey("4");
    } else if (pathname === "/admin/reviews") {
      setSelectedKey("5");
    }
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link href="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link href="/admin/site-description">Site Description</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PictureOutlined />}>
            <Link href="/admin/gallery">Gallery</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link href="/admin/staff">Staff Members</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CommentOutlined />}>
            <Link href="/admin/reviews">Reviews</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
