// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import AppRoutes from './routes';

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;


// src/App.js  
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import AppRoutes from './routes/routes';


// import HomePage from './pages/HomePage';
// import DocumentListPage from './pages/DocumentListPage';
// // ... other imports

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;