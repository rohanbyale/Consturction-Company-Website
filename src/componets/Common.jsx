import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StructuralPulse = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Tracking mouse to make the "blueprint" feel interactive
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX / 50, y: clientY / 50 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-40 bg-[#0A0A0A] overflow-hidden border-t border-white/5 flex items-center justify-center"
    >
      {/* Technical Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `radial-gradient(#EEFC55 0.5px, transparent 0.5px)`,
          backgroundSize: '30px 30px',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }} 
      />

      <div className="max-w-[1400px] mx-auto w-full h-full relative flex items-center justify-between px-10">
        
        {/* LEFT SIDE: ROTATING COORDINATE SYSTEM */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-white/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border border-[#EEFC55]/20 border-dashed rounded-full"
          />
          <div className="font-mono text-[8px] text-[#EEFC55] font-bold">Z-AXIS</div>
        </div>

        {/* CENTER: THE PULSE WAVE (Unique Animated Path) */}
        <div className="flex-1 px-20">
          <svg viewBox="0 0 800 100" className="w-full h-20 overflow-visible">
            <motion.path
              d="M 0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50"
              fill="none"
              stroke="#EEFC55"
              strokeWidth="1"
              animate={{
                d: [
                  "M 0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50",
                  "M 0 50 Q 50 90, 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50",
                  "M 0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Background Static Line */}
            <line x1="0" y1="50" x2="800" y2="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          </svg>
        </div>

        {/* RIGHT SIDE: LIVE TELEMETRY */}
        <div className="text-right space-y-1">
          <div className="flex items-center justify-end gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EEFC55] animate-pulse" />
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-black">Live Resonance</span>
          </div>
          <p className="font-mono text-xs text-white">44.12 <span className="text-[#EEFC55]">Hz</span></p>
          <div className="flex gap-1 justify-end">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-[2px] bg-white/20"
              />
            ))}
          </div>
        </div>

      </div>

      {/* Edge Shadow for blending */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />
    </div>
  );
};

export default StructuralPulse;