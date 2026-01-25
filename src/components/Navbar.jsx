import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import logo from "../assets/logo.png"

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Menu", path: "/menu" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const navRef = useRef(null);

  // Animate navbar background based on scroll
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.9]);
  const navBlur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(10px)"]);
  const navHeight = useTransform(scrollYProgress, [0, 0.05], ["5rem", "4rem"]);
  const navShadow = useTransform(
    scrollYProgress, 
    [0, 0.05], 
    ["0 4px 20px rgba(0,0,0,0)", "0 10px 40px rgba(0,0,0,0.5)"]
  );

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active link based on current route
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Animation variants
  const logoVariants = {
    initial: { scale: 0.8, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          repeat: 1,
          repeatType: "reverse"
        },
        scale: { duration: 0.2 }
      }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      color: "#ffffff",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 15px 30px rgba(234, 179, 8, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 w-full z-50"
        style={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
          backdropFilter: navBlur,
          height: navHeight,
          boxShadow: navShadow
        }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center h-full relative">
          
          {/* --- LEFT SIDE: ENHANCED LOGO --- */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="relative"
            >
              {/* Logo Container with Multiple Layers */}
              {/* Logo Container with Multiple Layers */}
{/* --- CLEAN LOGO ONLY (NO OVAL / NO BG / NO SHAPE) --- */}
<motion.img
  src={logo}
  alt="SK Caterings Logo"
  variants={logoVariants}
  initial="initial"
  animate="animate"
  whileHover="hover"
  className="w-20 h-20 md:w-24 md:h-24 object-contain"

/>


            </motion.div>
            
            {/* Enhanced Logo Text */}
            {/* <div className="flex flex-col relative overflow-hidden">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-serif text-white leading-none tracking-wide relative"
              >
                SK{" "}
                <motion.span 
                  className="text-yellow-500 italic inline-block"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(234, 179, 8, 0)",
                      "0 0 10px rgba(234, 179, 8, 0.5)",
                      "0 0 0px rgba(234, 179, 8, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Caterings
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500 to-transparent origin-left"
                />
              </motion.div>
              
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[0.6rem] text-gray-400 uppercase tracking-[0.3em] flex items-center gap-1"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-1 h-1 bg-yellow-500 rounded-full"
                />
                Royal Dining
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  className="inline-block w-1 h-1 bg-yellow-500 rounded-full"
                />
              </motion.span>
            </div> */}
          </Link>

          {/* --- CENTER: ENHANCED DESKTOP LINKS --- */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.title}
                custom={i}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onHoverStart={() => setHoveredLink(link.title)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative px-1"
              >
                <Link 
                  to={link.path}
                  className="relative text-sm uppercase tracking-widest text-gray-300 py-2 px-4 block"
                >
                  <motion.span
                    animate={{
                      color: activeLink === link.path ? "#fbbf24" : "#d1d5db",
                      scale: activeLink === link.path ? 1.05 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.title}
                  </motion.span>
                  
                  
                  
                  {/* Hover Background */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: hoveredLink === link.title ? 0.1 : 0,
                      scale: hoveredLink === link.title ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-yellow-500 rounded-lg -z-10"
                  />
                  
                  {/* Active Indicator */}
                  {activeLink === link.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -top-2 right-2 w-1 h-1 bg-yellow-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* --- RIGHT SIDE: ENHANCED ORDER CTA & MOBILE TOGGLE --- */}
          <div className="flex items-center gap-4">
            
            {/* Enhanced Order Button */}
            <Link to="/orders" className="hidden md:block">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="relative px-8 py-2.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600 text-white text-xs font-bold uppercase tracking-widest rounded-full overflow-hidden shadow-lg group"
              >
                {/* Button Background Animation */}
                <motion.div
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 bg-[size:200%_100%]"
                />
                
                {/* Shine Effect */}
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                
                <span className="relative z-10 flex items-center gap-2">
                  Order
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
                
                {/* Particle Effect */}
                <AnimatePresence>
                  {hoveredLink === "order" && (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 0.7, 0],
                            x: Math.cos((i / 4) * Math.PI * 2) * 40,
                            y: Math.sin((i / 4) * Math.PI * 2) * 40
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.8, 
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>

            {/* Enhanced Hamburger Menu (Mobile) */}
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none z-50 relative w-10 h-10 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-8 h-8 relative">
                {/* Animated Circles */}
                <motion.div
                  animate={{ 
                    scale: isMobileMenuOpen ? [1, 1.2, 1] : 1,
                    opacity: isMobileMenuOpen ? 0 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-full border-2 border-yellow-500/50"
                />
                
                {/* Hamburger Lines */}
                <div className="relative w-full h-full">
                  <motion.span 
                    animate={{ 
                      rotate: isMobileMenuOpen ? 45 : 0, 
                      y: isMobileMenuOpen ? 6 : 0,
                      width: isMobileMenuOpen ? "100%" : "100%"
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1 left-0 w-full h-0.5 bg-yellow-500 rounded-full origin-center"
                  />
                  <motion.span 
                    animate={{ 
                      opacity: isMobileMenuOpen ? 0 : 1,
                      scale: isMobileMenuOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-3.5 left-0 w-3/4 h-0.5 bg-white rounded-full"
                  />
                  <motion.span 
                    animate={{ 
                      rotate: isMobileMenuOpen ? -45 : 0, 
                      y: isMobileMenuOpen ? -6 : 0,
                      width: isMobileMenuOpen ? "100%" : "2/3"
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-1 left-0 w-2/3 h-0.5 bg-yellow-500 rounded-full origin-center"
                  />
                </div>
              </div>
            </motion.button>
          </div>
        </div>

       
      </motion.nav>

      {/* --- ENHANCED MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-hidden"
          >
            {/* Background Layers */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
            />
            
            {/* Animated Background Texture */}
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:200px_200px] pointer-events-none"
            />
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, y: 0, x: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    y: [-100, 100],
                    x: Math.sin(i) * 100,
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "linear"
                  }}
                  className="absolute text-2xl text-yellow-500/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </div>

            {/* Menu Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-8 p-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden"
                >
                  <Link
                    to={link.path}
                    className="text-4xl md:text-5xl font-serif text-white hover:text-yellow-500 transition-colors relative inline-block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.span
                      animate={{
                        color: activeLink === link.path ? "#fbbf24" : "#ffffff"
                      }}
                      className="relative z-10"
                    >
                      {link.title}
                    </motion.span>
                    
                    {/* Animated Underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500 to-transparent origin-left"
                    />
                    
                    {/* Active Indicator */}
                    {activeLink === link.path && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-12"
              >
                <Link 
                  to="/orders" 
                  className="relative px-12 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-bold uppercase tracking-widest text-lg rounded-full overflow-hidden shadow-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Button Shine */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    Order Now
                    <motion.span
                      animate={{ 
                        x: [0, 5, 0],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↗
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white text-2xl p-3 z-50"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;