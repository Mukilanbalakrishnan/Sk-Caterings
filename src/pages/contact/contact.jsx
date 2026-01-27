import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronDown, Instagram, Facebook, MessageCircle, Twitter } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Contact = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // Brand Colors for reference:
    // Instagram: #E4405F
    // Facebook: #1877F2
    // WhatsApp: #25D366
    // X (Twitter): #000000
    // Gmail: #EA4335

    return (
        <div className="min-h-screen font-sans bg-[#FDFCF0]">
            <Navbar/>
            {/* Navigation Section */}
            

            {/* Hero Section */}
            <div className="relative h-[400px] overflow-hidden bg-black">
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h1 className="text-white text-6xl md:text-8xl font-black italic uppercase drop-shadow-2xl tracking-tighter">Contact Us</h1>
                    <div className="h-2 w-24 bg-yellow-500 mt-4 rounded-full shadow-lg"></div>
                </div>
            </div>

            {/* Main Content Grid */}
            <main className="bg-gradient-to-br from-[#B48B1B] via-[#8C6F12] to-[#3D3005] py-16 px-6 lg:px-20 grid lg:grid-cols-12 gap-10">

                {/* Left Column: Info & Large Map */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Address & Contact Details */}
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-4 border-amber-500">
                            <h3 className="text-[#A18218] font-black uppercase mb-6 border-b pb-2 tracking-widest text-sm italic">Official Details</h3>
                            <div className="space-y-5">
                                <div className="flex gap-4 items-center group">
                                    <MapPin className="text-amber-600 group-hover:scale-110 transition-transform" size={20} />
                                    <p className="text-sm font-bold text-gray-700">No. 1, SK-Catering Services, Anna Nagar, Chennai.</p>
                                </div>
                                <div className="flex gap-4 items-center group">
                                    <Mail className="text-amber-600 group-hover:scale-110 transition-transform" size={20} />
                                    <p className="text-sm font-bold text-gray-700">skcatering@gmail.com</p>
                                </div>
                                <div className="flex gap-4 items-center group">
                                    <Phone className="text-amber-600 group-hover:scale-110 transition-transform" size={20} />
                                    <p className="text-sm font-bold text-gray-700">+91 98765 43210</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* JOIN US SECTION - ORIGINAL BRAND COLORS */}
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/30 flex flex-col items-center justify-center shadow-2xl">
                            <p className="text-white text-[10px] uppercase tracking-[0.5em] mb-8 font-black italic">Join Us On</p>
                            <div className="flex flex-wrap justify-center gap-7">
                                {/* Instagram */}
                                <motion.div whileHover={{ scale: 1.25, rotate: 5 }}>
                                    <Instagram size={30} className="text-white hover:text-[#E4405F] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(228,64,95,0.4)] cursor-pointer" />
                                </motion.div>
                                {/* Facebook */}
                                <motion.div whileHover={{ scale: 1.25, rotate: -5 }}>
                                    <Facebook size={30} className="text-white hover:text-[#1877F2] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(24,119,242,0.4)] cursor-pointer" />
                                </motion.div>
                                {/* WhatsApp */}
                                <motion.div whileHover={{ scale: 1.25, rotate: 5 }}>
                                    <MessageCircle size={30} className="text-white hover:text-[#25D366] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(37,211,102,0.4)] cursor-pointer" />
                                </motion.div>
                                {/* Twitter/X */}
                                <motion.div whileHover={{ scale: 1.25, rotate: -5 }}>
                                    <Twitter size={30} className="text-white hover:text-black transition-colors duration-300 cursor-pointer" />
                                </motion.div>
                                {/* Email */}
                                <motion.div whileHover={{ scale: 1.25, rotate: 5 }}>
                                    <Mail size={30} className="text-white hover:text-[#EA4335] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(234,67,53,0.4)] cursor-pointer" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* LARGE MAP */}
                    <motion.div className="h-[520px] rounded-[3.5rem] overflow-hidden border-4 border-amber-400/40 shadow-2xl bg-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.320732865!2d80.14207936453678!3d12.923149022638363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d333f%3A0x6d3e707106521737!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716543210987!5m2!1sen!2sin"
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                        />
                    </motion.div>
                </div>

                {/* Right Column: Inquiry Desk (Slim & Elegant) */}
                <motion.div className="lg:col-span-5 bg-white p-10 rounded-[4rem] shadow-[-20px_20px_60px_rgba(0,0,0,0.3)] self-start border-b-8 border-amber-500">
                    <div className="mb-8 rounded-[2rem] overflow-hidden h-36 relative group">
                        <img src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Phone className="text-yellow-400 animate-bounce" size={40} />
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-gray-800 text-center mb-8 italic uppercase tracking-tighter">Inquiry Desk</h2>

                    <form className="space-y-5">
                        <input type="text" placeholder="Full Name" className="w-full p-4 bg-amber-50/50 border-2 border-transparent focus:border-amber-500 rounded-2xl outline-none transition-all shadow-inner font-bold text-gray-700 text-sm" />
                        <input type="text" placeholder="Mobile Number" className="w-full p-4 bg-amber-50/50 border-2 border-transparent focus:border-amber-500 rounded-2xl outline-none transition-all shadow-inner font-bold text-gray-700 text-sm" />
                        <input type="email" placeholder="Email Address" className="w-full p-4 bg-amber-50/50 border-2 border-transparent focus:border-amber-500 rounded-2xl outline-none transition-all shadow-inner font-bold text-gray-700 text-sm" />

                        <div className="relative">
                            <select className="w-full p-4 bg-amber-50/50 border-2 border-transparent focus:border-amber-500 rounded-2xl outline-none appearance-none font-black text-gray-500 shadow-inner text-sm">
                                <option>Select Category</option>
                                <option>Royal Wedding</option>
                                <option>Corporate Gala</option>
                                <option>Social Gathering</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-5 text-amber-600" size={20} />
                        </div>

                        <button className="w-full bg-gray-950 text-yellow-500 font-black py-4 rounded-2xl shadow-xl text-xl hover:bg-[#EAB308] hover:text-white transition-all transform active:scale-95 uppercase tracking-widest mt-4">
                            SUBMIT NOW
                        </button>
                    </form>
                </motion.div>
            </main>
            <Footer/>

            
        </div>
    );
};

export default Contact;