import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Mail, ArrowUpRight, Github } from 'lucide-react';

const SocialConnectivity = () => {
  const socialChannels = [
    { 
      name: "Instagram", 
      handle: "@urbanrise_builders", 
      icon: Instagram, 
      desc: "Visual Archive & Project Process",
      color: "hover:text-[#EEFC55]" 
    },
    { 
      name: "LinkedIn", 
      handle: "UrbanRise Structural Engineering", 
      icon: Linkedin, 
      desc: "Corporate Updates & Technical Papers",
      color: "hover:text-[#EEFC55]" 
    },
    { 
      name: "Gmail", 
      handle: "urbanrise@gmail.com", 
      icon: Mail, 
      desc: "Direct Inquiry & Administrative",
      color: "hover:text-[#EEFC55]" 
    },
    { 
      name: "X / Twitter", 
      handle: "urb_eng", 
      icon: Twitter, 
      desc: "Industry News & Real-time Updates",
      color: "hover:text-[#EEFC55]" 
    }
  ];

  const cardTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <section className="bg-[#1A2222] text-white py-16 md:py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] block mb-4"
            >
              Network Protocols
            </motion.span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-5xl lg:text-6xl uppercase leading-none">
              Digital <span className="text-[#EEFC55]">Presence.</span>
            </h2>
          </div>
          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 max-w-[200px] text-left md:text-right">
            Follow our structural journey across global platforms.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {socialChannels.map((social, index) => (
            <motion.a
              key={social.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...cardTransition, delay: index * 0.1 }}
              viewport={{ once: true }}
              // Height reduced on mobile (h-[250px]) and increased on md screens (h-[350px])
              // Padding reduced on mobile (p-6) and increased on md screens (p-10)
              className="group bg-[#1A2222] p-6 md:p-10 flex flex-col justify-between h-[250px] md:h-[350px] transition-all duration-500 hover:bg-[#242c2c]"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center group-hover:border-[#EEFC55] transition-colors duration-500">
                  <social.icon size={18} md:size={20} strokeWidth={1} className="group-hover:text-[#EEFC55] transition-colors" />
                </div>
                <ArrowUpRight size={18} md:size={20} className="opacity-0 group-hover:opacity-100 group-hover:text-[#EEFC55] transition-all -translate-y-2 group-hover:translate-y-0" />
              </div>

              <div>
                <span className="block font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#EEFC55] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Connect via {social.name}
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 md:mb-2 uppercase">{social.name}</h3>
                <p className="text-[9px] md:text-[11px] text-gray-500 font-mono uppercase tracking-wider mb-3 md:mb-6 truncate">
                  {social.handle}
                </p>
                <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                  {social.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer Detail */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center gap-4 opacity-20 font-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-center">
          <span>Techniq Structural Engineering // All Rights Reserved</span>
          <div className="flex gap-4">
              <span>v2.0.26</span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#EEFC55] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialConnectivity;