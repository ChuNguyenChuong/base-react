import React from 'react';
import { DollarOutlined, PlusOutlined, ReadOutlined } from '@ant-design/icons';
import { ActivityStatusType } from '@app/interfaces/interfaces';

interface ActivityStatusItem {
  name: ActivityStatusType;
  title: string;
  color: 'success' | 'warning' | 'secondary';
  icon: React.ReactNode;
}

export const activityStatuses: ActivityStatusItem[] = [
  {
    name: 'sold',
    title: 'nft.status.sold',
    color: 'success',
    icon: <DollarOutlined />,
  },
  {
    name: 'added',
    title: 'nft.status.added',
    color: 'warning',
    icon: <PlusOutlined />,
  },
  {
    name: 'booked',
    title: 'nft.status.booked',
    color: 'secondary',
    icon: <ReadOutlined />,
  },
];

export const statusDelegate = [
  { value: 0, label: 'Chưa thanh toán' },
  { value: 1, label: 'Đã thanh toán' },
];

export const statusOrder = [
  { value: 0, label: 'Chưa thanh toán' },
  { value: 1, label: 'Đã thanh toán' },
];

export const statusPresentation = [
  { value: 0, label: 'Chờ xét duyệt' },
  { value: 1, label: 'Đã duyệt' },
];
