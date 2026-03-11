import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <section className="relative bg-[#F9F9F7] flex flex-col justify-center overflow-hidden px-6 md:px-12 py-10">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Focused Branding */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <span className="text-[#1a1a1a]/30 font-mono text-[9px] tracking-[0.6em] uppercase font-bold">
              Premium Infrastructure Group
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-[12vw] lg:text-[10vw] font-black leading-[0.9]  text-[#1a1a1a] uppercase"
            >
              Urbanrise<br /> 
              <span className="text-white" style={{ WebkitTextStroke: '0.1px #1a1a1a' }}>Builders.</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center gap-4"
          >
            
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a] font-bold">
               <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">
        About Us
            </span>
            </p>
          </motion.div>
        </div>

        {/* Right Column: Architectural Preview (NOW VIDEO) */}
        <div className="lg:col-span-5 relative group">
          <motion.div 
            style={{ y }}
            className="relative aspect-[4/3] lg:aspect-[1/1.1] overflow-hidden bg-white border border-[#1a1a1a]/5"
          >
            <video 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              {/* Replace the src with your actual video link */}
              <source 
                src="/ii.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Minimal Corner Tag */}
            <div className="absolute top-0 right-0 bg-[#1a1a1a] text-white px-3 py-1 font-mono text-[8px] uppercase tracking-widest z-20">
              Identity_Ref
            </div>

            {/* Optional Overlay to maintain text readability if video is too bright */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default AboutHero;