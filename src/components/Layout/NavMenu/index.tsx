import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { clearAuth, getAuthStatus } from "../../../pocketbase/auth";
import useTheme from "../../../hooks/useTheme";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import { MenuProps } from "antd";
import { Menu, Typography, Badge } from "antd";
import { lightAnimation, darkAnimation } from "./animations";

const { Title, Text } = Typography;

const NavMenu: React.FC = () => {
  const { themeMode, setTheme } = useTheme();
  const navigate = useNavigate();
  const toggleTheme = () => {
    if (themeMode == "dark") setTheme("light");
    else setTheme("dark");
  };

  const logOut = () => {
    clearAuth();
    navigate(0);
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
          <Title level={4}>React eCommerce</Title>
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
      label: "Account",
      key: "account",
      icon: <UserOutlined />,
      children: getAuthStatus()
        ? [
            {
              label: "Logout",
              icon: <LogoutOutlined />,
              key: "logout1",
              onClick: logOut,
            },
          ]
        : [
            {
              label: (
                <Link to={"/login"}>
                  <Text strong>Log in</Text>
                </Link>
              ),
              key: "login",
            },
            {
              label: (
                <Badge count='New here?' color='#13c2c2' offset={[45, 12]}>
                  <Link to={"/register"}>
                    <Text>Register</Text>
                  </Link>
                </Badge>
              ),
              key: "register",
            },
          ],
    },
    {
      label: <span>{themeMode == "dark" ? <MoonIcon /> : <SunIcon />}</span>,
      key: "theme",
      onClick: toggleTheme,
    },
  ];

  return <Menu className={styles.navmenu} mode='horizontal' items={items} />;
};

export default NavMenu;
