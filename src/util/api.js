import axiosInstance from "./axios.customize";

const createUser = (name, email, password) => {
  const URL_API = "/v1/api/register";

  const data = { name, email, password };
  return axiosInstance.post(URL_API, data);
};

const loginUser = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = { email, password };
  return axiosInstance.post(URL_API, data);
};

export { createUser, loginUser };

