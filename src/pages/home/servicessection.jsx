import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from "react-router-dom";


// --- SERVICE DATA (5 Items) ---
// --- SERVICE DATA (5 Items) ---
const services = [
  {
  id: "01",
  title: "Royal Weddings",
  description: "We give good food for big weddings. We cook tasty dishes for all wedding functions.",
  image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
   iconImage: "/assets/icons/weddinicon.png"
},

{
  id: "02",
  title: "Big Office Parties",
  description: "We serve food for office meetings and company parties with clean and proper service.",
  image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  iconImage: "/assets/icons/office.png"
},

{
  id: "03",
  title: "Baby shower",
  description: "Baby Shower is a small celebration to wish a mother and her baby good health and happiness.",
  image: "https://m.media-amazon.com/images/I/71IC2lqIgdL._AC_UF1000,1000_QL80_.jpg",
  iconImage: "/assets/icons/baby.png"
},

{
  id: "04",
  title: "Birthday Parties",
  description: "We give food for small home parties like birthday and anniversary.",
  image: "https://cdn.cdnparenting.com/articles/2018/06/243588019-H-768x525.jpg",
  iconImage: "/assets/icons/birthday.png"
},

{
  id: "05",
  title: "Family & Small Functions",
  description: "We provide tasty and traditional food for family functions like pooja, anniversaries, and small gatherings.",
  image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80",
  iconImage: "/assets/icons/family.png"
},

// ----- NEW MODULES (VERY SIMPLE WORDS) -----

{
  id: "06",
  title: "Engagement",
  description: "We give simple and tasty food for engagement function.",
  image: "https://wallpapers.com/images/hd/traditional-beautiful-engagement-couple-ring-7o6kh4dv11dsf0dp.jpg",
  iconImage: "/assets/icons/engagement.png"
},

{
  id: "07",
  title: "Mehandhi / Sangeet / Haldi",
  description: "We serve snacks, sweets, and special food for these functions.",
  image: "https://i.pinimg.com/originals/59/ac/df/59acdf095cf95f73a00706feef5ad110.jpg",
  iconImage: "/assets/icons/mehandhi.png"
},

{
  id: "08",
  title: "Religious Ceremonies",
  description: "We cook clean and pure traditional food for temple and puja events.",
  image: "https://as1.ftcdn.net/v2/jpg/09/18/56/92/1000_F_918569254_c6HPa4lse9ggSM2wwjgoZfM00bdR2obq.jpg",
  iconImage: "/assets/icons/relegious.png"
},

{
  id: "09",
  title: "Alumni Meet / Retirement Party",
  description: "We provide good food for old students meet and retirement parties.",
  image: "https://news.temple.edu/sites/news/files/shutterstock_531382432-scaled_0.jpg",
  iconImage: "/assets/icons/alumini.png"
},

{
  id: "10",
  title: "House Warming",
  description: "We serve fresh and traditional food for new house opening.",
  image: "https://blog.photoadking.com/wp-content/uploads/2022/12/housewarming-invitation-wording.jpg",
  iconImage: "/assets/icons/house.png"
}


];

// --- ANIMATION VARIANTS ---
const floatingVariants = {
  initial: { y: 0 },
  animate: (delay) => ({
    y: [-10, 10, -10],
    transition: {
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: delay || 0,
      ease: "easeInOut"
    }
  })
};

const shimmerVariants = {
  initial: { backgroundPosition: "0% 0%" },
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const particleVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (index) => ({
    scale: [0, 1, 0],
    opacity: [0, 0.7, 0],
    x: [0, (Math.random() - 0.5) * 100],
    y: [0, (Math.random() - 0.5) * 100],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: index * 0.3,
      ease: "easeOut"
    }
  })
};

// --- SINGLE SERVICE CARD COMPONENT ---
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  
  // Determine alignment: Even index = Image Left, Odd index = Image Right
  const isImageLeft = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 50,
        damping: 15
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-20 mb-24 last:mb-0`}
    >
      
      {/* --- ANIMATED CONNECTOR LINE (Timeline dots) --- */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
        // Changed to Amber
        className={`hidden lg:block absolute ${isImageLeft ? 'right-[calc(50%+20px)]' : 'left-[calc(50%+20px)]'} top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600 z-30`}
      >
        {/* Pulsing Effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-amber-500/50"
        />
      </motion.div>

      {/* --- IMAGE BLOCK --- */}
      <div className="w-full lg:w-1/2 relative group">
        {/* Animated Shadow Layer - Changed to Deep Red/Burgundy */}
        <motion.div 
          animate={isHovered ? {
            translateX: isImageLeft ? [3, 2] : [-3, -2],
            translateY: [3, 2],
          } : {
            translateX: isImageLeft ? 3 : -3,
            translateY: 3
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-red-900/40 rounded-2xl"
        />
        
        <motion.div 
          // Changed border color to blend with theme
          className="relative h-[300px] lg:h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl border border-red-900/30"
          animate={{
            borderColor: isHovered ? "#d97706" : "#450a0a"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Floating Food Particles */}
          {isHovered && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={particleVariants}
                  custom={i}
                  initial="initial"
                  animate="animate"
                  className="absolute w-4 h-4 rounded-full bg-amber-500/20"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`
                  }}
                />
              ))}
            </div>
          )}

          <motion.img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "grayscale(0%) contrast(1.1) sepia(20%)" : "grayscale(30%) contrast(1) sepia(10%)"
            }}
            transition={{ duration: 0.7 }}
          />
          
          {/* Animated Overlay Gradient - Red Tinted */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/80 via-transparent to-transparent"
            animate={{ 
              opacity: isHovered ? 0.3 : 0.6,
              background: isHovered 
                ? "linear-gradient(to top, rgba(26, 5, 5, 0.7), transparent)" 
                : "linear-gradient(to top, rgba(26, 5, 5, 0.6), transparent)"
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        
        {/* Floating Icon Badge with Enhanced Animation */}
        <motion.div 
  variants={floatingVariants}
  animate="animate"
  custom={index * 0.5}
  onHoverStart={() => setIsIconHovered(true)}
  onHoverEnd={() => setIsIconHovered(false)}
  className={`absolute -bottom-6 ${isImageLeft ? '-right-6' : '-left-6'} 
    w-16 h-16 bg-[#2b0a0a] border-2 border-amber-600 
    rounded-full flex items-center justify-center shadow-lg z-20 cursor-pointer`}
  whileHover={{ 
    scale: 1.2,
    rotate: 360,
    backgroundColor: "#7c2d12"
  }}
  whileTap={{ scale: 0.9 }}
  transition={{ 
    rotate: { duration: 0.5 },
    scale: { type: "spring", stiffness: 300 }
  }}
>
  <img
    src={service.iconImage}
    alt={service.title}
    className="w-12 h-12 object-contain"
  />

  {/* Ring Effect */}
  {isIconHovered && (
    <>
      <motion.div 
        initial={{ scale: 1, opacity: 0.7 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full border-2 border-amber-500"
      />
      <motion.div 
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute inset-0 rounded-full border-2 border-amber-400"
      />
    </>
  )}
</motion.div>


        {/* Animated Decorative Lines */}
        <div className="absolute -z-10 inset-0 overflow-hidden rounded-2xl">
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-orange-500/10 rounded-full"
          />
        </div>
      </div>

      {/* --- TEXT BLOCK --- */}
      <div className={`w-full lg:w-1/2 flex flex-col ${isImageLeft ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} text-center items-center`}>
        {/* Animated Number Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            delay: 0.2
          }}
          className="relative mb-6"
        >
          <motion.span 
            className="text-amber-600 font-mono text-2xl font-bold block"
            animate={isHovered ? {
              scale: [1, 1.2, 1],
              color: ["#d97706", "#f59e0b", "#d97706"]
            } : {}}
            transition={{ 
              scale: { duration: 0.5 },
              color: { duration: 2, repeat: Infinity }
            }}
          >
            {service.id}
          </motion.span>
          
          {/* Glow Effect */}
          <motion.div
            animate={isHovered ? {
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            } : { opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-amber-600/20 blur-md -z-10"
          />
        </motion.div>
        
        {/* Title with Shimmer Effect - Adjusted for dark background */}
        <motion.h3 
          className="text-3xl md:text-5xl font-serif text-white mb-6 relative"
          variants={shimmerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(90deg, #FFFFFF, #fbbf24, #FFFFFF)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {service.title}
        </motion.h3>
        
        {/* Animated Description - Warmer text color */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "auto" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="overflow-hidden"
        >
          <motion.p 
            className="text-orange-100/70 text-lg leading-relaxed max-w-md mb-8"
            animate={isHovered ? {
              color: ["#ffedd5", "#fbbf24", "#ffedd5"]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {service.description}
          </motion.p>
        </motion.div>
        
        {/* Interactive Button */}
        <Link to="/services">
  <motion.button 
    className="relative px-8 py-3 border border-red-900/50 text-orange-200 uppercase tracking-widest text-xs overflow-hidden group"
    whileHover={{ 
      borderColor: "#d97706",
      color: "#fbbf24"
    }}
    whileTap={{ scale: 0.95 }}
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
  >
    {/* Button Shine Effect */}
    <motion.span
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/20 to-transparent"
    />
    <span className="relative z-10 flex items-center gap-2">
      Discover Details
      <motion.span
        animate={isHovered ? {
          x: [0, 5, 0],
          rotate: [0, 90, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        →
      </motion.span>
    </span>
  </motion.button>
</Link>

      </div>

      {/* Animated Connection Line (Mobile) */}
      {index < services.length - 1 && (
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="lg:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-amber-600/50 to-transparent"
        >
          {/* Animated Droplet */}
          <motion.div
            animate={{ 
              y: [0, 48, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: index * 0.3
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

// --- MAIN SECTION COMPONENT ---
const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    // ✅ CHANGED: Deep Merlot / Royal Mahogany Gradient Background
    <section className="relative w-full py-20 lg:py-32 bg-gradient-to-b from-[#1c0505] via-[#2a0a0a] to-[#120303] overflow-hidden">
      
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
        className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none bg-[length:200px_200px]"
      />
      
      {/* Floating Animated Elements - Tinted Red */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            variants={floatingVariants}
            animate="animate"
            custom={i * 0.5}
            className="absolute w-8 h-8 rounded-full border border-red-500/10"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`
            }}
          />
        ))}
      </div>
      
      {/* Gold Center Line with Animation */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block overflow-hidden">
        <motion.div
          animate={{ 
            backgroundPosition: ["0% 0%", "0% 100%"]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "linear"
          }}
          // Gradient adapted to dark red background
          className="w-full h-full bg-gradient-to-b from-transparent via-amber-700/50 to-transparent bg-[length:100%_200px]"
        />
        
        {/* Animated Dots along the line */}
        {services.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              delay: 0.3 * index,
              scale: { duration: 2, repeat: Infinity, delay: index * 0.2 },
              opacity: { duration: 2, repeat: Infinity, delay: index * 0.2 }
            }}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-600 rounded-full"
            style={{ 
              top: `${20 + (index * 15)}%` 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header with Enhanced Animation */}
        <div className="text-center mb-20 lg:mb-32 relative">
          {/* Animated Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-4 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 tracking-[0.3em] uppercase text-sm font-bold mb-4"
            animate={{
              letterSpacing: ["0.3em", "0.4em", "0.3em"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            What We Offer
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="text-5xl md:text-6xl font-serif text-white mb-4"
          >
            Our Premium{" "}
            <motion.span 
              className="italic text-gray-400 relative inline-block"
              animate={{
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 20px rgba(245, 158, 11, 0.5)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Services
            </motion.span>
          </motion.h1>
          
          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-orange-200/60 text-lg max-w-2xl mx-auto"
          >
            <motion.span
              animate={{ 
                color: ["#9a3412", "#fbbf24", "#9a3412"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Experience culinary excellence through our curated services
            </motion.span>
          </motion.p>
        </div>

        {/* Services List with Scroll Progress Indicator */}
        <div className="relative max-w-6xl mx-auto">
          {/* Scroll Progress Bar */}
          <motion.div 
            className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 w-1 h-64 bg-red-950/50 rounded-full overflow-hidden"
            style={{ zIndex: 100 }}
          >
            <motion.div 
              className="w-full bg-gradient-to-b from-amber-500 to-orange-600 rounded-full"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ margin: "-50% 0% -50% 0%" }}
              transition={{ duration: 2 }}
            />
          </motion.div>
          
          {/* Services */}
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;