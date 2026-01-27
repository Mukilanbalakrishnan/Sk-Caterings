import React from 'react';
import ServicePage from './ServicePage';
import BananaLeafScrollButton from '../../components/BananaLeafScrollButton';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Chatbot from '../../components/Chatbot';

const Home = () => {
  return (
    
    <div className="bg-black w-full overflow-x-hidden">
      
      <BananaLeafScrollButton />
      <Navbar/>
      <Chatbot/>
      
      {/* Light Section */}
      <div className="relative z-30">
        <ServicePage />
      </div>

      
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
};

export default Home;