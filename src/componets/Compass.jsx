import React, { useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const FoundationCompass = () => {
  // Motion values for smooth 3D tilting
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Adding "spring" for that high-end, weighted physical feel
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Mapping mouse position to degrees of rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-80 bg-[#080808] overflow-hidden flex items-center justify-center border-t border-white/5 perspective-[1000px]"
    >
      {/* Background Radial Blueprint */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] border border-white/10 rounded-full" />
        <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full" />
        <div className="absolute w-full h-[1px] bg-white/5" />
        <div className="absolute w-[1px] h-full bg-white/5" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        
        {/* THE 3D FOUNDATION SLAB */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-64 h-40 bg-[#111] border border-white/20 shadow-2xl rounded-sm flex items-center justify-center"
        >
          {/* Internal Grid on the Slab */}
          <div className="absolute inset-2 border border-white/5 grid grid-cols-4 grid-rows-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/10" />
            ))}
          </div>

          {/* Glowing Center Point */}
          <div className="w-2 h-2 bg-[#EEFC55] rounded-full shadow-[0_0_15px_#EEFC55]" />
          
          {/* Side Measurements (3D Text) */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-mono text-white/40 tracking-[0.2em]">
            NORTH_AXIS
          </div>
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 text-[8px] font-mono text-[#EEFC55] tracking-[0.2em] font-bold">
            STRUCTURAL_LEVEL
          </div>
        </motion.div>

        {/* INTERACTIVE DATA READOUT */}
        <div className="flex gap-16 items-center">
          <div className="text-center">
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-1">Tilt X</p>
            <motion.p className="text-white font-mono text-xl italic">
              {rotateX.get().toFixed(1)}°
            </motion.p>
          </div>

          <div className="h-10 w-[1px] bg-white/10" />

          <div className="text-center">
             <div className="flex items-center gap-2 justify-center mb-1">
               <span className="w-1.5 h-1.5 bg-[#EEFC55] rounded-full animate-pulse" />
               <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Horizon State</p>
             </div>
             <p className="text-white font-mono text-xl italic font-black uppercase tracking-tighter">
               Balanced
             </p>
          </div>

          <div className="h-10 w-[1px] bg-white/10" />

          <div className="text-center">
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-1">Tilt Y</p>
            <motion.p className="text-white font-mono text-xl italic">
              {rotateY.get().toFixed(1)}°
            </motion.p>
          </div>
        </div>
      </div>

      {/* Side Vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080808_80%)] pointer-events-none" />
    </div>
  );
};

export default FoundationCompass;