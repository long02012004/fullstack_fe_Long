import { useState } from "react";
import {
  MailOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "Home",
      icon: <MailOutlined />,
    },
    {
      label: <Link to="/user">Người dùng</Link>,
      key: "User",
      icon: <UserAddOutlined />,
    },
    {
      label: "Quang Long",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Đăng nhập",
          key: "Login",
        },
        {
          label: "Đăng xuất",
          key: "Logout",
        },
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
