import React from 'react';
import CommentSection from '../Comment/CommentSection';

const BookComments = ({ bookId }) => {
  return <CommentSection documentId={bookId} title="Bình luận" />;
};

export default BookComments; 