import React from 'react';
import AboutPage from './aboutpage';
import BananaLeafScrollButton from '../../components/BananaLeafScrollButton';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Chatbot from '../../components/Chatbot';
import WhyChooseUs from './whychooseus';
import GallerySection from './gallerysection';

const Home = () => {
  return (
    
    <div className="bg-black w-full overflow-x-hidden">
      
      <BananaLeafScrollButton />
      <Navbar/>
      <Chatbot/>
      
      {/* Light Section */}
      <div className="relative z-30">
        <AboutPage />
      </div>
      <div className="relative z-30">
        <WhyChooseUs />
      </div>
      <div className="relative z-30">
        <GallerySection />
      </div>

      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
};

export default Home;