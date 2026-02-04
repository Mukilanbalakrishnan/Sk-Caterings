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
    description:
      "Orchestrating your fairy-tale wedding with royal feasts. We specialize in traditional multi-course meals served on banana leaves.",

    menu: {
      breakfast: [
        {
          image: "/assets/weddingbreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/weddinglunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/weddingdinner.png",
          label: "Elegant Wedding Dinner"
        }
      ]
    }
  }
  ,
  {
    id: 2,
    title: "Big Office Parties",
    description:
      "We serve food for office meetings and company parties with clean and proper service.",

    menu: {
      breakfast: [
        {
          image: "/assets/coorparatebreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/lunchcoorparate.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/coorparatedinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },
  {
    id: 3,
    title: "Baby shower",
    description:
      "Baby Shower is a small celebration to wish a mother and her baby good health and happiness.",

    menu: {
      breakfast: [
        {
          image: "/assets/babybreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/babylunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/babydinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },

  {
    id: 4,
    title: "Birthday Parties",
    description:
      "We give food for small home parties like birthday and anniversary.",

    menu: {
      breakfast: [
        {
          image: "/assets/birthdaybreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/birthdaylunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/birthdaydinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },
  {
    id: 5,
    title: "Family & Small Functions",
    description:
      "We provide tasty and traditional food for family functions like pooja, anniversaries, and small gatherings.",

    menu: {
      breakfast: [
        {
          image: "/assets/functionbreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/functionlunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        } 
      ],
      dinner: [
        {
          image: "/assets/functiondinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },
  {
    id: 6,
    title: "Engagement",
    description:
      "We give simple and tasty food for engagement function.",

    menu: {
      breakfast: [
        {
          image: "/assets/engagementbreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/engagementlunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/engagementdinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },
  {
    id: 7,
    title: "Mehandhi / Sangeet / Haldi",
    description:
      "We serve snacks, sweets, and special food for these functions.",

    menu: {
      breakfast: [
        {
          image: "/assets/mehandibreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/mehandilunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/mehandidinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },

  {
    id: 8,
    title: "Religious Ceremonies",
    description:
      "We cook clean and pure traditional food for temple and puja events.",

    menu: {
      breakfast: [
        {
          image: "/assets/religiousbreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/religiouslunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/religiousdinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },

  {
    id: 9,
    title: "Alumni Meet / Retirement Party",
    description:
      "We provide good food for old students meet and retirement parties.",

    menu: {
      breakfast: [
        {
          image: "/assets/aluminibreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/aluminilunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/aluminidinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },
  {
    id: 10,
    title: "House Warming",
    description:
      "We serve fresh and traditional food for new house opening.",

    menu: {
      breakfast: [
        {
          image: "/assets/housewarmingbreakfast.png",
          label: "Traditional South Indian Breakfast"
        }
      ],
      lunch: [
        {
          image: "/assets/housewarminglunch.png",
          label: "Grand Banana Leaf Wedding Lunch"
        }
      ],
      dinner: [
        {
          image: "/assets/housewarmingdinner.png",
          label: "Elegant Dinner"
        }
      ]
    }
  },

];







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
  const getBackgroundImage = () => {
    return service.menu?.[activeCategory]?.[0]?.image || "";
  };



  return (
    <>
      <Navbar />


      <div className="min-h-screen bg-gradient-to-br from-[#fdfcf9] via-[#f7f3eb] to-[#f2efe9] 
text-[#2b2b2b] relative overflow-hidden flex flex-col items-center 
pt-32 pb-10 font-sans">



        {/* Background Decor */}
        <div className="relative z-50 flex flex-wrap justify-center gap-4 mb-10 pointer-events-auto" />



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
            <div className="relative w-full pt-[80%] md:pt-[56%]">


              <motion.div
                ref={leafRef}
                layout
                className="absolute inset-0 overflow-visible pointer-events-none"
              >




                <img
                key={`${service.id}-${activeCategory}`}
                  src={getBackgroundImage()}
                  alt={activeCategory}
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ filter: "brightness(0.9) contrast(1.05)", marginTop: "60px" }}
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


                          return (
                            <motion.div
                              key={index}
                              className="flex flex-col items-center cursor-pointer"

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


                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}

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
                className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 border ${activeCategory === cat.id
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


            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-10">

              {service.menu[activeCategory].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.05 }}
                  onClick={() => {
                    if (isTouchDevice) setActiveItem(activeItem === index ? null : index);
                  }}
                  onMouseEnter={() => !isTouchDevice && setActiveItem(index)}
                  onMouseLeave={() => !isTouchDevice && setActiveItem(null)}
                >


                </motion.div>
              ))}
            </div>
          </motion.div>




        </div>
      </div>
      <Footer />
    </>
  );

};

export default ServiceDetail;