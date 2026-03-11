import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ScanEye, Activity } from 'lucide-react';

const BeforeAfterSlider = ({ 
  beforeImg = "https://i.pinimg.com/1200x/9d/d8/79/9dd87959475544fc8a18b0637c28de64.jpg", 
  afterImg = "https://i.pinimg.com/1200x/51/40/f3/5140f3aab762934e4baba58f04a301be.jpg",
  title = "Project_Nexus_2026",
  location = "Worli, Mumbai"
}) => {
  const containerRef = useRef(null);
  
  // Physics-based motion values
  const xPercent = useMotionValue(50);
  const smoothX = useSpring(xPercent, { stiffness: 100, damping: 20 });

  // Parallax: Images move slightly as you slide
  const beforeImageX = useTransform(smoothX, [0, 100], ["1.5%", "-1.5%"]);
  const afterImageX = useTransform(smoothX, [0, 100], ["-1.5%", "1.5%"]);

  // Combined Handler for Mouse and Touch
  const handleMove = (e) => {
    if (!containerRef.current) return;
    
    // Get horizontal position from mouse or touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    const val = ((clientX - left) / width) * 100;
    xPercent.set(Math.max(0, Math.min(100, val)));
  };

  return (
    <section className="bg-[#F5F5F3] py-12 md:py-24 px-4 md:px-12 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP INTERFACE BAR: Stacks on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-6 border-l-2 border-black pl-4 md:pl-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-[#eefc55] bg-black w-fit px-3 py-1 rounded-sm">
              <Activity size={14} className="animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Live_Scan_Mode</span>
            </div>
            <h2
              style={{ fontFamily: "'Bebas Neue',sans-serif",}}
            className="text-4xl md:text-6xl font-black uppercase  tracking-wide leading-[0.85] md:leading-[0.8]">
              Structural <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: '0.1px black' }}>Evolution.</span>
            </h2>
          </div>
          
          <div className="font-mono text-left md:text-right">
            <p className="text-[11px] md:text-[12px] font-black uppercase">{title}</p>
            <p className="text-[9px] md:text-[10px] text-black/30 tracking-widest leading-loose uppercase">
              {location} // {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* MAIN VIEWER: Aspect ratio adjusted for mobile (4:5) vs Desktop (21:9) */}
        <div 
          ref={containerRef}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="relative aspect-[4/5] md:aspect-[21/9] overflow-hidden rounded-[20px] bg-gray-100 cursor-none group shadow-2xl touch-none"
        >
          {/* AFTER IMAGE */}
          <motion.div 
            style={{ x: afterImageX }} 
            className="absolute inset-0 scale-110"
          >
            <img src={afterImg} alt="After" className="w-full h-full object-cover" />
          </motion.div>
          
          {/* BEFORE IMAGE */}
          <motion.div 
            className="absolute inset-0 z-10 scale-110 pointer-events-none"
            style={{ 
              clipPath: useTransform(smoothX, (v) => `inset(0 ${100 - v}% 0 0)`),
              x: beforeImageX 
            }}
          >
            <img 
              src={beforeImg} 
              alt="Before" 
              className="w-full h-full object-cover grayscale brightness-50 contrast-125" 
            />
          </motion.div>

          {/* SCANNER LINE */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[1px] bg-[#eefc55] z-20 shadow-[0_0_20px_#eefc55]"
            style={{ left: useTransform(smoothX, (v) => `${v}%`) }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div 
                className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center border border-[#eefc55] shadow-xl"
              >
                <div className="flex gap-1 text-[#eefc55]">
                  <ChevronLeft size={14} className="md:size-[16px]" strokeWidth={3} />
                  <ChevronRight size={14} className="md:size-[16px]" strokeWidth={3} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* DATA OVERLAYS: Corner accents */}
          <div className="absolute inset-0 pointer-events-none p-4 md:p-10 z-30">
            <div className="h-full w-full border border-white/10 rounded-lg relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#eefc55]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#eefc55]" />
              
              <motion.div 
                className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded font-mono text-[8px] md:text-[9px] text-[#eefc55]"
                style={{ opacity: useTransform(smoothX, [45, 50, 55], [1, 0, 1]) }}
              >
                STABILITY: 98.4%
              </motion.div>
            </div>
          </div>
        </div>

        {/* BOTTOM METRICS BAR: Grid 2x2 on mobile, 4x1 on desktop */}
 
      </div>
    </section>
  );
};

export default BeforeAfterSlider;