import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadi-back-6.onrender.com/api",
});

export default axiosBase;
