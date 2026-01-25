import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
// Keeping your exact image paths as requested
import bananaLeaf from "../../assets/orders/banana_leaf-removebg-preview.png"
import gulabJamunImg from "../../assets/orders/gulabjamun-removebg-preview.png"; 
import rice from "../../assets/orders/rice-removebg-preview.png"
import beans from "../../assets/orders/beans-removebg-preview.png"
import sambar from "../../assets/orders/Sambar_-_How_To_Make_South_Indian_Sambar_Recipe_-_Cubes_N_Juliennes-removebg-preview.png";
import starter from "../../assets/orders/starter-removebg-preview.png";
import appalam from "../../assets/orders/appalam-removebg-preview.png";

// --- DATA STRUCTURE ---
const foodSubCategories = {
  sweet: [
    { id: 'mysore_pak', name: 'Mysore Pak', image: "https://w7.pngwing.com/pngs/35/676/png-transparent-mysore-pak-indian-cuisine-laddu-ghee-sweet-dish-food-recipe-cuisine-thumbnail.png" },
    { id: 'gulab_jamun', name: 'Gulab Jamun', image: gulabJamunImg },
    { id: 'rasmalai', name: 'Rasmalai', image: "https://w7.pngwing.com/pngs/682/385/png-transparent-ras-malai-rasgulla-indian-cuisine-dessert-gulab-jamun-ras-malai-cream-food-cheese-thumbnail.png" }
  ],
  rice: [
    { id: 'white_rice', name: 'White Rice', image: rice },
    { id: 'jeera_rice', name: 'Jeera Rice', image: "https://w7.pngwing.com/pngs/79/386/png-transparent-basmati-fried-rice-pilaf-biryani-indian-cuisine-rice-food-recipe-cuisine-thumbnail.png" }
  ],
  sambar: [
    { id: 'sambar', name: 'Madras Sambar', image: sambar },
    { id: 'vathakuzhambu', name: 'Vatha Kuzhambu', image: "https://w7.pngwing.com/pngs/524/110/png-transparent-curry-indian-cuisine-dish-recipe-food-indian-curry-soup-food-recipe-thumbnail.png" }
  ],
  chicken: [
    { id: 'chicken_65', name: 'Chicken 65', image: starter },
    { id: 'pepper_chicken', name: 'Pepper Chicken', image: "https://w7.pngwing.com/pngs/453/829/png-transparent-roast-chicken-chicken-meat-barbecue-chicken-nugget-fried-chicken-chicken-food-animals-recipe-thumbnail.png" }
  ],
  veg: [
    { id: 'poriyal', name: 'Beans Poriyal', image: beans },
    { id: 'aviya', name: 'Avial', image: "https://w7.pngwing.com/pngs/298/536/png-transparent-avial-vegetable-kerala-cuisine-curry-sambar-vegetable-food-recipe-onion-thumbnail.png" }
  ],
  papad: [
    { id: 'appalam', name: 'Appalam', image: appalam }
  ]
};

// --- FIXED POSITIONS ---
const categories = [
  // Sweet: Bottom Right
  { id: 'sweet', label: 'Sweets', icon: foodSubCategories.sweet[0].image, position: { top: '65%', left: '80%' }, zIndex: 15 },
  
  // Veg: Top Right
  { id: 'veg', label: 'Poriyal', icon: foodSubCategories.veg[0].image, position: { top: '30%', left: '70%' }, zIndex: 12 },
  
  // Rice: Center
  { id: 'rice', label: 'Rice', icon: foodSubCategories.rice[0].image, position: { top: '55%', left: '45%' }, zIndex: 10 },
  
  // Sambar: Top Center-Right (Near Veg, away from Rice - FIXED OVERLAP)
  { id: 'sambar', label: 'Gravy', icon: foodSubCategories.sambar[0].image, position: { top: '25%', left: '55%' }, zIndex: 20 },
  
  // Chicken: Bottom Left
  { id: 'chicken', label: 'Starters', icon: foodSubCategories.chicken[0].image, position: { top: '65%', left: '25%' }, zIndex: 15 },
  
  // Papad: Top Left
  { id: 'papad', label: 'Extras', icon: foodSubCategories.papad[0].image, position: { top: '30%', left: '20%' }, zIndex: 12 },
];

const OrderPage = () => {
  const [servedItems, setServedItems] = useState([]); 
  const [activeCategory, setActiveCategory] = useState(null); 
  const [isLeafOpen, setIsLeafOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleItemSelect = (item) => {
    const categoryConfig = categories.find(cat => cat.id === activeCategory);
    
    const newItem = {
      ...item,
      categoryId: activeCategory,
      position: categoryConfig.position,
      zIndex: categoryConfig.zIndex
    };

    setServedItems(prev => {
      const filtered = prev.filter(i => i.categoryId !== activeCategory);
      return [...filtered, newItem];
    });

    setActiveCategory(null); 
  };

  return (
    <div className="min-h-screen bg-[#ECC94B] relative overflow-hidden flex flex-col items-center py-10 font-sans">
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="text-center z-20 mb-4">
        <h1 className="font-serif text-4xl md:text-6xl text-[#1E5616] font-bold drop-shadow-sm">Design Your Feast</h1>
        <p className="text-[#3F2E12] mt-2 font-mono text-sm uppercase tracking-widest">Tap a category to choose your dish</p>
      </motion.div>

      {/* --- MAIN STAGE --- */}
      <div className="relative w-full max-w-4xl h-[40vh] md:h-[500px] flex items-center justify-center mb-10 z-10">
        
        {/* Leaf */}
        <motion.img 
          src={bananaLeaf}
          alt="Banana Leaf"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          onAnimationComplete={() => setIsLeafOpen(true)}
          className="w-[95%] md:w-full h-full object-contain drop-shadow-2xl"
        />

        {/* Served Items Animation */}
        <AnimatePresence>
          {servedItems.map((item) => (
            <motion.div
              key={item.categoryId}
              initial={{ opacity: 0, scale: 3, y: -500, rotate: Math.random() * 90 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              // Updated dimensions
              className="absolute w-20 h-20 md:w-32 md:h-32 flex items-center justify-center"
              style={{ 
                top: item.position.top, 
                left: item.position.left,
                transform: 'translate(-50%, -50%)',
                zIndex: item.zIndex 
              }}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                // GULAB JAMUN FIX: Apply special styling if it's the Gulab Jamun image
                // Use object-cover specifically for it if it's getting squashed, or scale it down slightly
                className={`w-full h-full drop-shadow-lg ${item.id === 'gulab_jamun' ? 'object-contain scale-75' : 'object-contain'}`} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- MENU CATEGORY BUTTONS --- */}
      <div className="w-full max-w-5xl px-4 z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const isServed = servedItems.some(item => item.categoryId === category.id);
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative overflow-hidden rounded-xl shadow-lg border-2 h-20 flex flex-col items-center justify-center
                  transition-all duration-300 font-bold uppercase tracking-wide text-xs md:text-sm
                  ${isServed ? 'bg-[#1E5616] text-yellow-400 border-[#1E5616]' : 'bg-[#2F8523] text-white border-[#3fad31]'}
                `}
              >
                <span className="relative z-10">{category.label}</span>
                {isServed && <span className="text-[10px] text-yellow-200 mt-1">Served ✓</span>}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* --- SELECTION MODAL (POPUP) --- */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActiveCategory(null)} 
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#FDFBF7] rounded-3xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* Modal Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif text-[#1E5616]">Select {categories.find(c => c.id === activeCategory)?.label}</h3>
                <div className="w-16 h-1 bg-[#EAB308] mx-auto mt-2 rounded-full"></div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 gap-4">
                {foodSubCategories[activeCategory]?.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05, backgroundColor: "#FEF3C7" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleItemSelect(item)}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mb-3" />
                    <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setActiveCategory(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER CTA --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: servedItems.length > 0 ? 1 : 0 }}
        className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-4 border-t border-yellow-500 z-40 flex justify-between items-center shadow-lg"
      >
        <div className="flex flex-col px-4 md:px-10">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Your Menu</span>
          <span className="text-xl md:text-2xl font-bold text-[#1E5616]">{servedItems.length} Items Selected</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mr-4 md:mr-10 px-8 py-3 bg-[#EAB308] text-black font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
        >
          Confirm Menu
        </motion.button>
      </motion.div>

    </div>
  );
};

export default OrderPage;