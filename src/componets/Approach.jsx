import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, ShieldCheck, Construction, ArrowRight } from 'lucide-react';

const ProjectTriage = () => {
  const categories = [
    {
      title: "Just Exploring",
      type: "01 / BEGIN A CONVERSATION",
      desc: "Perfect if you're in the early stages of a dream project and just need some expert advice on what's possible.",
      response: "Let's talk within 48 hours",
      icon: Clock,
      style: "bg-white border-black/5 text-[#1a1a1a]"
    },
    {
      title: "Ready to Build",
      type: "02 / FAST-TRACK SUPPORT",
      desc: "For projects that are moving fast and need a reliable partner to step in and keep things on schedule right now.",
      response: "Response within 6 hours",
      icon: Zap,
      style: "bg-[#EEFC55] border-[#EEFC55] text-[#1a1a1a]"
    },
    {
      title: "Expert Review",
      type: "03 / OFFICIAL ASSISTANCE",
      desc: "When you need a professional eye to check existing plans, handle safety paperwork, or give a final stamp of approval.",
      response: "Sorted by tomorrow",
      icon: ShieldCheck,
      style: "bg-[#1a2222] border-white/10 text-white"
    }
  ];

  return (
    <section className="bg-[#F5F5F3] py-20 px-6 md:px-20 border-t border-black/5 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[9px]  font-black uppercase tracking-[0.5em] text-gray-400 block mb-4">
              <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">
           Find Your path
            </span>
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-6xl lg:text-6xl uppercase leading-[0.85]">
              How can we <span className="text-white" style={{ WebkitTextStroke: '1.5px #1a1a1a' }}>help?</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest opacity-40">
            <Construction size={16} />
            <span>Consultants Online</span>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-10 flex flex-col justify-between min-h-[380px] border relative group cursor-pointer ${item.style} rounded-sm transition-all duration-300 hover:shadow-2xl hover:shadow-black/5`}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
                    {item.type}
                  </span>
                  <item.icon size={24} strokeWidth={1.5} className={index === 1 ? "animate-pulse" : "opacity-40"} />
                </div>
                
                <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4 leading-none">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-75 font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-12 flex items-center justify-between pt-6 border-t border-current opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                  {item.response}
                </span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>

              {/* Decorative Signal Line for Fast-Track Card */}
              {index === 1 && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1a1a1a] overflow-hidden">
                  <motion.div 
                    animate={{ x: [-100, 400] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-20 h-full bg-white opacity-50 shadow-[0_0_10px_white]"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Detail */}
        <div className="mt-16 flex flex-col md:flex-row gap-8 items-center justify-between border-y border-black/5 py-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-400">
            Your information is private and securely handled
          </p>
          <div className="flex gap-12">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
               <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Mumbai Office: Open</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
               <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Pune Office: Open</span>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectTriage;