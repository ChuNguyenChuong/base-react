import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { WithChildrenProps } from '@app/types/generalTypes';

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const username = useAppSelector((state) => state.user.profile?.username);

  return username ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
