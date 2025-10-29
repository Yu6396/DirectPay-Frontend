import React from "react";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { allPaths } from "../../routes/paths";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={allPaths.auth} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to={allPaths.auth} replace />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to={allPaths.auth} replace />;
  }

  
  return children;
};

export default ProtectedRoute;
