import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, ShieldCheck, Castle } from 'lucide-react';

const StoneFeatures = () => {
  const features = [
    {
      title: "Climate Resilient",
      desc: "Ideal for Pune’s year-round outdoor living – cool in scorching summers and rock-solid during heavy monsoons.",
      icon: <Sun className="w-5 h-5 md:w-6 md:h-6" />,
      theme: "bg-[#FFFBF2] border-[#E8DCC4] iconBg-[#D4A373]" 
    },
    {
      title: "Versatile Applications",
      desc: "Perfect for farmhouse driveways, pool decks, patios, and verandahs. Real stone that ages with grace.",
      icon: <CloudRain className="w-5 h-5 md:w-6 md:h-6" />,
      theme: "bg-[#F4F9F4] border-[#CDE3CD] iconBg-[#6A994E]"
    },
    {
      title: "Heritage Aesthetics",
      desc: "Finishes that echo the soul of Wada architecture and Sahyadri retreats, blended with modern build tech.",
      icon: <Castle className="w-5 h-5 md:w-6 md:h-6" />,
      theme: "bg-[#FCF5F2] border-[#F2D8CF] iconBg-[#BC6C4D]"
    },
    {
      title: "Safety & Longevity",
      desc: "Anti-skid, climate-resistant textures that offer a naturally aging patina that looks better every decade.",
      icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
      theme: "bg-[#F5F7F8] border-[#D1D9E0] iconBg-[#4A6278]"
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#F9F7F2] text-[#0B4650] font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#0B4650] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-2"
          >
            Engineered for Maharashtra
          </motion.span>
          
          <motion.h2 
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#0B4650] leading-tight"
          >
            Perfect for Pune’s <span className="italic opacity-80">Weather & Landscape</span>
          </motion.h2>

          <div className="w-16 md:w-20 h-1 bg-[#E6FF2B] mx-auto mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => {
            const themeClasses = f.theme.split(' ');
            const bgColor = themeClasses[0];
            const borderColor = themeClasses[1];
            
            return (
              <div key={i} className="group relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.1, 
                    duration: 0.5,
                    ease: "easeOut" 
                  }}
                  whileHover={{ y: -8 }}
                  className={`h-full relative ${bgColor} p-8 md:p-10 flex flex-col items-start gap-6 shadow-[0_4px_20px_rgba(11,70,80,0.03)] rounded-sm border border-transparent hover:border-[#0B4650]/20 transition-all duration-300 will-change-transform`}
                >
                  <div className="p-3 md:p-4 rounded-full bg-[#0B4650] text-[#E6FF2B] group-hover:bg-[#0B4650] group-hover:scale-110 transition-all duration-300 shadow-sm relative z-10">
                    {f.icon}
                  </div>
                  
                  <div className="space-y-3 relative z-10">
                    <h3 className="text-xl font-serif text-[#0B4650] leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-[#898A8D] text-sm leading-relaxed font-light">
                      {f.desc}
                    </p>
                  </div>

                  <div className={`absolute top-0 right-0 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-[#E6FF2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 md:mt-20 flex flex-wrap justify-center items-center gap-3 md:gap-6"
        >
          {["ISO 9001 CERTIFIED", "NATURAL STONE COUNCIL", "ECO-FRIENDLY QUARRYING"].map((label) => (
            <span 
              key={label}
              className="text-[8px] md:text-[9px] tracking-[0.15em] font-bold text-[#0B4650]/50 border border-[#0B4650]/10 px-3 py-2 rounded-full hover:bg-[#0B4650] hover:text-white hover:border-[#0B4650] transition-all duration-300 cursor-default whitespace-nowrap"
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StoneFeatures;