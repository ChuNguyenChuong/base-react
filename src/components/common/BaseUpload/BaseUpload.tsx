import type { UploadProps } from 'antd';
import * as S from './BaseUpload.styles';

export const BaseUpload: React.FC<UploadProps> = (props) => {
  return <S.Upload {...props} />;
};
