// src/layout/Layout.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { getAllDocuments } from '../api/documentApi';
import { Outlet } from 'react-router-dom';

const Layout = ({ user, onLogout }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getAllDocuments().then(res => setDocuments(res.data));
  }, []);

  return (
    <div className="app-layout">
      <Navbar user={user} onLogout={onLogout} />
      {/* children sẽ render AppRoutes bên ngoài */}
    </div>
  );
};

export default Layout;
