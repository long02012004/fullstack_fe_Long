import axios from "axios";

const createUser = (name, email, password) => {
  const URL_API = "http://localhost:8080/v1/api/register";
  const data = { name, email, password };
  return axios.post(URL_API, data);
};

export { createUser };
