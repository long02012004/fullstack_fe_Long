import { Table } from "antd";
import { useEffect, useState } from "react";
import { getUsers } from "../util/api";
import { notification } from "antd";
const User = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        if (response && response.data && response.data.data) {
          setDataSource(response.data.data);
          notification.success({
            message: response.data.EM,
            description: "Users data has been fetched successfully",
          });
        }
        console.log("response", response);
      } catch (error) {
        notification.error({
          message: error?.EM || error?.message || "Fetch users failed",
          description: "Failed to fetch users data",
        });
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <>
      <div style={{ padding: "40px" }}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
        />
      </div>
    </>
  );
};
export default User;
