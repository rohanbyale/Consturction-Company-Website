import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Landmark, Building2, MapPin, Users, ArrowRight, Command } from 'lucide-react';

const MumbaiTimeline = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const stories = [
    {
      year: "2018",
      title: "Colaba Origins",
      desc: "Our journey began in South Mumbai, merging heritage aesthetics with precision engineering.",
      icon: <MapPin size={24} />,
      img: "https://images.unsplash.com/photo-1570160897040-30430ade2211?q=80&w=1000"
    },
    {
      year: "2020",
      title: "Skyline Synthesis",
      desc: "Defining the new Mumbai horizon with structures built for coastal resilience.",
      icon: <Building2 size={24} />,
      img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1000"
    },
    {
      year: "2023",
      title: "Urban Connectivity",
      desc: "From the Sea Link to the suburbs, we build the infrastructure that moves millions.",
      icon: <Landmark size={24} />,
      img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1000"
    },
    {
      year: "2026",
      title: "Future Standard",
      desc: "Leading the transition toward sustainable, high-density living in a global metropolis.",
      icon: <Command size={24} />,
      img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1000"
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-white text-black font-sans">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* TOP HUD - BRANDING ARTIFACTS */}
        <div className="absolute top-12 left-12 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#eefc55] rounded-full border border-black/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Techniq.Mumbai</span>
          </div>
          <span className="text-[9px] font-mono text-black/30 uppercase tracking-widest">Archive_Log_2026</span>
        </div>

        <motion.div style={{ x }} className="flex gap-0">
          {stories.map((item, i) => (
            <div key={i} className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center border-r border-black/5 px-8 md:px-24">
              
              {/* Background Year (High-End Watermark Typography) */}
              <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28vw] font-black text-black/[0.02] italic pointer-events-none select-none">
                {item.year}
              </h2>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl w-full">
                
                {/* Content Side */}
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="p-4 bg-[#eefc55] text-black w-fit shadow-sm"
                  >
                    {item.icon}
                  </motion.div>
                  
                  <h3 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]">
                    {item.title.split(' ')[0]} <br />
                    <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>
                        {item.title.split(' ')[1]}
                    </span>
                  </h3>
                  
                  <p className="max-w-md text-sm md:text-base font-medium text-black/60 leading-relaxed uppercase tracking-wider font-mono">
                    {item.desc}
                  </p>

                  <button className="flex items-center gap-4 py-4 px-8 border border-black/10 hover:bg-black hover:text-white transition-all group">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Detail</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>

                {/* Image Side (Obsidion Framed) */}
                <div className="relative aspect-[4/5] md:aspect-square overflow-hidden bg-black group shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={item.img} 
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100"
                    alt={item.title}
                  />
                  <div className="absolute top-0 right-0 p-4">
                    <span className="text-[10px] font-mono font-black text-white mix-blend-difference uppercase tracking-tighter">
                      MNL_REF_{i}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM HUD - PROGRESSION */}
      <div className="absolute bottom-12 left-12 right-12 z-20 flex justify-between items-end border-t border-black/10 pt-10">
          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-black/40 italic">Navigation_Status</p>
            <div className="flex gap-3">
              {stories.map((_, i) => (
                <motion.div 
                  key={i}
                  className="h-1 bg-black"
                  style={{ 
                    width: useTransform(scrollYProgress, [i/4, (i+1)/4], [15, 60]),
                    backgroundColor: useTransform(scrollYProgress, [i/4, (i+0.5)/4, (i+1)/4], ["#000", "#eefc55", "#000"])
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <span className="text-[10px] font-mono font-bold">STB_V.Mumbai_2026</span>
             <div className="w-32 h-[1px] bg-black/10" />
          </div>
      </div>
    </section>
  );
};

export default MumbaiTimeline;