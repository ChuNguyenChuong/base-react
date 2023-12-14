import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import React, { memo } from 'react';
// import { useTranslation } from 'react-i18next';
import { IDataSearchDelegate } from '@app/types/generalTypes';

type Props = {
  open: boolean;
  refData: IDataSearchDelegate;
  onOk: () => void;
  onCancel: () => void;
};

const SendMailModal: React.FC<Props> = ({ open, onOk, onCancel }) => {
  // const { t } = useTranslation();
  return (
    <BaseModal title="Gửi mail cho các đại biểu" open={open} onOk={onOk} onCancel={onCancel}>
      {/* Gửi mail cho đại biểu : {refData.name?.map((item) => item).join(', ')} */}
    </BaseModal>
  );
};
export default memo(SendMailModal);
