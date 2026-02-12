import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

// --- REUSABLE COMPONENTS ---

const AnimatedInput = ({ label, type = "text", placeholder }) => {
  const [focused, setFocused] = useState(false);
  

  return (
    <div className="relative mb-8 group">
      <label className={`absolute left-0 transition-all duration-300 ${focused || placeholder ? '-top-6 text-xs text-amber-500 font-mono tracking-widest' : 'top-2 text-zinc-500 text-sm'}`}>
        {label}
      </label>
      <input
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={(e) => setFocused(e.target.value !== "")}
        className="w-full bg-transparent border-b border-zinc-800 py-2 text-white outline-none transition-colors duration-300 focus:border-amber-500/50"
      />
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="absolute bottom-0 left-0 h-[1px] bg-amber-500"
      />
    </div>
  );
};

const SocialLink = ({ icon: Icon, href }) => {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -5 }}
      className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500/50 transition-colors duration-300 backdrop-blur-md"
    >
      <Icon size={18} />
    </motion.a>
  );
};

const ContactSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center py-20 lg:py-0">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 h-full">
          
          {/* --- LEFT: INFO --- */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
                Get in Touch
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-[0.9] mb-8">
                Let's start a <br />
                <span className="italic text-zinc-600">conversation.</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-md">
                We craft digital experiences that evoke emotion and drive results. Visit our HQ to see where the magic happens.
              </p>
            </motion.div>

            {/* Contact Details */}
            <div className="space-y-8 mb-12">
              {[
                { icon: Mail, label: "Email", value: "skcateringservices99@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 9514001155" },
                { icon: MapPin, label: "HQ", value: "No,50, Nagoji Street, Triplicane, Chennai. Pincode - 600005" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all duration-500">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xl text-zinc-200 font-serif group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <SocialLink icon={Instagram} href="https://www.instagram.com/skfoods_catering/" />
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Facebook} href="https://www.facebook.com/profile.php?id=61586084293076" />
            </div>

          </div>

          {/* --- RIGHT: FORM & MAP OVERLAY --- */}
          <div className="w-full lg:w-7/12 relative min-h-[600px]">

            
            {/* The Map Container */}
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 group">

               
               {/* 1. THE IFRAME */}
               <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.687108743851!2d80.27703609999999!3d13.055577499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52690039ee1f0b%3A0x3b2954354487255a!2sSK%20Catering%20Services!5e0!3m2!1sen!2sin!4v1770911135278!5m2!1sen!2sin"
    width="100%"
  height="100%"
  style={{
    border: 0,
    filter: 'invert(92%) contrast(83%)'
  }}
  loading="lazy"
  title="Google Map"
  className="opacity-70 group-hover:opacity-90 transition-opacity duration-700"
/>


              
              

              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;