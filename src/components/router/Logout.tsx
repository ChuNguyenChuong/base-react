import React, { useEffect } from 'react';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { Navigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // logout
  }, [dispatch]);

  return <Navigate to="/auth/login" replace />;
};

export default Logout;
