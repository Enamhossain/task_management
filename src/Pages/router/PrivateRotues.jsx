// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
  
    if (loading) {
      return <div>Loading.....</div>;
    }
  
    if (user) {
      return children;
    }
  
    return <Navigate to={"/login"} state={{from:location}} replace />;
}

export default PrivateRoutes