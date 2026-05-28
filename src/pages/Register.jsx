import { Button, Form, Input, notification } from "antd";
import { createUser } from "../util/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, email, password } = values;
    try {
      const response = await createUser(name, email, password);
      if (response) {
        notification.success({
          message: "User created successfully",
          description: "You can now login with your credentials",
        });
        navigate("/login");
      } else {
        notification.error({
          message: "Something went wrong",
          description: "Please try again later",
        });
      }
    } catch (error) {
      notification.error({
        message: "Registration failed",
        description:
          error?.response?.data?.message ||
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
