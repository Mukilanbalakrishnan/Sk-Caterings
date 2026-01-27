import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- IMAGES ---
const chefImage = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80";

const AboutSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      scale: 0.9,
      rotate: -5
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const geometricVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        type: "spring",
        stiffness: 150
      }
    },
    hover: {
      scale: 1.1,
      rotate: 45,
      transition: {
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 0.3 }
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      // Ensure background is solid enough for text readability
      className="relative w-full py-20 md:py-32 bg-gradient-to-br from-white via-orange-50 to-white overflow-hidden flex items-center justify-center text-black"
    >
      
      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Food Icons */}
        {["🍽️", "👨‍🍳", "🔥", "🌟"].map((icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
              opacity: [0, 0.1, 0]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
            className="absolute text-4xl text-orange-300"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`
            }}
          >
            {icon}
          </motion.div>
        ))}
        
        {/* Animated Gradient Orbs */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * (i % 2 ? 1 : -1), 0],
              y: [0, 50 * (i % 2 ? -1 : 1), 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            className="absolute w-96 h-96 rounded-full blur-[120px] opacity-10"
            style={{ 
              backgroundColor: i === 1 ? "#F97316" : i === 2 ? "#FB923C" : "#FDBA74" 
            }}
          />
        ))}
      </div>

      {/* Enhanced Right Side Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[30%] h-[80%] bg-gradient-to-l from-orange-100/60 to-orange-50/40 rounded-l-full pointer-events-none"
      >
        {/* Animated Inner Gradient */}
        <motion.div
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-amber-100/20 rounded-l-full"
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

          {/* ========================================= */}
          {/* === ENHANCED LEFT SIDE: IMAGE WITH GEOMETRY === */}
          {/* ========================================= */}
          <motion.div 
            variants={imageVariants}
            className="w-full md:w-1/2 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated Geometric Shape (Triangle/Corner) */}
            <motion.div 
              variants={geometricVariants}
              whileHover="hover"
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-600 to-amber-500 rounded-bl-[40px] z-0 shadow-2xl shadow-orange-600/30 overflow-hidden"
            >
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-[size:100px_100px]" />
              
              {/* Shine Effect */}
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-tr-lg" />
            </motion.div>
            
            {/* Animated Decorative Circle */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0]
              }}
              transition={{
                scale: { duration: 0.8, delay: 0.7 },
                rotate: { duration: 1, delay: 0.7 },
                y: { duration: 2, repeat: Infinity }
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-orange-500/20 rounded-full blur-xl z-0"
            />

            {/* Main Image Container with Enhanced Effects */}
            <motion.div 
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
              animate={{
                boxShadow: isHovered 
                  ? "0 30px 60px rgba(249, 115, 22, 0.2)" 
                  : "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Floating Particles on Hover */}
              {isHovered && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        scale: 0, 
                        x: "50%", 
                        y: "50%",
                        opacity: 0 
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [
                          "50%", 
                          `${20 + Math.random() * 60}%`,
                          `${20 + Math.random() * 60}%`
                        ],
                        y: [
                          "50%",
                          `${20 + Math.random() * 60}%`,
                          `${20 + Math.random() * 60}%`
                        ],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      className="absolute w-2 h-2 rounded-full bg-yellow-500"
                    />
                  ))}
                </div>
              )}

              {/* Image with Enhanced Loading Animation */}
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <motion.img 
                  src={chefImage} 
                  alt="About SK Caterings" 
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, filter: "grayscale(100%) blur(10px)" }}
                  animate={{ 
                    scale: imageLoaded ? (isHovered ? 1.08 : 1) : 1.1,
                    filter: imageLoaded ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(10px)"
                  }}
                  transition={{ duration: 1 }}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Animated Gradient Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-orange-900/10 pointer-events-none"
                  animate={{
                    background: isHovered 
                      ? "linear-gradient(to top right, rgba(0,0,0,0.4), transparent, rgba(249, 115, 22, 0.1))" 
                      : "linear-gradient(to top right, rgba(0,0,0,0.3), transparent, rgba(249, 115, 22, 0.05))"
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Animated Scan Lines */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "0% 100%"]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_4px] opacity-20"
                />
              </div>

              {/* Animated Border */}
              <motion.div
                animate={{
                  borderColor: isHovered ? "rgba(249, 115, 22, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  scale: isHovered ? 0.98 : 1
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 border-4 border-white/10 rounded-3xl pointer-events-none"
              />

              {/* Floating Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                />
                Master Chef
              </motion.div>
            </motion.div>

            {/* Decorative Corner Lines */}
            <div className="absolute top-4 right-4 w-12 h-12 z-20 pointer-events-none">
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-full h-full border-2 border-orange-500/30 rounded-tr-xl rounded-bl-xl"
              />
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* === ENHANCED RIGHT SIDE: CONTENT === */}
          {/* ========================================= */}
          <motion.div 
            variants={contentVariants}
            className="w-full md:w-1/2 text-left relative z-20"
          >
            {/* Animated Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="w-2 h-2 bg-orange-600 rounded-full"
              />
              <motion.h4 
                className="text-orange-600 font-bold uppercase tracking-[0.2em] text-sm"
                animate={{
                  letterSpacing: ["0.2em", "0.3em", "0.2em"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Our Story
              </motion.h4>
            </motion.div>

            {/* Enhanced Main Heading - FORCE DARK TEXT */}
            <motion.h2 
              className="text-4xl md:text-5xl font-serif text-black mb-6 leading-tight" // Force text-black
            >
              {"About ".split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-700 inline-block ml-2"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                SK Caterings
              </motion.span>
            </motion.h2>

            {/* Animated Underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-32 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full mb-8"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-full bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </motion.div>

            {/* Animated Paragraphs - FORCE DARK TEXT */}
            <motion.div className="space-y-6 mb-10">
              {[
                "At SK Caterings, we understand that food is more than just sustenance; it is an experience. Since ",
                "2015",
                "we have been crafting culinary masterpieces that blend traditional heritage with modern elegance."
              ].map((part, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className="text-gray-900 text-lg leading-relaxed font-normal" // Darker gray, normal weight
                >
                  {i === 1 ? (
                    <motion.span 
                      className="font-bold text-black px-1 bg-gradient-to-r from-orange-100 to-amber-50 rounded border border-orange-200"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(249, 115, 22, 0.1)"
                      }}
                    >
                      {part}
                    </motion.span>
                  ) : (
                    part
                  )}
                </motion.p>
              ))}
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-gray-800 text-lg leading-relaxed font-normal" // Dark gray
              >
                We are not just a typical catering company. Our approach is consultative, ensuring that 
                every menu is tailored to the unique soul of your event. From sourcing the freshest local 
                ingredients to the final artistic plating, we solve the equation of a perfect event.
              </motion.p>
            </motion.div>

            {/* Enhanced Buttons Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-6"
            >
              {/* Primary Button */}
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg overflow-hidden group"
              >
                <motion.div
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-[size:200%_100%]"
                />
                
                <motion.span
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                
                <span className="relative z-10 flex items-center gap-2">
                  Learn More
                  <motion.span
                    animate={{ 
                      x: [0, 5, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              {/* Secondary Button */}
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#FFF7ED",
                  borderColor: "#FDBA74"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-transparent border-2 border-orange-200 text-orange-700 font-semibold rounded-full overflow-hidden group"
              >
                <motion.span
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/30 to-transparent"
                />
                
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↗
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
              className="mt-12 pt-8 border-t border-gray-300" // Visible border
            >
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "500+", label: "Events" },
                  { value: "8", label: "Years" },
                  { value: "25+", label: "Awards" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <motion.div 
                      className="text-2xl font-bold text-orange-600 mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;