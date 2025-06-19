// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getDocumentById, getPagesBase64 } from '../api/documentApi';

// function DocumentDetail() {
//   const { id } = useParams();
//   const [doc, setDoc] = useState(null);
//   const [pages, setPages] = useState([]);

//   useEffect(() => {
//     getDocumentById(id).then(res => setDoc(res.data));
//   }, [id]);

//   const loadPages = async () => {
//     const res = await getPagesBase64(id, 1, 3);
//     setPages(res.data);
//   };

//   return (
//     <div>
//       <h2>Document Detail</h2>
//       {doc && <p>Title: {doc.title}</p>}
//       <button onClick={loadPages}>Load Pages (base64)</button>
//       <div>
//         {pages.map(p => (
//           <div key={p.pageNumber}>
//             <p>Page {p.pageNumber}</p>
//             <img src={`data:image/png;base64,${p.pageContentBase64Encoded}`} alt={`Page ${p.pageNumber}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DocumentDetail;





















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getPagesBase64 } from '../api/documentApi';
// import PdfPageViewer from './PdfPageViewer';

// export default function DocumentDetail() {
//   const { id } = useParams();
//   const [pages, setPages] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPages = async () => {
//       try {
//         const res = await getPagesBase64(id, 1, 5); // Tải 5 trang đầu
//         setPages(res.data);
//       } catch (err) {
//         setError('Không thể tải dữ liệu trang');
//         console.error(err);
//       }
//     };

//     fetchPages();
//   }, [id]);

//   return (
//     <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
//       <h2>Chi tiết tài liệu</h2>
//       {error && <p>{error}</p>}
//       {pages.map((page) => (
//         <PdfPageViewer
//           key={page.pageNumber}
//           base64={page.pageContentBase64Encoded}
//         />
//       ))}
//     </div>
//   );
// }


















import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPagesBase64 } from '../api/documentApi';
import PdfPageViewer from '../components/PdfPageViewer';

export default function DocumentDetail() {
  const { id } = useParams();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const res = await getPagesBase64(id, 1, 5); // Tải 5 trang đầu
        setPages(res.data);
        setCurrentPage(0); // Reset về trang đầu
      } catch (err) {
        setError('Không thể tải dữ liệu trang');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, [id]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(pages.length - 1, prev + 1));
  };

  const handlePageSelect = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '2rem' }}>
        <p>Đang tải tài liệu...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Chi tiết tài liệu</h2>
      
      {error && (
        <div style={{ 
          color: '#d32f2f', 
          backgroundColor: '#ffebee', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {pages.length > 0 && (
        <>
          {/* Navigation chung */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: currentPage === 0 ? '#ccc' : '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Trang trước
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Trang {currentPage + 1} / {pages.length}</span>
              
              {/* Page selector dropdown */}
              <select 
                value={currentPage} 
                onChange={(e) => handlePageSelect(Number(e.target.value))}
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                {pages.map((_, index) => (
                  <option key={index} value={index}>
                    Trang {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: currentPage === pages.length - 1 ? '#ccc' : '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Trang sau →
            </button>
          </div>

          {/* Hiển thị trang hiện tại */}
          <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <PdfPageViewer
              key={pages[currentPage].pageNumber}
              base64={pages[currentPage].pageContentBase64Encoded}
              pageNumber={pages[currentPage].pageNumber}
            />
          </div>

          {/* Page info */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1rem',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            Trang {pages[currentPage].pageNumber}
          </div>
        </>
      )}
    </div>
  );
}