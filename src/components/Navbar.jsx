import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import logo from "../../public/assets/logo.png";
import base from "../../public/assets/base.png";
import EnquiryModal from './EnquiryModal';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Menu", path: "/menu" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const navRef = useRef(null);


  // Scroll Animations
  const navBlur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(10px)"]);
  const navHeight = useTransform(scrollYProgress, [0, 0.05], ["7rem", "6rem"]);
  const navShadow = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["0 4px 20px rgba(0,0,0,0)", "0 10px 40px rgba(0,0,0,0.5)"]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Variants
  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" } }),
    hover: { scale: 1.05, color: "#ffffff", transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.3 } },
    hover: { scale: 1.1, boxShadow: "0 15px 30px rgba(234, 179, 8, 0.3)", transition: { type: "spring", stiffness: 400, damping: 10 } },
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
        <div className="container mx-auto px-6 md:px-12 flex flex-row justify-between items-center h-full relative">

          {/* --- LEFT SIDE: LOGO STACK --- */}
          <Link to="/" className="flex items-center gap-3 group relative h-full">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 112,
                height: 112,
                perspective: 1000 // Essential for 3D rotation
              }}
            >

              {/* 1. BASE LOGO (Static + Pulse Glow) */}
              <motion.img
                src={base}
                alt="Base Logo"
                className="absolute inset-0 m-auto w-[112px] h-[112px] object-contain opacity-80"

                animate={{
                  filter: [
                    "drop-shadow(0 0 5px rgba(251, 191, 36, 0.3))",
                    "drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))",
                    "drop-shadow(0 0 5px rgba(251, 191, 36, 0.3))"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* 2. TOP LOGO (Spins Left-to-Right / Y-Axis) */}
              <motion.img
                src={logo}
                alt="SK Caterings Logo"
                className="relative z-10 w-24 h-24 md:w-28 md:h-28 object-contain"
                animate={{
                  rotateY: [0, 90, 0],
                  filter: [
                    "drop-shadow(0 0 2px rgba(251,191,36,0.3))", // Dim state (Reduced from 6px/0.5)
                    "drop-shadow(0 0 8px rgba(251,191,36,0.8))", // Bright state (Reduced from 18px/0.9)
                  ]
                }}
                transition={{
                  rotateY: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  filter: {
                    duration: 0.5,         // Faster duration creates the "blink" speed
                    repeat: Infinity,
                    repeatType: "reverse", // Reverses back and forth (0 -> 1 -> 0)
                    ease: "easeInOut"
                  }
                }}
                style={{
                  backfaceVisibility: "visible",
                  translateY: -6
                }}
                whileHover={{
                  scale: 1.1,
                  filter: "drop-shadow(0 0 15px rgba(251,191,36,0.8))" // Slightly reduced hover glow too
                }}
              />

            </div>
          </Link>

          {/* --- CENTER: LINKS (Desktop Only) --- */}
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
                <Link to={link.path} className="relative text-sm uppercase tracking-widest text-gray-300 py-2 px-4 block">
                  <motion.span animate={{ color: activeLink === link.path ? "#fbbf24" : "#d1d5db", scale: activeLink === link.path ? 1.05 : 1 }} transition={{ duration: 0.2 }}>
                    {link.title}
                  </motion.span>
                  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: hoveredLink === link.title ? 0.1 : 0, scale: hoveredLink === link.title ? 1 : 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-yellow-500 rounded-lg -z-10" />
                  {activeLink === link.path && <motion.div layoutId="activeIndicator" className="absolute -top-2 right-2 w-1 h-1 bg-yellow-500 rounded-full" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.3 }} />}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* --- RIGHT SIDE: BUTTONS --- */}
          <div className="flex items-center gap-4">

            {/* Desktop Enquiry Button */}
            <div className="hidden md:block">
              <motion.button
                onClick={() => setIsEnquiryOpen(true)}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="relative px-8 py-2.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600 text-white text-xs font-bold uppercase tracking-widest rounded-full overflow-hidden shadow-lg group"
              >
                <motion.div animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 bg-[size:200%_100%]" />
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative z-10 flex items-center gap-2">
                  Enquiry
                  <motion.span animate={{ x: [0, 5, 0], rotate: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>✉️</motion.span>
                </span>
              </motion.button>
            </div>

            {/* Mobile Hamburger Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none z-50 relative w-10 h-10 flex items-center justify-center ml-auto"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-8 h-8 relative">
                <motion.div animate={{ scale: isMobileMenuOpen ? [1, 1.2, 1] : 1, opacity: isMobileMenuOpen ? 0 : 0.5 }} transition={{ duration: 0.3 }} className="absolute inset-0 rounded-full border-2 border-yellow-500/50" />
                <div className="relative w-full h-full">
                  <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }} transition={{ duration: 0.3 }} className="absolute top-1 left-0 w-full h-0.5 bg-yellow-500 rounded-full origin-center" />
                  <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} className="absolute top-3.5 left-0 w-3/4 h-0.5 bg-white rounded-full" />
                  <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0, width: isMobileMenuOpen ? "100%" : "2/3" }} transition={{ duration: 0.3 }} className="absolute bottom-1 left-0 w-2/3 h-0.5 bg-yellow-500 rounded-full origin-center" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE SIDEBAR MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[350px] bg-neutral-900 z-50 shadow-2xl md:hidden border-l border-white/10"
            >
              <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col p-8">
                <div className="flex justify-between items-center mb-12">
                  <span className="text-yellow-500 font-bold tracking-tighter text-xl">NAVIGATION</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white hover:text-yellow-500"
                  >
                    ✕
                  </button>
                </div>

                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={link.path}
                        className={`text-2xl font-medium transition-colors ${activeLink === link.path ? "text-yellow-500" : "text-white"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-auto pb-10"
                >
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsEnquiryOpen(true);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold uppercase tracking-widest rounded-xl shadow-lg"
                  >
                    Enquiry Now ✉️
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
};

export default Navbar;