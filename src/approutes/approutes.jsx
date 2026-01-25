import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // For your "Grand" page transitions

// Import your pages
import Home from '../pages/home/home';
import OrderPage from '../pages/orders/orders';


const AppRoutes = () => {
  const location = useLocation();

  return (
    // AnimatePresence is required for exit animations (Grand effect)
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<OrderPage />} />
        
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;