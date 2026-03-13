import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const jobOpenings = [
  {
    id: "J-001",
    title: "Lead Structural Engineer",
    department: "Engineering",
    location: "Mumbai, MH",
    type: "Full-Time",
    salary: "₹24L - ₹32L",
    desc: "Oversee the architectural integrity of upcoming mega-structures in Navi Mumbai."
  },
  {
    id: "J-002",
    title: "Senior BIM Architect",
    department: "Design",
    location: "Remote / Pune",
    type: "Full-Time",
    salary: "₹18L - ₹25L",
    desc: "Transform 2D blueprints into intelligent, data-driven 3D architectural models."
  },
  {
    id: "J-003",
    title: "Site Safety Superintendent",
    department: "Operations",
    location: "Bengaluru, KA",
    type: "On-Site",
    salary: "₹15L - ₹20L",
    desc: "Ensure zero-incident compliance across our South India project clusters."
  },
  {
    id: "J-004",
    title: "Sustainable Materials Lead",
    department: "R&D",
    location: "Mumbai, MH",
    type: "Hybrid",
    salary: "₹22L - ₹30L",
    desc: "Pioneer the use of carbon-negative concrete and recycled steel in high-rises."
  }
];

const CareersPage = () => {
  const [selectedDept, setSelectedDept] = useState("All");
  const departments = ["All", "Engineering", "Design", "Operations", "R&D"];

  const filteredJobs = selectedDept === "All" 
    ? jobOpenings 
    : jobOpenings.filter(j => j.department === selectedDept);

  return (
    <div className="bg-[#F9F9F7] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      
      {/* 1. BRANDED HERO SECTION */}
      <section className="relative pt-30 md:pt-32 pb-12 md:pb-20 px-6 md:px-12 border-b border-[#1A1A1A]/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4 md:mb-6"
            >
           <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">
               Career Opportunities
            </span>
             
            </motion.div>
            <h1 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] font-black uppercase leading-[0.85] md:leading-[0.9]"
            >
              Build Your <br />
              <span className="text-white" style={{ WebkitTextStroke: '1px #1A1A1A' }}>Legacy.</span>
            </h1>
          </div>
          
          <div className="text-left md:text-right">
              <div className="text-[40px] md:text-[60px] font-light italic font-serif text-[#1A1A1A]/10 mb-1 md:mb-2 leading-none">0{jobOpenings.length}</div>
              <p className="text-[8px] md:text-[10px] font-mono tracking-widest text-[#1A1A1A]/40 uppercase font-bold">Positions / 2026</p>
          </div>
        </div>
      </section>

      {/* 2. NAVIGATION HUD */}
      <nav className="sticky top-0 z-50 bg-[#F9F9F7]/90 backdrop-blur-md border-b border-[#1A1A1A]/5 px-6 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`relative pb-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all whitespace-nowrap ${
                selectedDept === dept ? "text-[#1A1A1A]" : "text-[#1A1A1A]/30 hover:text-[#D4AF37]"
              }`}
            >
              {dept}
              {selectedDept === dept && (
                <motion.div 
                  layoutId="underline" 
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" 
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. OPENINGS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1A1A1A]/5 border border-[#1A1A1A]/5">
          <AnimatePresence mode='popLayout'>
            {filteredJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#F9F9F7] p-8 md:p-16 relative group cursor-pointer transition-all duration-500 hover:bg-white"
              >
                {/* HUD Header */}
                <div className="flex justify-between items-start mb-12 md:mb-20">
                   <span className="font-mono text-[9px] md:text-[10px] text-[#1A1A1A]/20 group-hover:text-[#D4AF37] transition-colors font-bold tracking-widest uppercase">
                     REF_{job.id}
                   </span>
                   <motion.div 
                     whileHover={{ rotate: 45 }}
                     className="w-8 h-8 md:w-10 md:h-10 border border-[#1A1A1A]/10 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all"
                   >
                     <svg width="16" height="16" md:width="18" md:height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                       <path d="M7 17L17 7M17 7H7M17 7V17" />
                     </svg>
                   </motion.div>
                </div>

                <div className="mb-8 md:mb-12">
                  <h3 
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 md:mb-6 group-hover:text-[#1A2222] transition-colors leading-none"
                  >
                    {job.title}
                  </h3>
                  <p className="text-[#1A1A1A]/60 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
                    {job.desc}
                  </p>
                </div>

                {/* Technical Meta */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 pt-8 md:pt-10 border-t border-[#1A1A1A]/5">
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] font-mono text-[#1A1A1A]/30 uppercase tracking-widest mb-1 font-bold">Location</span>
                    <span className="text-[9px] md:text-[11px] font-bold uppercase truncate">{job.location}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] font-mono text-[#1A1A1A]/30 uppercase tracking-widest mb-1 font-bold">Package</span>
                    <span className="text-[9px] md:text-[11px] font-bold uppercase truncate">{job.salary}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] font-mono text-[#1A1A1A]/30 uppercase tracking-widest mb-1 font-bold">Contract</span>
                    <span className="text-[9px] md:text-[11px] font-bold uppercase text-[#D4AF37] truncate">{job.type}</span>
                  </div>
                </div>

                {/* Subtle Hover Reveal */}
                <div className="absolute left-0 bottom-0 h-0 w-[3px] md:w-[4px] bg-[#D4AF37] group-hover:h-full transition-all duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>


    </div>
  );
};


export default CareersPage;
