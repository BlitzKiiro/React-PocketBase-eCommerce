import React, { useEffect } from "react";
import styles from "./styles.module.css";

import useTheme from "../../../hooks/useTheme";
import { Link } from "react-router-dom";
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
import useAuth from "../../../hooks/useAuth";

const { Title, Text } = Typography;

const NavMenu: React.FC = () => {
  const { themeMode, setTheme } = useTheme();
  const { user, clearUser } = useAuth();

  const toggleTheme = () => {
    if (themeMode == "dark") setTheme("light");
    else setTheme("dark");
  };

  const logOut = () => {
    clearUser();
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
      children: user?.isValid
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
                <Link to={"/auth/login"}>
                  <Text strong>Log in</Text>
                </Link>
              ),
              key: "login",
            },
            {
              label: (
                <Badge count='New here?' color='#13c2c2' offset={[45, 12]}>
                  <Link to={"/auth/register"}>
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
