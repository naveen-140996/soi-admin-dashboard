import axios from "axios";

const adminAPI = axios.create({
  baseURL: "https://diet-chart-9wl9.onrender.com/api", // 🔥 change if deployed
});

adminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default adminAPI;