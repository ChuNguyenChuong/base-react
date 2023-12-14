import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { IReportPresentation } from '@app/types/generalTypes';
import moment from 'moment';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  refData: IReportPresentation;
  onOk: () => void;
  onCancel: () => void;
};

const DeleteModal: React.FC<Props> = ({ open, refData, onOk, onCancel }) => {
  const { t } = useTranslation();
  return (
    <BaseModal title={t('modal.delete_title')} open={open} onOk={onOk} onCancel={onCancel}>
      <p>
        Bạn có chắc chắn muốn xóa báo cáo có mã <strong>{refData.id}</strong>, có tiêu đề là{' '}
        <strong>{refData.title}</strong>, được tạo này{' '}
        <strong>{moment(refData.created_at).format('DD/MM/YYYY')}</strong> không ?
      </p>
    </BaseModal>
  );
};
export default memo(DeleteModal);
