import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../instance/axiosInstance";
import { allPaths } from "../../routes/paths";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await api.get("user/get-user-profile", {
          withCredentials: true,
        })
        if (response?.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  if (loading) return  <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>

  if (!isAuthenticated) {
    return <Navigate to={allPaths.auth} replace />;
  }

  return children;
};

export default ProtectedRoute;
