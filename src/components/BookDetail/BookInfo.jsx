const BookInfo = ({ book }) => (
  <div style={{ border: '1px solid black', padding: '0.5rem' }}>
    <h2>{book.title}</h2>
    <p><strong>Tác giả:</strong> {book.author}</p>
    <p><strong>Chủ đề:</strong> {book.field}</p>
    <p><strong>Số trang:</strong> {book.pageCount}</p>
    <p><strong>Tóm tắt:</strong> {book.sumary}</p>
    <p><strong>Tags:</strong> {book.tags.map(tag => tag.name).join(', ')}</p>
  </div>
);
export default BookInfo;
