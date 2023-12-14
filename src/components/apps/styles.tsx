import styled from 'styled-components';

export const CardBankWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: start;
  min-width: 380px;
  gap: 20px;
  border: 1px solid #f0e9e9;
  padding: 16px;
  border-radius: 10px;
  background-color: #f7f7f7;

  &.active {
    background-color: #88b665;
    color: white;
  }
`;
export const ImageCard = styled.img`
  width: 32px;
`;
export const InformationCard = styled.div`
  flex-grow: 1;
  & div {
    font-size: 14px;
    font-weight: 700;
  }

  & div span {
    font-weight: 400;
    display: inline-block;
    width: 100px;
  }
`;
