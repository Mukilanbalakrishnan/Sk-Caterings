import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


// --- DATA (Matches ServicePage) ---


    const services = [
    {
        id: 1,
        title: "Wedding Grandeur",
        description: "Orchestrating your fairy-tale wedding with royal feasts. We specialize in traditional multi-course meals served on banana leaves.",
        // Placeholder banana leaf image for background
        image: "/asserts/services/banana.png", 
        menu: {
        breakfast: [
            { name: "Idli & Vada", img: "/asserts/services/idly.png", pos: 'center' },
            { name: "Ven Pongal", img: "/asserts/services/pongal.png", pos: 'bottomLeft' },
            { name: "Filter Coffee", img: '/asserts/services/filtercoffee.png', pos: 'topRight' },
            { name: "Kesari", img: "/asserts/services/kesari.png", pos: 'topLeft' }
        ],
        lunch: [
            { name: "Mutton Biryani", img: "/asserts/services/muttonbriyani.png", pos: 'topCenter' },
            { name: "Chicken 65", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&q=80", pos: 'topLeft' },
            { name: "Fish Fry", img: "/asserts/services/fishfry.png", pos: 'bottomRight' },
            { name: "Rasmalai", img: "/asserts/services/rasamalai.png", pos: 'topRight' },
            { name: "White Rice", img: "/asserts/services/whiterice.png", pos: 'bottomCenter' }
        ],
        dinner: [
            { name: "Chapati & Kurma", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80", pos: 'center' },
            { name: "Fried Rice", img: "/asserts/services/friedrice.png", pos: 'bottomLeft' },
            { name: "Gobi Manchurian", img: "/asserts/services/gobi.jpg", pos: 'topLeft' },
            { name: "Badam Milk", img: "/asserts/services/badamilk.png", pos: 'topRight' },
            { name: "Dosa", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&q=80", pos: 'bottomRight' }
        ]
        }
    },
    {
        id: 2,
        title: "Birthday Bash",
        description: "Orchestrating your fairy-tale wedding with royal feasts. We specialize in traditional multi-course meals served on banana leaves.",
        // Placeholder banana leaf image for background
        image: "/asserts/services/banana.png", 
        menu: {
        breakfast: [
            { name: "Idli & Vada", img: "/asserts/services/idly.png", pos: 'center' },
            { name: "Ven Pongal", img: "/asserts/services/pongal.png", pos: 'bottomLeft' },
            { name: "Filter Coffee", img: '/asserts/services/filtercoffee.png', pos: 'topRight' },
            { name: "Kesari", img: "/asserts/services/kesari.png", pos: 'topLeft' }
        ],
        lunch: [
            { name: "Mutton Biryani", img: "/asserts/services/muttonbriyani.png", pos: 'topCenter' },
            { name: "Chicken 65", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&q=80", pos: 'topLeft' },
            { name: "Fish Fry", img: "/asserts/services/fishfry.png", pos: 'bottomRight' },
            { name: "Rasmalai", img: "/asserts/services/rasamalai.png", pos: 'topRight' },
            { name: "White Rice", img: "/asserts/services/whiterice.png", pos: 'bottomCenter' }
        ],
        dinner: [
            { name: "Chapati & Kurma", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80", pos: 'center' },
            { name: "Fried Rice", img: "/asserts/services/friedrice.png", pos: 'bottomLeft' },
            { name: "Gobi Manchurian", img: "/asserts/services/gobi.jpg", pos: 'topLeft' },
            { name: "Badam Milk", img: "/asserts/services/badamilk.png", pos: 'topRight' },
            { name: "Dosa", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&q=80", pos: 'bottomRight' }
        ]
        }
    },
    {
        id: 3,
        title: "Corporate Meets",
        description: "Orchestrating your fairy-tale wedding with royal feasts. We specialize in traditional multi-course meals served on banana leaves.",
        // Placeholder banana leaf image for background
        image: "/asserts/services/banana.png", 
        menu: {
        breakfast: [
            { name: "Idli & Vada", img: "/asserts/services/idly.png", pos: 'center' },
            { name: "Ven Pongal", img: "/asserts/services/pongal.png", pos: 'bottomLeft' },
            { name: "Filter Coffee", img: '/asserts/services/filtercoffee.png', pos: 'topRight' },
            { name: "Kesari", img: "/asserts/services/kesari.png", pos: 'topLeft' }
        ],
        lunch: [
            { name: "Mutton Biryani", img: "/asserts/services/muttonbriyani.png", pos: 'topCenter' },
            { name: "Chicken 65", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&q=80", pos: 'topLeft' },
            { name: "Fish Fry", img: "/asserts/services/fishfry.png", pos: 'bottomRight' },
            { name: "Rasmalai", img: "/asserts/services/rasamalai.png", pos: 'topRight' },
            { name: "White Rice", img: "/asserts/services/whiterice.png", pos: 'bottomCenter' }
        ],
        dinner: [
            { name: "Chapati & Kurma", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80", pos: 'center' },
            { name: "Fried Rice", img: "/asserts/services/friedrice.png", pos: 'bottomLeft' },
            { name: "Gobi Manchurian", img: "/asserts/services/gobi.jpg", pos: 'topLeft' },
            { name: "Badam Milk", img: "/asserts/services/badamilk.png", pos: 'topRight' },
            { name: "Dosa", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&q=80", pos: 'bottomRight' }
        ]
        }
    },
    {
        id: 4,
        title: "Baby Shower",
        description: "Orchestrating your fairy-tale wedding with royal feasts. We specialize in traditional multi-course meals served on banana leaves.",
        // Placeholder banana leaf image for background
        image: "/asserts/services/banana.png", 
        menu: {
        breakfast: [
            { name: "Idli & Vada", img: "/asserts/services/idly.png", pos: 'center' },
            { name: "Ven Pongal", img: "/asserts/services/pongal.png", pos: 'bottomLeft' },
            { name: "Filter Coffee", img: '/asserts/services/filtercoffee.png', pos: 'topRight' },
            { name: "Kesari", img: "/asserts/services/kesari.png", pos: 'topLeft' }
        ],
        lunch: [
            { name: "Mutton Biryani", img: "/asserts/services/muttonbriyani.png", pos: 'topCenter' },
            { name: "Chicken 65", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&q=80", pos: 'topLeft' },
            { name: "Fish Fry", img: "/asserts/services/fishfry.png", pos: 'bottomRight' },
            { name: "Rasmalai", img: "/asserts/services/rasamalai.png", pos: 'topRight' },
            { name: "White Rice", img: "/asserts/services/whiterice.png", pos: 'bottomCenter' }
        ],
        dinner: [
            { name: "Chapati & Kurma", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80", pos: 'center' },
            { name: "Fried Rice", img: "/asserts/services/friedrice.png", pos: 'bottomLeft' },
            { name: "Gobi Manchurian", img: "/asserts/services/gobi.jpg", pos: 'topLeft' },
            { name: "Badam Milk", img: "/asserts/services/badamilk.png", pos: 'topRight' },
            { name: "Dosa", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&q=80", pos: 'bottomRight' }
        ]
        }
    },
    {
        id: 5,
        title: "Private Parties",
        description: "Orchestrating your fairy-tale wedding with royal feasts. We specialize in traditional multi-course meals served on banana leaves.",
        // Placeholder banana leaf image for background
        image: "/asserts/services/banana.png", 
        menu: {
        breakfast: [
            { name: "Idli & Vada", img: "/asserts/services/idly.png", pos: 'center' },
            { name: "Ven Pongal", img: "/asserts/services/pongal.png", pos: 'bottomLeft' },
            { name: "Filter Coffee", img: '/asserts/services/filtercoffee.png', pos: 'topRight' },
            { name: "Kesari", img: "/asserts/services/kesari.png", pos: 'topLeft' }
        ],
        lunch: [
            { name: "Mutton Biryani", img: "/asserts/services/muttonbriyani.png", pos: 'topCenter' },
            { name: "Chicken 65", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&q=80", pos: 'topLeft' },
            { name: "Fish Fry", img: "/asserts/services/fishfry.png", pos: 'bottomRight' },
            { name: "Rasmalai", img: "/asserts/services/rasamalai.png", pos: 'topRight' },
            { name: "White Rice", img: "/asserts/services/whiterice.png", pos: 'bottomCenter' }
        ],
        dinner: [
            { name: "Chapati & Kurma", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80", pos: 'center' },
            { name: "Fried Rice", img: "/asserts/services/friedrice.png", pos: 'bottomLeft' },
            { name: "Gobi Manchurian", img: "/asserts/services/gobi.jpg", pos: 'topLeft' },
            { name: "Badam Milk", img: "/asserts/services/badamilk.png", pos: 'topRight' },
            { name: "Dosa", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&q=80", pos: 'bottomRight' }
        ]
        }
    },
    // ... other services ...
    ];

// --- POSITION MAP ---
const universalPositionMap = {
  topCenter:   { x: 50, y: 20, scale: 1.2, z: 30 },
  center:      { x: 50, y: 50, scale: 1.2, z: 30 },

  topLeft:     { x: 30, y: 20, scale: 0.9, z: 20 },
  topRight:    { x: 70, y: 30, scale: 0.9, z: 20 },

  bottomLeft:  { x: 30, y: 50, scale: 0.9, z: 20 },
  bottomRight: { x: 70, y: 60, scale: 0.9, z: 20 },

  bottomCenter:{ x: 50, y: 65, scale: 0.9, z: 20 },
};





const ServiceDetail = () => {

    useEffect(() => {
  // Force scroll to top
  window.scrollTo(0, 0);

  // Force navbar scroll event to trigger
  window.dispatchEvent(new Event("scroll"));
}, []);

    


  const { id } = useParams();
  const service = services.find(s => s.id === parseInt(id)) || services[0];
  const [activeCategory, setActiveCategory] = useState('lunch');

  const leafRef = useRef(null);
const [leafWidth, setLeafWidth] = useState(1000);
const [activeItem, setActiveItem] = useState(null);
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;



useEffect(() => {
  if (!leafRef.current) return;

  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      setLeafWidth(entry.contentRect.width);
    }
  });

  observer.observe(leafRef.current);

  return () => observer.disconnect();
}, []);

const ITEM_RATIO = 0.11;   // 11% of leaf width
const MIN_SIZE = 50;
const MAX_SIZE = 140;

const itemSize = Math.min(
  MAX_SIZE,
  Math.max(MIN_SIZE, leafWidth * ITEM_RATIO)
);



  const categories = [
    { id: 'breakfast', label: 'Breakfast', icon: '☕' },
    { id: 'lunch', label: 'Lunch', icon: '🍛' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcf9] via-[#f7f3eb] to-[#f2efe9] 
text-[#2b2b2b] relative overflow-hidden flex flex-col items-center 
pt-32 pb-10 font-sans">


      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/marble.png')] opacity-[0.12] pointer-events-none" />

{/* Golden glow */}
<div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#facc15]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Back Button */}
      <div className="relative w-full max-w-6xl px-4 z-10 mt-4 self-start">


  <Link to="/services">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-3 px-6 py-3
      rounded-full
      bg-white/70 backdrop-blur-xl
      border border-[#e6dcc5]
      shadow-[0_8px_25px_rgba(0,0,0,0.12)]
      text-[#3b2f1b]
      font-semibold tracking-widest text-xs md:text-sm uppercase
      hover:bg-white
      hover:shadow-[0_10px_35px_rgba(230,182,92,0.35)]
      transition-all duration-300"
    >
      <span className="text-lg">←</span>
      Back to Services
    </motion.button>
  </Link>
</div>


      {/* --- BANANA LEAF STAGE --- */}
      <div className="relative w-full max-w-6xl px-4 flex flex-col items-center z-10 mt-10">
        
        {/* Title (Above Leaf) */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="text-center mb-8"
        >
          <span className="text-green-500 font-mono text-xs tracking-[0.3em] uppercase block mb-2">Premium Catering</span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#1f1f1f] font-bold tracking-wide">
  {service.title}
</h1>

        </motion.div>

        {/* Leaf Container */}
        {/* Leaf Container */}
<div className="relative w-full max-w-[1000px] mb-10 overflow-hidden">
  {/* Intrinsic ratio box */}
  <div className="relative w-full pt-[56%]">

    <motion.div 
  ref={leafRef}
  layout
  className="absolute inset-0 overflow-visible"
>


      
      {/* 1. Leaf Background */}
      <img 
        src={service.image} 
        alt="Banana Leaf" 
        className="absolute inset-0 w-full h-full object-contain"
        style={{ filter: "brightness(0.6) contrast(1.1)" }} 
      />

      {/* 2. Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-[#facc15]/10" />


      {/* 3. Items Layer */}
      <div className="absolute inset-0 p-6">
        
        {/* Floating Menu Title */}
        <div className="absolute top-8 left-0 w-full text-center z-40 pointer-events-none">
          <motion.span 
            key={activeCategory}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[#8a6a1f] font-serif text-xl italic tracking-wide bg-white/70 px-6 py-2 rounded-full backdrop-blur-md border border-[#e6dcc5] shadow-md"

          >
            {categories.find(c => c.id === activeCategory)?.label} Spread
          </motion.span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="w-full h-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {service.menu && service.menu[activeCategory] ? (
              service.menu[activeCategory].map((item, index) => {
                const pos = universalPositionMap[item.pos] || universalPositionMap.center;

                return (
                  <motion.div 
  key={index}
  className="absolute flex flex-col items-center cursor-pointer"
  onClick={() => {
    if (isTouchDevice) {
      setActiveItem(activeItem === index ? null : index);
    }
  }}
  onMouseEnter={() => {
    if (!isTouchDevice) setActiveItem(index);
  }}
  onMouseLeave={() => {
    if (!isTouchDevice) setActiveItem(null);
  }}

                    style={{ 
                      top: `${pos.y}%`, 
                      left: `${pos.x}%`, 
                      zIndex: pos.z,
                      transform: `translate(-50%, -50%) scale(${pos.scale})`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: pos.scale, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
                  >
                    {/* Food Circle */}
                    <div
                      className="rounded-full overflow-hidden relative z-10 hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
                      style={{
  width: `${itemSize}px`,
  height: `${itemSize}px`,
}}

                    >
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    {/* Label */}
                    <AnimatePresence>
  {(activeItem === index) && (
    <motion.span
      initial={{ opacity: 0, y: -5, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -5, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="mt-3 text-[#3b2f1b] text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-[#e6dcc5] shadow-md whitespace-nowrap"

    >
      {item.name}
    </motion.span>
  )}
</AnimatePresence>

                  </motion.div>
                );
              })
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                Menu data coming soon...
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>

  </div>
</div>


        {/* --- CATEGORY TABS (Below Leaf) --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 border ${
                activeCategory === cat.id
                  ? ' bg-gradient-to-r from-[#f5d07a] to-[#e6b65c] text-[#3b2f1b] border-[#e6b65c] shadow-[0_10px_30px_rgba(230,182,92,0.35)] scale-105'
                  : 'bg-white/60 text-[#3b2f1b] border-[#e6dcc5] hover:bg-white/90'

              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="font-bold uppercase tracking-widest text-xs md:text-sm">
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* --- SELECTED CATEGORY ITEMS LIST --- */}
<motion.div
  key={activeCategory}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="w-full max-w-5xl mt-6 px-4"
>
  <h3 className="text-center text-yellow-400 font-serif text-2xl mb-6 tracking-wide">
    {categories.find(c => c.id === activeCategory)?.label} Menu Items
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {service.menu[activeCategory]?.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
        className="flex flex-col items-center text-center group"
      >
        {/* Image */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <p className="mt-3 text-[#3b2f1b] text-xs md:text-sm font-semibold tracking-wide">

          {item.name}
        </p>
      </motion.div>
    ))}
  </div>
</motion.div>


       

      </div>
    </div>
    <Footer/>
    </>
  );
  
};

export default ServiceDetail;