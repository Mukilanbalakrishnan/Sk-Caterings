import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- ASSETS ---
// Swapped for a professional "Founder" style portrait
const founderImage = "/assets/Founder_Pic.png";



// --- REUSABLE COMPONENTS ---

// 1. Animated Constellation Badge
const ConstellationBadge = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="absolute -top-10 -left-10 w-40 h-40 md:w-48 md:h-48 z-30 flex items-center justify-center"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Animated Circle */}
        <motion.circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="0.5"
          strokeDasharray="5,5"
          initial={{ strokeDashoffset: 100, rotate: 0 }}
          animate={{ strokeDashoffset: 0, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="opacity-50"
        />

        {/* Text Path */}
        <path id="circlePath" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none" />
        <text className="font-serif text-[8px] uppercase tracking-[0.3em]">
          <textPath href="#circlePath" startOffset="0%" fill="url(#textGradient)">
            <motion.animate
              attributeName="startOffset"
              from="0%"
              to="100%"
              dur="30s"
              repeatCount="indefinite"
            />
            ★ INNOVATION & VISION ★ EST. 2015 ★
          </textPath>
        </text>
      </svg>

      {/* Constellation Points */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.2 }}
          className="absolute w-1 h-1 bg-gradient-to-r from-amber-300 to-orange-500 rounded-full"
          style={{
            left: `${50 + 35 * Math.cos((angle * Math.PI) / 180)}%`,
            top: `${50 + 35 * Math.sin((angle * Math.PI) / 180)}%`
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="absolute inset-0 rounded-full bg-amber-300/30"
          />
        </motion.div>
      ))}

      {/* Central Ember */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(249, 115, 22, 0.5)",
            "0 0 40px rgba(249, 115, 22, 0.8)",
            "0 0 20px rgba(249, 115, 22, 0.5)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-6 h-6 bg-gradient-to-br from-amber-300 via-orange-500 to-orange-600 rounded-full shadow-2xl"
      >
        <div className="absolute inset-0 rounded-full border border-amber-300/50" />
      </motion.div>
    </motion.div>
  );
};

const FounderSection = () => {
  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 md:py-32 bg-gradient-to-br from-[#0f0a0a] via-[#1a0f0f] to-[#0f0a0a] overflow-hidden">

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-gradient-to-r from-amber-300 to-orange-500 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: 0,
            }}
            animate={{
              y: [null, '-20px', '0px'],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-amber-400/3 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-amber-500/5 to-orange-500/3 blur-[100px] rounded-full"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 max-w-7xl mx-auto">


          {/* LEFT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2 relative z-20"
          >
            <motion.div variants={itemVariants} className="mb-12">
              <motion.h4
                whileHover={{ scale: 1.05 }}
                className="inline-block font-mono text-amber-300 text-lg mb-4 tracking-[0.5em] bg-gradient-to-r from-amber-900/20 to-orange-900/20 px-6 py-2 rounded-full backdrop-blur-sm border border-amber-700/30"
              >
                ✦ FOUNDER & CEO ✦
              </motion.h4>

              <div className="relative">
                <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
                  {"Meet The".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.3 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <br />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-500 to-orange-600"
                  >
                    Visionary
                  </motion.span>
                </h2>

                {/* Animated Underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent overflow-hidden"
                />
              </div>
            </motion.div>

            {/* Vision Text Block */}
            <motion.div
              variants={itemVariants}
              className="mt-8 max-w-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                For us, building SK Caterings is not just about business — it is about love for food,
                respect for people, and years of hard work. Every step of this journey has been guided by
                honesty, dedication, and a deep understanding of what makes an event special.
                <br /><br />
                We believe good food creates memories and brings people together —
                <span className="text-orange-400 font-medium"> உணவு என்பது உறவு (Food is a bond)</span>.
                With this belief, we continue to serve every client with care, consistency, and pride,
                shaping a future rooted in tradition and trust.
              </p>

            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >

            {/* Constellation Badge */}
            <ConstellationBadge />

            {/* Main Image Container */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" }}
              className="relative w-full h-[500px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-70" />

              {/* Animated Image */}
              <motion.img
                src={founderImage}
                alt="Founder Portrait"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                style={{ filter: "grayscale(20%)" }}
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-white text-3xl font-serif mb-2">Govindarajalu P.</h3>
                  <p className="text-amber-300 text-lg mb-2">Founder & CEO</p>
                  <p className="text-gray-300 text-sm">
                    25+ years of industry leadership
                  </p>
                </motion.div>
              </div>

              {/* Animated Glow */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 z-5 bg-gradient-to-tr from-amber-500/10 via-transparent to-orange-500/5"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0f0a0a] to-transparent pointer-events-none" />
    </section>
  );
};

export default FounderSection;