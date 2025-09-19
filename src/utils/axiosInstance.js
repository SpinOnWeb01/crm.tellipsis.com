import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (token inject)
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.token) {
      config.headers.Authorization = `Bearer ${config.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error', error)
    return Promise.reject(
      error.response?.data?.message || "Something went wrong"
    );
  }
);

export default axiosInstance;
