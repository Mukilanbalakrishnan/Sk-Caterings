import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80", title: "Royal Buffet" },
  { id: 2, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFykSiNeCpLpx9xP8gPBCkGfG401BtM_idPA&s", title: "Wedding Setup" },
  { id: 3, src: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=600&q=80", title: "Plating Art" },
  { id: 4, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", title: "Candlelight" },
  { id: 5, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", title: "Master Chef" },
  { id: 6, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80", title: "Cocktail Hour" },
  { id: 7, src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80", title: "Dessert Table" },
  { id: 8, src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80", title: "Premium Drinks" },
  { id: 9, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", title: "Live Counters" },
];

const GallerySection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(0);

useEffect(() => {
  const updateRadius = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    setIsMobile(vw < 768);

    // Safe radius calculation (prevents clipping)
    if (vw < 640) {
      setRadius(vh * 0.22);   // mobile
    } else if (vw < 768) {
      setRadius(vh * 0.28);   // small tablet
    } else if (vw < 1024) {
      setRadius(vh * 0.32);   // tablet
    } else {
      setRadius(vh * 0.36);   // desktop
    }
  };

  updateRadius();
  window.addEventListener("resize", updateRadius);
  return () => window.removeEventListener("resize", updateRadius);
}, []);


  const totalItems = galleryImages.length;
  const imageSize = isMobile 
    ? { width: "6rem", height: "8rem" } 
    : window.innerWidth < 1024 
      ? { width: "10rem", height: "14rem" }
      : { width: "12rem", height: "16rem" };

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden py-6 md:py-10 px-4">
      
      {/* Background Decor */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"
      />
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[800px] h-[40vh] md:h-[500px] bg-gradient-to-r from-amber-900/20 via-orange-800/20 to-amber-900/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-30 text-center mb-8 md:mb-12 px-4 w-full max-w-4xl mx-auto"
      >
        
      
      </motion.div>

      {/* Rotating Gallery Wheel */}
      <div className="relative w-full h-[90vh] flex justify-center items-center overflow-visible pt-20">


        {/* CENTER TEXT */}
<div className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-none">
  
  <div className="flex justify-center mb-3 space-x-1">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="text-amber-500 text-sm md:text-base">★</span>
    ))}
  </div>

  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
    A Visual <br />
    <span className="italic font-light bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[length:200%_auto] bg-clip-text text-transparent">
      Feast
    </span>
  </h2>

  <p className="text-gray-400 text-xs md:text-sm max-w-xs mt-3">
    Experience culinary artistry through our lens.
  </p>

</div>

        
        {/* Center Decorative Circle */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: 360 
          }}
          transition={{ 
            scale: { duration: 4, repeat: Infinity },
            rotate: { duration: 40, repeat: Infinity, ease: "linear" }
          }}
          className="absolute z-10 w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-amber-500/30 pointer-events-none"
        />
        
        {/* Rotating Images */}
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          animate={{ rotate: 360 }} 
          transition={{ 
            repeat: Infinity, 
            duration: isMobile ? 80 : 60, 
            ease: "linear" 
          }}
        >
          {galleryImages.map((img, i) => {
            const angleStep = 360 / totalItems;
            const angle = i * angleStep;
            const rad = (angle * Math.PI) / 180;
            
            const x = Math.sin(rad) * radius;
            const y = -Math.cos(rad) * radius;

            return (
              <motion.div
                key={img.id}
                className="absolute rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group cursor-pointer"
                style={{ 
                  width: imageSize.width,
                  height: imageSize.height,
                  left: "50%",
                  top: "50%",
                  x: x,
                  y: y,
                  translateX: "-50%",
                  translateY: "-50%",
                  rotate: angle,
                  zIndex: 10
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring", damping: 15 }}
                whileHover={{ 
                  scale: 1.25, 
                  zIndex: 50, 
                  borderColor: '#f59e0b',
                  boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Image Container */}
                <div className="relative w-full h-full overflow-hidden">
                  <motion.img 
                    src={img.src} 
                    alt={img.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Overlay */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4"
                  >
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="text-white font-medium text-sm md:text-base drop-shadow-lg"
                    >
                      {img.title}
                    </motion.span>
                  </motion.div>
                  
                  {/* Shine Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Touch Instructions */}
        {isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
          >
            
          </motion.div>
        )}
      </div>

      {/* CTA Button */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-30 mt-8 md:mt-12"
      >
        <Link to="/gallery">
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm flex items-center gap-2 mx-auto shadow-xl shadow-amber-900/30 overflow-hidden group"
          >
            {/* Button Shine Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative z-10">View Full Gallery</span>
            <motion.span 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              →
            </motion.span>
          </motion.button>
        </Link>
        
        
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              y: [null, '-20px', '0px'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default GallerySection;