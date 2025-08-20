import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  // For example: return localStorage.getItem('token') !== null;
  return false; // Default to false for security
};

const PrivateRoutes = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default PrivateRoutes;


