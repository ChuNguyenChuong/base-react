import React from 'react';
import { CardProps } from 'antd';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './BaseCard.styles';

export interface BaseCardProps extends CardProps {
  className?: string;
  padding?: string | number | [number, number];
  autoHeight?: boolean;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  className,
  padding,
  size,
  autoHeight = true,
  children,
  ...props
}) => {
  const { isTablet, isDesktop } = useResponsive();

  return (
    <S.Card
      size={size ? size : isTablet ? 'default' : 'small'}
      className={className}
      bordered={false}
      $padding={padding || padding === 0 ? padding : (isDesktop && 30) || (isTablet && 20) || 10}
      $autoHeight={autoHeight}
      {...props}
    >
      {children}
    </S.Card>
  );
};
