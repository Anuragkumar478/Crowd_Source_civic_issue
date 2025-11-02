import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // backend URL
  withCredentials: true, // send cookies
});

export default api;
