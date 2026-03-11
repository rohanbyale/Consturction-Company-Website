import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Mail, Phone, MapPin, Zap } from 'lucide-react';

const ModernLuxuryContact = () => {
  const entryTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };


  return (
    <section className="relative min-h-screen bg-[#F5F5F3] text-[#1a1a1a] selection:bg-[#EEFC55] selection:text-[#1a1a1a] pt-32 pb-16 px-6 md:px-20 overflow-hidden font-sans">
      
      {/* 1. THE GLOBE - Blueprint Style */}
      <div className="absolute -top-10 -right-10 p-12 opacity-[0.05] hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <Globe size={400} strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* --- HEADER: Bold Typography & Signal Yellow Accent --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={entryTransition}
            >
       
              <h1 
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                className="text-[12vw] lg:text-[9vw] leading-[0.85] uppercase font-black "
              >
                Connect to <br />
                <span className="text-white" style={{ WebkitTextStroke: '0.1px #1a1a1a' }}>The Core.</span>
              </h1>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4 lg:pb-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, ...entryTransition }}
              className="border-l-2 border-[#EEFC55] pl-8 space-y-6"
            >
              <p className="text-gray-500 text-lg leading-relaxed max-w-sm font-medium">
                Our engineers are operational globally for high-complexity structural briefings and technical audits.
              </p>
          
            </motion.div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default ModernLuxuryContact;