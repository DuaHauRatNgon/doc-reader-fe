import React, { useState } from 'react';
import { uploadDocument } from '../api/documentApi';
import './DocumentUpload.css'; 

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [field, setField] = useState('');
  const [author, setAuthor] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!file || !title.trim() || !field.trim() || !author.trim()) {
      setUploadStatus('error');
      alert('Vui lòng điền đầy đủ thông tin và chọn file');
      return;
    }

    setIsUploading(true);
    setUploadStatus('');

    try {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("Title", title.trim());
      formData.append("Field", field.trim());
      formData.append("Author", author.trim());

      const response = await uploadDocument(formData);
      
      setUploadStatus('success');
      alert("Tải lên thành công với ID: " + response.data.documentId);
      
      // Reset form
      setFile(null);
      setTitle('');
      setField('');
      setAuthor('');
      document.getElementById('file-input').value = '';
      
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload error:', error);
      alert('Có lỗi xảy ra khi tải lên tài liệu');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadStatus('');
  };

  return (
    <div className="document-upload-container">
      <div className="upload-card">
        <div className="upload-header">
          <h2>Tải lên tài liệu</h2>
          <p>Điền thông tin và chọn file để tải lên</p>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Tiêu đề <span className="required">*</span></label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề tài liệu"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="field">Lĩnh vực <span className="required">*</span></label>
            <input
              type="text"
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Ví dụ: Công nghệ thông tin, Y học, Kinh tế..."
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Tác giả <span className="required">*</span></label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nhập tên tác giả"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="file-input">Chọn file <span className="required">*</span></label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                className="file-input"
                accept=".pdf,.doc,.docx,.txt"
                required
              />
              <div className="file-input-display">
                <span className="file-icon">📁</span>
                <span className="file-text">
                  {file ? file.name : 'Chọn file tài liệu'}
                </span>
              </div>
            </div>
            <small className="file-hint">
              Hỗ trợ: PDF, DOC, DOCX, TXT (Tối đa 10MB)
            </small>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isUploading ? 'uploading' : ''}`}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <span className="spinner"></span>
                Đang tải lên...
              </>
            ) : (
              <>
                <span className="upload-icon">⬆️</span>
                Tải lên tài liệu
              </>
            )}
          </button>
        </form>

        {uploadStatus === 'success' && (
          <div className="status-message success">
            ✅ Tải lên thành công!
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="status-message error">
            ❌ Có lỗi xảy ra, vui lòng thử lại!
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentUpload;