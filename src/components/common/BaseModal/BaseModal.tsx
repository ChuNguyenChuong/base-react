import React from 'react';
import { Modal, ModalProps } from 'antd';

interface BaseModalProps extends ModalProps {
  size?: 'small' | 'medium' | 'large';
}

interface BaseModalInterface extends React.FC<BaseModalProps> {
  info: typeof Modal.info;
  success: typeof Modal.success;
  warning: typeof Modal.warning;
  error: typeof Modal.error;
}

export const BaseModal: BaseModalInterface = ({ size = 'medium', children, ...props }) => {
  return (
    <Modal getContainer={false} width={800} {...props}>
      {children}
    </Modal>
  );
};

BaseModal.info = Modal.info;
BaseModal.success = Modal.success;
BaseModal.warning = Modal.warning;
BaseModal.error = Modal.error;
