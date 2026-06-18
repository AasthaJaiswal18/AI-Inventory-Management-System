import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-inventory-management-system-1di5.onrender.com/api",
});

export default API;