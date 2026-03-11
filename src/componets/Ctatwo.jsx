import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const ContactShort = () => {
  return (
    <section className="bg-[#0A0A0A] py-16 px-6 font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* TEXT CONTENT */}
        <div className="space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[#EEFC55] font-mono text-[10px] tracking-[0.3em] uppercase"
          >
            <ShieldCheck size={14} /> Structural Excellence
          </motion.div>

          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed font-light tracking-tight">
            We specialize in the <strong className="text-white font-bold">Structural Integrity</strong> of modern living. 
            Every home we build in Pusad is a masterclass in civil precision—blending 
            architectural beauty with the <span className="text-[#EEFC55] italic">uncompromising strength</span> of advanced engineering.
          </p>

          <div className="flex flex-wrap gap-5">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+919999999999" 
              className="flex items-center gap-3 bg-[#EEFC55] text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(238,252,85,0.2)] transition-all"
            >
              <Phone size={18} /> Hire Our Team
            </motion.a>
            
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex items-center gap-3 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
            >
              Get Quote <ArrowRight size={18} className="text-[#EEFC55]" />
            </motion.button>
          </div>
        </div>

        {/* IMAGE BOX */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative group h-[350px]"
        >
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-[#EEFC55]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=1000" 
              alt="Structural Engineering" 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          {/* Floating Detail */}
          <div className="absolute -bottom-6 -right-6 bg-[#1A1A1A] border border-white/10 p-5 rounded-2xl shadow-xl hidden lg:block">
            <p className="text-[#EEFC55] font-black text-2xl tracking-tighter italic">100%</p>
            <p className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Safety Record</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactShort;