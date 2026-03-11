import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, FileText, Star, Milestone, ChevronRight } from 'lucide-react';

const achievements = [
  {
    id: "CERT-01",
    title: "ISO 9001",
    category: "Quality",
    desc: "International standards for structural engineering.",
    icon: ShieldCheck,
    color: "bg-[#1A2222] text-white",
  },
  {
    id: "LIC-042",
    title: "Class-A",
    category: "Gov License",
    desc: "Unlimited complexity authorization.",
    icon: FileText,
    color: "bg-[#E6E8E3] text-[#1a1a1a]",
  },
  {
    id: "AWD-25",
    title: "Gold Medal",
    category: "Safety",
    desc: "1M+ man-hours with zero site incidents.",
    icon: Award,
    color: "bg-[#EEFC55] text-[#1a1a1a]",
  },
  {
    id: "RECO",
    title: "Industry #1",
    category: "League",
    desc: "Voted most innovative firm of 2026.",
    icon: Star,
    color: "bg-[#1A2222] text-white",
  }
];

const AchievementsRow = () => {
  return (
    <section className="bg-[#F5F5F3] pt-20 overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Section */}
        <header className="px-6 md:px-12 mb-16">
          <div className="flex items-center gap-4">
       
            <h2
              style={{ fontFamily: "'Bebas Neue',sans-serif" }}
              className="text-6xl md:text-6xl font-black uppercase  text-[#1a1a1a]">
              Credentials
            </h2>
          </div>
        </header>

        {/* --- GRID: Flush edges, no gaps --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              // REVEAL REMOVED: Simple fade and slide from left to right
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.7, 
                ease: "easeOut" 
              }}
              className={`group relative p-10 md:p-14 flex flex-col h-full min-h-[380px] transition-colors duration-500 rounded-none cursor-default ${item.color}`}
            >
              <div className="flex items-start justify-between mb-12">
                <div className="opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  <item.icon size={32} strokeWidth={1} />
                </div>
                <span className="font-mono text-[10px] font-bold opacity-30 tracking-widest uppercase">
                  {item.id}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
                  {item.category}
                </h4>
                <h3
                  style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                  className="text-5xl md:text-6xl font-black uppercase tracking-wide leading-none">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70 font-medium max-w-[220px]">
                  {item.desc}
                </p>
              </div>

              {/* Action Footer Line */}
              <div className="mt-auto pt-8 flex items-center justify-between border-t border-current/10 opacity-30 group-hover:opacity-100 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">View Details</span>
                <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Footer Status */}
        <div className="px-6 md:px-12 py-12 flex items-center justify-between border-t border-gray-100 mt-0">
          <div className="flex items-center gap-3 opacity-30">
            <Milestone size={16} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              Verified Secure // Global Engineering Standards 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsRow;