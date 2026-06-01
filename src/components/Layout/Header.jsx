import { useState } from "react";
import {
  MailOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../Context/AuthContext.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = React.useContext(AuthContext);
  console.log(auth);
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    if (e.key === "Logout") {
      localStorage.removeItem("access_token");
      setAuth({
        isAuthenticated: false,
        user: {
          email: "",
          name: "",
        },
      });
      setCurrent("Home");
      navigate("/");
    } else {
      setCurrent(e.key);
    }
  };
  const items = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "Home",
      icon: <MailOutlined />,
    },
    ...(auth?.isAuthenticated
      ? [
          {
            label: <Link to="/user">Người dùng</Link>,
            key: "User",
            icon: <UserAddOutlined />,
          },
        ]
      : []),
    {
      label: `Xin chào ${auth?.user?.name || "Khách"}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        ...(auth?.isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
                      localStorage.clear("access_token");
                      setAuth({
                        isAuthenticated: false,
                        user: {
                          email: "",
                          name: "",
                        },
                      });
                      navigate("/");
                    }}
                  >
                    Đăng xuất
                  </span>
                ),
                key: "Logout",
              },
            ]
          : [
              {
                label: <Link to="/login">Đăng nhập</Link>,
                key: "Login",
              },
              {
                label: <Link to="/register">Đăng ký</Link>,
                key: "Register",
              },
            ]),
      ],
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
