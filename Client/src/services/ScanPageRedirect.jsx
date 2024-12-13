// ScanPageRedirect.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ScanPageRedirect = ({ user }) => {
  useEffect(() => {
    // You can add more checks here if needed (e.g., if the user has a certain role or permissions)
    if (!user) {
      // Redirect to login page if no user is logged in
      console.log('User not logged in, redirecting to login');
    }
  }, [user]);

  // Redirect to /scan if the user is logged in
  return user ? <Navigate to="/scan" /> : <Navigate to="/login" />;
};

export default ScanPageRedirect;
