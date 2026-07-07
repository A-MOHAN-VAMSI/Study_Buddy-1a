import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userString = localStorage.getItem('user');
  
  if (!userString) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);
    
    if (adminOnly && user.role !== 'admin') {
      // User is not an admin but trying to access admin page
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // Parsing error, clean up storage and redirect
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
