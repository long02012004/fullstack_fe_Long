import axios from "axios";

//custom axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request interceptors
// Request interceptors
instance.interceptors.request.use(
  (config) => {
    // 1. Lấy token từ localStorage
    const token = localStorage.getItem("access_token");

    // 2. Kiểm tra nếu có token thì gán trực tiếp vào config.headers
    if (token) {
      // Đảm bảo config.headers không bị undefined (phòng hờ)
      config.headers = config.headers || {};

      // Gán token theo chuẩn Bearer (thường các backend dùng chuẩn này)
      config.headers["Authorization"] = `Bearer ${token}`;

      // Hoặc nếu backend của bạn chỉ nhận token thuần (không có chữ Bearer) thì dùng dòng dưới:
      // config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptors
instance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
