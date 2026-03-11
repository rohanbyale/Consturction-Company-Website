import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Building2, Globe } from 'lucide-react';

const ProjectsDelivered = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const landmarks = [
    { name: "JW Marriott Pune", city: "Senapati Bapat Rd", cat: "Luxury Hospitality", size: "lg", img: "https://i.pinimg.com/736x/63/82/9b/63829b3d53e5a647bd9c5d125b7e8aca.jpg" },
    { name: "Corinthian Club", city: "Hadapsar", cat: "Elite Social Space", size: "sm" },
    { name: "Shapoorji Pallonji", city: "Global Infra", cat: "Landmark Developer", size: "sm" },
    { name: "Rohan Builders", city: "Pune/Bangalore", cat: "Residential Excellence", size: "md", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
    { name: "Kumar Group", city: "Pune Central", cat: "Commercial Hubs", size: "sm" },
    { name: "Concord Pune", city: "Business District", cat: "Premium Workspaces", size: "sm" },
  ];

  const regions = ["Mulshi", "Lonavala", "Kamshet", "Alibaug", "Lavasa"];

  return (
    <section className="py-16 md:py-32 bg-[#F9F7F2] text-[#0B4650] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4 md:mb-6"
            >
              <span className="bg-[#0B4650] text-[#E6FF2B] px-3 md:px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] font-extrabold shadow-sm">
                Landmark Deliveries
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-7xl font-serif leading-[1.1] text-[#0B4650]"
            >
              Built for Pune's <br /> 
              <span className="italic font-light text-[#898A8D] text-2xl md:text-6xl">Weather & Landscape.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 border-l border-[#0B4650]/20 pl-6 md:pl-8 hidden lg:block">
            <p className="text-[#898A8D] text-sm leading-relaxed font-light">
              Supplying anti-skid, climate-resistant natural stone designed to stay cool in summers and stand strong in Sahyadri monsoons.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[160px] md:auto-rows-[200px]">
          {landmarks.map((item, i) => (
            <div 
              key={i} 
              className={`group relative ${item.size === 'lg' ? 'col-span-2 row-span-2' : ''} ${item.size === 'md' ? 'col-span-2' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="h-full w-full relative rounded-sm overflow-hidden cursor-pointer transition-all duration-700 shadow-[0_10px_30px_rgba(11,70,80,0.05)] border border-[#0B4650]/5"
              >
                <div className={`absolute inset-0 transition-all duration-700 ${item.img ? 'opacity-100' : 'bg-white group-hover:bg-[#F9F7F2]'}`} />
                
                {item.img && (
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-110" 
                  />
                )}

                {item.img && <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent z-0" />}

                <div className="relative h-full p-4 md:p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="p-2 md:p-3 rounded-full bg-[#0B4650] text-[#E6FF2B] group-hover:bg-[#E6FF2B] group-hover:text-[#0B4650] transition-all duration-500 shadow-sm">
                      <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <ArrowUpRight className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ${hoveredIndex === i ? 'text-[#0B4650] translate-x-1 -translate-y-1' : 'text-[#0B4650]/20'}`} />
                  </div>

                  <div>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#0B4650] font-bold mb-1 md:mb-2 opacity-80">{item.cat}</p>
                    <h4 className="text-lg md:text-2xl font-serif text-[#0B4650] leading-tight">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-2 md:mt-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <MapPin className="w-2.5 h-2.5 text-[#0B4650]" />
                      <span className="text-[8px] md:text-[10px] text-[#898A8D] uppercase tracking-widest">{item.city}</span>
                    </div>
                  </div>
                </div>

                <div className="w-0 h-0 border-t-[10px] md:border-t-[12px] border-t-transparent border-r-[10px] md:border-r-[12px] border-r-[#E6FF2B]/40 absolute top-0 right-0 group-hover:border-r-[#E6FF2B] transition-all" />
              </motion.div>
            </div>
          ))}

          <motion.div 
            className="col-span-2 bg-[#0B4650] rounded-sm p-6 md:p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-lg"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/10/3d/d0/103dd0725c99ec04f579b9d4948dc756.jpg')] opacity-5" />
            <Globe className="w-8 h-8 md:w-12 md:h-12 text-[#E6FF2B]/40 mb-4 md:mb-6 group-hover:rotate-12 transition-transform duration-700" />
            <h3 className="text-xl md:text-3xl font-serif text-white mb-4 italic leading-tight">Farmhouse, Patios <br className="hidden md:block" /> & Courtyards</h3>
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 relative z-10">
              {regions.map((r, idx) => (
                <span key={idx} className="px-2 md:px-4 py-1 md:py-2 rounded-full border border-white/20 text-white text-[8px] md:text-[10px] tracking-widest hover:bg-[#E6FF2B] hover:text-[#0B4650] hover:border-[#E6FF2B] transition-all cursor-default">
                  {r.toUpperCase()}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 pt-10 md:pt-16 border-t border-[#0B4650]/10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { label: "Supplying Pune", val: "70+ Years" },
              { label: "Villas Delivered", val: "500+" },
              { label: "Natural Colors", val: "48+" },
              { label: "Custom Layouts", val: "60+" }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-2xl md:text-3xl font-serif text-[#0B4650] transition-colors">
                  {stat.val}
                </div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#898A8D] font-bold mt-2 md:mt-3">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsDelivered;