import React from 'react';
import CommentSection from './CommentSection';

const CommentDemo = () => {
  // Mock document ID để test
  const mockDocumentId = "demo-document-123";

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Demo Tính năng Comment</h1>
      <p>Đây là trang demo để test tính năng comment. Hãy thử:</p>
      <ul>
        <li>Đăng nhập để có thể comment</li>
        <li>Viết comment mới</li>
        <li>Sửa comment của bạn</li>
        <li>Xóa comment của bạn</li>
        <li>Like comment</li>
      </ul>
      
      <div style={{ 
        border: '2px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        marginTop: '20px'
      }}>
        <CommentSection 
          documentId={mockDocumentId} 
          title="Demo Comments" 
        />
      </div>
    </div>
  );
};

export default CommentDemo; 