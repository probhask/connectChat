import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
export default api;
