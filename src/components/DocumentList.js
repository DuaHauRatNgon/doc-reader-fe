import React, { useEffect, useState } from 'react';
import { getAllDocuments, deleteDocument } from '../api/documentApi';
import { Link } from 'react-router-dom';
import DocumentSidebarList from './DocumentSidebarList';


function DocumentList() {
  const [documents, setDocuments] = useState([]);
  
  useEffect(() => {
    getAllDocuments().then(res => setDocuments(res.data));
  }, []);

  const handleDelete = async (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleBookmark = (id) => {
    console.log(`Bookmark document ${id}`);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
    

      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        border: '2px solid #000',
        borderTop: 'none'
      }}>
        
        {/* Left Sidebar */}
        {/* <div style={{ 
          width: '200px',
          border: '1px solid #000',
          display: 'flex',
          flexDirection: 'column'
        }}> */}


            {/* <DocumentSidebarList title="Xem nhiều" documents={documents} /> */}
            {/* <DocumentSidebarList title="Mới cập nhật" documents={documents} /> */}

          
          


        {/* </div> */}

        {/* Main Document Grid */}
        <div style={{ 
          flex: 1,
          border: '1px solid #000',
          padding: '20px'
        }}>
          
          {/* Grid Container */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '20px',
            height: '100%'
          }}>
            {documents.map(doc => (
              <div key={doc.id} style={{ 
                border: '2px solid #000', 
                padding: '15px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                
                {/* Image */}
                <div style={{ 
                  border: '1px solid #000', 
                  height: '120px', 
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  overflow: 'hidden'
                }}>
                  {doc.thumbnailUrl ? (
                    <img 
                      src={doc.thumbnailUrl} 
                      alt={doc.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '14px', color: '#666' }}>ảnh</span>
                  )}
                </div>

                {/* Title */}
                <div style={{ 
                  border: '1px solid #000', 
                  padding: '8px', 
                  marginBottom: '8px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <h4 style={{ margin: 0, fontSize: '14px', lineHeight: '1.2' }}>
                    {doc.title}
                  </h4>
                </div>

                {/* Author */}
                <div style={{ 
                  border: '1px solid #000', 
                  padding: '6px', 
                  marginBottom: '8px',
                  fontSize: '12px'
                }}>
                  Tác giả: {doc.author}
                </div>

                {/* Tags */}
                <div style={{ 
                  border: '1px solid #000', 
                  padding: '6px', 
                  marginBottom: '8px',
                  minHeight: '35px'
                }}>
                  <div style={{ fontSize: '12px', marginBottom: '4px' }}>Tags:</div>
                  <div>
                    {doc.tags && doc.tags.map(tag => (
                      <span key={tag.id} style={{ 
                        border: '1px solid #000', 
                        padding: '1px 4px', 
                        marginRight: '4px',
                        fontSize: '10px',
                        display: 'inline-block'
                      }}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Page Count */}
                <div style={{ 
                  border: '1px solid #000', 
                  padding: '6px', 
                  marginBottom: '8px',
                  fontSize: '12px'
                }}>
                  Số trang: {doc.pageCount}
                </div>

                {/* Action Buttons */}
                <div style={{ 
                  border: '1px solid #000', 
                  padding: '8px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button style={{ 
                    flex: 1,
                    padding: '4px 8px',
                    fontSize: '12px',
                    border: '1px solid #000',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}>
                    <Link to={`/documents/${doc.id}`}>Đọc</Link>
                    <Link to={`/documents/detail/${doc.id}`}>Xem thêm</Link>

                  </button>
                  <button 
                    onClick={() => handleBookmark(doc.id)}
                    style={{ 
                      padding: '4px 8px',
                      fontSize: '12px',
                      border: '1px solid #000',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    ★
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default DocumentList;