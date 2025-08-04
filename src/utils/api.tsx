import axios from "axios";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const instance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers = config.headers || {};
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        console.error("Cannot access cookies on the server-side in Axios interceptor.");
      }
    } catch (error) {
      console.error("Failed to fetch token", error);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);