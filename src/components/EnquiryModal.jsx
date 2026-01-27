import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
const spices = [
  "https://media.istockphoto.com/id/137916436/photo/anise-stars.jpg?s=612x612&w=0&k=20&c=xMpki9OcvKiAyelWcQKEEoVANs7oDGTUb5WfuADGyRs=",
  "https://cdn.britannica.com/07/123107-050-1520881F/bark-Cinnamomum-cassia-plant-spice.jpg",
  "https://images.jdmagicbox.com/quickquotes/images_main/spice-pepper-2018724463-1k9um09i.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWDXOAJ55Lo2uEJikc4mLgZK573LrWz2dNwQ&s"
];

const FallingSpice = ({ src }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 0.5;
  const randomDuration = 2 + Math.random() * 2;

  return (
    <motion.img
      src={src}
      initial={{ y: -100, x: `${randomX}vw`, opacity: 0, rotate: 0 }}
      animate={{ 
        y: "120vh", 
        opacity: [0, 1, 1, 0], 
        rotate: 360 
      }}
      transition={{ 
        duration: randomDuration, 
        delay: randomDelay, 
        ease: "linear"
      }}
      className="fixed top-0 w-10 h-10 object-contain pointer-events-none z-[80]"
      style={{ left: 0 }}
    />
  );
};

const EnquiryModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-white/60 backdrop-blur-md"
          />

          {spices.map((src, i) => (
             <React.Fragment key={i}>
                <FallingSpice src={src} />
                <FallingSpice src={src} /> 
             </React.Fragment>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* REDUCED SIZE: changed max-w-lg to max-w-md and reduced padding */}
            <div className="bg-white border border-amber-100 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-auto relative">
              
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-amber-50 to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-20 text-xs"
              >
                ✕
              </button>

              <div className="p-6 relative z-10">
                <div className="text-center mb-6">
                  <span className="text-amber-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block">
                    Plan Your Event
                  </span>
                  <h2 className="text-2xl font-serif text-gray-900">Request a Quote</h2>
                  <p className="text-gray-500 text-xs mt-1 px-4">
                    Fill in the details for a royal menu proposal.
                  </p>
                </div>

                <form className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Phone</label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Event Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-amber-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Guests</label>
                      <div className="relative">
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-amber-500 transition-all appearance-none">
                          <option>Select...</option>
                          <option>50 - 100</option>
                          <option>100+</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-amber-700 font-semibold ml-1">Event Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Wedding', 'Corp', 'Private'].map((type) => (
                        <label key={type} className="cursor-pointer">
                          <input type="radio" name="eventType" className="peer sr-only" />
                          <div className="text-center py-1.5 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-[11px] peer-checked:bg-amber-600 peer-checked:text-white peer-checked:border-amber-600 transition-all hover:bg-gray-100">
                            {type}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-amber-700 font-semibold ml-1">Message</label>
                    <textarea 
                      rows="2" 
                      placeholder="Preferences..." 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-base rounded-lg shadow-md mt-2 transition-colors"
                  >
                    Send Enquiry
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;