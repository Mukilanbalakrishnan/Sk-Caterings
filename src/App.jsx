import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './approutes/approutes'; // <--- IMPORT YOUR SEPARATE FILE HERE

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans">
        {/* Navbar stays visible on all pages */}
         

        {/* This component handles switching the pages */}
        <AppRoutes />

        {/* Footer stays visible on all pages */}
        
      </div>
    </Router>
  );
};

export default App;