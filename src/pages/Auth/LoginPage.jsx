import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <LoginForm onLoginSuccess={login} />
  );
}
