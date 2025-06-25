import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ResetPasswordForm from '../../components/Auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';

  return (
    <div>
      <h2>Đặt lại mật khẩu</h2>
      <ResetPasswordForm token={token} />
    </div>
  );
}
