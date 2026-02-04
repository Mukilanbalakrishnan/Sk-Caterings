import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  date: "",
  guests: "",
  eventType: "",
  message: ""
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = () => {
  const text = 
`New Catering Enquiry
Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Guests: ${formData.guests}
Event: ${formData.eventType}
Message: ${formData.message}`;

  window.open(
    `https://wa.me/916369194095?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};



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
  className="fixed inset-0 z-[70] flex items-center justify-center p-4"
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

                <form className="space-y-3" onSubmit={handleSubmit}>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Name</label>
                      <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="John Doe"
  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 
text-sm text-gray-900 placeholder-gray-400 
focus:outline-none focus:border-amber-500"

/>

                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Phone</label>
                      <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="+91 98765..."
   className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 
text-sm text-gray-900 placeholder-gray-400 
focus:outline-none focus:border-amber-500"
/>

                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Event Date</label>
                      <input
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
   className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 
text-sm text-gray-900 placeholder-gray-400 
focus:outline-none focus:border-amber-500"
/>

                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-700 font-semibold ml-1">Guests</label>
                      <div className="relative">
                        <select
  name="guests"
  value={formData.guests}
  onChange={handleChange}
   className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 
text-sm text-gray-900 placeholder-gray-400 
focus:outline-none focus:border-amber-500"
>
  <option value="">Select...</option>
  <option value="50 - 100">50 - 100</option>
  <option value="100+">100+</option>
</select>

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
  <label className="text-[10px] text-amber-700 font-semibold ml-1">
    Event Type
  </label>
  <input
  type="text"
  name="eventType"
  value={formData.eventType}
  onChange={handleChange}
  placeholder="Wedding / Birthday / Office Party"
   className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 
text-sm text-gray-900 placeholder-gray-400 
focus:outline-none focus:border-amber-500"
/>

</div>


                  <div className="space-y-1">
                    <label className="text-[10px] text-amber-700 font-semibold ml-1">Message</label>
                    <textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  rows="2"
  placeholder="Preferences..."
   className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 
text-sm text-gray-900 placeholder-gray-400 
focus:outline-none focus:border-amber-500"
/>

                  </div>

                  <motion.button
  type="submit"
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.99 }}
  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-base rounded-lg shadow-md mt-2"
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