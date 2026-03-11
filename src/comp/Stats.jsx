import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Activity, Landmark } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    { 
      label: "Year Established", 
      value: "1953", 
      icon: <Landmark className="w-5 h-5" />,
      subtext: "70+ Years of Legacy" 
    },
    { 
      label: "Projects Completed", 
      value: "3,444", 
      icon: <CheckCircle2 className="w-5 h-5" />,
      subtext: "Villas, Resorts & Estates" 
    },
    { 
      label: "Live Projects", 
      value: "22", 
      icon: <Activity className="w-5 h-5" />,
      subtext: "Currently in Progress" 
    },
    { 
      label: "Human Resource", 
      value: "430", 
      icon: <Users className="w-5 h-5" />,
      subtext: "Expert Artisans & Team" 
    },
  ];

  return (
    <div className="w-full bg-[#0B4650] py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6FF2B]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center lg:text-left border-l border-white/10 pl-6 md:pl-8 first:border-0"
          >
            <div className="text-[#E6FF2B] mb-4 flex justify-center lg:justify-start">
              {stat.icon}
            </div>
            <div className="text-4xl md:text-6xl font-serif text-white mb-2 tracking-tight">
              {stat.value}
            </div>
            <div className="text-[#E6FF2B] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">
              {stat.label}
            </div>
            <div className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest font-medium">
              {stat.subtext}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;