import { Table } from "antd";
import { useEffect, useState } from "react";
import { getUsers } from "../util/api";
const Home = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        if (response && response.data) {
          setDataSource(response.data);
        }
      } catch (error) {
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
          rowKey={"_id"}
        />
        ;
      </div>
    </>
  );
};
export default Home;
