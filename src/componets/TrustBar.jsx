import React, { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const RollingNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
  const display = useTransform(spring, (latest) => Math.floor(latest).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const TrustBar = () => {
  const stats = [
    { label: "Years Mastery", value: 28, suffix: "+" },
    { label: "Projects", value: 500, suffix: "" },
    { label: "Partners", value: 120, suffix: "+" },
    { label: "Awards", value: 15, suffix: "!" },
  ];

  return (
    /* Changed bg to Construction Yellow (#FFD700) and removed border transparency */
    <div className="w-full  bg-[#DBDF00]  py-6 md:py-8 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 relative z-10">
        
        {/* Left Section: Status Indicator */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start border-b-2 border-black/10 pb-4 lg:border-none lg:pb-0">
          <div className="flex items-center gap-3">
            {/* Pulsing indicator is now Black for contrast */}
            <div className="w-2 h-2 bg-black animate-pulse rounded-full" />
            <span className="text-[#FFD700] bg-black p-2 px-3 rounded-sm font-mono text-[9px] md:text-[10px] uppercase font-black tracking-[0.3em] whitespace-nowrap">
              Trust Metrics // 2026
            </span>
          </div>
          {/* Mobile Only: ISO/LEED Tags */}
          <div className="flex lg:hidden items-center gap-3 opacity-60 text-[8px] font-black text-black">
            <span className="border-2 border-black px-1">ISO_9001</span>
            <span className="italic font-black">LEED®</span>
          </div>
        </div>

        {/* The Stats Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-1 items-center justify-around w-full gap-y-8 gap-x-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-3 group px-2 text-center md:text-left">
              
              {/* Numbers are now solid Black */}
              <div className="text-black text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-none">
                <RollingNumber value={stat.value} suffix={stat.suffix} />
              </div>
              
              <div className="flex flex-col">
                <span className="hidden md:block text-black/40 font-mono text-[9px] font-bold leading-none mb-1">
                  0{index + 1}
                </span>
                <span className="text-black/70 uppercase tracking-[0.1em] text-[9px] lg:text-[10px] font-black group-hover:text-black transition-colors whitespace-nowrap leading-none">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section: Desktop Certs */}
        <div className="hidden lg:flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-black border-2 border-black px-2 font-black py-0.5 tracking-tighter">ISO_CERTIFIED</span>
            <span className="text-[10px] text-black font-black italic tracking-tighter">LEED_GOLD®</span>
        </div>

      </div>

      {/* Subtle "Safety Stripe" Background Decoration */}
      <div className="absolute top-0 right-0 h-full w-32 opacity-[0.05] pointer-events-none">
        <div className="h-full w-full rotate-45 bg-black" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 40px)' }}></div>
      </div>

      {/* Scanline Animation Effect - Adjusted for Yellow BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
        />
      </div>
    </div>
  );
};


export default TrustBar;
