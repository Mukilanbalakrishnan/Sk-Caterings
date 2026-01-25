import React from 'react';
import { motion } from 'framer-motion';

// --- DATA: Food Categories ---
const categories = [
  {
    id: 1,
    name: "Royal Biryani",
    count: "12 Varieties",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80" // Biryani Plate
  },
  {
    id: 2,
    name: "Gourmet Burgers",
    count: "8 Varieties",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" // Burger
  },
  {
    id: 3,
    name: "Tandoori Grills",
    count: "15 Varieties",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&q=80" // Chicken/Grill
  },
  {
    id: 4,
    name: "Artisan Pizza",
    count: "10 Varieties",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80" // Pizza
  },
  {
    id: 5,
    name: "Signature Pasta",
    count: "6 Varieties",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80" // Pasta
  },
  {
    id: 6,
    name: "Exotic Curries",
    count: "20 Varieties",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" // Curry
  },
  {
    id: 7,
    name: "Premium Steaks",
    count: "5 Cuts",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80" // Steak
  },
  {
    id: 8,
    name: "Luxury Desserts",
    count: "14 Varieties",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80" // Dessert
  }
];

// --- CARD COMPONENT ---
const CategoryCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      {/* 1. The Plate Image */}
      <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6">
        {/* Decorative shadow underneath */}
        <div className="absolute inset-4 bg-black/40 rounded-full blur-xl transform translate-y-4 group-hover:translate-y-6 transition-transform duration-500"></div>
        
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 bg-white"
        >
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transform scale-110"
          />
          {/* Shine effect on plate */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>
        </motion.div>

        {/* Floating Tag (Optional: "New" or "Hot") */}
        {index === 0 && (
           <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20 animate-bounce">
             BEST SELLER
           </div>
        )}
      </div>

      {/* 2. Text Details */}
      <h3 className="text-xl md:text-2xl font-serif text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
        {item.name}
      </h3>
      <p className="text-gray-500 text-sm uppercase tracking-widest mt-1 font-medium group-hover:text-gray-800 transition-colors">
        {item.count}
      </p>
      
      {/* Small Arrow that appears on hover */}
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="mt-2 text-yellow-600 text-xl"
      >
        &#8595;
      </motion.div>
    </motion.div>
  );
};

// --- MAIN SECTION ---
const FamousDishesSection = () => {
  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2"
          >
            Top Foods
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-gray-900"
          >
            Our <span className="italic text-yellow-600">Categories</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gray-200 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-10 max-w-7xl mx-auto">
          {categories.map((item, index) => (
            <CategoryCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* --- VIEW FULL MENU BUTTON --- */}
        <div className="text-center mt-20">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-yellow-600 transition-colors shadow-xl"
          >
            View Full Menu
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default FamousDishesSection;