import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { authStore } from "../../../pocketbase/auth";
import useTheme from "../../../hooks/useTheme";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import { MenuProps } from "antd";
import { Menu, Typography } from "antd";
import { lightAnimation, darkAnimation } from "./animations";

const NavMenu: React.FC = () => {
  const { themeMode, setTheme } = useTheme();

  const toggleTheme = ({ key }: { key: string }) => {
    if (key === "theme") {
      if (themeMode == "dark") setTheme("light");
      else setTheme("dark");
    }
  };

  useEffect(() => {
    if (themeMode == "dark") {
      darkAnimation();
    } else {
      lightAnimation();
    }
  }, [themeMode]);

  const items: MenuProps["items"] = [
    {
      label: (
        <div className={styles.brand}>
          <Typography.Title level={4}>React eCommerce</Typography.Title>
        </div>
      ),
      key: "brand",
      disabled: true,
    },
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Account",
      key: "account",
      icon: <UserOutlined />,
      children: authStore.isValid
        ? [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ]
        : [
            {
              label: "Sign in",
              key: "signin",
            },
          ],
    },
    {
      label: "Wish List",
      key: "wish",
      icon: <HeartOutlined />,
    },
    {
      label: "Cart",
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },

    {
      label: <span>{themeMode == "dark" ? <MoonIcon /> : <SunIcon />}</span>,
      key: "theme",
    },
  ];

  return (
    <Menu
      onClick={toggleTheme}
      className={styles.navmenu}
      mode='horizontal'
      items={items}
    />
  );
};

export default NavMenu;
