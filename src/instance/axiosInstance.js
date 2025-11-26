import axios from "axios";
import { toast } from "../hooks/use-toast";

const API_URL = "http://localhost:2029/api/v1";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: true, 
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Unable to reach the server. Please check your connection.",
      });
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 401 → Session expired or not logged in
    if (status === 401) {
      toast({
        variant: "destructive",
        title: "Session Expired",
        description: "Please log in again.",
      });

      // clear any stale data and redirect
      localStorage.removeItem("user");
      setTimeout(() => (window.location.href = "/auth"), 1500);
      return Promise.reject(error);
    }

    // 500 → Server error
    if (status >= 500) {
      toast({
        variant: "destructive",
        title: "Server Error",
        description: "Something went wrong. Please try again later.",
      });
    }

    // 400–499 → Other client-side errors
    if (status >= 400 && status < 500 && status !== 401) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: error.response.data?.message || "An error occurred.",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
