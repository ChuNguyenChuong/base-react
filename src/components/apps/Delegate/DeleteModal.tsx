import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IDelegate } from '@app/types/generalTypes';

type Props = {
  open: boolean;
  refData: IDelegate;
  onOk: () => void;
  onCancel: () => void;
};

const DeleteModal: React.FC<Props> = ({ open, refData, onOk, onCancel }) => {
  const { t } = useTranslation();
  return (
    <BaseModal title={t('modal.delete_title')} open={open} onOk={onOk} onCancel={onCancel}>
      <p>id : {refData.id}</p>
    </BaseModal>
  );
};
export default memo(DeleteModal);
