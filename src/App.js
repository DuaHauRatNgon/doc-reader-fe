// src/App.js
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import AppRoutes from './routes/routes';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <>
      <Layout user={user} onLogout={logout} />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
