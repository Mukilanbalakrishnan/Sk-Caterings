import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA ---
const popularMenus = [
  {
    id: 1,
    title: "The Royal Maharaja",
    subtitle: "Authentic Indian Feast",
    price: "Premium",
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800&q=80", // Rich Indian food
    items: [
      "Welcome Drink: Rose Sharbat",
      "Starters: Paneer Tikka, Hara Bhara Kebab",
      "Main: Butter Chicken, Dal Makhani",
      "Breads: Butter Naan, Laccha Paratha",
      "Rice: Jeera Rice, Veg Pulao",
      "Dessert: Gulab Jamun, Rasmalai"
    ],
    color: "#451a03", 
    accent: "#fbbf24" // Amber
  },
  {
    id: 2,
    title: "The Italian Soiree",
    subtitle: "Tuscany on a Plate",
    price: "Gold",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80", // Pasta/Italian
    items: [
      "Welcome Drink: Sparkling Lemonade",
      "Starters: Bruschetta, Garlic Bread",
      "Main: Penne Alfredo, Woodfire Pizza",
      "Sides: Caesar Salad, Roasted Veggies",
      "Live Station: Pasta Toss",
      "Dessert: Tiramisu, Gelato"
    ],
    color: "#7f1d1d", 
    accent: "#f87171" // Red
  },
  {
    id: 3,
    title: "The Fusion Fiesta",
    subtitle: "Global Flavors United",
    price: "Platinum",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", // Fusion/Thai
    items: [
      "Welcome Drink: Mojito Mocktail",
      "Starters: Tacos, BBQ Wings",
      "Main: Thai Curry, Jasmine Rice",
      "Grill: Live Satay Station",
      "Sides: Som Tam Salad",
      "Dessert: Cheesecake, Brownies"
    ],
    color: "#064e3b", 
    accent: "#34d399" // Emerald
  }
];

const PopularMenuSection = () => {
  const [activeId, setActiveId] = useState(1); // Default active item

  return (
    <section className="relative w-full min-h-screen py-20 bg-[#0a0a0a] overflow-hidden flex flex-col justify-center">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-12 relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-amber-500 font-mono text-sm uppercase tracking-[0.3em]"
        >
          Signature Collections
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-white mt-2"
        >
          Famous <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Menus</span>
        </motion.h2>
      </div>

      {/* --- INNOVATIVE HORIZONTAL ACCORDION --- */}
      {/* Responsive: Flex Col on Mobile (Vertical Accordion), Flex Row on Desktop (Horizontal) */}
      <div className="container mx-auto px-4 h-[650px] md:h-[480px] flex flex-col md:flex-row gap-2 md:gap-3">

        {popularMenus.map((menu) => {
          const isActive = activeId === menu.id;
          
          return (
            <motion.div
              key={menu.id}
              layout
              onClick={() => setActiveId(menu.id)}
              onMouseEnter={() => setActiveId(menu.id)}
              className={`relative h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
                isActive ? 'flex-[2.2] md:flex-[2.5]' : 'flex-[1] opacity-70 grayscale hover:grayscale-0 hover:opacity-100'
              }`}
              style={{
                boxShadow: isActive ? `0 0 40px ${menu.color}80` : 'none'
              }}
            >
              {/* Background Image */}
              <img 
                src={menu.image} 
                alt={menu.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                style={{ backgroundColor: isActive ? `${menu.color}40` : 'rgba(0,0,0,0.6)' }}
              />

              {/* --- CONTENT --- */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">

                
                {/* Vertical Title (Collapsed State - Desktop Only) */}
                {!isActive && (
                  <div className="hidden md:flex absolute inset-0 items-center justify-center">
                    <h3 
                      className="text-white font-serif text-2xl tracking-widest uppercase whitespace-nowrap opacity-80"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {menu.title}
                    </h3>
                  </div>
                )}
                
                {/* Simple Title (Collapsed State - Mobile Only) */}
                {!isActive && (
                  <div className="md:hidden absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-serif text-xl tracking-widest uppercase">
                      {menu.title}
                    </h3>
                  </div>
                )}

                {/* Expanded Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full"
                    >
                      {/* Badge */}
                      <div 
                        className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 shadow-lg"
                        style={{ background: menu.accent, color: '#000' }}
                      >
                        {menu.price} Selection
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-none drop-shadow-lg">

                        {menu.title}
                      </h3>
                      <p className="text-white/80 italic text-sm md:text-base mb-4 font-light">

                        {menu.subtitle}
                      </p>

                      {/* Divider */}
                      <div className="w-20 h-1 mb-6 rounded-full" style={{ backgroundColor: menu.accent }} />

                      {/* Menu Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs md:text-sm text-gray-200 mb-4">

                        {menu.items.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.05) }}
                            className="flex items-center gap-2"
                          >
                            <span style={{ color: menu.accent }}>•</span>
                            {item}
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-xl"
                      >
                        View Full Menu <span>→</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularMenuSection;