import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { formatToMoney } from '@app/helpers';
import { IOrder, IReportPresentation, IDelegate } from '@app/types/generalTypes';
import { Avatar, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TFunction } from 'i18next';
import moment from 'moment';

export const DefaultDelegate: IDelegate = {
  id: 'local',
  job: 'a',
  company: 'a',
  address: 'a',
  phone: 'a',
  email: 'd',
  description: 'd',
  abstracts: {
    id: '1',
    title: 'vennsss',
    description: 'aqasd',
    //files: null,
    status: 1,
    approve: 0,
    rate: 4,
    created_at: '2023-12-11T14:22:16.85',
    files_path: '',
  },
  orders: {
    id: '1',
    banks_id: '',
    payment_amount: '999999',
    status_payment: 0,
    description: 'test',
    created_at: '2023-12-11T14:22:16.85',
  },
  registration_form_id: '',
  register_conference: {
    id: '2',
    registration_form_id: '2',
    name: 'minh',
    fullname: 'minh dot',
    phone: '564654',
    email: 'dass2@gmail.com',
    country: 'Viet Nam',
    identification: '0123456789',
    job_title: 'dev',
    company: 'coc coc',
    transport: 'xe dap',
    information_from: '2023-12-11T14:22:16.85',
    information_to: '2023-12-11T14:22:16.85',
    is_register_car: 0,
    is_government: 0,
  },
  private_information: {
    id: '1',
    shirt_size_id: '',
    medical_description: '999999',
    diet_id: '0',
    food_id: 'test',
    food_description: '2023-12-11T14:22:16.85',
  },
  emergency_contact: {
    id: '1',
    name: '',
    fullname: '999999',
    phone: '0',
    email: 'test',
    information_to: '2023-12-11T14:22:16.85',
  },
  created_at: '2023-12-11T13:01:27.597',
  avatar_path: 'D:\\dep2\\geopark-workshop\\ProductAPI\\Images\\Avatar\\VHL_6176.JPG',
};

export const getColumnOrder = ({
  onDelete,
  onEdit,
}: {
  onEdit: (record: IOrder) => void;
  onDelete: (record: IOrder) => void;
}): ColumnsType<IOrder> => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Đại biểu',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Số tiền thanh toán',
      dataIndex: 'payment_amount',
      key: 'payment_amount',
      render: (amount: string) => <div>{formatToMoney(amount)}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status_payment',
      key: 'status_payment',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}</Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => {
        return moment(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Tác vụ',
      dataIndex: 'actions',
      width: '14%',
      key: 'actions',
      render: (_: unknown, record: IOrder) => (
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <BaseButton icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} />
          <BaseButton icon={<DeleteOutlined />} size="small" onClick={() => onDelete(record)} />
        </div>
      ),
    },
  ];
};

export const getColumnDelegate = (
  t: TFunction,
  actions: { onEdit: (record: IDelegate) => void; onDelete: (record: IDelegate) => void },
): ColumnsType<IDelegate> => {
  const { onDelete, onEdit } = actions;

  return [
    {
      title: t('columns.id') as string,
      dataIndex: 'id',
      key: 'id',
      width: '14%',
    },
    {
      title: t('columns.name') as string,
      dataIndex: 'register_conference.fullname',
      key: 'register_conference.fullname',
      width: '14%',
      render: (image: string, record: IDelegate) => {
        return <div>{record.register_conference.fullname}</div>;
      },
    },
    {
      title: 'Quốc gia',
      dataIndex: 'register_conference.country',
      key: 'register_conference.country',
      width: '14%',
      render: (image: string, record: IDelegate) => {
        return <div>{record.register_conference.country}</div>;
      },
    },
    {
      title: t('columns.image') as string,
      dataIndex: 'avatar',
      width: '14%',
      key: 'avatar',
      render: (image: string, record: IDelegate) => {
        return <Avatar icon={<img src={record.avatar_path} alt="avatar" />}></Avatar>;
      },
    },
    {
      title: t('columns.createdAt') as string,
      dataIndex: 'created_at',
      width: '14%',
      key: 'created_at',
      render: (date: string) => {
        return moment(date).format('DD/MM/YYYY');
      },
    },
    {
      title: t('columns.actions') as string,
      dataIndex: 'actions',
      width: '14%',
      key: 'actions',
      render: (_: unknown, record: IDelegate) => (
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <BaseButton icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} />
          <BaseButton icon={<DeleteOutlined />} size="small" onClick={() => onDelete(record)} />
        </div>
      ),
    },
  ];
};

export const getColumnReportPresentation = (
  t: TFunction,
  actions: { onEdit: (record: IReportPresentation) => void; onDelete: (record: IReportPresentation) => void },
): ColumnsType<IReportPresentation> => {
  const { onDelete, onEdit } = actions;
  return [
    {
      title: t('columns.id') as string,
      dataIndex: 'id',
      key: 'id',
      width: '16.5%',
    },
    {
      title: t('columns.title') as string,
      dataIndex: 'title',
      key: 'title',
      width: '16.5%',
    },
    {
      title: 'Tên đại biểu',
      dataIndex: 'full_name',
      width: '16.5%',
      key: 'full_name',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      width: '16.5%',
      key: 'created_at',
      render: (date: string) => {
        return moment(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'status',
      width: '16.5%',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? 'Đã duyệt' : 'Chờ xét duyệt'}</Tag>
      ),
    },
    {
      title: t('columns.actions') as string,
      dataIndex: 'actions',
      width: '16.5%',
      key: 'actions',
      render: (_: unknown, record: IReportPresentation) => (
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <BaseButton icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} />
          <BaseButton icon={<DeleteOutlined />} size="small" onClick={() => onDelete(record)} />
        </div>
      ),
    },
  ];
};
