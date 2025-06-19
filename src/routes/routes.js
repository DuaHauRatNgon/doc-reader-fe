import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DocumentList from '../components/DocumentList';
import DocumentUpload from '../components/DocumentUpload';
import DocumentReading from '../pages/DocumentReading';
import DocumentDetail from '../pages/DocumentDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DocumentList />} />
      <Route path="/upload" element={<DocumentUpload />} />
      <Route path="/documents/:id" element={<DocumentReading />} />
      <Route path="/documents/detail/:id" element={<DocumentDetail />} />

    </Routes>
  );
}
