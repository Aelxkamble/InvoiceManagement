// src/api/api.ts
import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // Your base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
