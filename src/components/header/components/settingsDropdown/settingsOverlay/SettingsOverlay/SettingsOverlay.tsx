import React from 'react';
import { DropdownCollapse, LogoutButton } from '@app/components/header/Header.styles';
import { useTranslation } from 'react-i18next';
import { NightModeSettings } from '../nightModeSettings/NightModeSettings';
import { ThemePicker } from '../ThemePicker/ThemePicker';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { useAppSelector } from '@app/hooks/reduxHooks';
import * as S from './SettingsOverlay.styles';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '@app/store/slices/userSlice';

export const SettingsOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isPWASupported, event } = useAppSelector((state) => state.pwa);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <S.SettingsOverlayMenu {...props}>
      <DropdownCollapse bordered={false} expandIconPosition="end" ghost defaultActiveKey="themePicker">
        <DropdownCollapse.Panel header={t('header.changeTheme')} key="themePicker">
          <ThemePicker />
        </DropdownCollapse.Panel>
        <DropdownCollapse.Panel header={t('header.nightMode.title')} key="nightMode">
          <NightModeSettings />
        </DropdownCollapse.Panel>
      </DropdownCollapse>
      {isPWASupported && (
        <S.PwaInstallWrapper>
          <BaseButton block type="primary" onClick={() => event && (event as BeforeInstallPromptEvent).prompt()}>
            {t('common.pwa')}
          </BaseButton>
        </S.PwaInstallWrapper>
      )}
      <LogoutButton onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </LogoutButton>
    </S.SettingsOverlayMenu>
  );
};
