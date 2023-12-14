import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import React from 'react';
import * as S from '../Header.styles';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import { useAppSelector } from '@app/hooks/reduxHooks';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
  const username = useAppSelector((state) => state.user.profile?.username);
  return (
    <BaseRow justify="end" align="middle">
      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <SettingsDropdown />
              </BaseCol>
            </BaseRow>
          </BaseCol>
          <BaseCol>{username}</BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
