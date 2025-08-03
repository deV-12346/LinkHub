import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL:"https://link-hub-utie.vercel.app/api",
  withCredentials: true,
});
let isRefreshing = false;
axiosInstance.interceptors.response.use(
  response => response, 
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/user/refresh-token") {
       if (isRefreshing) return Promise.reject(error);
      originalRequest._retry = true;
      isRefreshing =true
      try {
        const res = await axiosInstance.post('/user/refresh-token');
        toast.success(res.data.message)
        return axiosInstance(originalRequest);
      } catch (err) {
        toast.error(err?.res?.data?.message)
        return Promise.reject(err);
      }
    }
    toast.error(error?.message)
    return Promise.reject(error);
  }
);
export default axiosInstance;