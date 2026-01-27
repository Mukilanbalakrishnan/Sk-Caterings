import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- DATA ---
const categories = ["All", "Weddings", "Culinary", "Corporate", "Decor"];

const galleryData = [
  { id: 1, category: "Weddings", src: "https://images.unsplash.com/photo-1519225469958-1934935f30d9?w=800&q=80", title: "Royal Mandap", size: "tall" },
  { id: 2, category: "Culinary", src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80", title: "Signature Buffet", size: "wide" },
  { id: 3, category: "Decor", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", title: "Evening Lights", size: "normal" },
  { id: 4, category: "Corporate", src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", title: "Gala Dinner", size: "tall" },
  { id: 5, category: "Culinary", src: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&q=80", title: "Plating Art", size: "normal" },
  { id: 6, category: "Weddings", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Bridal Entry", size: "wide" },
  { id: 7, category: "Decor", src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80", title: "Floral Setup", size: "tall" },
  { id: 8, category: "Culinary", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", title: "Live Station", size: "normal" },
  { id: 9, category: "Corporate", src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80", title: "Conference Lunch", size: "wide" },
];

// --- COMPONENT: 3D TILT CARD ---
const TiltCard = ({ item, onClick, onHoverStart, onHoverEnd, isMobile }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? ["3deg", "-3deg"] : ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? ["-3deg", "3deg"] : ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, type: "spring" }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && onHoverStart()}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      className={`
        relative group cursor-pointer rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] 
        border border-white/10 overflow-hidden
        ${item.size === 'tall' ? 'row-span-2' : ''}
        ${item.size === 'wide' ? 'sm:col-span-2' : ''}
        ${isMobile ? 'active:scale-[0.98]' : ''}
      `}
    >
      {/* Card Background Glow */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div style={{ transform: "translateZ(40px)" }} className="absolute inset-0 z-10 pointer-events-none">
        {/* Hover Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-6">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-amber-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-2"
          >
            {item.category}
          </motion.p>
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-serif text-white"
          >
            {item.title}
          </motion.h3>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        <motion.img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Shine Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Mobile Tap Indicator */}
      {isMobile && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100" />
      )}
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Custom Cursor Logic
  const [cursorVariant, setCursorVariant] = useState("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const filteredData = activeFilter === "All" 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

  // Hero section animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2 
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#050505] text-white overflow-x-hidden selection:bg-amber-500 selection:text-black cursor-none relative">
      
      {/* --- BACK BUTTON --- */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-4 md:top-8 md:left-8 z-50 pointer-events-auto"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => !isMobile && setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className="flex items-center gap-2 text-white/70 hover:text-amber-500 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
          >
            <span className="text-xl">←</span>
            <span className="text-sm uppercase tracking-widest font-bold hidden sm:inline-block">Back</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* --- CUSTOM CURSOR (Desktop Only) --- */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white/30 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
          style={{ x: cursorX, y: cursorY }}
          animate={cursorVariant === "hover" ? { 
            width: 60, 
            height: 60, 
            backgroundColor: "rgba(245, 158, 11, 0.9)", 
            borderColor: "transparent" 
          } : { width: 16, height: 16 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <AnimatePresence>
            {cursorVariant === "hover" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-black text-xs font-bold tracking-widest"
              >
                VIEW
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex items-center justify-center overflow-hidden px-4">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/30 to-[#050505]" />

        <div className="relative z-20 text-center max-w-6xl mx-auto">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={letterVariants}
              className="text-amber-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-4"
            >
              Visual Journey
            </motion.span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-4 md:mb-6 leading-tight">
              {"Curated ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 inline-block"
              >
                Moments
              </motion.span>
            </h1>
            
            <motion.p 
              variants={letterVariants}
              className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4"
            >
              Explore our collection of meticulously crafted events. Each image tells a story of elegance, 
              precision, and unforgettable experiences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- FILTER DOCK --- */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="sticky top-4 z-40 pb-8 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex flex-wrap justify-center gap-2 bg-black/40 backdrop-blur-lg border border-white/10 px-2 py-2 rounded-full shadow-2xl max-w-2xl mx-auto">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat)}
              onMouseEnter={() => !isMobile && setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className={`
                relative px-4 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
                ${activeFilter === cat ? 'text-black' : 'text-gray-300 hover:text-white'}
                ${isMobile ? 'active:scale-95' : ''}
              `}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg shadow-amber-500/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* --- GALLERY GRID --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]"
          >
            <AnimatePresence>
              {filteredData.map((item) => (
                <TiltCard 
                  key={item.id} 
                  item={item} 
                  onClick={setSelectedImage}
                  onHoverStart={() => !isMobile && setCursorVariant("hover")}
                  onHoverEnd={() => setCursorVariant("default")}
                  isMobile={isMobile}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        
        {/* Empty State */}
        {filteredData.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-white mb-2">No images found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </motion.div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedImage(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center pointer-events-none"
            >
              <div 
                className="relative w-full max-w-6xl h-full max-h-[80vh] bg-gradient-to-br from-[#111] to-[#0a0a0a] 
                         rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 
                         grid grid-cols-1 md:grid-cols-2 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Side */}
                <div className="relative h-64 sm:h-80 md:h-full bg-black">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Details Side */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <motion.span 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-amber-500 font-mono tracking-widest text-sm uppercase mb-4"
                  >
                    {selectedImage.category}
                  </motion.span>
                  
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 md:mb-6"
                  >
                    {selectedImage.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 leading-relaxed mb-6 md:mb-8 text-sm md:text-base"
                  >
                    Experience the elegance and detail captured in this moment. 
                    Every event is crafted with passion and precision to create 
                    unforgettable memories.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold 
                                     uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-amber-500/30 
                                     transition-all text-sm md:text-base">
                      Enquire Now
                    </button>
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-widest 
                               rounded-full hover:bg-white/10 transition-colors text-sm md:text-base"
                    >
                      Close
                    </button>
                  </motion.div>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/10 
                           flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-amber-400/20 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              y: [null, '-20px', '0px'],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;