import { Button, Form, Input, notification } from "antd";
import { loginUser } from "../util/api";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../components/Context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = React.useContext(AuthContext);
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const response = await loginUser(email, password);
      if (response && response.data.EC === 0) {
        localStorage.setItem("access_token", response.data.access_token);
        notification.success({
          message: "Login successful",
          description: "You are now logged in",
        });
        setAuth({
          isAuthenticated: true,
          user: {
            email: response.data.user.email,
            name: response.data.user.name,
          },
        });
        navigate("/");
      } else {
        notification.error({
          message: "Something went wrong",
          description:
            response?.data?.EM || response?.EM || "Please try again later",
        });
      }
    } catch (error) {
      notification.error({
        message: "Login failed",
        description:
          error?.EM ||
          error?.message ||
          "Cannot connect to server. Please try again later.",
      });
    }
  };

  return (
    <>
      <div style={{ margin: "50px" }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
