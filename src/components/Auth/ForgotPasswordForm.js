import React, { useState } from 'react';
import { forgotPassword } from '../../api/authApi';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      alert("Vui lòng kiểm tra email để đặt lại mật khẩu.");
    } catch (err) {
      alert("Gửi email thất bại.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Gửi</button>
    </form>
  );
}
