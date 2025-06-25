import React from 'react';
import { Link } from 'react-router-dom';

const MostViewed = () => {
  // Mock data cho tiểu thuyết xem nhiều
  const mostViewedDocs = [
    {
      id: 1,
      title: "One Piece - Đảo Hải Tặc",
      author: "Oda Eiichiro",
      views: 1250,
      thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Naruto - Ninja Giả",
      author: "Kishimoto Masashi",
      views: 980,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Dragon Ball Super",
      author: "Toriyama Akira",
      views: 756,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Attack on Titan",
      author: "Isayama Hajime",
      views: 634,
      thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Demon Slayer",
      author: "Gotouge Koyoharu",
      views: 521,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center"
    }
  ];

  return (
    <div style={{ 
      padding: '1rem', 
      borderBottom: '1px solid #000',
      backgroundColor: '#fff'
    }}>
      <h4 style={{ 
        margin: '0 0 1rem 0', 
        fontSize: '16px',
        fontWeight: 'bold',
        borderBottom: '2px solid #000',
        paddingBottom: '8px'
      }}>
        📈 Xem nhiều nhất
      </h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mostViewedDocs.map((doc, index) => (
          <Link 
            key={doc.id}
            to={`/documents/${doc.id}`}
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'block'
            }}
          >
            <div style={{
              border: '1px solid #000',
              padding: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img 
                  src={doc.thumbnail} 
                  alt={doc.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f0f0f0',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  📚
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  lineHeight: '1.3',
                  marginBottom: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {doc.title}
                </div>
                
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  marginBottom: '2px'
                }}>
                  {doc.author}
                </div>
                
                <div style={{
                  fontSize: '9px',
                  color: '#888',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  👁️ {doc.views.toLocaleString()} lượt xem
                </div>
              </div>
              
              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                #{index + 1}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostViewed;