import axiosInstance from "./axios.customize";

// api đăng ký
const createUser = (name, email, password) => {
  const URL_API = "/v1/api/register";
  const data = { name, email, password };
  return axiosInstance.post(URL_API, data);
};

// api đăng nhập
const loginUser = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = { email, password };
  return axiosInstance.post(URL_API, data);
};
// api lấy danh sách người dùng\
const getUsers = () => {
  const URL_API = "/v1/api/users";
  return axiosInstance.get(URL_API);
};

export { createUser, loginUser, getUsers };
