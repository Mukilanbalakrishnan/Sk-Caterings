import React from 'react';
import { motion } from 'framer-motion';

// --- DATA ---
const footerLinks = {
  quickLinks: [
    { name: "Our Story", href: "/about" },
    { name: "Menus", href: "/menu" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" }
  ],
  customerService: [
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Booking Policy", href: "#" },
    { name: "Event Planning", href: "#" }
  ]
};

const socialIcons = [
  { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { name: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6z" },
  { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  { name: "YouTube", path: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27v6.54z" }
];

// --- ANIMATION VARIANTS ---
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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-20 pb-10 overflow-hidden">
      
      {/* Background Texture & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
        />
        {/* Soft Amber/Gold Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* COLUMN 1: BRAND INFO */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-2">
              {/* Metallic Gold Gradient Icon */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black shadow-lg shadow-amber-900/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-2xl font-serif text-white font-bold tracking-wide">
                SK Caterings
              </span>
            </div>
            
            <p className="text-zinc-500 text-sm leading-relaxed pr-4">
              Your destination for authentic flavors and a seamless dining experience. We bring the grandeur of traditional feasts to your modern celebrations.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialIcons.map((icon) => (
                <motion.a
                  key={icon.name}
                  href="#"
                  whileHover={{ y: -3, color: "#f59e0b" }}
                  className="text-zinc-600 transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d={icon.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* COLUMN 2: QUICK LINKS */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-white font-semibold tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a 
                    href={link.href}
                    className="text-zinc-500 text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: CUSTOMER SERVICE */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-white font-semibold tracking-wide">Customer Service</h3>
            <ul className="space-y-3">
              {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                  <motion.a 
                    href={link.href}
                    className="text-zinc-500 text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 4: STAY CONNECTED */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-white font-semibold tracking-wide">Stay Connected</h3>
            <p className="text-zinc-500 text-sm">
              Subscribe to our newsletter for exclusive recipes, offers and updates.
            </p>
            
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-zinc-900/80 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-md text-black hover:to-amber-400 transition-all shadow-lg shadow-amber-900/20"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="flex items-center gap-2 text-zinc-600 text-xs">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@skcaterings.com
              </div>
            </form>
          </motion.div>

        </div>

        {/* BOTTOM BAR */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600"
        >
          <div>
            © 2026 SK Caterings. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">Developed by : Echo Digital Works</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;