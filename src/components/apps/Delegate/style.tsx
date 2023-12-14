import styled from 'styled-components';

export const DelegatePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DelegateHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;
export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const RemoveImageBtn = styled.div`
  text-align: center;
  cursor: pointer;
  background: #0060b9;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  top: -15px;
  right: -25px;
  z-index: 1;

  & svg {
    fill: white;
  }
`;
