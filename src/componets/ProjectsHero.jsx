import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Puzzle, Layout, Settings, ArrowDownLeft } from 'lucide-react';

const TechniqLanding = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const transitionCurve = [0.22, 1, 0.36, 1];

  return (
    <div className="h-screen bg-[#0a1128] text-white font-sans relative overflow-hidden flex flex-col p-4 md:p-8 selection:bg-[#eefc55] selection:text-black">

      {/* ── GRID SYSTEM ── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Outer border frame — full perimeter */}
        <div className="absolute inset-4 border border-white/[0.06]" />

        {/* Inner content frame */}
        <div className="absolute inset-8 border border-white/[0.03]" />

        {/* Horizontal rule — upper third */}
        <div className="absolute top-[28%] left-4 right-4 h-[1px] bg-white/[0.05]" />

        {/* Horizontal rule — lower third */}
        <div className="absolute bottom-[18%] left-4 right-4 h-[1px] bg-white/[0.05]" />

        {/* Vertical — left sidebar boundary */}
        <div className="absolute left-[13%] top-4 bottom-4 w-[1px] bg-white/[0.05]" />

        {/* Vertical — right sidebar boundary */}
        <div className="absolute right-[13%] top-4 bottom-4 w-[1px] bg-white/[0.05]" />

        {/* Center cross — horizontal */}
        <div className="absolute top-1/2 left-[13%] right-[13%] h-[1px] -translate-y-1/2 bg-white/[0.07]" />

        {/* Center cross — vertical */}
        <div className="absolute left-1/2 top-[28%] bottom-[18%] w-[1px] -translate-x-1/2 bg-white/[0.07]" />

        {/* Corner tick marks — outer frame corners */}
        {/* Top-left */}
        <div className="absolute top-4 left-4 w-6 h-[1px] bg-[#eefc55]/20" />
        <div className="absolute top-4 left-4 w-[1px] h-6 bg-[#eefc55]/20" />
        {/* Top-right */}
        <div className="absolute top-4 right-4 w-6 h-[1px] bg-[#eefc55]/20" style={{ right: '1rem', marginRight: 0 }} />
        <div className="absolute top-4 right-4 w-[1px] h-6 bg-[#eefc55]/20" />
        {/* Bottom-left */}
        <div className="absolute bottom-4 left-4 w-6 h-[1px] bg-[#eefc55]/20" />
        <div className="absolute bottom-4 left-4 w-[1px] h-6 bg-[#eefc55]/20" />
        {/* Bottom-right */}
        <div className="absolute bottom-4 right-4 w-6 h-[1px] bg-[#eefc55]/20" />
        <div className="absolute bottom-4 right-4 w-[1px] h-6 bg-[#eefc55]/20" />

        {/* Sidebar intersection dots */}
        <div className="absolute top-1/2 left-[13%] w-1 h-1 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-[13%] w-1 h-1 rounded-full bg-white/20 translate-x-1/2 -translate-y-1/2" />

        {/* Upper-third intersection dots */}
        <div className="absolute top-[28%] left-[13%] w-1 h-1 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[28%] right-[13%] w-1 h-1 rounded-full bg-white/10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[28%] left-1/2 w-1 h-1 rounded-full bg-[#eefc55]/30 -translate-x-1/2 -translate-y-1/2" />

        {/* Lower-third intersection dots */}
        <div className="absolute bottom-[18%] left-[13%] w-1 h-1 rounded-full bg-white/10 -translate-x-1/2 translate-y-1/2" />
        <div className="absolute bottom-[18%] right-[13%] w-1 h-1 rounded-full bg-white/10 translate-x-1/2 translate-y-1/2" />
        <div className="absolute bottom-[18%] left-1/2 w-1 h-1 rounded-full bg-[#eefc55]/30 -translate-x-1/2 translate-y-1/2" />

        {/* Animated scanning line */}
        <motion.div
          className="absolute left-[13%] right-[13%] h-[1px] bg-gradient-to-r from-transparent via-[#eefc55]/15 to-transparent"
          animate={{ top: ['28%', '82%', '28%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isInitialized ? 1 : 0, x: isInitialized ? 0 : -20 }}
          transition={{ duration: 1.5, delay: 0.8, ease: transitionCurve }}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-start gap-12"
        >
          <span className="text-[10px] font-mono text-gray-500 tracking-[1em] uppercase mb-4" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Since_2024
          </span>
          <div className="relative w-32 h-44 border border-white/10 p-1 bg-white/5 group">
            <img src="https://i.pinimg.com/1200x/bc/e9/be/bce9be413ff139e7a0777d65d3ff6f46.jpg" className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500" alt="Detail" />
            <div className="absolute -bottom-3 -left-3 bg-[#eefc55] p-2 text-black shadow-xl"><ArrowDownLeft size={16} /></div>
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <div className="p-3 border border-white/10 hover:border-[#eefc55] transition-colors group cursor-help w-fit">
              <Puzzle size={18} className="text-gray-400 group-hover:text-[#eefc55]" />
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 border border-white/10"><Layout size={18} /></div>
              <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold leading-tight">Architectural<br />Integrity</p>
            </div>
          </div>
        </motion.div>

        {/* CENTER MODULE */}
        <div className="flex flex-col items-center z-20">
          <motion.div
            initial={{ opacity: 0, scale: 1.8, y: 60 }}
            animate={{ opacity: 1, scale: isInitialized ? 1 : 1.6, y: isInitialized ? 0 : 40 }}
            transition={{ duration: 2.2, ease: transitionCurve }}
            className="relative w-full max-w-lg aspect-[4/3] mb-8 group"
          >
            {/* Let's Talk Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isInitialized ? 1 : 0, opacity: isInitialized ? 1 : 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: transitionCurve }}
              whileHover={{ y: -5 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#eefc55] text-black px-5 py-4 flex flex-col items-center leading-none z-30 shadow-2xl cursor-pointer"
            >
              <span className="text-[10px] font-black uppercase tracking-tighter">Let's</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Talk</span>
            </motion.div>

            {/* Main Image Frame */}
            <div className="w-full h-full overflow-hidden border border-white/5 group-hover:border-[#eefc55]/30 transition-colors duration-500">
              <motion.img
                src="https://i.pinimg.com/1200x/04/66/d4/0466d42ffb844b2976ace3b6db055016.jpg"
                alt="Main"
                className="w-full h-full object-cover brightness-90 group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </motion.div>

          {/* Typography */}
          <div className="text-center overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isInitialized ? 1 : 0, y: isInitialized ? 0 : 15 }}
              transition={{ delay: 1.4, duration: 1, ease: transitionCurve }}
              className="text-[10px] uppercase tracking-[0.6em] text-[#eefc55] mb-4 font-black"
            >
              Structural Protocol
            </motion.p>
            <motion.h1
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInitialized ? 1 : 0, y: isInitialized ? 0 : 30 }}
              transition={{ delay: 1.6, duration: 1, ease: transitionCurve }}
              className="text-5xl md:text-[6vw] font-black italic uppercase leading-[0.85] tracking-wide"
            >
              Transform Your <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '0.1px white' }}>Vision into Reality</span>
            </motion.h1>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isInitialized ? 1 : 0, x: isInitialized ? 0 : 20 }}
          transition={{ duration: 1.5, delay: 0.8, ease: transitionCurve }}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-16"
        >
          <div className="flex items-center gap-4">
            <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold text-right leading-tight">
              for Modern<br />Lifestyles
            </p>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="p-3 border border-white/10">
              <Settings size={18} />
            </motion.div>
          </div>
          <div className="relative w-32 h-44 border border-white/10 p-1 bg-white/5 group">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500" alt="Interior" />
            <div className="absolute -top-3 -right-3 bg-[#eefc55] p-2 text-black shadow-xl"><ArrowUpRight size={16} /></div>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4 text-[8px] font-mono tracking-widest text-white/20">
        <div className="flex gap-8"><span>LN_34.829</span><span>LT_12.004</span></div>
        <div className="flex gap-4 items-center">
          <span className="w-8 h-[1px] bg-white/10"></span>
          <span className="text-white/40 uppercase">Techniq Sipil Protocol v.1</span>
        </div>
      </footer>
    </div>
  );
};

export default TechniqLanding;