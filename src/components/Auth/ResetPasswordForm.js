import React, { useState } from 'react';
import { resetPassword } from '../../api/authApi';

export default function ResetPasswordForm({ token }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ email, token, newPassword });
      alert("Đặt lại mật khẩu thành công.");
    } catch (err) {
      alert("Lỗi đặt lại mật khẩu.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Mật khẩu mới" type="password" />
      <button type="submit">Đặt lại mật khẩu</button>
    </form>
  );
}
