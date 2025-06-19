import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../components/BookDetail/Breadcrumb';
import BookInfo from '../components/BookDetail/BookInfo';
import BookActions from '../components/BookDetail/BookActions';
import BookComments from '../components/BookDetail/BookComments';
import RelatedBooks from '../components/BookDetail/RelatedBooks';

const DocumentDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Gọi API khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5225/api/documents/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!book) return <p>Không tìm thấy sách.</p>;

  return (
    <div style={{ padding: '1rem', border: '1px solid black', margin: '1rem' }}>
      <div style={{ border: '1px solid black', padding: '0.5rem', marginBottom: '1rem' }}>
        <Breadcrumb bookTitle={book.title} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', border: '1px solid black', padding: '1rem' }}>
        <img src={book.thumbnailUrl} alt={book.title} style={{ width: '200px', height: '300px', border: '1px solid black' }} />
        <BookInfo book={book} />
      </div>

      <div style={{ border: '1px solid black', marginTop: '1rem', padding: '1rem' }}>
        <BookActions />
      </div>

      <div style={{ border: '1px solid black', marginTop: '1rem', padding: '1rem' }}>
        <BookComments bookId={book.id} />
      </div>

      <div style={{ border: '1px solid black', marginTop: '1rem', padding: '1rem' }}>
        <RelatedBooks bookId={book.id} />
      </div>
    </div>
  );
};

export default DocumentDetail;
