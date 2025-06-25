import React, { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';


export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ email, displayName, password });
            alert("Đăng ký thành công. Vui lòng kiểm tra email để xác nhận.");
            navigate('/login');

        } catch (err) {
            alert("Đăng ký thất bại.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Tên hiển thị" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" type="password" />
            <button type="submit">Đăng ký</button>
        </form>
    );
}
