import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../api/authApi';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.name || user?.username || '',
    email: user?.email || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement this API call when backend is ready
      // await updateProfile(formData);
      console.log('Updating profile:', formData);
      alert('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Vui lòng đăng nhập để xem thông tin tài khoản.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        border: '2px solid #000', 
        padding: '20px',
        backgroundColor: '#fff'
      }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
          Quản lý tài khoản
        </h2>

        {!isEditing ? (
          // View mode
          <div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Tên hiển thị:</strong> {user.name || user.username}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {user.email}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>ID:</strong> {user.sub || user.id}
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'center',
              marginTop: '20px'
            }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #000',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
              >
                Chỉnh sửa
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #dc2626',
                  backgroundColor: '#fff',
                  color: '#dc2626',
                  cursor: 'pointer'
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          // Edit mode
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                <strong>Tên hiển thị:</strong>
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #000'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #000'
                }}
                required
              />
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'center',
              marginTop: '20px'
            }}>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #000',
                  backgroundColor: '#fff',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #666',
                  backgroundColor: '#fff',
                  color: '#666',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 