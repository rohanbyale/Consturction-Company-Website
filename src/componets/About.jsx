import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  // Animation logic remains identical
  const xTranslate = useTransform(timelineProgress, [0, 1], ["30%", "-80%"]);

  const timelineEvents = [
    { year: "2010", task: "Foundation Laid", desc: "Company started in Mumbai." },
    { year: "2015", task: "100 Milestones", desc: "Successfully hit 100 projects." },
    { year: "2020", task: "Urban Pulse", desc: "Expansion to 12 major cities." },
    { year: "2024", task: "Apex Era", desc: "500+ Mega-structures completed." },
    { year: "2026", task: "The Future", desc: "Digital Integration & Sustainability." },
  ];

  return (
    // Reduced padding-y from 40 to 20 for tighter spacing
    <div ref={containerRef} className="bg-[#F5F5F3] py-20 overflow-hidden">
      
      {/* Container: Removed min-height, changed to relative flex for mobile stacking */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative flex flex-col lg:block">
        
        {/* Floating Story Block: Changed from absolute to lg:absolute so it stacks on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 lg:absolute lg:top-0 lg:left-0 w-full lg:w-1/2 space-y-6 md:space-y-10 pointer-events-none mb-10 lg:mb-0"
        >
          <div className="inline-block">
          
                 <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">
               The Genesis
            </span>
          </div>
          
          <h2 className="text-[#1A1A1A] text-5xl   md:text-7xl lg:text-8xl font-black   leading-[0.85] uppercase tracking-tighter">
            Engineering <br />
            <span className="italic text-outline">The Silent </span> <br />
            Giants.
          </h2>
          
          <div className="bg-[#1A2222] text-[#E5E2DA] p-8 md:p-14 lg:ml-20 shadow-2xl pointer-events-auto w-full lg:max-w-lg">
            <p className="text-base md:text-lg font-medium leading-relaxed opacity-90">
              Founded on the principle of structural integrity, we have spent 16 years turning complex blueprints into India’s most iconic skylines. Our mission is the fusion of brutalist strength with artistic grace.
            </p>
            
            <div className="flex gap-6 md:gap-10 pt-8 mt-8 border-t border-white/20">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#D4AF37] mb-2 font-mono tracking-widest">Vision</p>
                <p className="text-xs font-bold uppercase tracking-widest">Global Prowess</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#D4AF37] mb-2 font-mono tracking-widest">Mission</p>
                <p className="text-xs font-bold uppercase tracking-widest">Absolute Precision</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Massive Background Image Block: Adjusted heights for mobile/desktop */}
        <motion.div 
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full lg:ml-auto lg:w-3/5 h-[350px] md:h-[500px] lg:h-[700px] z-10"
        >
          <img 
            src="https://i.pinimg.com/736x/b3/dc/e8/b3dce84be70c4cf728007392a1818fff.jpg" 
            alt="Construction Site" 
            className="w-full h-full object-cover hover:grayscale-0 transition-all duration-1000 scale-90"
          />
          <div className="absolute inset-0 border-[10px] md:border-[20px] border-[#E5E2DA]/50 pointer-events-none" />
        </motion.div>

        {/* Large Ghost Text: hidden on small mobile to prevent layout shift */}
        <div className="hidden md:block absolute -bottom-10 lg:-bottom-20 right-10 lg:right-20 text-[12vw] font-black text-[#1A1A1A]/5 pointer-events-none select-none uppercase">
          Legacy
        </div>
      </div>

      {/* --- KINETIC TIMELINE SECTION: Tightened spacing --- */}
      <div ref={timelineRef} className="mt-20 md:mt-40 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1A1A1A]/10 z-0" />
        
        <motion.div 
          style={{ x: useTransform(timelineProgress, [0, 1], ["0%", "-30%"]) }}
          className="absolute -top-12 md:-top-24 left-0 text-[15vw] font-black text-[#1A1A1A]/[0.02] pointer-events-none whitespace-nowrap"
        >
          HISTORY HISTORY HISTORY
        </motion.div>

        <motion.div 
          style={{ x: xTranslate }}
          className="flex gap-10 md:gap-20 py-10 md:py-20 px-6 md:px-10 cursor-grab active:cursor-grabbing"
        >
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="min-w-[250px] md:min-w-[300px] relative group">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-[#D4AF37] rounded-full mb-4 md:mb-6 relative z-10 group-hover:scale-150 transition-transform" />
              <h3 className="text-5xl md:text-6xl font-black text-[#1A1A1A] mb-2">{event.year}</h3>
              <p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">{event.task}</p>
              <p className="text-[#1A1A1A]/60 text-sm font-medium leading-relaxed max-w-[200px]">
                {event.desc}
              </p>
              <div className="absolute top-2 left-2 h-full w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px #1A1A1A;
        }
      `}</style>
    </div>
  );
};

export default AboutSection;