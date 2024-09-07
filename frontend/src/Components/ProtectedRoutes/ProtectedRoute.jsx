import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const { user, isAuthenticated } = useContext(AppContext);


  if (!isAuthenticated || (user && !allowedRoles.includes(user?.role))) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
