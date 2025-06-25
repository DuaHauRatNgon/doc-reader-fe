import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { confirmEmail } from '../../api/authApi';

export default function ConfirmEmailPage() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      confirmEmail(token).then(() => alert("Xác nhận thành công")).catch(() => alert("Xác nhận thất bại"));
    }
  }, [params]);

  return <p>Đang xác nhận email...</p>;
}
