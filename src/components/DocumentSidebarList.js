import React from 'react';
import './DocumentSidebarList.css'; 

function DocumentSidebarList({ title, documents }) {
  return (
    <div className="sidebar-section">
      <h3>{title}</h3>
      <ul className="document-list">
        {documents.map((doc, index) => (
          <li style={{ 
                  border: '1px solid #000'}}  key={index} className="document-item">
            <div className="document-title">{doc.title}</div>
            <div className="document-meta">
              <small>{doc.author}</small> <br />
              <small>{doc.updatedAt}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentSidebarList;
