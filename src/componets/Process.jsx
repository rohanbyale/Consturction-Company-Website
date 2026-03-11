import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const steps = [
  { 
    id: "01", 
    phase: "Pre-Construction", 
    title: "Site Analysis", 
    desc: "Sub-surface geotechnical surveying and environmental impact mapping to ensure foundational stability.",
    img: "https://www.firstinarchitecture.co.uk/wp-content/uploads/2017/09/Overlay-site-analysis.jpg",
    coord: "40.7128° N, 74.0060° W"
  },
  { 
    id: "02", 
    phase: "Engineering", 
    title: "BIM Modeling", 
    desc: "High-fidelity 5D Building Information Modeling to stress-test structural integrity in a digital vacuum.",
    img: "https://i.pinimg.com/736x/7a/c3/c4/7ac3c4ea08e746b213a15cfca2c407b6.jpg",
    coord: "DATA_STRUC_NODE_02"
  },
  { 
    id: "03", 
    phase: "Execution", 
    title: "Steel Erection", 
    desc: "Precision deployment of modular steel frameworks using real-time GPS-guided crane telemetry.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800",
    coord: "TENSION_LOAD_BAL"
  },
  { 
    id: "04", 
    phase: "Compliance", 
    title: "Safety Audit", 
    desc: "Final ultrasonic weld testing and ISO-standard load validation for century-long structural life.",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000",
    coord: "ISO_9001_VALID"
  }
];

const CompactProcess = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 70, 
    damping: 30, 
    restDelta: 0.001 
  });

  return (
    <section ref={containerRef} className="relative bg-[#F5F5F3] h-[300vh] lg:h-[400vh] font-sans"> 
      {/* Background SVG Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#1a1a1a 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Content Side */}
        <div className="w-full lg:w-5/12 h-1/2 lg:h-full flex flex-col justify-center px-6 md:px-20 z-20 bg-white/80 backdrop-blur-sm lg:bg-white order-2 lg:order-1 border-r border-gray-100">
          <header className="absolute top-6 lg:top-10 left-6 md:left-20 flex items-center gap-4">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin-slow">
               <path d="M8 0V16M0 8H16" stroke="#D4AF37" strokeWidth="0.5"/>
               <circle cx="8" cy="8" r="7" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2"/>
            </svg>
               <span className="bg-black text-[#EEFC55] p-2 font-mono text-[11px] tracking-[0.4em] uppercase font-bold">
             Process
            </span>
          </header>

          <div className="relative h-48 lg:h-64 w-full">
            {steps.map((step, i) => {
              const range = 1 / steps.length;
              const start = i * range;
              const end = (i + 1) * range;

              const opacity = useTransform(smoothProgress, [start, start + 0.1 * range, end - 0.1 * range, end], [0, 1, 1, 0]);
              const x = useTransform(smoothProgress, [start, start + 0.1 * range], [-20, 0]);

              return (
                <motion.div key={step.id} style={{ opacity, x }} className="absolute inset-0 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2 lg:mb-3">
                    <span className="text-[#D4AF37] font-mono text-[9px] lg:text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[#D4AF37]/30">{step.phase}</span>
                    <span className="text-gray-400 text-[9px] lg:text-[10px] font-mono">ID: {step.id}</span>
                  </div>
                  <h3
                  style={{ fontFamily: "'Bebas Neue',sans-serif",}}
                  className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-wide text-[#1a1a1a] leading-[0.85] mb-4">
                    {step.title}
                  </h3>
                  <p
                 
                  className="text-gray-500 text-xs  lg:text-sm leading-relaxed max-w-xs lg:max-w-sm border-l border-gray-200 pl-4">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <footer className="absolute bottom-6 lg:bottom-10 left-6 md:left-20 right-6">
            <div className="flex items-end justify-between max-w-xs">
               <div className="space-y-1">
                 <p className="text-[8px] font-mono text-gray-400 uppercase tracking-[0.2em]">Operational_Stability</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1a1a1a]">98.4</span>
                    <span className="text-[10px] text-gray-400 font-mono">%</span>
                 </div>
               </div>
               <div className="w-24 lg:w-40 h-[2px] bg-gray-100 mb-2 overflow-hidden relative">
                 <motion.div 
                   style={{ scaleX: smoothProgress }} 
                   className="absolute inset-0 bg-[#D4AF37] origin-left" 
                 />
               </div>
            </div>
          </footer>
        </div>

        {/* Right: The Image Frame */}
        <div className="w-full lg:w-7/12 h-1/2 lg:h-full relative bg-[#f2f2f2] flex items-center justify-center p-6 lg:p-24 order-1 lg:order-2">
          
          {/* Dynamic SVG Corners */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
             <svg className="absolute top-10 left-10 text-gray-300" width="40" height="40" fill="none">
                <path d="M0 40V0H40" stroke="currentColor" strokeWidth="1"/>
             </svg>
             <svg className="absolute bottom-10 right-10 text-gray-300 rotate-180" width="40" height="40" fill="none">
                <path d="M0 40V0H40" stroke="currentColor" strokeWidth="1"/>
             </svg>
          </div>

          <div className="relative w-full aspect-video lg:aspect-[4/3] lg:w-[85%] lg:h-[65%] overflow-hidden bg-gray-200 shadow-2xl">
            {steps.map((step, i) => {
              const range = 1 / steps.length;
              const start = i * range;
              const end = (i + 1) * range;

              const clipPath = useTransform(
                smoothProgress,
                [start, start + 0.1 * range, end - 0.1 * range, end],
                ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 0 0)", "inset(0 0 100% 0)"]
              );

              const imgScale = useTransform(smoothProgress, [start, end], [1.1, 1]);

              return (
                <motion.div 
                  key={step.id}
                  style={{ clipPath, zIndex: i + 1, willChange: "clip-path" }}
                  className="absolute inset-0 group"
                >
                  <motion.img 
                    src={step.img} 
                    style={{ scale: imgScale }}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  {/* Subtle Technical Overlay per image */}
                  <div className="absolute top-4 left-4 font-mono text-[8px] text-white bg-black/40 px-2 py-1 backdrop-blur-sm">
                    {step.coord}
                  </div>
                </motion.div>
              );
            })}
            
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-[50] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          {/* Center Blueprint Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
             <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-gray-400" />
             <div className="absolute top-0 left-1/2 h-full w-[0.5px] bg-gray-400" />
          </div>
          
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 text-[#1a1a1a]/40 font-mono text-[8px] lg:text-[9px] text-right leading-relaxed flex items-center gap-4">
            <div className="h-8 w-[1px] bg-gray-300" />
            <div>
               REF_SET_0{Math.floor(steps.length * 2.5)}<br />
               ARCH_VER: 2026.04
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CompactProcess;