import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus, ArrowRight, HardHat, Building2, Home, MapPin } from 'lucide-react';

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      let timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return <span ref={ref}>{displayValue}</span>;
};

const ProjectStats = () => {
  return (
    <section className="bg-[#0a1128] rounded-b-3xl py-32 px-6 relative overflow-hidden text-white font-sans">
      {/* Technical Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto relative">
        
        <div className="flex flex-col lg:flex-row gap-0 border border-white/10 bg-white/5 backdrop-blur-sm">
          
          {/* 01. THE MASSIVE YELLOW ANCHOR (The "Hero" Stat) */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="lg:w-2/5 bg-[#eefc55] p-12 text-black flex flex-col justify-between min-h-[500px] relative group"
          >
            <div className="flex justify-between items-start">
              <div className="bg-black p-4 rounded-full"><HardHat size={32} /></div>
              <span className="font-mono text-xs font-black tracking-widest uppercase opacity-40">Section_01 // Core</span>
            </div>

            <div>
              <h3 className="text-[10rem] font-black leading-none tracking-tighter italic">
                <Counter value="500" />
              </h3>
              <p className="text-2xl font-black uppercase italic -mt-4 mb-4">Projects Delivered</p>
              <div className="h-1 w-24 bg-black group-hover:w-full transition-all duration-700" />
            </div>

            <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed max-w-xs">
              Structural integrity verified through 10,000+ hours of stress-testing and site analysis.
            </p>
          </motion.div>

          {/* 02. THE SECONDARY DATA STACK */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2">
            
            {/* Stat Item: Commercial */}
            <div className="border-b md:border-b-0 md:border-r border-white/10 p-12 hover:bg-white/5 transition-colors group">
              <span className="text-[#eefc55] font-mono text-xs tracking-widest uppercase">MTRX-02</span>
              <div className="text-6xl font-black my-6 flex items-baseline gap-2">
                <Counter value="120" />
                <Plus size={24} className="text-[#eefc55]" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4">Commercial Hubs</h4>
              <p className="text-gray-500 text-xs leading-relaxed">High-density engineering for urban infrastructure and corporate cores.</p>
            </div>

            {/* Stat Item: Residential */}
            <div className="border-b border-white/10 p-12 hover:bg-white/5 transition-colors group">
              <span className="text-[#eefc55] font-mono text-xs tracking-widest uppercase">MTRX-03</span>
              <div className="text-6xl font-black my-6 flex items-baseline gap-2">
                <Counter value="250" />
                <Plus size={24} className="text-[#eefc55]" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4">Living Sites</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Next-gen housing protocols focused on sustainability and modular growth.</p>
            </div>

            {/* Stat Item: Cities */}
            <div className="md:border-r border-white/10 p-12 hover:bg-white/5 transition-colors group">
              <span className="text-[#eefc55] font-mono text-xs tracking-widest uppercase">MTRX-04</span>
              <div className="text-6xl font-black my-6 flex items-baseline gap-2">
                <Counter value="15" />
                <Plus size={24} className="text-[#eefc55]" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4">Global Cities</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Operating across diverse seismic zones and international regulations.</p>
            </div>

            {/* THE CTA BOX */}
            <div className="p-12 bg-[#eefc55]/5 flex items-center justify-center group cursor-pointer overflow-hidden relative">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full border border-[#eefc55] flex items-center justify-center mb-4 group-hover:bg-[#eefc55] transition-all">
                  <ArrowRight size={32} className="group-hover:text-black transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">View Registry</span>
              </motion.div>
              {/* Decorative background text */}
              <span className="absolute bottom-[-10%] right-[-10%] text-6xl font-black opacity-5 select-none rotate-12">DATA</span>
            </div>

          </div>
        </div>

        {/* Floating Measurement Markers */}
        <div className="absolute -bottom-10 right-0 font-mono text-[8px] text-white/20 uppercase tracking-[1em] hidden md:block">
          Axis_Control // 34.829 - 12.004
        </div>
      </div>
    </section>
  );
};

export default ProjectStats;