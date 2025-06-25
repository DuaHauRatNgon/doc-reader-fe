import React from 'react';
import MostViewed from './MostViewed';
import LatestDocuments from './LatestDocuments';

const Sidebar = ({ className = '', style = {} }) => {
  return (
    <div 
      style={{ 
        width: '280px',
        border: '1px solid #000',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        ...style
      }}
      className={className}
    >
      <MostViewed />
      <LatestDocuments />
    </div>
  );
};

export default Sidebar; 