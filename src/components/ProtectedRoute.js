import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate instead of Redirect
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user from context
  
  if (!user) {
    // Redirect them to the login page if not authenticated using Navigate
    return <Navigate to="/login" />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
