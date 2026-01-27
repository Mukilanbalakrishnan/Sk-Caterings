import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// --- MENU DATA ---
const menuCategories = ["Breakfast", "Lunch", "Dinner", "Desserts", "Beverages"];

const menuItems = {
  Breakfast: [
    { id: 1, name: "Ghee Pongal", desc: "Melt-in-mouth lentils & rice cooked with pure cow ghee, cashews & peppercorns.", image: "https://www.indianveggiedelight.com/wp-content/uploads/2021/11/ven-pongal-featured.jpg", tag: "Bestseller" },
    { id: 2, name: "Kanjeevaram Idli", desc: "Spiced idlis wrapped in mandharai leaves, infused with ginger and cumin.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80", tag: "Signature" },
    { id: 3, name: "Medu Vada", desc: "Crispy donut-shaped lentil fritters, served with coconut chutney and sambar.", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&q=80", tag: "" },
    { id: 4, name: "Poori Masala", desc: "Fluffy wheat bread served with a spiced potato & onion curry.", image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=600&q=80", tag: "" },
  ],
  Lunch: [
    { id: 5, name: "Royal Thali", desc: "An elaborate spread of 25+ items including chapati, rice, 3 gravies, and sweets.", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80", tag: "Must Try" },
    { id: 6, name: "Ambur Biryani", desc: "Seeraga samba rice cooked with tender meat and authentic Ambur spices.", image: "https://images.getrecipekit.com/20230310123001-ambur-20chicken-20biryani.jpg?aspect_ratio=16:9&quality=90&", tag: "Spicy" },
    { id: 7, name: "Chettinad Chicken", desc: "Spicy, aromatic chicken curry made with fresh ground masalas.", image: "https://butfirstchai.com/wp-content/uploads/2023/01/chicken-chettinad-curry-recipes.jpg", tag: "" },
    { id: 8, name: "Prawn Masala", desc: "Juicy prawns tossed in a tangly tomato-onion gravy.", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80", tag: "Premium" },
  ],
  Dinner: [
    { id: 9, name: "Kal Dosa", desc: "Soft, spongy dosas served with a spicy kara chutney and kurma.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80", tag: "" },
    { id: 10, name: "Parotta Salna", desc: "Flaky layered flatbread served with a rich, empty salna gravy.", image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1b/cf/74/3f/parotta-salna-with-chutney.jpg", tag: "Classic" },
    { id: 11, name: "Idiyappam & Stew", desc: "Steamed rice string hoppers with a mild coconut milk vegetable stew.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpKRs9S5Lc1XUFjgwbg7QuZxtZ0ox4zlujg&s", tag: "Light" },
  ],
  Desserts: [
    { id: 12, name: "Elaneer Payasam", desc: "Tender coconut soufflé, a sweet finish to a grand meal.", image: "https://www.nestleprofessional.in/sites/default/files/2022-07/Elaneer-Payasam-420x330.jpg", tag: "Signature" },
    { id: 13, name: "Gulab Jamun", desc: "Fried dough balls soaked in rose-scented sugar syrup.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_2_kgNFhaEQzChHtBoJqx9h7nwx7K94Ykiw&s", tag: "" },
  ],
  Beverages: [
    { id: 14, name: "Filter Kaapi", desc: "Traditional South Indian frothy coffee served in brass davara tumblers.", image: "https://www.agoraliarecipes.com/wp-content/uploads/2022/08/AR000232JR-Indian-Kaapi-Filter-Coffee-FTR1-ph01-Shtr_SMALL.jpg", tag: "Hot" },
    { id: 15, name: "Rose Milk", desc: "Chilled milk flavored with rose syrup and basil seeds.", image: "https://media.istockphoto.com/id/1790684411/photo/iced-strawberry-milk-or-rose-milk-served-in-disposable-glass-with-ice-cube-isolated-on-wooden.jpg?s=612x612&w=0&k=20&c=E_8BXDJKUti7R6I_cAVAfC7g-4mKWxh7VSlSZ3CjKgI=", tag: "Cold" },
  ]
};

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("Lunch");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-amber-500 selection:text-black">
        
        {/* --- DECORATIVE ELEMENTS --- */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-amber-900/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-16 px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase block mb-4">
              Gastronomic Delight
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6">
              Our <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">Menu</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
              Explore our curated selection of authentic dishes, prepared with passion and the finest ingredients to honor tradition.
            </p>
          </motion.div>
        </section>

        {/* --- TAB NAVIGATION --- */}
        <div className="sticky top-24 z-30 py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex justify-center min-w-max gap-4 md:gap-8">
              {menuCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`
                    relative px-6 py-3 text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300
                    ${activeTab === cat ? 'text-amber-400' : 'text-gray-500 hover:text-white'}
                  `}
                >
                  {cat}
                  {activeTab === cat && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- MENU GRID --- */}
        <div className="max-w-7xl mx-auto px-4 py-16 min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
              {menuItems[activeTab]?.map((item) => (
                <div key={item.id} className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-colors duration-500">
                  
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90" />
                    
                    {/* Tag Badge */}
                    {item.tag && (
                      <span className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-8 relative -mt-12">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-2xl font-serif text-white group-hover:text-amber-400 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <div className="h-[1px] flex-grow bg-white/10 mx-4"></div>
                      <span className="text-amber-500 text-xl">✦</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    <button className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white flex items-center gap-2 transition-colors">
                      Add to Enquiry <span className="text-amber-500">→</span>
                    </button>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        

      </div>
      <Footer />
    </>
  );
};

export default MenuPage;