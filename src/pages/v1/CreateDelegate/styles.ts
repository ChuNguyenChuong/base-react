import styled from 'styled-components';

export const WrapperBox = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  padding: 30px;
  border-radius: 6px;
  & .BaseUpload {
    width: unset;
  }
  & .ant-form-item-control {
    /* height: 32px; */
  }
  & .ant-form-item-control-input {
    min-height: 32px;
  }
  & .ant-col.ant-form-item-label {
    padding-bottom: 0;
  }
  & input,
  .ant-select-selection-item,
  .ant-select-selection-placeholder,
  .ant-radio-wrapper {
    font-size: 14px;
  }
  & .ant-upload .ant-btn {
    max-height: 32px;
    font-size: 12px;
  }
  &.relative {
    position: relative;
  }
`;
export const ImageAvatar = styled.div`
  display: flex;
  height: 160px;
  width: 160px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgb(198, 196, 196);
`;
export const ImagePreview = styled.img`
  object-fit: cover;
  overflow: hidden;
  margin-bottom: 16px;
`;
export const WrapperImageAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const WrapperData = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
export const TypeRegister = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

export const TypeRegisterItem = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-radius: 6px;
  width: 256px;
  padding: 16px;
  & h3 {
    font-weight: 600;
    margin: 0;
  }
  & h5 {
    font-size: 12px;
    margin: 0;
  }
  & h2 {
    font-weight: 600;
    margin: 0;
    color: #005cb0;
  }
`;

export const PriceItem = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 16px;
  padding: 16px 0px;
`;

export const ListAdv = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  width: 100%;
  gap: 10px;

  & li {
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 10px;

    & svg {
      fill: #005cb0;
      font-size: 18px;
    }
  }
`;
export const SubmitAction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 100px;
`;

export const UploadReport = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 36px;
  background-color: #f7f7f7;
  border-radius: 6px;
`;
