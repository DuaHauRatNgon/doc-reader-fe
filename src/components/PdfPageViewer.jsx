import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Cấu hình worker cho react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfPageViewer({ base64, pageNumber }) {
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);

  // Chuyển đổi base64 thành data URL
  const pdfData = `data:application/pdf;base64,${base64}`;

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1.0);
  };

  const handleLoadError = (error) => {
    console.error('PDF load error:', error);
    setError('Không thể tải trang PDF');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem'
    }}>
      {/* Zoom controls */}
      <div style={{ 
        marginBottom: '1rem',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        <button 
          onClick={handleZoomOut}
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        
        <span style={{ 
          minWidth: '60px',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          {Math.round(scale * 100)}%
        </span>
        
        <button 
          onClick={handleZoomIn}
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        
        <button 
          onClick={handleResetZoom}
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#e3f2fd',
            border: '1px solid #1976d2',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#1976d2',
            fontSize: '0.8rem'
          }}
        >
          Reset
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div style={{ 
          padding: '2rem',
          textAlign: 'center',
          color: '#d32f2f',
          backgroundColor: '#ffebee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {/* PDF Document */}
      {!error && (
        <div style={{ 
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '80vh',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Document
            file={pdfData}
            onLoadError={handleLoadError}
            loading={
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                Đang tải PDF...
              </div>
            }
          >
            <Page
              pageNumber={1}
              scale={scale}
              loading={
                <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                  Đang tải trang...
                </div>
              }
            />
          </Document>
        </div>
      )}
    </div>
  );
}