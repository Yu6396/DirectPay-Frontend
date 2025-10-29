import axios from "axios";
import { toast } from "../hooks/use-toast";

const API_URL = "http://localhost:2029/api/v1";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // optional: 15s timeout for requests
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1️⃣ Network errors (no response)
    if (!error.response) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Unable to reach the server. Please check your connection.",
      });
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // 2️⃣ Unauthorized (session expired)
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast({
        variant: "destructive",
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
      });

      setTimeout(() => {
        window.location.href = "/auth";
      }, 1500);
    }

    // 3️⃣ Server errors
    if (status >= 500) {
      toast({
        variant: "destructive",
        title: "Server Error",
        description:
          data?.message || "Something went wrong on our end. Please try again later.",
      });
    }

    // 4️⃣ Other known client errors
    if (status >= 400 && status < 500 && status !== 401) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: data?.message || "An error occurred. Please try again.",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
