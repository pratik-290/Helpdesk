import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:8086/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isPublicRequest =
    config.method === "post" &&
    (config.url === "/users" ||
      config.url === "/users/login");

  if (token && !isPublicRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;