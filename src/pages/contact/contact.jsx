import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// --- COMPONENT: MAGNETIC BUTTON ---
const MagneticButton = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- COMPONENT: SOCIAL TILE ---
const SocialTile = ({ icon: Icon, label, color, delay, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="group relative flex flex-col items-center justify-center w-24 h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${color}`} />
    <Icon className="text-white group-hover:scale-110 transition-transform duration-300 z-10" size={28} />
    <span className="text-[10px] uppercase tracking-widest text-white/50 mt-2 group-hover:text-white transition-colors z-10">
      {label}
    </span>
  </motion.a>
);


const Contact = () => {
  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-amber-500 selection:text-black overflow-hidden relative">
      <Navbar />

      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 pt-32 pb-20 container mx-auto px-6 lg:px-12">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-amber-500/30 rounded-full px-4 py-1 mb-6 bg-amber-500/5 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-amber-500 text-xs font-mono uppercase tracking-widest">Concierge Desk Open</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-4"
          >
            Secure Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Experience</span>
          </motion.h1>
          <p className="text-white/40 max-w-lg mx-auto font-light">
            You are one step away from an unforgettable event. Fill out the invitation below to get on our priority list.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: THE "GOLDEN TICKET" FORM --- */}
          <div className="lg:col-span-7 perspective-1000">
            <motion.div 
              initial={{ rotateX: 10, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative bg-[#111] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row group"
            >
              {/* Decorative "Tear Off" Line (Mobile: Bottom, Desktop: Right) */}
              <div className="absolute right-0 top-0 bottom-0 w-1 border-l-2 border-dashed border-white/10 hidden md:block" />
              <div className="absolute bottom-0 left-0 right-0 h-1 border-t-2 border-dashed border-white/10 md:hidden" />

              {/* TICKET MAIN BODY (FORM) */}
              <div className="flex-1 p-8 md:p-12 relative">
                 {/* Watermark */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-9xl font-black rotate-[-15deg] pointer-events-none whitespace-nowrap">
                    SK CATERING
                 </div>

                 <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                   <span className="w-8 h-[1px] bg-amber-500"></span>
                   Event Details
                 </h3>

                 <form className="space-y-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="group relative">
                        <label className="text-xs text-amber-500/70 uppercase tracking-widest mb-2 block">Host Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors" />
                      </div>
                      <div className="group relative">
                        <label className="text-xs text-amber-500/70 uppercase tracking-widest mb-2 block">Contact No.</label>
                        <input type="text" placeholder="+91 00000 00000" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors" />
                      </div>
                    </div>

                    <div className="group relative">
                      <label className="text-xs text-amber-500/70 uppercase tracking-widest mb-2 block">Event Type</label>
                      <div className="flex flex-wrap gap-3">
                        {['Wedding', 'Corporate', 'Social', 'Other'].map(type => (
                          <label key={type} className="cursor-pointer">
                            <input type="radio" name="eventType" className="peer hidden" />
                            <span className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-amber-500/50 hover:text-white peer-checked:bg-amber-500 peer-checked:text-black peer-checked:border-amber-500 transition-all">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="group relative">
                      <label className="text-xs text-amber-500/70 uppercase tracking-widest mb-2 block">Special Requests</label>
                      <textarea rows="2" placeholder="Tell us about your dream theme..." className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors resize-none" />
                    </div>

                    <div className="pt-4">
                      <MagneticButton className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-black font-bold text-lg uppercase tracking-widest hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-shadow flex items-center justify-center gap-3 group/btn">
                         Send Invitation 
                         <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </MagneticButton>
                    </div>
                 </form>
              </div>

              {/* TICKET STUB (INFO) */}
              <div className="w-full md:w-24 bg-[#0a0a0a] flex md:flex-col items-center justify-between p-6 border-l border-white/5 relative overflow-hidden">
                 <div className="hidden md:block absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />
                 
                 {/* Barcode Aesthetic */}
                 <div className="flex md:flex-col gap-1 opacity-40">
                    {[...Array(10)].map((_,i) => <div key={i} className={`bg-white ${i%2===0 ? 'w-1 h-8 md:w-8 md:h-1' : 'w-0.5 h-8 md:w-8 md:h-0.5'}`} />)}
                 </div>

                 <div className="rotate-0 md:-rotate-90 whitespace-nowrap text-white/20 font-mono text-xs uppercase tracking-[0.5em]">
                    ADMIT ONE
                 </div>

                 <div className="text-amber-500 font-bold text-xl md:rotate-0">
                    SK
                 </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: THE RADAR & CONNECTIONS --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* RADAR MAP CARD */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative h-[300px] w-full rounded-[2rem] overflow-hidden border border-white/10 group"
            >
               {/* Grayscale Map */}
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.687108743851!2d80.27703609999999!3d13.055577499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52690039ee1f0b%3A0x3b2954354487255a!2sSK%20Catering%20Services!5e0!3m2!1sen!2sin!4v1770911135278!5m2!1sen!2sin" 
                className="w-full h-full opacity-60 grayscale invert contrast-125 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-700"
                style={{ border: 0 }}
                loading="lazy"
               />
               
               {/* Radar Scanner Overlay */}
               <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-amber-500/30 rounded-full animate-[ping_3s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_20px_#f59e0b]" />
                  {/* Rotating Scanner */}
                  <div className="absolute top-1/2 left-1/2 w-[150px] h-[150px] bg-gradient-to-r from-transparent to-amber-500/20 origin-bottom-left -translate-y-full animate-[spin_4s_linear_infinite] rounded-tr-full" />
               </div>

               {/* Location Tag */}
               <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm">Main Headquarters</h4>
                    <p className="text-white/50 text-xs"> No,50, Nagoji Street, Triplicane, Chennai. Pincode - 600005</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-500">
                    <ArrowRight size={14} className="-rotate-45" />
                  </div>
               </div>
            </motion.div>

            {/* HOLOGRAPHIC SOCIALS GRID */}
            <div>
               <h4 className="text-white/40 text-xs font-mono uppercase tracking-widest mb-6">Connect Digitally</h4>
               <div className="flex flex-wrap gap-4">
  <SocialTile
    icon={Instagram}
    label="Insta"
    href="https://www.instagram.com/skfoods_catering/"
    color="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
    delay={0.3}
  />

  <SocialTile
    icon={Facebook}
    label="Facebook"
    href="https://www.facebook.com/profile.php?id=61586084293076"
    color="bg-blue-600"
    delay={0.4}
  />

  <SocialTile
    icon={MessageCircle}
    label="WhatsApp"
    href="https://wa.me/919514001155"
    color="bg-green-500"
    delay={0.5}
  />

  <SocialTile
    icon={Twitter}
    label="X"
    href="https://twitter.com/"
    color="bg-white"
    delay={0.6}
  />

  <SocialTile
    icon={Mail}
    label="Mail"
    href="mailto:skcateringservices99@gmail.com"
    color="bg-red-500"
    delay={0.7}
  />
</div>

            </div>

            {/* DIRECT LINE */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 }}
               className="bg-gradient-to-r from-amber-500/10 to-transparent p-6 rounded-2xl border-l-4 border-amber-500 flex items-center gap-4"
            >
               <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <Phone size={24} />
               </div>
               <div>
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-wider">Priority Support</p>
                  <p className="text-white text-2xl font-serif font-bold">+91 95140 01155</p>
               </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;