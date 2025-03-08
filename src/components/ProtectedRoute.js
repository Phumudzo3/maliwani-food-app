import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ensure correct import

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Correctly using the custom hook

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
