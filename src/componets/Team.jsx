import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
const team = [
  { id: "01", name: "Manish Patil", role: "Structural Lead", image: "https://i.pinimg.com/736x/3b/f1/75/3bf1756cdf471c397669e352976205f1.jpg" },
  { id: "02", name: "Elena Rodriguez", role: "Principal Architect", image: "https://i.pinimg.com/736x/3f/a2/96/3fa296c46626cc42d68c3ad75f7bcb25.jpg" },
  { id: "03", name: "Saurabh More", role: "Material Scientist", image: "https://i.pinimg.com/736x/99/29/c4/9929c45f7037670dbc052517c79b2c4c.jpg" },
  { id: "04", name: "Sarah Chen", role: "Operations Director", image: "https://i.pinimg.com/1200x/b8/20/92/b8209200d48fd548a321eeb31b85b32a.jpg" }
];

const TeamGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-[#F5F5F3] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-12">
          <div className="max-w-2xl">
            <h2
              style={{ fontFamily: "'Bebas Neue',sans-serif",}}
            className="text-6xl md:text-6xl font-black text-[#1a1a1a] uppercase leading-[0.8] tracking-wide">
              The <span className="text-transparent" style={{ WebkitTextStroke: '0.1px #1a1a1a' }}>Founders.</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
            Personnel_Directory // 2026_Standard
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group cursor-none"
            >
              {/* Image Container with 3D-ish Tilt Perspective */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm perspective-1000">
                <motion.div
                  animate={{ 
                    scale: hoveredId === member.id ? 1.05 : 1,
                    rotateY: hoveredId === member.id ? 5 : 0,
                    rotateX: hoveredId === member.id ? -2 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    animate={{ 
                      filter: hoveredId === member.id ? "grayscale(0%) brightness(1.1)" : "grayscale(100%) brightness(0.9)",
                      scale: hoveredId === member.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover origin-bottom"
                  />
                </motion.div>

                {/* Animated Social Overlay: Staggered Icons */}
                <AnimatePresence>
                  {hoveredId === member.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-[2px] flex items-center justify-center gap-4"
                    >
                      {[Linkedin, Twitter, Mail].map((Icon, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ delay: idx * 0.05, ease: "backOut" }}
                          whileHover={{ scale: 1.2, backgroundColor: "#D4AF37" }}
                          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white transition-colors"
                        >
                          <Icon size={16} />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top Corner Badge */}
                <div className="absolute top-0 right-0 p-4 overflow-hidden">
                   <motion.div 
                     animate={{ x: hoveredId === member.id ? 0 : 50 }}
                     className="bg-[#D4AF37] text-[#1a1a1a] px-3 py-1 font-mono text-[9px] font-bold uppercase"
                   >
                     Active
                   </motion.div>
                </div>
              </div>

              {/* Text Reveal Area */}
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#1a1a1a]">
                    {member.name}
                  </h3>
                  <div className="h-[1px] w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-500 mt-1" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-2">
                    {member.role}
                  </p>
                </div>
                <motion.div
                  animate={{ 
                    rotate: hoveredId === member.id ? 45 : 0,
                    color: hoveredId === member.id ? "#D4AF37" : "#e5e7eb"
                  }}
                >
                  <ArrowUpRight size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 flex justify-center">
             <Link to="/contact" className="block">
          <motion.button 
            whileHover="hover"
            className="relative px-8 py-4 overflow-hidden border border-gray-200"
          >
            <motion.div 
              variants={{ hover: { y: "-100%" } }}
              className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]"
            >
              Collaborate With Us
            </motion.div>
            <motion.div 
              variants={{ hover: { y: 0 } }}
              initial={{ y: "100%" }}
              className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.4em]"
            >
              Send Request
            </motion.div>
          </motion.button>
</Link>
        </div>
        
      </div>
    </section>
  );
};

export default TeamGrid;