import LoginPage from '@app/pages/LoginPage';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';

const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const Logout = React.lazy(() => import('./Logout'));

export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';

const Error404 = withLoading(Error404Page);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

// New no lazy loading for auth pages to avoid flickering
const Delegate = React.lazy(() => import('@app/pages/v1/DelegatePage'));
const Presentations = React.lazy(() => import('@app/pages/v1/PresentationsPage'));
const Order = React.lazy(() => import('@app/pages/v1/OrderPage'));
const CreateDelegate = React.lazy(() => import('@app/pages/v1/CreateDelegate'));
const UpdateDelegate = React.lazy(() => import('@app/pages/v1/UpdateDelegate'));
// const Dashboard = React.lazy(() => import('@app/pages/v1/DashboardPages'));

// New Page
const DelegatePage = withLoading(Delegate);
const CreateDelegatePage = withLoading(CreateDelegate);
const UpdateDelegatePage = withLoading(UpdateDelegate);
const PresentationsPage = withLoading(Presentations);
const OrderPage = withLoading(Order);
// const DashboardPage = withLoading(Dashboard);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={NFT_DASHBOARD_PATH} element={protectedLayout}>
          <Route path="" element={<Navigate to="delegate" />} />
          <Route path="delegate">
            <Route path="" element={<DelegatePage />} />
            <Route path="create-delegate" element={<CreateDelegatePage />} />
            <Route path="update-delegate" element={<UpdateDelegatePage />} />
            <Route path="presentations" element={<PresentationsPage />} />
          </Route>
          <Route path="orders" element={<OrderPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
