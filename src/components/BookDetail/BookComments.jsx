const BookComments = ({ bookId }) => (
  <div style={{ marginTop: '2rem' }}>
    <h3>Bình luận</h3>
    {/* TODO: Kết nối API hoặc hiển thị bình luận giả lập */}
    <textarea placeholder="Viết bình luận..." style={{ width: '100%', height: '100px' }} />
  </div>
);
export default BookComments;
