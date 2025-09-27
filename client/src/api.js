import axios from "axios";

const API = axios.create({
  baseURL: "${import.meta.env.VITE_BASE_URI}",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token only if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // 👈 remove header if no token
  }
  return config;
});

export default API;

