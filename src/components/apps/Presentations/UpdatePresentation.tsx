import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { statusDelegate } from '@app/constants/config/activityStatuses';
import { AnyElement, IReportPresentation } from '@app/types/generalTypes';
import { Col, Form, FormInstance, Rate, Row } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  isModalOpen: boolean;
  refData: IReportPresentation;
  handleOke: (form: FormInstance<AnyElement>) => void;
  handleCancel: () => void;
};

const UpdatePresentation: React.FC<Props> = ({ isModalOpen, refData, handleOke, handleCancel }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmit = useCallback(() => {
    handleOke(form);
  }, [form, handleOke]);

  return (
    <BaseModal title={t('form.create_presentation')} open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
      <Form form={form} layout="vertical" initialValues={refData}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
              <BaseInput placeholder={t('columns.name')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="full_name"
              label={t('columns.name_delegate')}
              rules={[{ required: true, message: 'Vui lòng nhập tên đại biểu' }]}
            >
              <BaseInput placeholder={t('columns.name_delegate')} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="rate" label={'Đánh giá'} rules={[{ required: true, message: 'Vui lòng đánh giá' }]}>
              <Rate style={{ fontSize: 24 }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label={t('columns.status')}
              rules={[{ required: true, message: 'Vui lòng chọn status' }]}
            >
              <BaseSelect options={statusDelegate} placeholder={t('columns.status')} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label={'Bình luận'} rules={[{ required: true, message: 'Please rate!' }]}>
              <BaseInput.TextArea placeholder={'Bình luận bài báo cáo'} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default memo(UpdatePresentation);
