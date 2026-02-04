import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom'; 
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// --- MULTI-LANGUAGE DATA ---

// 1. UI Translations (Static text)
const uiText = {
  en: {
    subtitle: "Gastronomic Delight",
    title: "Our",
    titleHighlight: "Menu",
    desc: "Explore our curated selection of authentic dishes, prepared with passion and the finest ingredients to honor tradition.",
    enquiryTitle: "Enquiry",
    cancel: "Cancel",
    proceed: "Proceed",
    currency: "₹"
  },
  ta: {
    subtitle: "சுவையான உணவு",
    title: "எங்கள்",
    titleHighlight: "மெனு",
    desc: "பாரம்பரியத்தை போற்றும் வகையில், மிகச்சிறந்த பொருட்களுடன், அன்போடு தயாரிக்கப்பட்ட எங்களின் தனித்துவமான உணவு வகைகளை ருசிக்கவும்.",
    enquiryTitle: "விசாரணை",
    cancel: "ரத்து",
    proceed: "தொடரவும்",
    currency: "₹"
  }
};

// 2. Categories (Key is internal logic, label is display text)
const categoryConfig = [
  { key: "Breakfast", label: { en: "Breakfast", ta: "காலை உணவு" } },
  { key: "Lunch", label: { en: "Lunch", ta: "மதிய உணவு" } },
  { key: "Dinner", label: { en: "Dinner", ta: "இரவு உணவு" } },
  { key: "Desserts", label: { en: "Desserts", ta: "இனிப்புகள்" } },
  { key: "Beverages", label: { en: "Beverages", ta: "பானங்கள்" } }
];

// 3. Menu Items (With English & Tamil content)
const menuItems = {
  Breakfast: [
    { 
      id: 1, 
      image: "https://www.indianveggiedelight.com/wp-content/uploads/2021/11/ven-pongal-featured.jpg", 
      tag: { en: "Bestseller", ta: "பிரபலம்" },
      name: { en: "Ghee Pongal", ta: "நெய் பொங்கல்" }, 
      desc: { 
        en: "Soft rice and lentils cooked in pure cow ghee with cashews and pepper.", 
        ta: "முந்திரி மற்றும் மிளகு சேர்த்து, தூய பசு நெய்யில் சமைக்கப்பட்ட மென்மையான அரிசி மற்றும் பருப்பு." 
      }
    },
    { 
      id: 2, 
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80", 
      tag: { en: "Signature", ta: "சிறப்பு" },
      name: { en: "Kanjeevaram Idli", ta: "காஞ்சிபுரம் இட்லி" }, 
      desc: { 
        en: "Soft, tasty idli made with light spices and cooked in special leaves.", 
        ta: "மிதமான மசாலாப் பொருட்களுடன், மந்தார இலைகளில் சமைக்கப்பட்ட மென்மையான மற்றும் சுவையான இட்லி." 
      }
    },
    { 
      id: 3, 
      image: "https://traditionallymodernfood.com/wp-content/uploads/2022/02/vada-curry-vadakari-4-841x1024.jpeg", 
      tag: null,
      name: { en: "Vada Kari", ta: "வடகறி" }, 
      desc: { 
        en: "Crispy donut-shaped lentil fritters, served with coconut chutney and sambar.", 
        ta: "வடை சேர்த்து செய்யப்பட்ட சுவையான கிரேவி. தேங்காய் சட்னி மற்றும் சாம்பாருடன் பரிமாறப்படுகிறது." 
      }
    },
    { 
      id: 4, 
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=600&q=80", 
      tag: null,
      name: { en: "Poori Masala", ta: "பூரி மசாலா" }, 
      desc: { 
        en: "Fluffy wheat bread served with a spiced potato & onion curry.", 
        ta: "உருளைக்கிழங்கு மசாலாவுடன் பரிமாறப்படும் பொன்னிறமான பூரி." 
      }
    },
    { 
      id: 5, 
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7yq2Jf6anaGqqmiPRb40T43UjZK7QmMnSQk6FxmFkt63DsI6xCAcrpXhbSIZQTpLidMAMTxPDxPBrjYe_vusMk6NAYu70wa5_Gptd5GGVInAdAA_B0JItCx3McfMy_gC308scozQh49Y/s1600/IMG_20190820_152853.jpg", 
      tag: null,
      name: { en: "Kesari", ta: "கேசரி" }, 
      desc: { 
        en: "Sweet made with rava, sugar, and ghee. Usually served in functions.", 
        ta: "ரவை, சர்க்கரை மற்றும் நெய் சேர்த்து செய்யப்பட்ட இனிப்பு. இது விசேஷங்களில் மிகவும் பிரபலம்." 
      }
    },
    { 
      id: 6, 
      image: "https://www.awesomecuisine.com/wp-content/uploads/2008/02/idiyappam.jpg", 
      tag: null,
      name: { en: "Idiyappam", ta: "இடியாப்பம்" }, 
      desc: { 
        en: "Soft string rice noodles served with sweet coconut milk.", 
        ta: "இனிப்பு தேங்காய் பாலுடன் பரிமாறப்படும் மென்மையான இடியாப்பம்." 
      }
    }
  ],
  Lunch: [
    { 
      id: 7, 
      image: "https://tse1.mm.bing.net/th/id/OIP.YG95IXw215wyaqfX0Mik7QHaEK?pid=Api&P=0&h=180", 
      tag: null,
      name: { en: "Rice", ta: "சாதம்" }, 
      desc: { 
        en: "Soft cooked grains that serve as the main food in most meals.", 
        ta: "கறி, குழம்பு அல்லது சாம்பாருடன் சாப்பிடக்கூடிய மென்மையான சாதம்." 
      }
    },
    { 
      id: 8, 
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/sambar.jpg", 
      tag: null,
      name: { en: "Sambar", ta: "சாம்பார்" }, 
      desc: { 
        en: "A mixed vegetable dal curry. It is healthy and very tasty.", 
        ta: "காய்கறிகள் மற்றும் பருப்பு சேர்த்து செய்யப்பட்ட ஆரோக்கியமான மற்றும் சுவையான குழம்பு." 
      }
    },
    { 
      id: 9, 
      image: "https://www.padhuskitchen.com/wp-content/uploads/2018/03/vendakkaipulikulambu.jpg", 
      tag: null,
      name: { en: "Puli Kulambu", ta: "புளிக்குழம்பு" }, 
      desc: { 
        en: "A tangy tamarind curry served with rice.", 
        ta: "புளி மற்றும் மசாலா சேர்த்து செய்யப்பட்ட காரமான மற்றும் சுவையான குழம்பு." 
      }
    },
    { 
      id: 10, 
      image: "https://paattiskitchen.com/wp-content/uploads/2022/11/kmc_20221106_190919-1200x675.jpg", 
      tag: null,
      name: { en: "Poriyal", ta: "பொரியல்" }, 
      desc: { 
        en: "Lightly fried vegetables cooked with coconut and mild spices.", 
        ta: "தேங்காய் மற்றும் மிதமான மசாலா சேர்த்து வதக்கிய காய்கறிகள்." 
      }
    },
    { 
      id: 11, 
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2018/11/rasam-recipe.jpg", 
      tag: null,
      name: { en: "Rasam", ta: "ரசம்" }, 
      desc: { 
        en: "A thin, spicy, and sour soup made with tamarind and pepper.", 
        ta: "புளி, மிளகு மற்றும் சீரகம் சேர்த்து செய்யப்பட்ட ஜீரணத்தை தூண்டும் சூப்." 
      }
    },
    { 
      id: 12, 
      image: "http://cravecookclick.com/wp-content/uploads/2014/09/IMG_9229-2.jpg", 
      tag: null,
      name: { en: "Paruppu Payasam", ta: "பருப்பு பாயசம்" }, 
      desc: { 
        en: "A sweet made with dal, jaggery, and coconut.", 
        ta: "பருப்பு, வெல்லம் மற்றும் தேங்காய் பால் சேர்த்து செய்யப்பட்ட பாரம்பரிய இனிப்பு." 
      }
    }
  ],
  Dinner: [
    { 
      id: 13, 
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80", 
      tag: null,
      name: { en: "Kal Dosa", ta: "கல் தோசை" }, 
      desc: { 
        en: "Thick, soft dosa cooked on a hot stone. Crispy outside, soft inside.", 
        ta: "சூடான கல்லில் சுடப்பட்ட, வெளிப்புறம் மொறுமொறுப்பாகவும் உள்ளே மென்மையாகவும் இருக்கும் தோசை." 
      }
    },
    { 
      id: 14, 
      image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1b/cf/74/3f/parotta-salna-with-chutney.jpg", 
      tag: { en: "Classic", ta: "கிளாசிக்" },
      name: { en: "Parotta Salna", ta: "பரோட்டா சால்னா" }, 
      desc: { 
        en: "Flaky layered flatbread served with a rich, empty salna gravy.", 
        ta: "அடுக்கு பரோட்டா மற்றும் சுவையான சால்னா கிரேவி." 
      }
    },
    { 
      id: 15, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpKRs9S5Lc1XUFjgwbg7QuZxtZ0ox4zlujg&s", 
      tag: { en: "Light", ta: "லேசான உணவு" },
      name: { en: "Idiyappam", ta: "இடியாப்பம்" }, 
      desc: { 
        en: "Steamed rice string hoppers with a mild coconut milk vegetable stew.", 
        ta: "ஆவியில் வேகவைத்த இடியாப்பம் மற்றும் தேங்காய் பால் குருமா." 
      }
    },
    { 
      id: 16, 
      image: "https://tse3.mm.bing.net/th/id/OIP.dVhsa6_d0Sw1QnmqdZBvQgHaEK?pid=Api&P=0&h=180", 
      tag: { en: "Spicy", ta: "காரம்" },
      name: { en: "Kothu Parotta", ta: "கொத்து பரோட்டா" }, 
      desc: { 
        en: "Chopped parotta fried with eggs/vegetables and spices.", 
        ta: "முட்டை, காய்கறிகள் மற்றும் மசாலா சேர்த்து கொத்தி போடப்பட்ட பரோட்டா." 
      }
    },
    { 
      id: 17, 
      image: "https://vismaifood.com/storage/app/uploads/public/45a/29b/a17/thumb__700_0_0_0_auto.jpg", 
      tag: { en: "Light", ta: "லேசான உணவு" },
      name: { en: "Masala Dosa", ta: "மசால் தோசை" }, 
      desc: { 
        en: "Crispy dosa stuffed with spiced potato masala.", 
        ta: "உருளைக்கிழங்கு மசாலா உள்ளீடாக வைக்கப்பட்ட மொறுமொறுப்பான தோசை." 
      }
    },
    { 
      id: 18, 
      image: "https://www.krumpli.co.uk/wp-content/uploads/2023/05/Homemade-Indian-Chapati-02-1200x1200.jpg", 
      tag: { en: "Light", ta: "லேசான உணவு" },
      name: { en: "Chapati", ta: "சப்பாத்தி" }, 
      desc: { 
        en: "Soft wheat bread served with side dishes.", 
        ta: "சைட் டிஷ் உடன் சாப்பிடக்கூடிய மென்மையான கோதுமை சப்பாத்தி." 
      }
    },
  ],
  Desserts: [
    { 
      id: 19, 
      image: "https://www.nestleprofessional.in/sites/default/files/2022-07/Elaneer-Payasam-420x330.jpg", 
      tag: { en: "Signature", ta: "சிறப்பு" },
      name: { en: "Elaneer Payasam", ta: "இளநீர் பாயசம்" }, 
      desc: { 
        en: "Tender coconut soufflé, a sweet finish to a grand meal.", 
        ta: "இளநீர் சேர்த்து செய்யப்பட்ட மிகவும் சுவையான பாயசம்." 
      }
    },
    { 
      id: 20, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_2_kgNFhaEQzChHtBoJqx9h7nwx7K94Ykiw&s", 
      tag: null,
      name: { en: "Gulab Jamun", ta: "குலாப் ஜாமூன்" }, 
      desc: { 
        en: "Fried dough balls soaked in rose-scented sugar syrup.", 
        ta: "சர்க்கரை பாகில் ஊறிய மென்மையான உருண்டைகள்." 
      }
    },
    { 
      id: 21, 
      image: "https://images.herzindagi.info/image/2020/Apr/butterscotch-ice-cream-recipe-two.jpg", 
      tag: null,
      name: { en: "Ice Cream", ta: "ஐஸ்கிரீம்" }, 
      desc: { 
        en: "Cold, sweet dessert. Flavors: Vanilla, Chocolate, Strawberry.", 
        ta: "வெண்ணிலா, சாக்லேட் மற்றும் ஸ்ட்ராபெரி சுவைகளில் குளிர்ந்த ஐஸ்கிரீம்." 
      }
    },
    { 
      id: 22, 
      image: "https://i.etsystatic.com/41529586/r/il/34cf51/6857592797/il_1140xN.6857592797_7ve7.jpg", 
      tag: null,
      name: { en: "Cassata", ta: "கசட்டா" }, 
      desc: { 
        en: "Layered ice cream cake with fruits and nuts.", 
        ta: "பழங்கள் மற்றும் நட்ஸ் நிறைந்த ஐஸ்கிரீம் கேக்." 
      }
    },
  ],
  Beverages: [
    { 
      id: 23, 
      image: "https://www.agoraliarecipes.com/wp-content/uploads/2022/08/AR000232JR-Indian-Kaapi-Filter-Coffee-FTR1-ph01-Shtr_SMALL.jpg", 
      tag: { en: "Hot", ta: "சூடானது" },
      name: { en: "Filter Coffee", ta: "ஃபில்டர் காபி" }, 
      desc: { 
        en: "Traditional South Indian frothy coffee served in brass davara tumblers.", 
        ta: "பித்தளை டபராவில் பரிமாறப்படும் பாரம்பரிய தென்னிந்திய காபி." 
      }
    },
    { 
      id: 24, 
      image: "https://media.istockphoto.com/id/1790684411/photo/iced-strawberry-milk-or-rose-milk-served-in-disposable-glass-with-ice-cube-isolated-on-wooden.jpg?s=612x612&w=0&k=20&c=E_8BXDJKUti7R6I_cAVAfC7g-4mKWxh7VSlSZ3CjKgI=", 
      tag: { en: "Cold", ta: "குளிர்ச்சி" },
      name: { en: "Rose Milk", ta: "ரோஸ் மில்க்" }, 
      desc: { 
        en: "Chilled milk flavored with rose syrup and basil seeds.", 
        ta: "ரோஸ் சிரப் மற்றும் சப்ஜா விதைகள் கலந்த குளிர்ந்த பால்." 
      }
    },
    { 
      id: 25, 
      image: "https://tse1.mm.bing.net/th/id/OIP.Rtl01wGiHE9R00_nI-u-5wHaE7?pid=Api&P=0&h=180", 
      tag: { en: "Hot", ta: "சூடானது" },
      name: { en: "Badam Milk", ta: "பாதாம் பால்" }, 
      desc: { 
        en: "Warm milk mixed with almond paste, sugar, and cardamom.", 
        ta: "பாதாம் விழுது, சர்க்கரை மற்றும் ஏலக்காய் கலந்த ஆரோக்கியமான பால்." 
      }
    },
    { 
      id: 26, 
      image: "https://tse2.mm.bing.net/th/id/OIP.A5mtAMf2lMLLZUEGL8sJEQHaFj?pid=Api&P=0&h=180", 
      tag: { en: "Hot", ta: "சூடானது" },
      name: { en: "Tea", ta: "தேநீர்" }, 
      desc: { 
        en: "Hot drink made with milk, tea powder, and sugar.", 
        ta: "பால், தேயிலை மற்றும் சர்க்கரை கலந்த சூடான பானம்." 
      }
    },
  ]
};

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("Lunch");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Language State: 'en' or 'ta'
  const [lang, setLang] = useState('en');

  // Toggle Function
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ta' : 'en');
  };

  const handleEnquiry = (item) => {
    setSelectedItem(item);
    setIsEnquiryOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-amber-500 selection:text-black">
        
        {/* --- DECORATIVE ELEMENTS --- */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-amber-900/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        {/* --- LANGUAGE TOGGLE (Floating Top Right or Near Title) --- */}
        <div className="absolute top-24 right-6 z-20">
          <button 
            onClick={toggleLang}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <span className={lang === 'en' ? "text-amber-400" : "text-gray-500"}>ENG</span>
            <span className="w-[1px] h-3 bg-white/30"></span>
            <span className={lang === 'ta' ? "text-amber-400" : "text-gray-500"}>தமிழ்</span>
          </button>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-16 px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase block mb-4">
              {uiText[lang].subtitle}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6">
              {uiText[lang].title} <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">{uiText[lang].titleHighlight}</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
              {uiText[lang].desc}
            </p>
          </motion.div>
        </section>

        {/* --- TAB NAVIGATION --- */}
        <div className="sticky top-24 z-30 py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex justify-center min-w-max gap-4 md:gap-8">
              {categoryConfig.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`
                    relative px-6 py-3 text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300
                    ${activeTab === cat.key ? 'text-amber-400' : 'text-gray-500 hover:text-white'}
                  `}
                >
                  {/* Display the label based on current language */}
                  {cat.label[lang]} 
                  
                  {activeTab === cat.key && (
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
              key={activeTab + lang} // Remount when tab OR language changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
              {menuItems[activeTab]?.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleEnquiry(item)}
                  className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-colors duration-500 cursor-pointer"
                >
                  
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name[lang]} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90" />
                    
                    {/* Tag Badge */}
                    {item.tag && (
                      <span className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        {item.tag[lang]}
                      </span>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-8 relative -mt-12">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-2xl font-serif text-white group-hover:text-amber-400 transition-colors duration-300">
                        {item.name[lang]}
                      </h3>
                      <div className="h-[1px] flex-grow bg-white/10 mx-4"></div>
                      <span className="text-amber-500 text-xl">✦</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[40px]">
                      {item.desc[lang]}
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

      {/* --- ENQUIRY MODAL --- */}
      <AnimatePresence>
        {isEnquiryOpen && selectedItem && (
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
              className="bg-[#111] text-white rounded-2xl p-8 w-[90%] max-w-md border border-white/10 relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-amber-400">
                  {uiText[lang].enquiryTitle}
                </h2>
                <button
                  onClick={() => setIsEnquiryOpen(false)}
                  className="text-white/50 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Selected Item Detail */}
              <div className="mb-6">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name[lang]}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-bold">{selectedItem.name[lang]}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedItem.desc[lang]}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsEnquiryOpen(false)}
                  className="px-5 py-2 text-sm uppercase tracking-widest text-gray-400 hover:text-white"
                >
                  {uiText[lang].cancel}
                </button>
                <button
                  className="px-6 py-2 bg-amber-500 text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-amber-400 transition"
                >
                  {uiText[lang].proceed}
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