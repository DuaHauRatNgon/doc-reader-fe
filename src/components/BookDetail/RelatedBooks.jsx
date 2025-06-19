const RelatedBooks = ({ bookId }) => {
  const related = [
    { id: 1, title: 'Sách A', imageUrl: '/a.jpg' },
    { id: 2, title: 'Sách B', imageUrl: '/b.jpg' },
    { id: 3, title: 'Sách C', imageUrl: '/c.jpg' },
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Sách liên quan</h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {related.map(book => (
          <div key={book.id} style={{ width: '120px', textAlign: 'center' }}>
            <img src={book.imageUrl} alt={book.title} style={{ width: '100%', height: '150px' }} />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
