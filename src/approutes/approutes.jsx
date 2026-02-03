import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // For your "Grand" page transitions

// Import your pages
import Home from '../pages/home/home';
import About from '../pages/about/about';
import Gallerypage from '../pages/about/gallerypage';
import Services from '../pages/services/service';
import ServiceDetail from '../pages/services/ServiceDetail';
import Contact from '../pages/contact/contact';
import MenuPage from '../pages/menu/MenuPage';
import ScrollToTop from '../components/ScrollToTop';



const AppRoutes = () => {
  const location = useLocation();

  return (

    <>
    <ScrollToTop />
    
    
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallerypage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="menu" element={<MenuPage />} />
        
        
      </Routes>
    </AnimatePresence>
    </>
  );
};

export default AppRoutes;