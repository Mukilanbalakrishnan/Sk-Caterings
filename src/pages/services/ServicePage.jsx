import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- SERVICE DATA ---
const services = [
  {
    id: 1,
    title: "Wedding Grandeur",
    // path removed, we will use ID
    description: "Orchestrating your fairy-tale wedding with royal feasts, exquisite decor, and seamless service that leaves guests spellbound.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    icon: "💍"
  },
  {
    id: 2,
    title: "Birthday Bash",
    description: "From first birthdays to milestone jubilees, we craft fun, vibrant, and delicious experiences tailored to your specific theme.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/051/420/124/small/birthday-celebration-cake-happy-birthday-background-with-copy-space-colorful-background-wallpaper-backdrop-photo.jpg",
    icon: "🎉"
  },
  {
    id: 3,
    title: "Corporate Meets",
    description: "Professional catering for official meetings, conferences, and gala dinners. Impress clients with our executive culinary standards.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    icon: "🤝"
  },
  {
    id: 4,
    title: "Baby Shower",
    description: "Welcoming the little one with joy! Pastel themes, cute treats, and a warm atmosphere for the mother-to-be.",
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    icon: "👶"
  },
  {
    id: 5,
    title: "Private Parties",
    description: "Intimate gatherings, anniversaries, or family reunions. We handle the food so you can focus on making memories.",
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800&q=80",
    icon: "🥂"
  }
];

const ServicePage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle Resize for Responsive Logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative selection:bg-amber-500 selection:text-black pt-[90px] md:pt-[110px]">
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="relative z-30 p-8 flex justify-between items-center">
        <Link to="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-widest text-xs font-bold"
          >
            ← Back Home
          </motion.button>
        </Link>
        <div className="text-right">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-serif text-white"
          >
            Our <span className="text-amber-500 italic">Expertise</span>
          </motion.h2>
        </div>
      </div>

      {/* --- SERVICE CONTAINER --- */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 md:px-8 pb-12">
        
        <div className="flex flex-col md:flex-row gap-4 md:h-[75vh]">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const flexValue = isMobile ? 'auto' : (hoveredIndex === null ? 1 : isHovered ? 3.5 : 0.5);

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  flex: flexValue
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 1, 0.5, 1],
                  delay: index * 0.1 
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 group bg-[#111]
                  ${isMobile ? 'h-[250px] mb-4' : 'h-full'} 
                  ${isHovered ? 'shadow-2xl shadow-amber-900/20 ring-1 ring-amber-500/50' : ''}
                `}
              >
                {/* --- UPDATED LINK WITH ID --- */}
                {/* This will generate links like /services/1, /services/2 etc. */}
                <Link to={`/services/${service.id}`} className="block w-full h-full relative">
                  
                  {/* --- BACKGROUND IMAGE --- */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95" />
                  </motion.div>

                  {/* --- CONTENT AREA --- */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    
                    {/* Top Icon & Number */}
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 flex justify-between w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] items-start">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-2xl border border-white/10 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-500">
                        {service.icon}
                      </div>
                      <span className="text-4xl font-serif text-white/10 group-hover:text-amber-500/20 transition-colors font-bold">
                        0{service.id}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="relative z-10">
                      <motion.h3 
                        layout="position"
                        className={`
                          font-serif text-2xl md:text-4xl text-white mb-3 origin-left
                          ${isHovered ? 'text-amber-400' : ''}
                        `}
                      >
                        {service.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: isMobile || isHovered ? "auto" : 0,
                          opacity: isMobile || isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="border-l-2 border-amber-500 pl-4 mb-4">
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Fake Button Look */}
                        <div className="text-xs font-bold uppercase tracking-widest text-white hover:text-amber-400 flex items-center gap-2 group/btn">
                          View Details
                          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Vertical Title (Desktop Only - when collapsed) */}
                    {!isMobile && !isHovered && hoveredIndex !== null && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap -rotate-90 origin-center"
                      >
                        <span className="text-white/50 text-sm uppercase tracking-[0.3em] font-mono">
                          {service.title}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </Link>

              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ServicePage;