import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://link-hub-utie.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;