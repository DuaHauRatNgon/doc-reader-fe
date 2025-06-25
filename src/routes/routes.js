import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DocumentList from '../components/document/DocumentList';
import DocumentUpload from '../components/document/DocumentUpload/DocumentUpload';
import DocumentReading from '../pages/DocumentReading';
import DocumentDetail from '../pages/DocumentDetail';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';

import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import ConfirmEmailPage from '../pages/Auth/ConfirmEmailPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DocumentList />} />
      <Route path="/upload" element={<DocumentUpload />} />
      <Route path="/documents/:id" element={<DocumentReading />} />
      <Route path="/documents/detail/:id" element={<DocumentDetail />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/confirm-email" element={<ConfirmEmailPage />} />

    </Routes>
  );
}
