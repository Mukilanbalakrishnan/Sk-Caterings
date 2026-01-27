import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
const chefImage = "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80";
const spiceCinnamon = "https://cdn.britannica.com/07/123107-050-1520881F/bark-Cinnamomum-cassia-plant-spice.jpg";
const spiceAnise = "https://media.istockphoto.com/id/137916436/photo/anise-stars.jpg?s=612x612&w=0&k=20&c=xMpki9OcvKiAyelWcQKEEoVANs7oDGTUb5WfuADGyRs=";
const spiceBasil = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWDXOAJ55Lo2uEJikc4mLgZK573LrWz2dNwQ&s";
const spicePepper = "https://images.jdmagicbox.com/quickquotes/images_main/spice-pepper-2018724463-1k9um09i.jpg";

// --- ANIMATION VARIANTS ---
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

const floatingVariants = {
  initial: { y: 0, rotate: 0 },
  animate: (delay = 0) => ({
    y: [-15, 15, -15],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }
  })
};

const pulseGlowVariants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const textGlowVariants = {
  initial: { textShadow: "0 0 0px rgba(249, 115, 22, 0)" },
  animate: {
    textShadow: [
      "0 0 0px rgba(249, 115, 22, 0)",
      "0 0 20px rgba(249, 115, 22, 0.5)",
      "0 0 0px rgba(249, 115, 22, 0)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// --- REUSABLE COMPONENTS ---

// 1. Enhanced Interactive Rotating Constellation Badge
const ConstellationBadge = ({ onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      onMouseEnter={() => { setIsHovered(true); onHover?.() }}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1,
        rotate: isHovered ? 0 : 360,
        transition: {
          rotate: { 
            duration: isHovered ? 0 : 30, 
            ease: "linear", 
            repeat: Infinity 
          },
          scale: { 
            duration: 0.8,
            type: "spring",
            stiffness: 200
          }
        }
      }}
      className="absolute -top-10 -left-10 w-40 h-40 md:w-48 md:h-48 z-30 flex items-center justify-center cursor-pointer"
    >
      {/* Animated Outer Ring */}
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible"
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Pulsing Circle */}
        <motion.circle 
          cx="50" cy="50" r="42" 
          fill="none" 
          stroke="url(#gradient)" 
          strokeWidth="0.5" 
          strokeDasharray="5,5"
          animate={{
            strokeDashoffset: [0, 20],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <text className="font-serif text-[8px] uppercase tracking-[0.3em] fill-orange-500/70">
          <textPath href="#circlePath" startOffset="0%">
            {isHovered ? "★ EST. 2015 ★" : "★ CULINARY EXCELLENCE ★"}
          </textPath>
        </text>
      </motion.svg>
      
      {/* Animated Constellation Points */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.7,
            x: isHovered ? [
              0,
              Math.cos((angle * Math.PI) / 180) * 5,
              0
            ] : 0,
            y: isHovered ? [
              0,
              Math.sin((angle * Math.PI) / 180) * 5,
              0
            ] : 0
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-orange-500 rounded-full"
          style={{
            left: `${50 + 35 * Math.cos((angle * Math.PI) / 180)}%`,
            top: `${50 + 35 * Math.sin((angle * Math.PI) / 180)}%`
          }}
        />
      ))}
      
      {/* Central Ember with Enhanced Glow */}
      <motion.div
        variants={pulseGlowVariants}
        initial="initial"
        animate="animate"
        className="absolute w-6 h-6 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-2xl"
      >
        {/* Inner Pulse */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="absolute inset-0 rounded-full border border-orange-300/50"
        />
      </motion.div>
    </motion.div>
  );
};

// 2. Enhanced Interactive Floating Spice
const FloatingSpice = ({ src, className, trail = false, onClick, spiceType }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const spiceEffects = {
    cinnamon: { color: "#92400E", scale: 1.4 },
    anise: { color: "#7C2D12", scale: 1.3 },
    basil: { color: "#065F46", scale: 1.2 },
    pepper: { color: "#1F2937", scale: 1.3 }
  };
  
  const effect = spiceEffects[spiceType] || { color: "#f97316", scale: 1.3 };

  return (
    <>
      <motion.div
        className={`absolute object-cover shadow-2xl cursor-pointer ${className}`}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
          scale: isClicked ? effect.scale : 1
        }}
        whileHover={{ 
          scale: effect.scale,
          rotate: 45,
          transition: { type: "spring", stiffness: 200 }
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsClicked(true);
          onClick?.();
          setTimeout(() => setIsClicked(false), 300);
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ 
          y: { 
            duration: 4 + Math.random() * 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          },
          rotate: { 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }
        }}
        style={{
          filter: "brightness(0.9) contrast(1.2)"
        }}
      >
        <img 
          src={src} 
          alt="spice" 
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Hover Glow */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.3, scale: 1.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: effect.color }}
          />
        )}
      </motion.div>
      
      {/* Trail Effect with Particles */}
      {trail && (
        <AnimatePresence>
          {isClicked && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute ${className} border-2 rounded-lg pointer-events-none`}
                style={{ borderColor: `${effect.color}30` }}
              />
              
              {/* Particle Explosion */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [1, 0.5, 0],
                    x: Math.cos((i / 8) * Math.PI * 2) * 50,
                    y: Math.sin((i / 8) * Math.PI * 2) * 50
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="absolute w-2 h-2 rounded-full pointer-events-none"
                  style={{ backgroundColor: effect.color }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

const FounderSection = () => {
  const [activeQuote, setActiveQuote] = useState(0);
  const [badgeHovered, setBadgeHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // ✅ ADDED: State to explicitly track if the chef image is hovered
  const [isChefHovered, setIsChefHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

React.useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

  
  const quotes = [
    "Cooking is not just about ingredients; it is about the soul you put into it.",
    "I started this journey to bring authentic flavors of my heritage to your plate.",
    "Every dish tells a story of tradition blended with modern elegance.",
    "The secret ingredient is always love and dedication."
  ];
  
  const achievements = [
    { year: "2015", title: "Started Journey", desc: "Opened first kitchen" },
    { year: "2018", title: "First Award", desc: "Best New Restaurant" },
    { year: "2020", title: "Expansion", desc: "3 new locations" },
    { year: "2023", title: "Excellence", desc: "5-star rating nationwide" }
  ];

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full min-h-screen py-20 md:py-32 bg-gradient-to-br from-[#1c0505] via-[#2b0a0a] to-[#120303] overflow-hidden"
    >
      
      {/* --- ENHANCED DYNAMIC BACKGROUND --- */}
      
      {/* Animated Mesh Gradient with Movement */}
      <motion.div 
       animate={isMobile ? { opacity: 0.25 } : { 
  backgroundPosition: ["0% 0%", "100% 100%"],
  opacity: [0.2, 0.4, 0.2]
}}
transition={isMobile ? {} : { duration: 15, repeat: Infinity }}

        className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-red-900/10 to-orange-900/10 bg-[size:400%_400%]"
      />
      
      {/* Enhanced Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingVariants}
            animate={isMobile ? false : "animate"}

            className="absolute w-[1px] h-[1px] bg-orange-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${5 + Math.random() * 5}px ${2 + Math.random() * 2}px rgba(249, 115, 22, 0.3)`
            }}
          />
        ))}
      </div>
      
      {/* Animated Heat Waves from Chef Image */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
      >
        {[1, 1.5, 2, 2.5].map((scale, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [scale, scale * 1.2, scale],
              opacity: [0, 0.1, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full border border-orange-500/10"
          />
        ))}
      </motion.div>

      {/* Interactive Glow Orbs with Trail */}
      <motion.div 
        drag
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        dragElastic={0.1}
        animate={{ 
          x: [0, 40, 0, -40, 0],
          y: [0, -40, 0, 40, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/5 blur-[100px] rounded-full cursor-move z-0"
      >
        {/* Orb Trail */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0) 70%)" }}
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">

          {/* ========================================= */}
          {/* === ENHANCED LEFT COLUMN === */}
          {/* ========================================= */}
          <motion.div 
            className="w-full lg:w-1/2 relative z-20"
            variants={containerVariants}
          >
            
            {/* Animated Title Sequence with Stagger */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-12"
            >
              <motion.h4
                variants={textGlowVariants}
                initial="initial"
                animate={isMobile ? false : "animate"}

                className="font-mono text-orange-500 text-lg mb-4 tracking-[0.5em]"
              >
                ✦ MASTER CHEF ✦
              </motion.h4>
              
              <div className="relative">
                <h2 className="font-serif text-5xl md:text-7xl text-white mb-4 leading-tight">
                  Meet The <br />
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-amber-700"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Visionary
                  </motion.span>
                </h2>
                
                {/* Animated Underline with Particles */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "200px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  className="h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent relative overflow-hidden"
                >
                  {/* Moving Sparkle */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Interactive Quote Card */}
            {/* Simple Vision Text Block */}
{/* Simple Vision Text Block */}
<motion.div
  initial={isMobile ? false : { opacity: 0, y: 20 }}
  whileInView={isMobile ? false : { opacity: 1, y: 0 }}
  viewport={isMobile ? undefined : { once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="mt-6 max-w-xl"
>
  <p className="text-gray-300 text-lg leading-relaxed">
    Cooking is not just about ingredients — it’s about passion, purpose, and soul.  
    Every dish carries a story of tradition and craftsmanship.  
    We believe food is an emotion, not just a meal.  
    Our journey is driven by authenticity, creativity, and love for the art.
  </p>
</motion.div>


          </motion.div>

          {/* ========================================= */}
          {/* === ENHANCED RIGHT COLUMN === */}
          {/* ========================================= */}
          <div className="w-full lg:w-1/2 relative">
            
            {/* Interactive Badge */}
            <ConstellationBadge onHover={() => setBadgeHovered(true)} />
            
            {/* Enhanced Main Image with Parallax Effect */}
            <motion.div 
              initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              
              // ✅ ADDED: React event listeners to track the hover state
              onMouseEnter={() => setIsChefHovered(true)}
              onMouseLeave={() => setIsChefHovered(false)}
              
              onMouseMove={(e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = (clientX - left) / width;
                const y = (clientY - top) / height;
                
                e.currentTarget.style.setProperty('--mouse-x', `${x * 100}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y * 100}%`);
              }}
              className="relative w-full h-[500px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                '--mouse-x': '50%',
                '--mouse-y': '50%'
              }}
            >
              {/* Dynamic Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"
                animate={{
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Interactive Light Effect */}
              <motion.div 
                className="absolute inset-0 z-5 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.1) 0%, transparent 50%)`
                }}
              />
              
              <motion.img 
                src={chefImage} 
                alt="Founder Chef"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                initial={{ scale: 1.1 }}
                animate={{ 
                  scale: imageLoaded ? 1 : 1.1,
                  filter: imageLoaded ? "grayscale(30%)" : "grayscale(100%) blur(10px)"
                }}
                onLoad={() => setImageLoaded(true)}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              {/* ✅ UPDATED: The text overlay now listens to the React state */}
              {/* Added pointer-events-none so the text doesn't interfere with the mouse leave detection */}
              <motion.div
                animate={{ opacity: isChefHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex items-end p-8 pointer-events-none"
              >
                {/* The text content slides up and fades in based on state */}
                <motion.div
                  animate={{ 
                    y: isChefHovered ? 0 : 20, 
                    opacity: isChefHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: isChefHovered ? 0.1 : 0, ease: "easeOut" }}
                >
                  <h3 className="text-white text-2xl font-serif mb-2">Chef Sebastian K.</h3>
                  <p className="text-orange-300">Founder & Master Chef</p>
                  <motion.p 
                    className="text-gray-400 text-sm mt-2"
                    animate={{
                      color: ["#9CA3AF", "#FBBF24", "#9CA3AF"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    25+ years of culinary excellence
                  </motion.p>
                </motion.div>
              </motion.div>
              
              {/* Floating Interactive Elements */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                {/* Enhanced Interactive Heat Waves */}
                <motion.div
                  animate={{ 
                    opacity: [0, 0.4, 0],
                    scale: [1, 1.5, 2],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-lg"
                />
              </div>
            </motion.div>

            {/* Enhanced Interactive Spices Garden */}
            <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-64 h-64 z-40">
              <FloatingSpice 
                src={spiceCinnamon} 
                className="w-24 h-24 bottom-0 left-0"
                trail={true}
                spiceType="cinnamon"
                onClick={() => alert("Cinnamon - The heart of our spice blend!")}
              />
              <FloatingSpice 
                src={spiceAnise} 
                className="w-16 h-16 top-10 right-10"
                spiceType="anise"
                onClick={() => alert("Star Anise - For that special aroma!")}
              />
              <FloatingSpice 
                src={spiceBasil} 
                className="w-20 h-20 top-0 left-1/2"
                spiceType="basil"
                onClick={() => alert("Fresh Basil - Always hand-picked!")}
              />
              <FloatingSpice 
                src={spicePepper} 
                className="w-18 h-18 bottom-20 right-0"
                spiceType="pepper"
                onClick={() => alert("Black Pepper - Freshly ground daily!")}
              />
            </div>

            {/* Enhanced Animated Signature */}
            <motion.div
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              className="absolute -bottom-4 right-8 z-50"
            >
              <svg width="200" height="100" className="text-orange-500">
                <motion.path
                  d="M10,50 Q50,10 90,50 T170,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.text 
                  x="180" 
                  y="55" 
                  className="font-script text-lg fill-current"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  Sebastian
                </motion.text>
              </svg>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Button removed from here */}
    </motion.section>
  );
};

export default FounderSection;