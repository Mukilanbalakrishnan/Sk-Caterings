import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroVideo from '../../../public/assets/videos/video.mp4'; // UNCOMMENT THIS

// Animation Variants for Staggered Text
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each letter by 0.1s
      delayChildren: 0.3,
    },
  },
};

const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const herosection = () => {
  const ref = useRef(null);
  
  // Parallax Effect Hook: Tracks scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll (Parallax)
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Helper to split text for animation
  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span key={index} variants={letterVariants}>
        {char}
      </motion.span>
    ));
  };

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* --- PARALLAX BACKGROUND VIDEO --- */}
      <motion.div 
        style={{ y: yBackground }} // Moves background slower than foreground
        className="absolute top-0 left-0 w-full h-full"
      >
        <video
          className="w-full h-full object-cover scale-110" // scale-110 prevents white gaps during parallax
          src={heroVideo} 
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark Overlay Gradient for better depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
      </motion.div>

      {/* --- FLOATING DECORATIVE ELEMENTS (Grand Touch) --- */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"
      />
       <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />

      {/* --- MAIN CONTENT --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }} // Text fades and moves down on scroll
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        
        {/* 1. Staggered Headline Animation */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-white text-6xl md:text-8xl font-bold tracking-tight mb-4 font-serif overflow-hidden"
        >
          {/* We wrap "CULINARY" separately to style it or just split it */}
          <span className="inline-block mr-4">{splitText("Magic on a")}</span>
          <span className="text-yellow-400 inline-block">{splitText("Plate")}</span>
        </motion.h1>

        {/* 2. Slide-up Subtitle with a delay */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="text-gray-200 text-lg md:text-2xl max-w-2xl font-light tracking-wide mb-12 italic"
        >
          "Where every flavor tells a story of elegance."
        </motion.p>

        

        {/* 4. Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"
          />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default herosection;