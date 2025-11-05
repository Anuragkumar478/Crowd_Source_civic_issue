import axios from "axios";

const api = axios.create({
  baseURL:
   
    "http://localhost:5000/api", // ✅ fallback for local testing
  withCredentials: true, // ✅ send cookies automatically
});

export default api;
