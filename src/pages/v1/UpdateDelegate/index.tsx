import { UploadOutlined } from '@ant-design/icons';
import { getCountries } from '@app/api/v1/delegate';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { notificationController } from '@app/controllers/notificationController';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { AnyElement } from '@app/types/generalTypes';
import { getBase64 } from '@app/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Col, DatePicker, Divider, Form, Input, Radio, Row, Select, UploadProps } from 'antd';
import React, { memo, useState } from 'react';
import { FlexCol, ImageAvatar, ImagePreview, SubmitAction, WrapperBox, WrapperImageAvatar } from './styles';
const { Option } = Select;

// type ITypeRegister = 1 | 2 | 3 | null;

const CreateDelegate: React.FC = () => {
  const [isShowHelpCare, setIsShowHelpCare] = useState('');
  const [isSupportEating, setIsSupportEating] = useState('');
  // const [_, setTypeRegister] = useState<ITypeRegister>(null);

  const { focusData } = useAppSelector((state) => state.delegate);
  console.log('🚀 ~ file: index.tsx:36 ~ focusData:', focusData);
  const [previewImage, setPreviewImage] = useState(focusData.avatar_path ?? '');
  const { data: countries } = useQuery({
    queryKey: ['country'],
    queryFn: () => {
      return getCountries();
    },
  });

  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload: async (file) => {
      console.log('file.type', file.type);

      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        notificationController.error({
          message: 'Bạn chỉ có thể upload file ảnh!',
        });
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        notificationController.error({ message: 'Ảnh upload có dung lượng tối đa 2M' });
        return false;
      }
      const preview = await getBase64(file);
      setPreviewImage(preview);
      return false;
    },
  };

  const onFinish = (values: AnyElement) => {
    console.log('Received values of form: ', values);
  };

  // const changeTypeRegister = (value: ITypeRegister) => {
  //   setTypeRegister(value);
  // };

  return (
    <Form name="validate_other" layout="vertical" onFinish={onFinish} initialValues={focusData}>
      <Row gutter={30}>
        <Col span={16}>
          <FlexCol>
            <WrapperBox>
              <Row gutter={16}>
                <Col span={8}>
                  <WrapperImageAvatar>
                    <h4>Ảnh cá nhân</h4>
                    <ImageAvatar>
                      <ImagePreview src={previewImage ? previewImage : '/assets/user.png'} />
                    </ImageAvatar>
                    <p
                      style={{
                        fontSize: '10px',
                      }}
                    >
                      Ảnh này sẽ được sử dụng làm ảnh thẻ của bạn.
                    </p>

                    <BaseUpload {...props}>
                      <BaseButton icon={<UploadOutlined />}>Tải ảnh lên</BaseButton>
                    </BaseUpload>
                  </WrapperImageAvatar>
                </Col>
                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="danhXung"
                        label="Danh xưng"
                        hasFeedback
                        rules={[{ required: true, message: 'Vui lòng chọn danh xưng!' }]}
                      >
                        <Select placeholder="Chọn" size="small">
                          {/* TODO: update option */}
                          <Option value="china">China</Option>
                          <Option value="usa">U.S.A</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="firstName" label="Họ" rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
                        <BaseInput size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <BaseInput size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        initialValue={focusData.phone}
                        name="phoneNumber"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                      >
                        <BaseInput size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                      >
                        <BaseInput size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="country"
                        label="Quốc gia"
                        rules={[{ required: true, message: 'Vui lòng chọn quốc gia!' }]}
                      >
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
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="passport"
                        label="Số hộ chiếu/ Căn cước công dân"
                        rules={[{ required: true, message: 'Vui lòng nhập số hộ chiếu hoặc CCCD!' }]}
                      >
                        <BaseInput size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="chucDanh"
                        label="Chức danh"
                        rules={[{ required: true, message: 'Vui lòng chọn chức danh!' }]}
                      >
                        <Select placeholder="Chọn" size="small">
                          <Option value="china">China</Option>
                          <Option value="usa">U.S.A</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="dvToChuc"
                        label="Đơn vị/ Tổ chức"
                        rules={[{ required: true, message: 'Vui lòng nhập đơn vị hoặc tổ chức!' }]}
                      >
                        <BaseInput size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="timeCome"
                        label="Thông tin đến"
                        rules={[{ required: true, message: 'Vui lòng chọn thông tin đến!' }]}
                      >
                        <DatePicker style={{ width: '100%' }} size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="timeLeave"
                        label="Thông tin đi"
                        rules={[{ required: true, message: 'Vui lòng chọn thông tin đi!' }]}
                      >
                        <DatePicker style={{ width: '100%' }} size="small" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="howToLeave"
                        label="Phương thức di chuyển"
                        rules={[{ required: true, message: 'Vui lòng chọn phương thức di chuyển!' }]}
                      >
                        <Select placeholder="Chọn" size="small">
                          <Option value="china">China</Option>
                          <Option value="usa">U.S.A</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="registerHowToLeave"
                        label="Đăng ký phương tiện di chuyển"
                        rules={[{ required: true, message: 'Vui lòng đăng ký phương tiện di chuyển!' }]}
                      >
                        <Radio.Group>
                          <Radio value="a">Có</Radio>
                          <Radio value="b">Không</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        name="isMainCustomer"
                        rules={[{ required: true, message: 'Vui lòng xác nhận trường này!' }]}
                        label={
                          <p style={{ marginBottom: 0 }}>
                            Quý vị có phải là <strong>Chính khách/ Đại diện chính quyền </strong> (Thị trưởng/ Tỉnh
                            trưởng/ Chủ tịch tỉnh) không ?
                          </p>
                        }
                      >
                        <Radio.Group>
                          <Radio value="a">Có</Radio>
                          <Radio value="b">Không</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="isMainCustomerDetail">
                        <Select placeholder="Chọn" size="small">
                          <Option value="china">China</Option>
                          <Option value="usa">U.S.A</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </WrapperBox>
            {/* Người liên lạc khẩn cấp */}
            <WrapperBox>
              <h1>Người liên lạc khẩn cấp</h1>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="roleContactSupport"
                    label="Danh xưng"
                    hasFeedback
                    rules={[{ required: true, message: 'Vui lòng chọn danh xưng!' }]}
                  >
                    <Select placeholder="Chọn" size="small">
                      {/* TODO: update option */}
                      <Option value="china">China</Option>
                      <Option value="usa">U.S.A</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="nameContactSupport"
                    label="Họ và tên"
                    hasFeedback
                    rules={[{ required: true, message: 'Vui lòng chọn họ và tên!' }]}
                  >
                    <BaseInput size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumberContactSupport"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                  >
                    <BaseInput size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="mailContactSupport"
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                  >
                    <BaseInput size="small" />
                  </Form.Item>
                </Col>
              </Row>
            </WrapperBox>
          </FlexCol>
        </Col>
        <Col span={8}>
          <FlexCol>
            {/* Thông tin riêng tư */}
            <WrapperBox>
              <h1>Thông tin riêng tư</h1>
              <Divider></Divider>
              <Form.Item
                name="sizeOutfit"
                label="Cỡ áo"
                hasFeedback
                rules={[{ required: true, message: 'Vui lòng chọn cỡ áo!' }]}
              >
                <Checkbox.Group>
                  <Checkbox value="S" style={{ lineHeight: '32px' }}>
                    S
                  </Checkbox>
                  <Checkbox value="M" style={{ lineHeight: '32px' }}>
                    M
                  </Checkbox>
                  <Checkbox value="L" style={{ lineHeight: '32px' }}>
                    L
                  </Checkbox>
                  <Checkbox value="XL" style={{ lineHeight: '32px' }}>
                    XL
                  </Checkbox>
                  <Checkbox value="XXL" style={{ lineHeight: '32px' }}>
                    XXL
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                name="isSupportMedical"
                label="Hỗ trợ y tế"
                rules={[{ required: true, message: 'Vui lòng chọn hỗ trợ y tế!' }]}
              >
                <Radio.Group onChange={(e) => setIsShowHelpCare(e.target.value)}>
                  <Radio value="yes">Có</Radio>
                  <Radio value="no">Không</Radio>
                </Radio.Group>
              </Form.Item>
              {isShowHelpCare === 'yes' && (
                <Form.Item
                  name="supportMedicalDetail"
                  rules={[{ required: true, message: 'Vui lòng ghi chú để chúng tôi chuẩn bị y tế cần thiết!' }]}
                >
                  <Input.TextArea showCount maxLength={100} placeholder="Cung cấp thông tin đặc biệt" />
                </Form.Item>
              )}
              <Form.Item
                name="isSupportEating"
                label="Yêu cầu đặc biệt về ăn uống"
                rules={[{ required: true, message: 'Vui lòng chọn yêu cầu đặc biệt!' }]}
              >
                <Radio.Group onChange={(e) => setIsSupportEating(e.target.value)}>
                  <Radio value="yes">Có</Radio>
                  <Radio value="no">Không</Radio>
                </Radio.Group>
              </Form.Item>
              {isSupportEating === 'yes' && (
                <>
                  <Form.Item
                    name="supportEatingDetail.eatingType"
                    label="Ông/ Bà có thuộc một trong các đối tượng sau ?"
                    hasFeedback
                    rules={[{ required: true, message: 'Vui lòng chọn loại thức ăn!' }]}
                  >
                    <Checkbox.Group>
                      <Col>
                        <Checkbox value="1" style={{ lineHeight: '32px' }}>
                          Thuần chay
                        </Checkbox>
                      </Col>
                      <Col>
                        <Checkbox value="2" style={{ lineHeight: '32px' }}>
                          Ăn chay
                        </Checkbox>
                      </Col>
                      <Col>
                        <Checkbox value="3" style={{ lineHeight: '32px' }}>
                          Ăn chay pescatarian
                        </Checkbox>
                      </Col>
                      <Col>
                        <Checkbox value="4" style={{ lineHeight: '32px' }}>
                          Chế độ ăn tiêu chuẩn của người hồi giáo
                        </Checkbox>
                      </Col>
                      <Col>
                        <Checkbox value="5" style={{ lineHeight: '32px' }}>
                          không thuộc một trong các đối tượng trên
                        </Checkbox>
                      </Col>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    name="supportEatingDetail.eatingIgnore"
                    label="Ông/ Bà dị ứng với loại thực phẩm nào dưới đây không ?"
                    hasFeedback
                    rules={[{ required: true, message: 'Vui lòng chọn loại thức ăn cần chú ý!' }]}
                  >
                    <Checkbox.Group>
                      <Row>
                        <Col span={12}>
                          <Checkbox value="1" style={{ lineHeight: '32px' }}>
                            Lạc
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="2" style={{ lineHeight: '32px' }}>
                            Đậu lành
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="3" style={{ lineHeight: '32px' }}>
                            Hạt cây
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="4" style={{ lineHeight: '32px' }}>
                            Cần tây
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="5" style={{ lineHeight: '32px' }}>
                            Vừng
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="6" style={{ lineHeight: '32px' }}>
                            Mù tạt
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="7" style={{ lineHeight: '32px' }}>
                            Bán phẩm từ sữa
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="8" style={{ lineHeight: '32px' }}>
                            Cá
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="9" style={{ lineHeight: '32px' }}>
                            Tôm/ Cua .. (có vỏ)
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="10" style={{ lineHeight: '32px' }}>
                            Trứng
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="11" style={{ lineHeight: '32px' }}>
                            Bột mỳ
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="12" style={{ lineHeight: '32px' }}>
                            Khác
                          </Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item name="supportEatingDetail.other">
                    <Input.TextArea showCount maxLength={100} placeholder="Dồ ăn dị ứng" />
                  </Form.Item>
                </>
              )}
            </WrapperBox>
          </FlexCol>
        </Col>
      </Row>
      <Divider></Divider>
      <SubmitAction>
        <BaseButton
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: '#005CB0',
            width: 256,
          }}
        >
          Cập nhật
        </BaseButton>
      </SubmitAction>
    </Form>
  );
};

export default memo(CreateDelegate);
