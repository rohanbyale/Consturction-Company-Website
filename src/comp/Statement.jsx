import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Hammer } from 'lucide-react';

const StoneHeritage = () => {
  const textReveal = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3 + (i * 0.05), duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative py-12 md:py-24 bg-[#F9F7F2] overflow-hidden">
      <div className="absolute top-4 md:top-10 left-0 text-[18vw] font-serif text-[#0B4650]/5 whitespace-nowrap pointer-events-none select-none leading-none">
        EST. 1954
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          
          <div className="lg:sticky lg:top-32">
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "auto", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B4650] mb-6 rounded-sm overflow-hidden"
            >
              {["O", "u", "r", "\u00A0", "S", "t", "o", "r", "y"].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={textReveal}
                  className="text-[#E6FF2B] uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-black inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-6xl font-serif text-[#0B4650] leading-[1.2] md:leading-[1.1] mb-6"
            >
              Where Maratha Heritage <br className="hidden md:block" />
              <span className="italic text-[#0B4650]/60 font-light">Meets Modernity</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4 md:space-y-6 text-[#898A8D] text-base md:text-lg font-light leading-relaxed max-w-xl"
            >
              <p>
                <strong className="text-[#0B4650] font-medium">Cobble Stone Pvt. Ltd.</strong> is Pune’s trusted partner in natural stone paving, cladding, and masonry. With over 70 years of legacy, we bring unmatched craftsmanship inspired by the enduring strength of Maratha forts.
              </p>
              <p className="hidden md:block">
                From the weathered hills of <span className="text-[#0B4650] border-b border-[#E6FF2B]">Sinhagad</span> to the tree-lined lanes of Baner and Kothrud, our stones are built to belong.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-12 pt-8 md:pt-12 border-t border-[#0B4650]/10">
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="block text-2xl md:text-4xl font-serif text-[#0B4650]"
                >
                  70+
                </motion.span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#898A8D]">Years of Mastery</span>
              </div>
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="block text-2xl md:text-4xl font-serif text-[#0B4650]"
                >
                  1.2k
                </motion.span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#898A8D]">Projects Delivered</span>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ x: 5 }}
              className="mt-8 md:mt-12 flex items-center gap-4 text-[#0B4650] font-bold text-xs md:text-sm uppercase tracking-widest group"
            >
              Discover Our Heritage 
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#0B4650]/20 flex items-center justify-center group-hover:bg-[#E6FF2B] group-hover:border-[#E6FF2B] transition-all">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </motion.button>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 md:gap-4 h-[350px] md:h-[600px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="rounded-sm overflow-hidden shadow-xl md:mt-12"
              >
                <img 
                  src="https://i.pinimg.com/736x/62/f6/dd/62f6dd77f6ad84d8ccba408db26cf51c.jpg" 
                  alt="Heritage" 
                  className="w-full h-full object-cover   transition-all duration-700"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-sm overflow-hidden shadow-xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" 
                  alt="Modern" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B4650] p-4 md:p-8 text-[#E6FF2B] rounded-sm shadow-2xl scale-75 md:scale-100 whitespace-nowrap"
            >
              <Hammer className="w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-4 opacity-50" />
              <p className="font-serif text-lg md:text-xl italic leading-tight">
                Authentic <br /> Basalt Stone
              </p>
              <div className="mt-2 md:mt-4 flex items-center gap-2 text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-70">
                <MapPin className="w-2 md:w-3 h-2 md:h-3" /> Sahyadri Ranges
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoneHeritage;