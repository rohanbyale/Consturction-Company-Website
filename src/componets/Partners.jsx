import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';

const partners = [
  { id: "01", name: "Skyline Devs", category: "Real Estate", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=600" },
  { id: "02", name: "Gov Infra", category: "Government", logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600" },
  { id: "03", name: "Apex Comm", category: "Commercial", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600" },
  { id: "04", name: "Urban Plan", category: "City Project", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600" },
  { id: "05", name: "Heritage", category: "Residential", logo: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600" },
  { id: "06", name: "Nexus Ind", category: "Logistics", logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600" },
];

const ScrollingName = ({ name, isYellow }) => (
  <div className={`flex overflow-hidden whitespace-nowrap border-y ${isYellow ? 'border-black/10' : 'border-black/5'} py-2`}>
    <motion.div
      animate={{ x: [0, -100] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 pr-4"
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className={`text-4xl font-black uppercase tracking-tighter ${isYellow ? 'text-black opacity-100' : 'text-black opacity-10'}`}>
          {name} <span className={`${isYellow ? 'text-black/50' : 'text-[#E2E600]'}`}>+</span>
        </span>
      ))}
    </motion.div>
  </div>
);

const PartnerCard = ({ partner, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Checkerboard logic: Yellow on 1, 3, 5... (odds)
  const isYellow = index % 2 !== 0;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      // Reduced height to 320px
      className={`relative h-[320px] overflow-hidden group border-r border-b border-gray-100 cursor-default`}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className={`absolute inset-0 p-8 flex flex-col justify-between transition-colors duration-400 ${isYellow ? 'bg-[#E2E600]' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-0.5">
                <span className={`font-mono text-[10px] font-bold tracking-[0.3em] ${isYellow ? 'text-black' : 'text-gray-400'}`}>
                  NODE_{partner.id}
                </span>
                <span className={`text-[9px] font-mono ${isYellow ? 'text-black/60' : 'text-gray-300'}`}>
                  00101101_ACTV
                </span>
              </div>
              {isYellow && <Zap size={14} className="text-black/70 animate-pulse" />}
            </div>

            <div className="relative">
              <ScrollingName name={partner.name} isYellow={isYellow} />
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1.5">
                <p className={`font-mono text-[9px] uppercase tracking-[0.2em] font-bold ${isYellow ? 'text-black' : 'text-[#E2E600]'}`}>
                  {partner.category}
                </p>
                <div className={`h-[1.5px] w-6 ${isYellow ? 'bg-black' : 'bg-[#E2E600]'}`} />
              </div>
              <span className={`font-mono text-[8px] uppercase tracking-[0.1em] ${isYellow ? 'text-black/40' : 'text-gray-300'}`}>
                [ Standby ]
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 bg-black"
          >
            {/* Base image with brightness increase */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 brightness-[0.7] group-hover:brightness-100"
            />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-30">
              <div className="flex justify-between items-start">
                <div className="bg-[#E2E600] px-2 py-0.5 text-black font-mono text-[9px] font-bold tracking-widest rounded-sm">
                  VERIFIED
                </div>
                <ArrowUpRight size={20} className="text-[#E2E600]" />
              </div>

              <div>
                <motion.h3 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  // Sized down name to fit smaller card
                  className="text-4xl font-black uppercase tracking-tighter leading-[0.85] mb-3"
                >
                  {partner.name}
                </motion.h3>
                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-white/20" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E2E600]">
                    {partner.category}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Refined Subtle Inner Glow - Replaces Scanline */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PartnersPremium = () => {
  return (
    <section className="bg-[#F5F5F3] py-20 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Compact Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-end">
          <motion.h2 

            style={{ fontFamily: "'Bebas Neue',sans-serif",}}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl font-black uppercase leading-[0.90]  text-[#1a1a1a]"
          >
            verified <span className="text-transparent" style={{ WebkitTextStroke: '0.1px #1a1a1a' }}>Allies.</span>
          </motion.h2>
          
          <div className="flex flex-col items-start md:items-end md:text-right border-l md:border-l-0 md:border-r border-gray-100 pl-4 md:pr-4 pb-1">
            <p className="font-mono bg-[#1A1A1A] p-2 font-black text-[10px] uppercase tracking-[0.3em] text-[#E2E600] mb-4 leading-relaxed">
              Strategic partners contributing <br /> 
              to our structural legacy.
            </p>
          
          </div>
        </div>

        {/* Compressed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-100">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>

          <div className="mt-20 flex justify-center">
          <motion.button 
            whileHover="hover"
            className="relative  px-8 py-4 overflow-hidden border border-gray-800"
          >
            <motion.div 
              variants={{ hover: { y: "-100%" } }}
              className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]"
            >
             Become Partner
            </motion.div>
            <motion.div 
              variants={{ hover: { y: 0 } }}
              initial={{ y: "100%" }}
              className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.4em]"
            >
            Send Message
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default PartnersPremium;