import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- IMAGES ---
const chefImage = "https://5.imimg.com/data5/SELLER/Default/2024/9/449821039/XJ/BE/GT/40158524/wedding-catering-services-1000x1000.jpg";

const AboutSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Magnetic Image Effect
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 30); // Rotate max 30deg
    mouseY.set(y * -30);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full py-24 md:py-40 bg-white overflow-hidden flex items-center justify-center text-black"
    >

      {/* --- UNIQUE BACKGROUND: MORPHING BLOB --- */}
      <motion.div
        animate={{
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 30% 70% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          rotate: 360
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 top-0 w-[500px] h-[500px] bg-orange-50/50 blur-3xl -z-10"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

          {/* === LEFT SIDE: MAGNETIC IMAGE CONTAINER === */}
          <motion.div
            className="w-full md:w-1/2 relative group"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMouse}
            onMouseEnter={() => setIsHovered(true)}
            style={{ perspective: 1000 }}
          >
            {/* Animated Background Geometric Plate */}
            <motion.div
              animate={{ rotate: isHovered ? 90 : 0, scale: isHovered ? 1.1 : 1 }}
              className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-orange-200 rounded-tl-[60px] pointer-events-none"
            />

            <motion.div
              style={{ rotateX: mouseY, rotateY: mouseX, transformStyle: "preserve-3d" }}
              className="relative z-10 rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] cursor-none"
            >
              <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
                <motion.img
                  src={chefImage}
                  alt="About SK Caterings"
                  className="w-full h-full object-cover scale-110"
                  animate={{ scale: isHovered ? 1.2 : 1.1 }}
                  transition={{ duration: 0.7 }}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Floating "Garnish" Particles on hover */}
                {isHovered && [...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -100, opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute bg-white/40 w-1 h-1 rounded-full"
                    style={{ left: `${20 + i * 15}%`, bottom: '10%' }}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Dynamic Badge */}
              <motion.div
                animate={{ y: isHovered ? -10 : 0 }}
                className="absolute bottom-8 left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold">SK</div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Established</p>
                  <p className="text-sm font-serif font-bold">Est. 1999</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* === RIGHT SIDE: TYPOGRAPHIC CONTENT === */}
          <motion.div className="w-full md:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="h-[1px] w-12 bg-orange-600" />
              <h4 className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs">The Culinary Heritage</h4>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-serif text-black mb-8 leading-[1.1]"
            >
              Crafting <br />
              <span className="italic text-orange-600">Memories</span>
            </motion.h2>

            {/* Shimmering Divider */}
            <div className="relative w-full h-[1px] bg-gray-100 mb-10 overflow-hidden">
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-orange-400 to-transparent"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-gray-600 text-xl leading-relaxed font-light italic">
                "At SK Caterings, we believe food is not just to eat — it is a feeling, an
                <span className="text-orange-600 font-medium"> அனுபவம் (anubavam)</span>."
              </p>

              <p className="mt-6 text-gray-800 text-lg leading-relaxed">
                With over <span className="font-bold text-black border-b-2 border-orange-300">25+ years of experience </span>
                in the catering industry, we have been proudly serving unforgettable food experiences since
                <span className="text-black font-bold"> 1999</span>.
                <br /><br />
                For us, catering is not just about cooking — it is about understanding your event,
                your taste, and your <span className="font-semibold text-orange-600">மகிழ்ச்சி (happiness)</span>.
                From choosing fresh local ingredients to elegant final presentation,
                every detail is handled with care so your special day feels truly perfect.
              </p>


            </motion.div>


          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;