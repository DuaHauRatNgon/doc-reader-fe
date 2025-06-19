import React, { useState } from 'react';
import { Search, User, Menu, X, Home, BookOpen, LogIn, LogOut, Settings } from 'lucide-react';

const Navbar = ({ 
  user = null, // null nếu chưa login, object nếu đã login
  categories = [],
  onLogin,
  onLogout,
  onSearch,
  onCategorySelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav style={{
      backgroundColor: '#fff',
      borderBottom: '2px solid #000',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* Logo/Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          <BookOpen size={24} style={{ marginRight: '8px' }} />
          <span>Đọc chùa vi en</span>
        </div>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          flex: 1,
          justifyContent: 'center'
        }} className="desktop-nav">
          
          {/* Home Link */}
          <a href="/" style={{
            textDecoration: 'none',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 12px',
            border: '1px solid transparent',
            borderRadius: '4px'
          }}
          onMouseOver={(e) => e.target.style.border = '1px solid #000'}
          onMouseOut={(e) => e.target.style.border = '1px solid transparent'}
          >
            <Home size={16} />
            Trang chủ
          </a>

          {/* Categories Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: '1px solid #000',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              Thể loại
              <span style={{ fontSize: '12px' }}>▼</span>
            </button>
            
            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#fff',
                border: '2px solid #000',
                minWidth: '200px',
                zIndex: 1001
              }}>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                    >
                      {category.name}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '10px 15px', color: '#666' }}>
                    Chưa có thể loại
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Box */}
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
              style={{
                border: '1px solid #000',
                padding: '8px 12px',
                width: '250px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                border: '1px solid #000',
                borderLeft: 'none',
                background: '#fff',
                padding: '8px 12px',
                cursor: 'pointer'
              }}
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* User Account Section */}
        <div style={{ position: 'relative' }}>
          {user ? (
            // Logged in user
            <div>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  background: 'none',
                  border: '1px solid #000',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <User size={16} />
                {user.name || user.username}
                <span style={{ fontSize: '12px' }}>▼</span>
              </button>
              
              {isUserMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: '#fff',
                  border: '2px solid #000',
                  minWidth: '180px',
                  zIndex: 1001
                }}>
                  <div
                    onClick={() => {
                      // Navigate to profile
                      setIsUserMenuOpen(false);
                    }}
                    style={{
                      padding: '10px 15px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <Settings size={14} />
                    Quản lý tài khoản
                  </div>
                  <div
                    onClick={() => {
                      if (onLogout) onLogout();
                      setIsUserMenuOpen(false);
                    }}
                    style={{
                      padding: '10px 15px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#dc2626'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    <LogOut size={14} />
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in
            <button
              onClick={onLogin}
              style={{
                border: '1px solid #000',
                background: '#fff',
                padding: '8px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <LogIn size={16} />
              Đăng nhập
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            border: '1px solid #000',
            background: '#fff',
            padding: '8px',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div style={{
          display: 'none',
          backgroundColor: '#fff',
          borderTop: '1px solid #000',
          padding: '10px 0'
        }} className="mobile-nav">
          <a href="/" style={{
            display: 'block',
            padding: '10px 20px',
            textDecoration: 'none',
            color: '#000',
            borderBottom: '1px solid #eee'
          }}>
            🏠 Trang chủ
          </a>
          
          <div style={{ padding: '10px 20px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
            📚 Thể loại:
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: '8px 30px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
            >
              {category.name}
            </div>
          ))}
          
          <div style={{ padding: '10px 20px' }}>
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
                style={{
                  border: '1px solid #000',
                  padding: '8px',
                  flex: 1
                }}
              />
              <button 
                onClick={handleSearch}
                style={{
                  border: '1px solid #000',
                  borderLeft: 'none',
                  background: '#fff',
                  padding: '8px'
                }}
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-nav {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

// Demo component để test
const NavbarDemo = () => {
  const [user, setUser] = useState(null);
  
  const mockCategories = [
    { id: 1, name: 'Văn học' },
    { id: 2, name: 'Khoa học' },
    { id: 3, name: 'Lịch sử' },
    { id: 4, name: 'Công nghệ' },
    { id: 5, name: 'Kinh tế' }
  ];

  const handleLogin = () => {
    // Simulate login
    setUser({ id: 1, name: 'Nguyễn Văn A', username: 'user123' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    alert(`Tìm kiếm: ${query}`);
  };

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);
    alert(`Chọn thể loại: ${category.name}`);
  };

  return (
    <div>
      <Navbar
        user={user}
        categories={mockCategories}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
      />
      
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>  slide... </h1>
     
      </div>
    </div>
  );
};

export default NavbarDemo;