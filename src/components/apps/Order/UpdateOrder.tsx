import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { statusOrder } from '@app/constants/config/activityStatuses';
import { AnyElement, IOrder } from '@app/types/generalTypes';
import { Col, Form, FormInstance, Row } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  isModalOpen: boolean;
  refData: IOrder;
  handleOke: (form: FormInstance<AnyElement>) => void;
  handleCancel: () => void;
};

const UpdateOrder: React.FC<Props> = ({ isModalOpen, refData, handleOke, handleCancel }) => {
  const [data] = React.useState<IOrder>({ ...refData });

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmit = useCallback(() => {
    handleOke(form);
  }, [form, handleOke]);

  return (
    <BaseModal title={'Chỉnh sửa order'} open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel} width={1000}>
      <Form form={form} layout="vertical" initialValues={data}>
        <Row gutter={30}>
          <Col span={12}>
            <Form.Item
              name="full_name"
              label={'Tên đại biểu'}
              rules={[{ required: true, message: 'Vui lòng nhập tên đại biểu!' }]}
            >
              <BaseInput placeholder={'Tên đại biểu'} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status_payment"
              label={t('columns.status')}
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái order !' }]}
            >
              <BaseSelect options={statusOrder} placeholder={'Chọn'} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default memo(UpdateOrder);
