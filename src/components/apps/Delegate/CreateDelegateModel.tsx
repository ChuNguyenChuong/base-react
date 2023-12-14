import { CloseOutlined } from '@ant-design/icons';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { notificationController } from '@app/controllers/notificationController';
import { AnyElement } from '@app/types/generalTypes';
import { Col, Form, FormInstance, Row, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RemoveImageBtn } from './style';

type Props = {
  isModalOpen: boolean;
  handleOke: (form: FormInstance<AnyElement>, file: UploadFile) => void;
  handleCancel: () => void;
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateDelegateModel: React.FC<Props> = ({ isModalOpen, handleOke, handleCancel }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [initValue] = useState({ name: '', role: '' });

  const [file, setFile] = useState<UploadFile>({} as UploadFile);
  const [previewImage, setPreviewImage] = useState('');

  const beforeUpload = async (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notificationController.error({ message: t('error.file_upload_type') });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notificationController.error({ message: t('error.file_upload_size') });
    }
    const preview = await getBase64(file);
    setPreviewImage(preview);
    return false;
  };

  const handleRemovePreviewFile = useCallback(() => {
    setPreviewImage('');
  }, []);

  const handleChange: UploadProps['onChange'] = ({ file }) => setFile(file);

  const handleSubmit = useCallback(() => {
    handleOke(form, file);
  }, [file, form, handleOke]);

  return (
    <BaseModal title={t('form.create_delegate')} open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
      <Form form={form} layout="vertical" initialValues={initValue}>
        <Row justify="center">
          <Col
            style={{
              position: 'relative',
            }}
          >
            <BaseUpload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {previewImage ? (
                <img src={previewImage} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </BaseUpload>
            {previewImage && (
              <RemoveImageBtn onClick={handleRemovePreviewFile}>
                <CloseOutlined color="white" />
              </RemoveImageBtn>
            )}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={t('columns.name')}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <BaseInput placeholder={t('columns.name')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label={t('columns.role')}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <BaseInput placeholder={t('columns.role')} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default memo(CreateDelegateModel);
