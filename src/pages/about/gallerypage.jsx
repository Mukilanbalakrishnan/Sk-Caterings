import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

// --- DATA ---
const categories = ["All", "Weddings", "Culinary", "Corporate", "Decor"];

const galleryData = [
  // --- WEDDINGS ---
  { id: 1, type: "image", category: "Weddings", src: "https://images.unsplash.com/photo-1519225469958-1934935f30d9?w=800&q=80", title: "Royal Mandap", size: "tall" },
  { id: 6, type: "image", category: "Weddings", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Bridal Entry", size: "wide" },
  {
    id: 9,
    type: "video",
    category: "Weddings",
    src: "https://assets.mixkit.co/videos/preview/mixkit-marriage-proposal-in-the-forest-4267-large.mp4",
    poster: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80",
    title: "Cinematic Moments",
    size: "wide"
  },

  // --- CULINARY ---
  {
    id: 2,
    type: "video",
    category: "Culinary",
    src: "https://assets.mixkit.co/videos/preview/mixkit-chef-putting-the-final-touch-on-a-dish-4099-large.mp4",
    poster: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
    title: "Chef's Signature",
    size: "wide"
  },
  { id: 5, type: "image", category: "Culinary", src: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&q=80", title: "Plating Art", size: "normal" },
  { id: 8, type: "image", category: "Culinary", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", title: "Live Station", size: "normal" },

  // --- CORPORATE ---
  {
    id: 4,
    type: "video",
    category: "Corporate",
    src: "https://assets.mixkit.co/videos/preview/mixkit-people-in-a-meeting-talking-3444-large.mp4",
    poster: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    title: "Gala Highlights",
    size: "tall"
  },

  // --- DECOR ---
  { id: 3, type: "image", category: "Decor", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", title: "Evening Lights", size: "normal" },
  { id: 7, type: "image", category: "Decor", src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80", title: "Floral Setup", size: "tall" },
];

// --- COMPONENT: 3D TILT CARD ---
const TiltCard = ({ item, onClick, onHoverStart, onHoverEnd, isMobile }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? ["3deg", "-3deg"] : ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? ["-3deg", "3deg"] : ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      onHoverStart();
      if (item.type === 'video' && videoRef.current) {
        videoRef.current.play().catch(() => { });
      }
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      className={`
        relative group cursor-pointer rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] 
        border border-white/10 overflow-hidden
        ${item.size === 'tall' ? 'row-span-2' : ''}
        ${item.size === 'wide' ? 'sm:col-span-2' : ''}
      `}
    >
      <div style={{ transform: "translateZ(40px)" }} className="absolute inset-0 z-10 pointer-events-none">
        {item.type === 'video' && (
          <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-0 transition-transform duration-300">
            <span className="text-white text-xs">▶</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <p className="text-amber-400 text-xs font-mono tracking-widest uppercase mb-2">{item.category}</p>
          <h3 className="text-xl font-serif text-white">{item.title}</h3>
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden">
        {item.type === 'video' ? (
          <motion.video ref={videoRef} src={item.src} poster={item.poster} muted loop playsInline className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
        ) : (
          <motion.img src={item.src} alt={item.title} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
        )}
      </div>
    </motion.div>
  );
};

// --- SECTION HEADER COMPONENT ---
const SectionHeader = ({ title, icon }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-4 mb-8 mt-12 first:mt-0"
  >
    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-500" />
    <h2 className="text-2xl md:text-3xl font-serif text-white/90 flex items-center gap-3">
      <span className="text-amber-500">{icon}</span> {title}
    </h2>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-amber-500/30 to-transparent" />
  </motion.div>
);

// --- MAIN PAGE ---
const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");

  // Cursor logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleMouseMove = (e) => { cursorX.set(e.clientX - 16); cursorY.set(e.clientY - 16); };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); };
  }, [cursorX, cursorY]);

  // FILTERING LOGIC
  const filteredData = activeFilter === "All" ? galleryData : galleryData.filter(item => item.category === activeFilter);
  const photos = filteredData.filter(item => item.type === 'image');
  const videos = filteredData.filter(item => item.type === 'video');

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden cursor-none selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Back Button */}
      <Link to="/about" className="fixed top-8 left-8 z-50 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          className="flex items-center gap-2 text-white/70 hover:text-amber-500 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          onMouseEnter={() => !isMobile && setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          ← <span className="hidden sm:inline text-sm font-bold uppercase tracking-widest">Back</span>
        </motion.button>
      </Link>

      {/* --- CUSTOM CURSOR (FIXED Z-INDEX TO 100) --- */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white/30 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
          style={{ x: cursorX, y: cursorY }}
          animate={cursorVariant === "hover" ? { width: 60, height: 60, backgroundColor: "rgba(245, 158, 11, 0.9)", borderColor: "transparent" } : { width: 16, height: 16 }}
        >
          <AnimatePresence>
            {cursorVariant === "hover" && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-black text-[10px] font-bold">OPEN</motion.span>}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Hero */}
      <section className="pt-32 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15),transparent_50%)] pointer-events-none" />
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-amber-500 font-mono text-xs tracking-[0.4em] uppercase block mb-4">
          Visual Archive
        </motion.span>
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-8xl font-serif mb-6">
          Our <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Portfolio</span>
        </motion.h1>
      </section>

      {/* Filter Dock */}
      <div className="sticky top-6 z-40 flex justify-center mb-16 px-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-wrap gap-2 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-full shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === cat ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- SPLIT CONTENT GRID --- */}
      <div className="container mx-auto px-6 pb-32 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* PHOTOS SECTION */}
            {photos.length > 0 && (
              <section className="mb-20">
                <SectionHeader title="Captured Moments" icon="📸" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                  {photos.map(item => (
                    <TiltCard key={item.id} item={item} onClick={setSelectedItem} onHoverStart={() => setCursorVariant("hover")} onHoverEnd={() => setCursorVariant("default")} isMobile={isMobile} />
                  ))}
                </div>
              </section>
            )}

            {/* VIDEOS SECTION */}
            {videos.length > 0 && (
              <section>
                <SectionHeader title="Cinematic Films" icon="🎬" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                  {videos.map(item => (
                    <TiltCard key={item.id} item={item} onClick={setSelectedItem} onHoverStart={() => setCursorVariant("hover")} onHoverEnd={() => setCursorVariant("default")} isMobile={isMobile} />
                  ))}
                </div>
              </section>
            )}

            {/* EMPTY STATE */}
            {filteredData.length === 0 && (
              <div className="text-center py-20 opacity-50">
                <p className="text-xl font-serif">No items found in this category.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setSelectedItem(null)}>
            <div className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
              <div className="w-full md:w-2/3 h-[400px] md:h-[600px] bg-black relative flex items-center justify-center">
                {selectedItem.type === 'video' ? (
                  <video src={selectedItem.src} controls autoPlay className="w-full h-full object-contain" />
                ) : (
                  <img src={selectedItem.src} alt={selectedItem.title} className="w-full h-full object-contain" />
                )}
              </div>
              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 bg-[#111]">
                <span className="text-amber-500 font-mono text-xs uppercase mb-4">{selectedItem.category} • {selectedItem.type === 'video' ? 'Video' : 'Photo'}</span>
                <h3 className="text-3xl font-serif text-white mb-4">{selectedItem.title}</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Experience the detail and emotion captured in this moment. We strive for perfection in every frame.</p>
                <button onClick={() => setSelectedItem(null)} className="w-full py-3 border border-white/20 text-white uppercase text-xs font-bold rounded-full hover:bg-white/10 transition">Close Preview</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default GalleryPage;