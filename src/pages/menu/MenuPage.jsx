import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// --- MENU DATA ---
const menuCategories = ["Breakfast", "Lunch", "Dinner", "Desserts", "Beverages"];

const menuItems = {
  Breakfast: [
    { id: 1, name: "Ghee Pongal", desc: "Ghee Pongal is soft rice and lentils cooked in pure cow ghee with cashews and pepper. It is very tasty and easy to eat.", image: "https://www.indianveggiedelight.com/wp-content/uploads/2021/11/ven-pongal-featured.jpg", tag: "Bestseller" },
    { id: 2, name: "Kanjeevaram Idli", desc: "Kanjeevaram Idli is soft, tasty idli made with light spices and cooked in special leaves.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80", tag: "Signature" },
    { id: 3, name: "Vada Kari", desc: "Crispy donut-shaped lentil fritters, served with coconut chutney and sambar.", image: "https://traditionallymodernfood.com/wp-content/uploads/2022/02/vada-curry-vadakari-4-841x1024.jpeg", tag: "" },
    { id: 4, name: "Poori Masala", desc: "Fluffy wheat bread served with a spiced potato & onion curry.", image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=600&q=80", tag: "" },
    { id: 5, name: "kasari", desc: "Kesari is a sweet made with rava, sugar, and ghee. It is soft, tasty, and usually served in functions and temples.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7yq2Jf6anaGqqmiPRb40T43UjZK7QmMnSQk6FxmFkt63DsI6xCAcrpXhbSIZQTpLidMAMTxPDxPBrjYe_vusMk6NAYu70wa5_Gptd5GGVInAdAA_B0JItCx3McfMy_gC308scozQh49Y/s1600/IMG_20190820_152853.jpg", tag: "" },
    { id: 6, name: "Idapam and coconut milk", desc: "Idiyappam with Coconut Milk is soft string rice noodles served with sweet coconut milk. It is light, tasty, and easy to eat.", image: "https://www.awesomecuisine.com/wp-content/uploads/2008/02/idiyappam.jpg", tag: "" }

  ],
  Lunch: [
    { id: 7, name: "Rice", desc: "“Rice is soft cooked grains that we eat with curry, gravy, or sambar. It is the main food in most meals.”.", image: "https://tse1.mm.bing.net/th/id/OIP.YG95IXw215wyaqfX0Mik7QHaEK?pid=Api&P=0&h=180", tag: "" },
    { id: 8, name: "sambar", desc: "Sambar is a mixed vegetable dal curry. It is healthy and very tasty.", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/sambar.jpg", tag: "" },
    { id: 9, name: "puli kulambu", desc: "Puli Kulambu is a tangy tamarind curry that we eat with rice.", image: "https://www.padhuskitchen.com/wp-content/uploads/2018/03/vendakkaipulikulambu.jpg", tag: "" },
    { id: 10, name: "porial", desc: "Poriyal is lightly fried vegetables cooked with coconut and mild spices. It is dry, healthy, and eaten with rice.", image: "https://paattiskitchen.com/wp-content/uploads/2022/11/kmc_20221106_190919-1200x675.jpg", tag: "" },
    { id: 11, name: "rasam", desc: "Rasam is a thin, spicy, and sour soup made with tamarind, pepper, and spices. We eat it with rice.", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2018/11/rasam-recipe.jpg", tag: "" },
    { id: 12, name: "paruppu payasam", desc: "Paruppu Payasam is a sweet made with dal, jaggery, and coconut. It is soft and very tasty.", image: "http://cravecookclick.com/wp-content/uploads/2014/09/IMG_9229-2.jpg", tag: "" }
  ],
  Dinner: [
    { id: 13, name: "Kal Dosa", desc: "“Kal Dosa is a thick, soft dosa cooked on a hot stone. It is crispy outside and soft inside.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80", tag: "" },
    { id: 14, name: "Parotta Salna", desc: "Flaky layered flatbread served with a rich, empty salna gravy.", image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1b/cf/74/3f/parotta-salna-with-chutney.jpg", tag: "Classic" },
    { id: 15, name: "Idiyappam", desc: "Steamed rice string hoppers with a mild coconut milk vegetable stew.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpKRs9S5Lc1XUFjgwbg7QuZxtZ0ox4zlujg&s", tag: "Light" },
    { id: 16, name: "kothu parotta", desc: "Kothu Parotta is chopped parotta mixed and fried with eggs or vegetables and spices. It is spicy and very tasty.", image: "https://tse3.mm.bing.net/th/id/OIP.dVhsa6_d0Sw1QnmqdZBvQgHaEK?pid=Api&P=0&h=180", tag: "Light" },
    { id: 17, name: "Masal dosa", desc: "Masala Dosa is crispy dosa with potato inside.", image: "https://vismaifood.com/storage/app/uploads/public/45a/29b/a17/thumb__700_0_0_0_auto.jpg", tag: "Light" },
    { id: 18, name: "chapati", desc: "Chapati is soft wheat bread that we eat with side dishes.", image: "https://www.krumpli.co.uk/wp-content/uploads/2023/05/Homemade-Indian-Chapati-02-1200x1200.jpg", tag: "Light" },
  ],
  Desserts: [
    { id: 19, name: "Elaneer Payasam", desc: "Tender coconut soufflé, a sweet finish to a grand meal.", image: "https://www.nestleprofessional.in/sites/default/files/2022-07/Elaneer-Payasam-420x330.jpg", tag: "Signature" },
    { id: 20, name: "Gulab Jamun", desc: "Fried dough balls soaked in rose-scented sugar syrup.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_2_kgNFhaEQzChHtBoJqx9h7nwx7K94Ykiw&s", tag: "" },
    { id: 21, name: "Ice cream", desc: "Ice cream is a cold, sweet dessert made with milk and sugar. It comes in many flavors like vanilla, chocolate, and strawberry.", image: "https://images.herzindagi.info/image/2020/Apr/butterscotch-ice-cream-recipe-two.jpg", tag: "" },
    { id: 21, name: "cassata", desc: "Cassata is a cold ice cream cake made with different flavors and fruits. It is sweet and very tasty.", image: "https://i.etsystatic.com/41529586/r/il/34cf51/6857592797/il_1140xN.6857592797_7ve7.jpg", tag: "" },
  ],
  Beverages: [
    { id: 14, name: "Filter Kaapi", desc: "Traditional South Indian frothy coffee served in brass davara tumblers.", image: "https://www.agoraliarecipes.com/wp-content/uploads/2022/08/AR000232JR-Indian-Kaapi-Filter-Coffee-FTR1-ph01-Shtr_SMALL.jpg", tag: "Hot" },
    { id: 15, name: "Rose Milk", desc: "Chilled milk flavored with rose syrup and basil seeds.", image: "https://media.istockphoto.com/id/1790684411/photo/iced-strawberry-milk-or-rose-milk-served-in-disposable-glass-with-ice-cube-isolated-on-wooden.jpg?s=612x612&w=0&k=20&c=E_8BXDJKUti7R6I_cAVAfC7g-4mKWxh7VSlSZ3CjKgI=", tag: "Cold" },
    { id: 16, name: "Badam milk", desc: "Badam milk is warm milk mixed with almond paste, sugar, and a little cardamom. It is sweet and healthy.", image: "https://tse1.mm.bing.net/th/id/OIP.Rtl01wGiHE9R00_nI-u-5wHaE7?pid=Api&P=0&h=180", tag: "Cold" },
    { id: 17, name: "Tea", desc: "Tea is a hot drink made with milk, water, tea powder, and sugar.", image: "https://tse2.mm.bing.net/th/id/OIP.A5mtAMf2lMLLZUEGL8sJEQHaFj?pid=Api&P=0&h=180", tag: "Hot" },
  ]
};

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("Lunch");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);


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

                    

                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        

      </div>

      <AnimatePresence>
  {isEnquiryOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setIsEnquiryOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111] text-white rounded-2xl p-8 w-[90%] max-w-md border border-white/10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-amber-400">
            Enquiry
          </h2>
          <button
            onClick={() => setIsEnquiryOpen(false)}
            className="text-white/50 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Selected Item */}
        {selectedItem && (
          <div className="mb-6">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-bold">{selectedItem.name}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {selectedItem.desc}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsEnquiryOpen(false)}
            className="px-5 py-2 text-sm uppercase tracking-widest text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-amber-500 text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-amber-400 transition"
          >
            Proceed
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <Footer />
    </>
  );
};

export default MenuPage;