import React from 'react';
import { motion } from 'framer-motion';

// --- DATA: The Story Timeline ---
const storyEvents = [
  {
    year: "2015",
    title: "The Beginning",
    description: "Started with a small kitchen and a big dream. Chef Sebastian served his first 50-guest wedding.",
    image: "https://img.freepik.com/free-photo/beautiful-closeup-shot-yellow-green-plant-sand_181624-3877.jpg",
    icon: "🍳"
  },
  {
    year: "2018",
    title: "Expansion",
    description: "Opened our central kitchen. Introduced the famous 'Royal Thali' which became a city favorite.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
    icon: "🚀"
  },
  {
    year: "2021",
    title: "Award Winning",
    description: "Recognized as 'Best Wedding Caterer'. Expanded menu to include global live counters.",
    image: "https://img.freepik.com/free-vector/realistic-oscars-film-awards-background_23-2151250619.jpg?semt=ais_hybrid&w=740&q=80",
    icon: "🏆"
  },
  {
    year: "2024",
    title: "The Grand Era",
    description: "Synonymous with luxury. Serving 200+ grand events annually with unforgettable experiences.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    icon: "👑"
  }
];

const TimelineItem = ({ event, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`
      relative flex items-center
      /* Mobile: Row layout to allow left/right positioning relative to center line */
      flex-row w-full mb-12
      /* Desktop: Column layout for horizontal timeline */
      md:flex-col md:w-1/4 md:mb-0
      /* Mobile Alignment: Zigzag */
      ${isEven ? 'justify-start' : 'justify-end'}
      md:justify-start
    `}>
      
      {/* --- CONNECTING LINES --- */}
      {/* Desktop Horizontal Line */}
      {index !== storyEvents.length - 1 && (
        <div className="hidden md:block absolute top-1/2 left-[50%] w-full h-1 bg-gradient-to-r from-amber-500/50 to-amber-500/20 -translate-y-1/2 -z-10" />
      )}

      {/* --- CENTER ICON NODE --- */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className={`
          w-12 h-12 bg-amber-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center text-xl shadow-lg shadow-amber-500/50 z-20 
          /* Mobile: Absolute center */
          absolute left-1/2 transform -translate-x-1/2
          /* Desktop: Static position */
          md:static md:translate-x-0 md:order-2 md:self-center
        `}
      >
        {event.icon}
      </motion.div>

      {/* --- CONTENT CARD --- */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 0 }} // Mobile Slide In
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`
          relative p-4
          /* Mobile: Width 45% to fit on one side of line */
          w-[45%]
          /* Desktop: Full width of the column */
          md:w-full
          /* Desktop Positioning: Alternate Top/Bottom */
          ${isEven ? 'md:bottom-[calc(50%+2rem)]' : 'md:top-[calc(50%+2rem)]'}
          md:absolute md:left-0
        `}
      >
        {/* Card Body */}
        <div className={`
          bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-amber-500/50 transition-colors group-hover:bg-white/10
          flex flex-col ${isEven ? 'md:flex-col-reverse' : 'md:flex-col'}
        `}>
          
          {/* Image */}
          <div className="h-32 md:h-40 overflow-hidden relative">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
          </div>

          {/* Text Content */}
          <div className="p-4 relative">
            <span className="text-amber-500 font-bold text-2xl md:text-4xl absolute -top-6 right-2 md:static md:block md:text-5xl md:opacity-20 md:mb-2 drop-shadow-md md:drop-shadow-none">
              {event.year}
            </span>
            <h3 className="text-lg md:text-xl font-serif text-white mb-1 md:mb-2">{event.title}</h3>
            <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed line-clamp-3 md:line-clamp-none">
              {event.description}
            </p>
          </div>

        </div>

        {/* Desktop Arrow/Connector to Center Line */}
        <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-amber-500/50 ${isEven ? '-bottom-8' : '-top-8'}`} />
        
        {/* Mobile Arrow (pointing to center) */}
        <div className={`
          md:hidden absolute top-6 w-4 h-0.5 bg-amber-500/50
          ${isEven ? '-right-4' : '-left-4'}
        `} />
        
      </motion.div>

    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 overflow-x-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-24 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-amber-500 font-mono text-sm uppercase tracking-[0.3em]"
        >
          Our Journey
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif mt-4"
        >
          Story of <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">SK Caterings</span>
        </motion.h1>
      </div>

      {/* --- TIMELINE CONTAINER --- */}
      <div className="container mx-auto px-2 md:px-6 relative h-full">
        
        {/* Mobile Vertical Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/20 via-amber-500/50 to-amber-500/20 -translate-x-1/2 md:hidden" />

        {/* The Timeline Flex Wrapper */}
        {/* Mobile: flex-col (Vertical) | Desktop: flex-row (Horizontal) */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center relative md:h-[600px] md:px-10">
          
          {/* Desktop Main Horizontal Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/5 -z-10" />

          {storyEvents.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}

        </div>

      </div>
    </div>
  );
};

export default AboutPage;