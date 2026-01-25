import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: Client Reviews ---
const reviews = [
  {
    id: 1,
    name: "Sandra Blake",
    role: "CEO, Digital Agency",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    text: "The presentation was absolute perfection. SK Caterings created an atmosphere, not just a meal.",
    category: "Corporate"
  },
  {
    id: 2,
    name: "Robert Fox",
    role: "Event Planner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: "The live pasta station was a showstopper. Professionalism unmatched.",
    category: "Events"
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: "They made my wedding day magical. Traditional roots with a modern twist.",
    category: "Wedding"
  },
  {
    id: 4,
    name: "Paula Reynolds",
    role: "Hotel Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    text: "Impeccable hygiene and taste. They handled our destination logistics flawlessly.",
    category: "Logistics"
  },
  {
    id: 5,
    name: "Sophia Anderson",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    text: "A culinary masterpiece. The desserts were not just food, they were art.",
    category: "Artistry"
  },
  {
    id: 6,
    name: "Olivia Miller",
    role: "Jewelry Owner",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    text: "We hired them for a private dinner. The food was simply divine. 10/10.",
    category: "Private"
  }
];

const TestimonialsSection = () => {
  const [activeReview, setActiveReview] = useState(reviews[2]); // Default to middle one

  return (
    <section className="relative w-full min-h-screen bg-[#111] overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* --- BACKGROUND: Dynamic Gradient Mesh --- */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#f59e0b,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* --- SECTION TITLE --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-0 w-full text-center z-10"
      >
        <span className="text-yellow-600 tracking-[0.5em] text-xs uppercase font-bold">Voices of Trust</span>
      </motion.div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center justify-between h-full">
        
        {/* --- LEFT: The "Galaxy" of Avatars --- */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative flex items-center justify-center">
          {/* Central Orbit Lines */}
          <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
          <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />

          {reviews.map((review, index) => {
            // Calculate circular positioning
            const angle = (index / reviews.length) * 360;
            const radius = 140; // Distance from center
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.button
                key={review.id}
                className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full p-1 border-2 transition-all duration-500 ease-out"
                style={{ 
                  x, y,
                  borderColor: activeReview.id === review.id ? '#F59E0B' : 'rgba(255,255,255,0.1)',
                  zIndex: activeReview.id === review.id ? 20 : 10
                }}
                onClick={() => setActiveReview(review)}
                whileHover={{ scale: 1.2 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className={`w-full h-full rounded-full object-cover transition-all duration-500 ${activeReview.id === review.id ? 'grayscale-0' : 'grayscale opacity-60 hover:opacity-100'}`}
                />
                
                {/* Connecting Line to Center (Visual Only) */}
                {activeReview.id === review.id && (
                  <motion.div 
                    layoutId="connector"
                    className="absolute top-1/2 left-1/2 w-[200px] h-[1px] bg-gradient-to-r from-yellow-500 to-transparent -z-10 origin-left"
                    style={{ transform: `rotate(${180 + angle}deg)` }}
                  />
                )}
              </motion.button>
            );
          })}

          {/* Central Pulse */}
          <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_20px_#F59E0B]" />
        </div>

        {/* --- RIGHT: Kinetic Typography Display --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left pl-0 md:pl-10 mt-10 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-6xl text-yellow-600/30 font-serif">“</span>
                <span className="px-3 py-1 border border-yellow-600/30 text-yellow-500 text-xs rounded-full uppercase tracking-widest">
                  {activeReview.category}
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl text-white font-light leading-relaxed mb-8">
                {activeReview.text}
              </h3>

              <div className="border-l-2 border-yellow-600 pl-4">
                <h4 className="text-xl font-bold text-white">{activeReview.name}</h4>
                <p className="text-gray-400 text-sm mt-1">{activeReview.role}</p>
                
                <div className="flex gap-1 mt-2 text-yellow-500 text-xs">
                  {'★'.repeat(5)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* --- FLOATING DECOR --- */}
      <div className="absolute bottom-10 right-10 text-white/5 text-[10rem] font-serif leading-none pointer-events-none select-none">
        Reviews
      </div>

    </section>
  );
};

export default TestimonialsSection;