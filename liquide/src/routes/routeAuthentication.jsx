import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/api';
import { ROUTES } from '../utils/config';

const PrivateRoutes = () => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return <Outlet />;
};

export default PrivateRoutes;


