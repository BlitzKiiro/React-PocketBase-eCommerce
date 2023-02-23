import React from "react";
import styles from "./styles.module.css";
import {
  ShoppingCartOutlined,
  SmileOutlined,
  DesktopOutlined,
  HomeOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Typography } from "antd";

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    <Title level={5}>Categoris</Title>,
    "categories",
    <></>,
    [
      getItem("Supermarket", "supermarket", <ShoppingCartOutlined />),
      getItem("Baby & Kids", "baby&kids", <SmileOutlined />),
      getItem("Electronics", "electronics", <DesktopOutlined />),
      getItem("Home & Kitchen", "home&kictchen", <HomeOutlined />),
    ],
    "group"
  ),
];

const filterSortItems: MenuProps["items"] = [
  getItem(<Title level={5}>Sorty by</Title>, "sort", <></>, [
    getItem("newest", "-created", <CalendarOutlined />),
    getItem("price: low to high", "+price", <PlusCircleOutlined />),
    getItem("price: high to low ", "-price", <MinusCircleOutlined />),
  ]),
];

const SideBar: React.FC = () => {
  return (
    <Menu
      className={styles.sidbar}
      defaultOpenKeys={["sort"]}
      mode='inline'
      items={[...items, ...filterSortItems]}
    />
  );
};

export default SideBar;
