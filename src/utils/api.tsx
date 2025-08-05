import { logout, setNewToken } from "@/redux/authSlice";
import { store } from "@/redux/store";
import { AuthService } from "@/service/authService";
import axios from "axios";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const instance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status)

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const refresh_token = localStorage.getItem("refersh_token");

      if (refresh_token) {
        const newToken = await AuthService.refreshToken(refresh_token);
        
        store.dispatch(setNewToken({ token: newToken?.accessToken }));
        localStorage.setItem("access_token", newToken?.accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      }
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      store.dispatch(logout());
      localStorage.removeItem("access_token");
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }


    return Promise.reject(error);
  }
);