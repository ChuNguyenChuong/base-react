import Order from '@app/components/apps/Order';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import React from 'react';

const OrderPage: React.FC = () => {
  return (
    <>
      <PageTitle>Order</PageTitle>
      <Order />
    </>
  );
};

export default OrderPage;
