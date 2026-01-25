import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useAnimation } from 'framer-motion';

const BananaLeafScrollButton = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [showButton, setShowButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const controls = useAnimation();
  
  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 1,
    restDelta: 0.001
  });

  // --- COORDINATE MAPPING (LARGE VALUES FOR "OFF-SCREEN" EFFECT) ---
  // We use large negative/positive values to make items start far away

  // 1. SWEET: Flies in from Top-Left of the screen
  const sweetOpacity = useTransform(smoothProgress, [0.05, 0.15], [0, 1]);
  const sweetScale = useTransform(smoothProgress, [0.05, 0.15], [0.5, 1]);
  const sweetX = useTransform(smoothProgress, [0.05, 0.15], [-800, 0]); // Starts 800px left
  const sweetY = useTransform(smoothProgress, [0.05, 0.15], [-800, 0]); // Starts 800px up
  const sweetRotate = useTransform(smoothProgress, [0.05, 0.15], [-180, 0]);

  // 2. SIDES: Fly in from Top-Right of the screen
  const sideOpacity = useTransform(smoothProgress, [0.20, 0.35], [0, 1]);
  const sideX = useTransform(smoothProgress, [0.20, 0.35], [800, 0]); // Starts 800px right
  const sideY = useTransform(smoothProgress, [0.20, 0.35], [-600, 0]); // Starts 600px up
  const sideScale = useTransform(smoothProgress, [0.20, 0.35], [2, 1]); // Shrinks as it lands

  // 3. RICE: Drops from Top Center of the screen
  const riceOpacity = useTransform(smoothProgress, [0.40, 0.55], [0, 1]);
  const riceScale = useTransform(smoothProgress, [0.40, 0.55], [3, 1]); // Big splash
  const riceY = useTransform(smoothProgress, [0.40, 0.55], [-1000, 0]); // Drops from top of screen

  // 4. SAMBAR: Pours down
  const sambarOpacity = useTransform(smoothProgress, [0.60, 0.75], [0, 1]);
  const sambarScaleY = useTransform(smoothProgress, [0.60, 0.75], [0, 1]);
  const sambarY = useTransform(smoothProgress, [0.60, 0.75], [-50, 0]); // Just a local pour

  // 5. PAPADUM: Slides/Spins from Bottom-Right of the screen
  const papadumOpacity = useTransform(smoothProgress, [0.80, 0.95], [0, 1]);
  const papadumX = useTransform(smoothProgress, [0.80, 0.95], [600, 0]); // From far right
  const papadumY = useTransform(smoothProgress, [0.80, 0.95], [600, 0]); // From far bottom
  const papadumRotate = useTransform(smoothProgress, [0.80, 0.95], [360, 0]); // Rolling in

  // Progress Ring
  const progressPathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Show/Hide Logic
  useEffect(() => {
    const unsubscribeY = scrollY.onChange((latest) => {
      setShowButton(latest > 100);
    });
    return () => unsubscribeY();
  }, [scrollY]);

  // Hover Animation
  useEffect(() => {
    if (isHovered) {
      controls.start({ scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 400 } });
    } else {
      controls.start({ scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300 } });
    }
  }, [isHovered, controls]);

  const scrollToTop = () => {
    setIsActive(true);
    controls.start({ scale: 0.8, rotate: -10, transition: { duration: 0.2 } }).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        controls.start({ scale: 1, rotate: 0 });
        setIsActive(false);
      }, 500);
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          className="fixed bottom-6 right-1 z-[9999] pointer-events-auto"
        >
          {/* IMPORTANT: Button container needs overflow-visible so items can be seen outside */}
          <motion.button
            onClick={scrollToTop}
            animate={controls}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            disabled={isActive}
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[3px] border-yellow-600/30 shadow-[0_0_30px_rgba(0,0,0,0.7)] flex items-center justify-center transition-all duration-300 hover:border-yellow-400/50 hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] active:scale-95 disabled:opacity-50 overflow-visible"
          >
            {/* Tooltip */}
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? -60 : 5
              }}
              className="absolute left-1/2 -translate-x-1/2 bg-black/90 text-yellow-400 text-xs px-3 py-1 rounded whitespace-nowrap pointer-events-none border border-yellow-600/30"
            >
              Go Top
            </motion.span>

            {/* --- SVG CANVAS (Overflow Visible is Key Here) --- */}
            <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 relative z-10 overflow-visible">
              
              <defs>
                <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#14532d" />
                </linearGradient>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                  <feOffset dx="2" dy="2" result="offsetblur" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. BASE: Banana Leaf (Stays on button) */}
              <motion.path
                d="M5,50 Q10,15 50,15 Q90,15 95,50 Q90,85 50,85 Q10,85 5,50"
                fill="url(#leafGrad)"
                stroke="#166534"
                strokeWidth="0.8"
                filter="url(#dropShadow)"
              />
              <path d="M5,50 L95,50" stroke="#166534" strokeWidth="0.5" opacity="0.4" />

              {/* 2. FLYING ITEMS (Note: They animate from large X/Y coordinates) */}

              {/* SWEET (From Top Left Page) */}
              <motion.g
                filter="url(#dropShadow)"
                style={{ 
                  opacity: sweetOpacity, 
                  scale: sweetScale,
                  x: sweetX,
                  y: sweetY,
                  rotate: sweetRotate
                }}
              >
                <circle cx="25" cy="35" r="5" fill="#fbbf24" />
              </motion.g>

              {/* SIDES (From Top Right Page) */}
              <motion.g 
                filter="url(#dropShadow)"
                style={{ 
                  opacity: sideOpacity, 
                  x: sideX,
                  y: sideY,
                  scale: sideScale
                }}
              >
                <circle cx="65" cy="30" r="4" fill="#86efac" />
                <circle cx="75" cy="35" r="4" fill="#fca5a5" />
              </motion.g>

              {/* RICE (From Top Page Center) */}
              <motion.g 
                filter="url(#dropShadow)"
                style={{ 
                  opacity: riceOpacity, 
                  scale: riceScale,
                  y: riceY
                }}
              >
                <circle cx="50" cy="55" r="14" fill="#f8fafc" />
              </motion.g>

              {/* SAMBAR (Pours Down Locally) */}
              <motion.path
                d="M42,52 Q50,42 58,52 Q60,62 50,65 Q40,62 42,52"
                fill="#ea580c"
                style={{ 
                  opacity: sambarOpacity, 
                  scaleY: sambarScaleY,
                  y: sambarY,
                  originY: 0
                }}
              />

              {/* PAPADUM (From Bottom Right Page) */}
              <motion.circle
                cx="80" cy="60" r="8"
                fill="#fef08a"
                stroke="#eab308"
                strokeWidth="1"
                strokeDasharray="3,2"
                filter="url(#dropShadow)"
                style={{ 
                  opacity: papadumOpacity, 
                  x: papadumX,
                  y: papadumY,
                  rotate: papadumRotate
                }}
              />

            </svg>

            {/* Circular Progress Stroke */}
            <svg className="absolute inset-0 w-full h-full rotate-[-90deg] pointer-events-none">
              <motion.circle
                cx="50%"
                cy="50%"
                r="46%"
                stroke="url(#progressGrad)" 
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
                style={{
                  pathLength: progressPathLength,
                  opacity: 0.8
                }}
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BananaLeafScrollButton;