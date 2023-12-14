import { CopyOutlined } from '@ant-design/icons';
import React from 'react';
import { CardBankWrapper, ImageCard, InformationCard } from './styles';

type Props = {
  image: string;
  name: string;
  name_bank: string;
  branch: string;
  number_bank: string;
  isActive?: boolean;
  handleClick?: () => void;
  handleCopy?: () => void;
};

const CardBank: React.FC<Props> = ({
  branch,
  image,
  name,
  name_bank,
  number_bank,
  isActive,
  handleClick,
  handleCopy,
}) => {
  const BankList = {
    VPBANK: {
      image: '',
    },
  };
  return (
    <CardBankWrapper className={isActive ? 'active' : ''} onClick={handleClick}>
      <ImageCard src={image}></ImageCard>
      <InformationCard>
        <div>
          <span>Chủ TK: </span>
          {name}
        </div>
        <div>
          <span>Ngân hàng: </span>
          {name_bank}
        </div>
        <div>
          <span>Chi nhánh: </span>
          {branch}
        </div>
        <div>
          <span>Số tài khoản: </span>
          {number_bank}
        </div>
      </InformationCard>
      <CopyOutlined style={{ cursor: 'pointer' }} onClick={handleCopy} />
    </CardBankWrapper>
  );
};

export default CardBank;
