import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

// --- COMPONENT: MAGNETIC BUTTON (Pulls towards cursor) ---
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Strength of the magnetic pull
    x.set((clientX - centerX) * 0.3); 
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- COMPONENT: 3D TILT CARD ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Inverse the tilt for a "looking into" effect
  const rotateX = useTransform(y, [-100, 100], [10, -10]); 
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 200;
    const yPct = (mouseY / height - 0.5) * 200;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-shadow duration-300 ${className}`}
    >
      {/* Push content forward in 3D space */}
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// --- MAIN SECTION ---
const ContactSection = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const containerRef = useRef(null);
  
  // Parallax Background Effect
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yBackground = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-20 md:py-32 bg-[#022c22] overflow-hidden flex items-center justify-center">
      
      {/* --- LIVING BACKGROUND: Dynamic Grid --- */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </motion.div>

      {/* Floating Glowing Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px]"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* --- LEFT: INTERACTIVE CONTENT --- */}
          <div className="space-y-12">
            
            {/* Headline */}
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4 block"
              >
                // Connect With Us
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Let's Craft <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Experiences
                  </span>
                  {/* Decorative Underline */}
                  <motion.span 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-emerald-800/50 -z-0 -rotate-2"
                  />
                </span>
              </h2>
            </div>

            {/* 3D Contact Cards Grid */}
            <div className="grid gap-6">
              {[
                { icon: "📍", title: "Visit HQ", desc: "123 Royal Palace Ave, NY", action: "Get Directions" },
                { icon: "📞", title: "Call Us", desc: "+1 (800) 123-4567", action: "Call Now" },
                { icon: "✉️", title: "Email", desc: "hello@skcaterings.com", action: "Send Email" }
              ].map((item, idx) => (
                <TiltCard key={idx} className="group cursor-pointer">
                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-emerald-500/50 transition-all shadow-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                      <p className="text-emerald-200/80 font-light">{item.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-emerald-900 transition-all">
                      ↗
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Magnetic CTA Button */}
            <div className="pt-8">
              <MagneticButton 
                onClick={() => setShowContactForm(true)}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.7)] transition-shadow text-lg flex items-center gap-3"
              >
                <span>Start A Conversation</span>
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </MagneticButton>
            </div>

          </div>

          {/* --- RIGHT: INNOVATIVE MAP PORTAL --- */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            
            {/* Animated Orbital Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[500px] h-[500px] rounded-full border border-white/5 border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] rounded-full border border-emerald-500/10"
            />

            {/* The Map "Portal" Shape */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
              className="relative w-full max-w-md aspect-[4/5] bg-[#0f172a] rounded-[3rem] overflow-hidden border-8 border-[#1e293b] shadow-2xl z-20 group"
            >
              {/* Map Iframe with CSS Filters for Dark/Emerald Mode */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1622646244672!5m2!1sen!2sus" 
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                style={{ filter: "grayscale(100%) invert(90%) contrast(85%) hue-rotate(160deg)" }} 
                allowFullScreen="" 
                loading="lazy"
                title="Map"
              />

              {/* Floating Overlay Card on Map */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 p-5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-white font-bold">Main Kitchen</h5>
                    <div className="flex gap-1 mt-1">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-xs">★</span>)}
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">Open 24/7</span>
                  <span className="text-[10px] bg-white/10 text-white px-2 py-1 rounded">5.0 Rating</span>
                </div>
              </motion.div>

              {/* Decorative "Notch" */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e293b] rounded-b-2xl z-30" />
            </motion.div>

            {/* Background Geometric Blur Accents */}
            <div className="absolute -right-10 top-20 w-24 h-24 bg-gradient-to-br from-emerald-500 to-transparent opacity-20 blur-2xl" />
            <div className="absolute -left-10 bottom-20 w-32 h-32 bg-gradient-to-tr from-teal-500 to-transparent opacity-20 blur-2xl" />

          </div>

        </div>
      </div>

      {/* --- CONTACT FORM MODAL --- */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0f172a] border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />
              
              <h3 className="text-3xl font-serif text-white mb-2">Let's Talk</h3>
              <p className="text-emerald-400/60 mb-8">Tell us about your dream event.</p>

              <form className="space-y-5">
                {/* Input Fields with Animated Bottom Border */}
                <div className="group relative">
                  <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors peer" />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 w-0 peer-focus:w-full transition-all duration-500" />
                </div>
                <div className="group relative">
                  <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors peer" />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 w-0 peer-focus:w-full transition-all duration-500" />
                </div>
                <div className="group relative">
                  <textarea placeholder="Message" rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors peer resize-none" />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 w-0 peer-focus:w-full transition-all duration-500" />
                </div>
                
                <button type="button" className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:translate-y-[-2px]">
                  Send Message
                </button>
              </form>

              <button 
                onClick={() => setShowContactForm(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ContactSection;