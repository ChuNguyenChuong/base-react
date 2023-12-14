import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';

type Props = {
  onClose: () => void;
};

const CloseBtn: React.FC<Props> = ({ onClose }) => {
  return (
    <div onClick={onClose} style={{ cursor: 'pointer', position: 'absolute', top: 0, right: 10, fontSize: 24 }}>
      <CloseCircleOutlined />
    </div>
  );
};

export default CloseBtn;
