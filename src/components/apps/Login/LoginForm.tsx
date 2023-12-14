import { loginApi } from '@app/api/v1/auth';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { setUser } from '@app/store/slices/userSlice';
import { ILogin } from '@app/types/generalTypes';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { notificationController } from '@app/controllers/notificationController';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      if (res) {
        dispatch(setUser(res));
        navigate('/delegate');
      } else {
        notificationController.error({
          message: 'Login failed',
        });
      }
    },
  });

  const handleSubmit = (values: ILogin) => {
    mutate(values);
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional">
        <Auth.FormTitle>{t('common.login')}</Auth.FormTitle>
        <Auth.FormItem
          name="username"
          label={'Username'}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('common.email')} />
        </Auth.FormItem>
        <Auth.FormItem
          label={t('common.password')}
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
          style={{
            marginBottom: 40,
          }}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit">
            {t('common.login')}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
