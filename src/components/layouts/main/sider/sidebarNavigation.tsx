import { UnorderedListOutlined } from '@ant-design/icons';
import React from 'react';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'common.delegate',
    key: 'delegate',
    icon: <UnorderedListOutlined />,
    children: [
      {
        title: 'common.delegate',
        key: 'delegate1',
        url: '/delegate',
      },
      {
        title: 'common.presentations',
        key: 'feed',
        url: '/delegate/presentations',
      },
    ],
  },
  {
    title: 'common.orders',
    key: 'orders',
    url: '/orders',
    icon: <UnorderedListOutlined />,
  },
];
