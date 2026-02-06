import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMAGES ---
const sleepingKumba = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC6LLF9xlSNNHCgFAhNfESp3YoZzmU3jM7Qw&s"; 
const awakeKumba = "https://cdn.iconscout.com/icon/premium/png-256-thumb/hungry-ravana-sticker-icon-svg-download-png-1716143.png"; 

// --- DATA ---
const faqData = [
  { 
  question: "Do you offer both Buffet and Leaf service?", 
  answer: "Yes, we specialize in both traditional Banana Leaf (Ilai Sappadu) service and modern luxury buffet setups depending on your event requirements." 
},
  { question: "Do you do destination weddings?", answer: "Yes! We specialize in destination catering across South India. We bring our own kitchen setup." },
  { question: "Minimum order quantity?", answer: "We cater to events with a minimum of 50 guests." },
  { question: "Can I customize the menu?", answer: "Absolutely! You can mix and match items from our Royal, Gold, and Platinum packages." },
  { question: "How do I book?", answer: "You can book a tasting session by clicking the 'Order Online' button or calling us at +91-9514001155." }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Vanakkam! I am Ghatotkacha, your Feast Guide. Ask me anything about our royal menu!" }

  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleQuestionClick = async (q) => {
    setMessages(prev => [...prev, { type: 'user', text: q.question }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: q.answer }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-28 right-2 z-50 flex flex-col items-end pointer-events-none">
      
      {/* --- CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-72 md:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-yellow-500 origin-bottom-right flex flex-col pointer-events-auto max-h-[70vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-yellow-500 p-3 flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-full p-1 border-2 border-orange-800 overflow-hidden flex items-center justify-center">
                <img src={awakeKumba} alt="Kumba Bot" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Ghato Bot</h3>
                <p className="text-orange-100 text-[10px]">Online & Hungry</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="ml-auto text-white/80 hover:text-white text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 bg-[#FFFBEB] space-y-3 min-h-[200px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${
                      msg.type === 'user' ? 'bg-orange-100 text-orange-900 rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-xl rounded-tl-none border border-gray-100 flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold ml-1">Quick Ask:</p>
              <div className="flex flex-wrap gap-1.5">
                {faqData.map((item, idx) => (
                  <button key={idx} onClick={() => handleQuestionClick(item)}
                    className="px-2 py-1 bg-white border border-orange-200 text-orange-700 text-[11px] rounded-full hover:bg-orange-50 transition-colors shadow-sm"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HOVER TEXT (TOOLTIP) --- */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, x: -10 }}
            animate={{ opacity: 1, y: -10, x: -10 }}
            exit={{ opacity: 0, y: 10, x: -10 }}
            className="absolute right-0 bottom-full mb-2 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          >
            Chat with Ghato!
            {/* Tiny arrow at the bottom of tooltip */}
            <div className="absolute top-full right-6 -mt-1 border-8 border-transparent border-t-orange-600"></div>
          </motion.span>
        )}
      </AnimatePresence>

      {/* --- FLOATING BUTTON --- */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative w-16 h-16 bg-white rounded-full shadow-2xl border-4 border-yellow-500 overflow-hidden p-1 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.img 
              key="awake" src={awakeKumba} alt="Awake" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <motion.img 
              key="sleeping" src={sleepingKumba} alt="Sleeping" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full h-full object-contain"
            />
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <motion.div 
            animate={{ opacity: [0, 1, 0], y: [0, -15, -20] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1 right-2 text-blue-500 font-bold text-[10px]"
          >
            Zzz
          </motion.div>
        )}
        <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
      </motion.button>

    </div>
  );
};

export default Chatbot;