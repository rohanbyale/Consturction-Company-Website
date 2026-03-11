import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Drill, HardHat, Construction, Instagram, Linkedin, Twitter } from 'lucide-react';

const IndustrialFooter = () => {
  return (
    <footer className="bg-[#DBDF00]  text-black pt-20 pb-0 px-0 font-sans relative overflow-hidden">
      
      {/* Background Decorative Year */}
      <div className="absolute top-0 right-0 select-none pointer-events-none opacity-10">
        <h2 className="text-[25vw] font-black leading-none translate-x-1/4 -translate-y-1/4">
          2026
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b-4 border-black pb-16">
          
          {/* Left Column: Branding & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-[#FFD700]">
                  <Construction size={28} />
                </div>
                <h3 className="md:text-2xl font-black uppercase tracking-tighter italic">UrbanRise Builders</h3>
              </div>
              <h4
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                className="text-5xl md:text-7xl font-black uppercase text-[#1A2222] leading-[0.85] mb-8">
                Built to <br /> Overpower.
              </h4>
            </div>
            
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "https://instagram.com/urbanrise" },
                { Icon: Linkedin, href: "https://linkedin.com/company/urbanrise" },
                { Icon: Twitter, href: "https://twitter.com/urbanrise" }
              ].map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-[#FFD700] transition-all"
                >
                  <social.Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Navigation Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Navigation Links */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-black uppercase bg-black text-[#FFD700] px-2 py-1">Directives</span>
              <ul className="space-y-3">
                {[
                  { name: 'The Works', path: '/project' },
                  { name: 'Career', path: '/career' },
                  { name: 'Home', path: '/home' },
                  { name: 'Contact', path: '/contact' }
                ].map(item => (
                  <li key={item.name} className="text-sm font-black uppercase hover:underline decoration-2 underline-offset-4 cursor-pointer">
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Section */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-black uppercase bg-black text-[#FFD700] px-2 py-1">Location</span>
              <p className="text-xs font-bold leading-relaxed uppercase">
                Pune, Mumbai <br />
                Maharashtra <br />
                India 
              </p>
              <a 
                href="https://www.google.com/maps/search/Urbanrise+Builders+Maharashtra" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-black italic border-b border-black w-fit cursor-pointer hover:opacity-70 transition-opacity"
              >
                Map Coordinates <ArrowRight size={14} />
              </a>
            </div>

            {/* Inquiries Section */}
            <div className="col-span-2 md:col-span-1 space-y-6">
              <span className="text-[10px] font-mono font-black uppercase bg-black text-[#FFD700] px-2 py-1">Inquiries</span>
              <a href="mailto:ops@urbanrisebuilders.com" className="block text-lg font-black break-words hover:italic transition-all">
                URBANRISEBUILDERS.COM
              </a>
              <div className="bg-black/5 p-4 border-l-4 border-black">
                <p className="text-[9px] font-bold uppercase leading-tight">
                  "Precision is not an option, it is the fundamental requirement of our assembly."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personnel & Identity Footer */}
        <div className="mt-10 mb-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <HardHat size={16} />
              <Drill size={16} />
            </div>
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
              Authorized_Personnel_Only
            </span>
          </div>

          <div className="text-right">
             <div className="text-[10vw] font-black leading-none tracking-tighter opacity-20">
               URB-26
             </div>
             <div className="flex justify-end gap-6 text-[10px] font-mono font-bold uppercase tracking-widest mt-2">
               <span>© 2026 UrbanRise_Builders</span>
               <span className="hidden md:block">Structural_Design</span>
             </div>
          </div>
        </div>
      </div>

      {/* Industrial Scrolling Marquees */}
      <div className="bg-[#0a1128] py-4 mt-4 overflow-hidden flex select-none">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex flex-nowrap gap-12 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-[#FFD700] text-2xl font-black uppercase italic tracking-tighter">
                URBANRISE Construction
              </span>
              <Construction className="text-[#FFD700]" size={24} />
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex flex-nowrap gap-12 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-[#FFD700] text-2xl font-black uppercase italic tracking-tighter">
                Sanket Construction
              </span>
              <Construction className="text-[#FFD700]" size={24} />
            </div>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default IndustrialFooter;