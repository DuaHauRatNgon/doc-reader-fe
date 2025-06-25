import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getCommentsByDocument, 
  createComment, 
  updateComment, 
  deleteComment, 
  likeComment 
} from '../../api/commentApi';

const CommentSection = ({ documentId, title = "Bình luận" }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load comments khi component mount
  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCommentsByDocument(documentId);
      setComments(response.data);
    } catch (err) {
      console.error('Error loading comments:', err);
      setError('Không thể tải bình luận');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    if (documentId) {
      loadComments();
    }
  }, [documentId, loadComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const response = await createComment({
        docId: documentId,
        content: newComment.trim()
      });
      
      // Thêm comment mới vào danh sách
      setComments(prev => [response.data, ...prev]);
      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Error creating comment:', err);
      setError('Không thể đăng bình luận. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editContent.trim()) return;

    try {
      setLoading(true);
      await updateComment(commentId, {
        content: editContent.trim()
      });
      
      // Cập nhật comment trong danh sách
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: editContent.trim() }
          : comment
      ));
      
      setEditingComment(null);
      setEditContent('');
      setError('');
    } catch (err) {
      console.error('Error updating comment:', err);
      setError('Không thể cập nhật bình luận. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;

    try {
      setLoading(true);
      await deleteComment(commentId);
      
      // Xóa comment khỏi danh sách
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      setError('');
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Không thể xóa bình luận. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await likeComment(commentId);
      
      // Cập nhật like count trong danh sách
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likeCount: (comment.likeCount || 0) + 1, isLiked: !comment.isLiked }
          : comment
      ));
    } catch (err) {
      console.error('Error liking comment:', err);
      setError('Không thể like bình luận. Vui lòng thử lại.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && comments.length === 0) {
    return (
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>Đang tải bình luận...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ 
        marginBottom: '1rem',
        fontSize: '18px',
        fontWeight: 'bold',
        borderBottom: '2px solid #000',
        paddingBottom: '8px'
      }}>
        💬 {title} ({comments.length})
      </h3>

      {error && (
        <div style={{ 
          color: '#d32f2f', 
          backgroundColor: '#ffebee', 
          padding: '0.75rem', 
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* Form đăng bình luận */}
      {user ? (
        <form onSubmit={handleSubmitComment} style={{ marginBottom: '2rem' }}>
          <div style={{ 
            border: '1px solid #000', 
            padding: '1rem',
            backgroundColor: '#f9f9f9'
          }}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận của bạn..."
              style={{ 
                width: '100%', 
                height: '80px',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              disabled={loading}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '0.5rem'
            }}>
              <small style={{ color: '#666' }}>
                Đăng nhập với tên: {user.name || user.username}
              </small>
              <button
                type="submit"
                disabled={loading || !newComment.trim()}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: newComment.trim() ? '#1976d2' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: newComment.trim() && !loading ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                {loading ? 'Đang đăng...' : 'Đăng bình luận'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{ 
          border: '1px solid #000', 
          padding: '1rem',
          backgroundColor: '#fff3cd',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#856404' }}>
            Vui lòng <a href="/login" style={{ color: '#1976d2' }}>đăng nhập</a> để bình luận
          </p>
        </div>
      )}

      {/* Danh sách bình luận */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#666',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} style={{
              border: '1px solid #000',
              padding: '1rem',
              backgroundColor: '#fff'
            }}>
              {/* Header comment */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#1976d2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {(comment.userName || comment.user?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      {comment.userName || comment.user?.name || 'Người dùng'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                </div>
                
                {/* Actions cho comment của user */}
                {user && (comment.userId === user.sub || comment.userId === user.id) && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setEditingComment(comment.id);
                        setEditContent(comment.content);
                      }}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#fff',
                        border: '1px solid #1976d2',
                        color: '#1976d2',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#fff',
                        border: '1px solid #dc2626',
                        color: '#dc2626',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </div>

              {/* Content comment */}
              {editingComment === comment.id ? (
                <div style={{ marginTop: '0.5rem' }}>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ 
                      width: '100%', 
                      height: '60px',
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => handleEditComment(comment.id)}
                      disabled={loading || !editContent.trim()}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: editContent.trim() ? '#1976d2' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: editContent.trim() && !loading ? 'pointer' : 'not-allowed',
                        fontSize: '12px'
                      }}
                    >
                      {loading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingComment(null);
                        setEditContent('');
                      }}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#fff',
                        border: '1px solid #666',
                        color: '#666',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.5',
                  marginBottom: '0.5rem'
                }}>
                  {comment.content}
                </div>
              )}

              {/* Like button */}
              {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: comment.isLiked ? '#ff4081' : '#fff',
                      border: '1px solid #ff4081',
                      color: comment.isLiked ? 'white' : '#ff4081',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    ❤️ {comment.likeCount || 0}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection; 