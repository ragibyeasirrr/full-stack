import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://final-dusky-seven.vercel.app",
});

export default apiClient;