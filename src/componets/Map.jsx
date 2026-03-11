import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, ArrowUpRight, Globe2 } from 'lucide-react';

const PremiumOfficeSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const offices = [
    {
      city: "Mumbai",
      role: "Strategic Headquarters",
      address: "Level 14, Signature Towers, BKC, Mumbai 400051",
      coords: "19.0760° N, 72.8777° E",
      phone: "+91 22 4004 0000",
      timezone: "IST / UTC +5:30",
      img: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      city: "Pune",
      role: "Technical Design Hub",
      address: "The Quadrant, Yerawada, Pune 411006",
      coords: "18.5204° N, 73.8567° E",
      phone: "+91 20 2002 0000",
      timezone: "IST / UTC +5:30",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="relative bg-[#F5F5F3] py-20 px-6 md:px-20 overflow-hidden font-sans">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header - Tightened margins */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12 border-b border-black/5 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-[10vw] lg:text-[5vw] leading-[0.8] uppercase tracking-tighter">
              Global <span className="text-white" style={{ WebkitTextStroke: '1.5px #1a1a1a' }}>Footprint.</span>
            </h2>
          </motion.div>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="text-right">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] block opacity-40 leading-none mb-1">Status</span>
              <span className="font-mono text-[10px] font-bold text-green-600">ACTIVE / 100%</span>
            </div>
            <Globe2 size={32} strokeWidth={1} className="opacity-20 animate-pulse" />
          </div>
        </div>

        {/* Office Cards - Reduced height to 450px for better viewport fit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative h-[450px] flex flex-col justify-end p-8 lg:p-12 overflow-hidden bg-[#1A2222] cursor-pointer"
            >
              <motion.div 
                className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1s]"
                style={{ backgroundImage: `url(${office.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2222] via-[#1A2222]/80 to-transparent z-10" />

              <div className="relative z-20">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="font-mono text-[9px] text-[#EEFC55] uppercase tracking-[0.4em] mb-1 block">
                      {office.role}
                    </span>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-6xl text-white uppercase leading-none">
                      {office.city}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#EEFC55] group-hover:border-[#EEFC55] transition-all duration-500">
                    <ArrowUpRight size={20} className="text-white group-hover:text-[#1a1a1a]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin size={12} className="text-[#EEFC55] mt-0.5" />
                      <p className="text-gray-300 text-[11px] leading-snug font-light max-w-[200px]">
                        {office.address}
                      </p>
                    </div>
                    <span className="font-mono text-[8px] text-white/20 tracking-widest block">{office.coords}</span>
                  </div>

                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-[#EEFC55]" />
                      <span className="font-mono text-[10px] text-white">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-[#EEFC55]" />
                      <span className="font-mono text-[10px] text-white">{office.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#EEFC55]/5 pointer-events-none z-15"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Marquee - Tightened spacing */}
        <div className="mt-20 overflow-hidden whitespace-nowrap border-y border-black/5 py-4">
          <motion.div 
            animate={{ x: [0, -800] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center font-mono text-[9px] font-black uppercase tracking-[0.8em] opacity-20"
          >
            {Array(4).fill([
              "Structural Innovation", 
              "Architectural Integrity", 
              "Mathematical Precision", 
              "Global Operations"
            ]).flat().map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumOfficeSection;