import axios from "axios";

export const Axios = axios.create({
  baseURL: `${import.meta.env.BACKEND_URL}/api`,
  withCredentials: true,
});

const api = axios.create({
  baseURL: `${import.meta.env.BACKEND_URL}/api`,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
export default api;
