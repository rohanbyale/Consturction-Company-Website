import React from 'react';
import { motion } from 'framer-motion';

const ContactHR = () => {
  return (
    <section className="bg-[#1F292E] py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute right-0 bottom-0 translate-y-1/2 translate-x-1/4 opacity-[0.03] pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M50,10 L50,90 M10,50 L90,50" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Messaging */}
          <div>
         
            <h2 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-6xl md:text-8xl font-black text-white uppercase leading-none mb-8"
            >
              Have <span className="text-[#DBDF00]">Queries?</span>
            </h2>
            <p className="text-white/50 text-lg font-medium max-w-md leading-relaxed">
              Our Talent Acquisition team is available for technical discussions regarding open roles, relocation, or our 2026 project roadmap.
            </p>
          </div>

          {/* Right Side: Contact HUD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            
            {/* Email Channel */}
            <motion.a 
              href="mailto:careers@urbanrise.com"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="bg-[#1F292E] p-10 group transition-colors"
            >
              <p className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest mb-4 font-bold">Official Channel</p>
              <h4 className="text-white text-xl font-bold mb-2 group-hover:text-[#D9F99D] transition-colors">careers@urbanrise.com</h4>
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-tighter">Response time: 24 Hours</p>
              
              <div className="mt-8 flex items-center gap-2 text-white/20 group-hover:text-white transition-colors">
                 <span className="text-[10px] font-mono uppercase font-black">Send Dossier</span>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                 </svg>
              </div>
            </motion.a>

            {/* Phone Channel */}
            <motion.a 
              href="tel:+910000000000"
              whileHover={{ backgroundColor: "rgba(217, 249, 157, 0.05)" }}
              className="bg-[#1F292E] p-10 group transition-colors border-l border-white/10"
            >
              <p className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest mb-4 font-bold">Direct Hotline</p>
              <h4 className="text-white text-xl font-bold mb-2 group-hover:text-[#D9F99D] transition-colors">+91 98765 43210</h4>
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-tighter">Mon — Fri / 09:00 — 18:00</p>

              <div className="mt-8 flex items-center gap-2 text-white/20 group-hover:text-white transition-colors">
                 <span className="text-[10px] font-mono uppercase font-black">Speak to HR</span>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2z" />
                 </svg>
              </div>
            </motion.a>

          </div>
        </div>

        {/* Bottom Technical Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center overflow-hidden">
           <div className="flex gap-4">
              <div className="w-1 h-1 bg-[#D9F99D]" />
              <div className="w-1 h-1 bg-white/20" />
              <div className="w-1 h-1 bg-white/10" />
           </div>
           <p className="text-[8px] font-mono text-white/10 uppercase tracking-[1em] whitespace-nowrap">
             URBANRISE_DEVELOPERS_PROPERTY_OF_HR_DEPT_2026
           </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHR;