import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- COMPONENT: ROTATING BADGE ---
const RotatingBadge = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="absolute -top-12 -right-12 md:-right-16 w-32 h-32 md:w-40 md:h-40 z-20 hidden md:flex items-center justify-center pointer-events-none"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <path
        id="curve"
        d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
        fill="transparent"
      />
      <text className="text-[10px] font-mono uppercase tracking-[0.15em] fill-amber-500">
        <textPath href="#curve">
          • Premium Catering • Est. 1999 • Culinary Art •
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-0 m-auto w-20 h-20 bg-[#0a0a0a] rounded-full border border-amber-500/30 flex items-center justify-center backdrop-blur-md">
       <span className="text-2xl">✨</span>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden flex items-center justify-center">
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-900/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- MAIN LAYOUT: Left Image | Right Text --- */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* LEFT SIDE: IMAGE WITH PARALLAX & BADGE */}
          <div className="w-full md:w-1/2 relative group perspective-1000">
            
            {/* The Badge */}
            <RotatingBadge />

            <motion.div 
              style={{ y, opacity }}
              className="relative z-10 overflow-hidden rounded-[2rem] h-[450px] md:h-[650px] w-full shadow-2xl shadow-amber-900/20 border border-white/5"
            >
                {/* Overlay Gradient for Text Contrast/Mood */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-50" />
                
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" 
                  alt="Culinary Excellence" 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                />
            </motion.div>

            {/* Decorative Back Layer (Offset Border) */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 w-full h-full border border-amber-500/30 rounded-[2rem] -z-10 hidden md:block"
            />
          </div>

          {/* RIGHT SIDE: TEXT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 relative"
          >
            {/* Huge Watermark Quote behind text */}
            <span className="absolute -top-20 -left-10 text-[10rem] font-serif text-white/5 pointer-events-none select-none leading-none">
              “
            </span>
            
            {/* Header / Title */}
            <div className="mb-10 relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-amber-500 mb-6"
              />
              <span className="block text-amber-500/80 font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-3 pl-1">
                Since 1999
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] tracking-tight">
                Crafting <br />
                <span className="relative inline-block">
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
                    Unforgettable
                  </span>
                  {/* Underline accent */}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                     <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
                  </svg>
                </span>
                <br /> Experiences.
              </h2>
            </div>

            {/* The Paragraphs */}
            <div className="space-y-6 relative z-10 pl-2 border-l border-white/10 md:border-none md:pl-0">
  <p className="text-neutral-300 text-lg md:text-xl leading-relaxed font-light">
    <span className="text-amber-500 text-3xl float-left mr-2 mt-[-6px] font-serif">O</span>
    ur journey began in a small kitchen with a big dream. Over the years, that dream has grown into 
    a trusted name in catering, built on taste, quality, and hard work. 
    We don’t just serve food — we create moments that people remember.
  </p>

  <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light">
    Whether it’s a small family function or a grand celebration with thousands of guests, 
    our promise stays the same — delicious food, beautiful presentation, and heartfelt service. 
    For us, food is more than a dish — 
    <span className="text-amber-400 font-medium"> உணவு என்பது நினைவு (food becomes a memory)</span>.
  </p>
</div>


            {/* Signature Area */}
            <div className="mt-12 flex items-center gap-4 opacity-80">
              <div className="h-px w-12 bg-amber-500/50"></div>
              <div>
                <p className="font-serif italic text-2xl text-white">Chef Sebastian</p>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">Founder & Head Chef</p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;