import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
const images = [
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80", // Catering Setup
  "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=600&q=80", // Plated Food
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", // Restaurant Ambiance
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"  // Chef Cooking
];

const features = [
  {
    title: "Authentic Recipes",
    description: "We use age-old family recipes passed down through generations, ensuring every bite tells a story of tradition.",
    icon: "📜"
  },
  {
    title: "Premium Ingredients",
    description: "Sourced daily from local organic farms. No preservatives, just fresh, wholesome produce and hand-ground spices.",
    icon: "🌿"
  },
  {
    title: "Royal Hospitality",
    description: "Our staff is trained in the art of traditional hospitality, treating every guest like royalty with grace and efficiency.",
    icon: "👑"
  }
];

const WhyChooseUs = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#0f0f0f] py-24 flex items-center overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      {/* Glowing Blob */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header (Mobile Only for flow) */}
        <div className="md:hidden mb-12 text-center">
          <span className="text-amber-500 font-mono text-sm uppercase tracking-[0.2em]">Our Promise</span>
          <h2 className="text-4xl font-serif text-white mt-2">Why Choose Us</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* --- LEFT: TEXT CONTENT --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-10"
          >
            {/* Desktop Header */}
            <div className="hidden md:block">
              <span className="text-amber-500 font-mono text-sm uppercase tracking-[0.2em]">Our Promise</span>
              <h2 className="text-5xl md:text-6xl font-serif text-white mt-4 leading-tight">
                Crafting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                  Unforgettable
                </span> Memories
              </h2>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold shadow-lg shadow-amber-900/20 flex items-center gap-2"
            >
              Start Planning
              <span>→</span>
            </motion.button>
          </motion.div>

          {/* --- RIGHT: VISUAL GRID WITH CENTER VIDEO BUTTON --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative aspect-square max-w-[600px] mx-auto"
          >
            {/* The Grid Container */}
            <div className="grid grid-cols-2 gap-4 h-full w-full p-4 relative">
              
              {/* Images */}
              {images.map((img, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl group h-full">
                  <img 
                    src={img} 
                    alt="Gallery" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}

              {/* CENTER CIRCULAR VIDEO BUTTON */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.button
                  onClick={() => setIsVideoOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl z-10 group"
                >
                  {/* Ripple Effect */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white/30 rounded-full -z-10"
                  />
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl ml-1">▶</span>
                  </div>
                </motion.button>
                
                {/* Decorative Ring Text */}
                <div className="absolute inset-0 w-[140%] h-[140%] -translate-x-[14%] -translate-y-[14%] border-2 border-dashed border-amber-500/30 rounded-full animate-spin-slow pointer-events-none"></div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <button 
                className="absolute top-4 right-4 text-white hover:text-amber-500 z-10 text-xl"
                onClick={() => setIsVideoOpen(false)}
              >
                ✕
              </button>
              {/* Replace with actual video URL */}
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Brand Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default WhyChooseUs;