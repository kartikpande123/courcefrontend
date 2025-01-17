import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminLoggedIn") === "true"; // Check authentication

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return children; // Render protected content
};

export default Protected;
