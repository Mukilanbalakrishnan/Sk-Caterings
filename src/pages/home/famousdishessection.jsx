import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";


// --- DATA: Food Categories ---
const categories = [
  {
    id: 1,
    name: "Idly",
    image: "https://tse3.mm.bing.net/th/id/OIP.xoL1ko1lLJw7Gp3vyIzNhAHaHa?pid=Api&P=0&h=180" // Idly
  },
  {
    id: 2,
    name: "Dosa",
    image: "https://tse4.mm.bing.net/th/id/OIP.BJwK1TGMGt8oxpDDN14FVwHaHa?pid=Api&P=0&h=180" // 
  },
  {
    id: 3,
    name: "Poori",
    image: "https://www.awesomecuisine.com/wp-content/uploads/2020/03/poori-masala-kizhangu-585x390.jpg" // Chicken/Grill
  },
  {
    id: 4,
    name: "Chapati",
    image: "https://www.krumpli.co.uk/wp-content/uploads/2023/05/Homemade-Indian-Chapati-02-1200x1200.jpg" // Pizza
  },
  {
    id: 5,
    name: "Parotta",
    image: "https://tse1.mm.bing.net/th/id/OIP.6ELWHztatvJ3B5sW1ehfUgHaEK?pid=Api&P=0&h=180" // Pasta
  },
  {
    id: 6,
    name: "cutlet",
    image: "https://tse1.mm.bing.net/th/id/OIP.sA6P9T6O3bNUAg9DY4XVzAHaE7?pid=Api&P=0&h=180" // Curry
  },
  {
    id: 7,
    name: "vada",
    image: "https://tse2.mm.bing.net/th/id/OIP.FdU-BqsXXz1a4ZUx0Xq1OAHaE6?pid=Api&P=0&h=180" // Steak
  },
  {
    id: 8,
    name: "kesari",
    image: "https://www.tastingtable.com/img/gallery/kesari-is-the-indian-dessert-that-shines-bright-from-saffron-upgrade/l-intro-1701376057.jpg" // Dessert
  }
];

// --- CARD COMPONENT ---
const CategoryCard = ({ item, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center group cursor-pointer"
      onClick={() => navigate("/menu")}
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

        

      </div>
    </section>
  );
};

export default FamousDishesSection;