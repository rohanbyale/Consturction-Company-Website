import React, { useState } from 'react';
import { motion } from 'framer-motion';

const perks = [
  { 
    id: "01.", 
    title: "Global Mobility", 
    desc: "Opportunities to lead project clusters across Dubai, Singapore, and Mumbai.",
    bg: "#EEFC55", // Lime Green from image
    text: "#1A1A1A",
    pattern: "sun"
  },
  { 
    id: "02.", 
    title: "Equity & Growth", 
    desc: "A stake in the skylines you build. Performance-linked stock options.",
    bg: "#1A2222", // Dark Slate from image
    text: "#FFFFFF",
    pattern: "hexagon"
  },
  { 
    id: "03.", 
    title: "Wellness HUD", 
    desc: "Comprehensive health coverage including mental architecture and physical labs.",
    bg: "#E6E8E3", // Stone Grey from image
    text: "#1A1A1A",
    pattern: "network"
  },
  { 
    id: "04.", 
    title: "The Lab Access", 
    desc: "24/7 access to our 3D printing labs and AI-driven structural testing suites.",
    bg: "#EEFC55", // Repeat pattern
    text: "#1A1A1A",
    pattern: "sun"
  }
];

const Pattern = ({ type, color }) => {
  if (type === "sun") return (
    <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-80">
      {[...Array(24)].map((_, i) => (
        <line key={i} x1="50" y1="50" x2="50" y2="10" stroke={color} strokeWidth="1" transform={`rotate(${i * 15} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
  if (type === "hexagon") return (
    <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-80">
      {[40, 32, 24, 16, 8].map((r, i) => (
        <polygon key={i} points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke={color} strokeWidth="1" transform={`scale(${r/40})`} style={{transformOrigin: 'center'}} />
      ))}
    </svg>
  );
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-80">
       <path d="M20,20 L80,20 L80,80 L20,80 Z M20,50 L80,50 M50,20 L50,80 M20,20 L80,80 M80,20 L20,80" fill="none" stroke={color} strokeWidth="0.5" />
    </svg>
  );
};

const CultureBento = () => {
  return (
    <section className="bg-[#F9F9F7] py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
           
            <h2 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-7xl md:text-6xl font-black uppercase leading-[0.9] "
            >
              Beyond the <br /> 
              <span className="text-white" style={{ WebkitTextStroke: '0.1px #1A1A1A' }}>Blueprint.</span>
            </h2>
          </div>
        </div>

        {/* INTERACTIVE GRID - MATCHING SCREENSHOT STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[400px]">
          {perks.map((perk) => (
            <motion.div
              key={perk.id}
              whileHover={{ scale: 0.98 }}
              style={{ backgroundColor: perk.bg, color: perk.text }}
              className="relative p-12 flex flex-col justify-between group cursor-pointer transition-all duration-500 border-r border-[#1A1A1A]/5"
            >
              {/* ID and Geometric Pattern */}
              <div className="flex justify-between items-start">
                <Pattern type={perk.pattern} color={perk.text} />
                <span className="font-mono text-sm font-bold opacity-60">
                  {perk.id}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="mt-20">
                <h3 className="text-4xl font-bold tracking-tight mb-6 leading-none">
                  {perk.title}
                </h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed max-w-[280px]">
                  {perk.desc}
                </p>
              </div>

              {/* Bottom Decorative Line - Hidden until hover */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-current w-0 group-hover:w-full transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* BOTTOM STAT HUD */}
      

      </div>
    </section>
  );
};

export default CultureBento;