import React, { useEffect, useState } from 'react';

import { getAllDocuments } from '../api/documentApi';


import Navbar from '../components/Navbar';
import MostViewed from '../components/Sidebar/MostViewed';
import LatestDocuments from '../components/Sidebar/LatestDocuments';

import DocumentSidebarList from '../components/DocumentSidebarList';



const Layout = ({ children }) => {

const [documents, setDocuments] = useState([]);
  
  useEffect(() => {
    getAllDocuments().then(res => setDocuments(res.data));
  }, []);

  return (
    <div className="app-layout">

      <Navbar />
        
        <div className="content-layout" style={{ display: 'flex' }}>
            <aside style={{ width: '200px' }}>

              <div style={{ 
                    width: '200px',
                    border: '1px solid #000',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  {/* <MostViewed />*/}
                  <DocumentSidebarList title="Xem nhiều" documents={documents} />
                  
                  {/* <LatestDocuments /> */}
                  <DocumentSidebarList title="Mới cập nhật" documents={documents} />
              
              </div>
            </aside>

            <main className="main-content">
              {children}
            </main>
      </div>
    </div>
  );
};

export default Layout;