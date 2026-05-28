import { Button, Form, Input, notification } from "antd";
import { loginUser } from "../util/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;
    const response = await loginUser(email, password);
    if (response && response.data.EC === 0) {
      localStorage.setItem("access_token", response.data.access_token);
      notification.success({
        message: "Login successful",
        description: "You are now logged in",
      });
      navigate("/");
    } else {
      notification.error({
        message: "Something went wrong",
        description: response?.EM ?? "Please try again later",
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
