import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, Zap } from 'lucide-react';

const ProjectSection = ({ project, index }) => {
  // Sticky 'top' calculation: each card sticks at a slightly different offset if desired,
  // but usually, sticking at 'top-0' creates the cleanest "cover-up" effect.
  return (
    <motion.div 
      className="sticky top-0 w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-white border-b border-black/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ margin: "-10% 0px -10% 0px" }}
    >
      {/* 1. VISUAL SIDE: High-Contrast Brutalist Frame */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen bg-black group overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={project.mainImg} 
          alt={project.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        
        {/* HUD UI Elements */}
        <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="bg-[#eefc55] text-black px-4 py-1 text-[10px] font-bold uppercase tracking-tighter">
              Site_{project.phase} 
            </div>
         
          </div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 md:w-32 md:h-32 border border-[#eefc55]/30 rounded-full flex items-center justify-center self-end border-dashed"
          >
             <div className="text-[#eefc55] text-center">
                <p className="text-[8px] uppercase font-mono">Status</p>
                <p className="text-xl font-black italic">ACTIVE</p>
             </div>
          </motion.div>
        </div>
      </div>

      {/* 2. DATA SIDE: The Technical Spec Sheet */}
      <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center bg-[#F5F5F3]">
        <div className="max-w-md space-y-8">
          <div className="flex items-center gap-4">
             
             <p className="text-[10px] font-mono font-bold text-black/40 uppercase tracking-[0.3em]">{project.location}</p>
          </div>

          <h3
            style={{ fontFamily: "'Bebas Neue',sans-serif",}}
          className="text-5xl md:text-8xl font-black uppercase  tracking-wide leading-[0.85]">
            {project.name.split(' ')[0]} <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '0.1px black' }}>{project.name.split(' ')[1]}</span>
          </h3>

          <div className="grid grid-cols-2 gap-12 py-10 border-y border-black/5">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-black/30">Completion_Net</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black italic tracking-tighter">{project.percentage}</span>
                <span className="text-xl font-bold font-mono">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-black/30">Safety_Index</p>
              <p className="text-5xl font-black italic tracking-tighter text-[#eefc55] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {project.integrity}
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-black/60 leading-relaxed font-medium">
            {project.desc}
          </p>

          <motion.button 
            whileHover={{ x: 10 }}
            className="group flex items-center gap-8 bg-black text-white px-10 py-6 rounded-md w-full md:w-fit transition-all hover:bg-[#eefc55] hover:text-black shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">View_Project_Data</span>
            <ArrowUpRight className="group-hover:rotate-45 transition-transform" size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const OngoingProjects = () => {
  const projects = [
    {
      name: "Neo-Retail Hub",
      location: "BKC // CENTRAL",
      percentage: 72,
      phase: "01",
      integrity: "9.9",
      coords: { lat: "19.06", lng: "72.86" },
      desc: "Revolutionizing retail with kinetic facades and integrated AI energy grids. Phase 01 structural capping is currently ahead of schedule.",
      mainImg: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200"
    },
    {
      name: "Solaris Tower",
      location: "WORLI // SOUTH",
      percentage: 48,
      phase: "02",
      integrity: "9.8",
      coords: { lat: "19.01", lng: "72.81" },
      desc: "The city's first carbon-negative high-rise. Utilizing reinforced polymer cores and vertical hydroponic cooling systems.",
      mainImg: "https://i.pinimg.com/1200x/7d/39/cf/7d39cf4fde9cebe24d228ac6e1cd9130.jpg"
    },
    {
      name: "Apex Nexus",
      location: "THANE // NORTH",
      percentage: 89,
      phase: "03",
      integrity: "10.0",
      coords: { lat: "19.21", lng: "72.97" },
      desc: "Logistics megastructure designed for autonomous drone delivery fleets. Finalizing heavy-load structural testing for launch.",
      mainImg: "https://i.pinimg.com/736x/b2/69/63/b269631e2dfc3dd9b2b15675291ce5a5.jpg"
    }
  ];

  return (
    <section className="relative bg-[#F5F5F3]">
      {/* GLOBAL HUD TICKER */}
      <div className="sticky top-0 z-[100] bg-[#0A1128] py-4 overflow-hidden flex whitespace-nowrap border-b border-[#eefc55]/20">
        {[...Array(4)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 px-6"
          >
            {projects.map((p, idx) => (
              <span key={idx} className="text-[#eefc55] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                {p.name} status: {p.percentage}% NOMINAL
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* STICKY CONTAINER */}
      <div className="relative">
        {projects.map((proj, i) => (
          <ProjectSection key={i} project={proj} index={i} />
        ))}
      </div>
      
    
    </section>
  );
};

export default OngoingProjects;