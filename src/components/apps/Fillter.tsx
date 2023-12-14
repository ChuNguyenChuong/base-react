import { DeleteOutlined } from '@ant-design/icons';
import { getCountries } from '@app/api/v1/delegate';
import { statusOrder, statusPresentation } from '@app/constants/config/activityStatuses';
import CloseBtn from '@app/pages/v1/CloseBtn';
import { WrapperBox } from '@app/pages/v1/CreateDelegate/styles';
import { AnyElement } from '@app/types/generalTypes';
import { useQuery } from '@tanstack/react-query';
import { Col, DatePicker, Form, Row, Select } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { BaseButton } from '../common/BaseButton/BaseButton';
import { BaseInput } from '../common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '../common/selects/BaseSelect/BaseSelect';
import { useLocation } from 'react-router-dom';
export type SubmitValueFilter = { field: { field: string; value: string }[] };
const { Option } = Select;

type ValueEnum = 'name' | 'title' | 'createdAt' | 'country' | 'status';

export type OptionsFilter = { label: string; value: ValueEnum };
type Props = {
  options: OptionsFilter[];
  onClose: () => void;
  onSubmit: (values: SubmitValueFilter) => void;
};

const Filter: React.FC<Props> = ({ options, onClose, onSubmit }) => {
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const [data, setData] = useState<{ field: { field: string; value: string }[] }>({
    field: [
      {
        field: '',
        value: '',
      },
    ],
  });

  const { data: countries } = useQuery({
    queryKey: ['country'],
    queryFn: () => {
      return getCountries();
    },
  });

  const optionStatus = useMemo(() => {
    switch (pathname) {
      case '/delegate/presentations':
        return statusPresentation;
      case '/orders':
        return statusOrder;

      default:
        return statusPresentation;
    }
  }, [pathname]);

  const renderInputFilter = useCallback(
    (type: ValueEnum) => {
      switch (type) {
        case 'status':
          return <BaseSelect size="small" options={optionStatus} placeholder={'Chọn'} />;
        case 'createdAt':
          return <DatePicker style={{ width: '100%' }} size="small" />;
        case 'country':
          return (
            <Select
              placeholder="Chọn"
              size="small"
              showSearch
              filterOption={(input, option: AnyElement) => {
                const { key } = option || {};
                return ((key || '') as string).toLowerCase().includes(input.toLowerCase());
              }}
            >
              {countries?.map((item) => {
                return (
                  <Option key={item.label} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          );
        default:
          return (
            <BaseInput
              style={{
                height: 32,
              }}
            />
          );
      }
    },
    [countries, optionStatus],
  );

  const onFinish = (values: SubmitValueFilter) => {
    onSubmit(values);
  };
  return (
    <WrapperBox className="relative">
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={data}
        onValuesChange={(_, allValues) => {
          setData(allValues);
        }}
      >
        <Form.List name="field">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Row key={key} gutter={16}>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, 'field']}
                        rules={[{ required: true, message: 'Trường này bắt buộc nhập' }]}
                      >
                        <Select
                          size="small"
                          onChange={() => {
                            setData((prev) => {
                              return {
                                field: prev.field.map((item, index) => {
                                  if (index === key) {
                                    item.value = '';
                                  }
                                  return item;
                                }),
                              };
                            });
                          }}
                        >
                          {options.map((item) => (
                            <Option key={item.value} value={item.value}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true, message: 'Trường này bắt buộc nhập' }]}
                      >
                        {renderInputFilter((data.field[key]?.field as ValueEnum) ?? '')}
                      </Form.Item>
                    </Col>
                    <Col>
                      {key !== 0 && (
                        <DeleteOutlined
                          onClick={() => remove(name)}
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                );
              })}
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                <BaseButton
                  size="small"
                  style={{
                    fontSize: '12px',
                  }}
                  onClick={() => {
                    add();
                    setData({
                      field: [
                        ...data.field,
                        {
                          field: '',
                          value: '',
                        },
                      ],
                    });
                  }}
                >
                  Thêm bộ lọc
                </BaseButton>
                <BaseButton
                  size="small"
                  style={{
                    fontSize: '12px',
                  }}
                  htmlType="submit"
                >
                  Áp dụng
                </BaseButton>
              </div>
            </>
          )}
        </Form.List>
      </Form>

      <CloseBtn onClose={onClose}></CloseBtn>
    </WrapperBox>
  );
};

export default memo(Filter);
