import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(async function (config) {
  const session = await getSession(); // Get session from NextAuth
  console.log("Axios request triggered:", config);
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const session = await getSession(); // Try to get refreshed session

        if (session?.accessToken) {
          error.config.headers.Authorization = `Bearer ${session.accessToken}`;
          return axiosInstance(error.config); // Retry request
        }
      } catch (refreshError) {
        console.error("Session refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
