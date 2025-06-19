const Breadcrumb = ({ bookTitle }) => (
  <div style={{ marginBottom: '1rem' }}>
    <span>Trang chủ</span> &gt; <span>Sách</span> &gt; <strong>{bookTitle}</strong>
  </div>
);
export default Breadcrumb;
