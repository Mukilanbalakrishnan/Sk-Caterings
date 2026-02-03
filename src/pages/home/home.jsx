import React from 'react';
import HeroSection from './herosection';
import AboutSection from './aboutsection';
import FounderSection from './foundersection';
import ServicesSection from './servicessection';
import FamousDishesSection from './famousdishessection';
import PopularMenuSection from './popularmenusection';
import TestimonialsSection from './testimonialssection';
import ContactSection from './contactsection';
import BananaLeafScrollButton from '../../components/BananaLeafScrollButton';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Chatbot from '../../components/Chatbot';


const Home = () => {
  return (
    
    <div className="bg-black w-full overflow-x-hidden">
      <HeroSection />
      <BananaLeafScrollButton />
      <Navbar/>
      <Chatbot/>
      
      
      {/* Light Section */}
      <div className="relative z-30">
        <AboutSection />
      </div>

      {/* Dark Sections - z-20 ensures it sits under About if there's a negative margin overlap */}
      <div className="relative z-20">
        <FounderSection />
        <ServicesSection />
      </div>
      <div className="relative z-30">
        <FamousDishesSection />
      </div>
      <div className="relative z-30">
        <PopularMenuSection />
      </div>
      <div className="relative z-30">
        <TestimonialsSection />
      </div>
      <div className="relative z-30">
        <ContactSection />
      </div>
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
};

export default Home;