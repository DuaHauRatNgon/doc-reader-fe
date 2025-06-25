import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const PageWithSidebar = ({ children, sidebarStyle = {}, contentStyle = {} }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Sidebar style={sidebarStyle} />
      
      {/* Main Content */}
      <div style={{ flex: 1, ...contentStyle }}>
        {children}
      </div>
    </div>
  );
};

export default PageWithSidebar; 