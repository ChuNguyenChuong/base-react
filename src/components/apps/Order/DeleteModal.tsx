import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { IOrder } from '@app/types/generalTypes';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  refData: IOrder;
  onOk: () => void;
  onCancel: () => void;
};

const DeleteModal: React.FC<Props> = ({ open, refData, onOk, onCancel }) => {
  const { t } = useTranslation();
  return (
    <BaseModal title={t('modal.delete_title')} open={open} onOk={onOk} onCancel={onCancel}>
      <p>delete id : {refData.id}</p>
    </BaseModal>
  );
};
export default memo(DeleteModal);
