import Delegate from '@app/components/apps/Delegate';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import React from 'react';

const DelegatePage: React.FC = () => {
  return (
    <>
      <PageTitle>Đại biểu</PageTitle>
      <Delegate />
    </>
  );
};

export default DelegatePage;
