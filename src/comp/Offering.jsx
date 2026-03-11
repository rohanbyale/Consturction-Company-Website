import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Layers, Settings2, Palette, Leaf } from 'lucide-react';

const PremiumOfferings = () => {
  const offerings = [
    {
      title: "Cobblestone Paving",
      desc: "Engineered for luxury entrances, boulevards, and high-traffic pathways that require timeless durability.",
      detail: "Available in various thicknesses for heavy vehicular loads.",
      icon: <Gem className="w-5 h-5" />,
      cardImage: "https://i.pinimg.com/736x/90/3c/de/903cde2bc5e4f0faee75bd21b1ef661d.jpg"
    },
    {
      title: "Wall Cladding & Masonry",
      desc: "Inspired by the enduring strength of historic fort walls, now refined for modern villas or boutique resorts.",
      detail: "Perfect for both exterior facades and interior feature walls.",
      icon: <Layers className="w-5 h-5" />,
      cardImage: "https://i.pinimg.com/1200x/81/dd/70/81dd70e52cc8162556c23495d02fcd07.jpg"
    },
    {
      title: "Custom Finishes",
      desc: "Tailor your aesthetic with natural split, flamed, brushed, antique, tumbled, or honed textures.",
      detail: "Precision-processed to meet specific architectural requirements.",
      icon: <Settings2 className="w-5 h-5" />,
      cardImage: "https://i.pinimg.com/736x/71/b9/89/71b98902c48e49ab47044e4495b0e6f7.jpg"
    },
    {
      title: "Extensive Material Library",
      desc: "Over 48+ colors and 60+ layouts available in premium granites, sandstones, limestones, and basalt.",
      detail: "Sourced from the finest quarries in the Sahyadri range.",
      icon: <Palette className="w-5 h-5" />,
      cardImage: "https://i.pinimg.com/736x/ea/b4/f7/eab4f7a4283bbb47319e763a8fdfe0a6.jpg"
    },
    {
      title: "Sustainable Sourcing",
      desc: "Ethically mined, reusable, and sustainable materials that minimize environmental impact while maximizing longevity.",
      detail: "Naturally low carbon footprint compared to synthetic materials.",
      icon: <Leaf className="w-5 h-5" />,
      cardImage: "https://i.pinimg.com/736x/fb/b0/57/fbb0576f56e2c2b0c9c95924e6d0d499.jpg"
    },
  ];

  return (
    <section 
    id='service'
    className="py-12 md:py-24 bg-[#F9F7F2] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#E6FF2B] bg-[#0B4650] px-3 py-1 rounded-sm uppercase tracking-[0.4em] text-[10px] font-bold inline-block mb-4"
            >
              Curated Collections
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif text-[#0B4650]"
            >
              Our Premium <span className="italic font-light opacity-80">Offerings</span>
            </motion.h2>
          </div>
          <div className="h-[1px] flex-grow bg-[#0B4650]/10 mx-8 hidden lg:block" />
          <p className="text-[#898A8D] text-xs md:text-sm max-w-[240px] font-light leading-relaxed">
            Architectural stone solutions engineered to endure Pune's unique climate.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {offerings.map((item, i) => (
            <div key={i} className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(11,70,80,0.05)] group-hover:shadow-[0_25px_50px_rgba(11,70,80,0.12)] transition-all duration-500 border border-transparent hover:border-[#0B4650]/5 will-change-transform"
              >
                <div className="h-32 md:h-48 w-full overflow-hidden relative">
                  <img 
                    src={item.cardImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B4650]/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-6 p-2 md:p-3 rounded-lg md:rounded-xl bg-[#0B4650] text-[#E6FF2B] shadow-lg transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                </div>

                <div className="p-4 md:p-10">
                  <h3 className="text-sm md:text-xl font-bold text-[#0B4650] mb-2 md:mb-4 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#898A8D] text-[10px] md:text-sm leading-relaxed mb-4 md:mb-6 font-light line-clamp-2 md:line-clamp-none">
                    {item.desc}
                  </p>
                  
                  <div className="pt-3 md:pt-6 border-t border-[#F9F7F2] hidden md:block">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#0B4650]/40">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
          
          <div className="group">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="h-full min-h-[200px] md:min-h-[400px] bg-[#0B4650] rounded-xl md:rounded-3xl flex flex-col justify-center items-center text-center text-white relative overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/granite.png')]" />
              <div className="absolute inset-0 bg-[#0B4650]/90 group-hover:bg-[#0B4650]/80 transition-colors z-0" />
              
              <div className="relative z-10 p-4 md:p-10">
                <h4 className="text-lg md:text-2xl font-serif mb-2 md:mb-4">Request a Sample</h4>
                <p className="text-white/70 text-[10px] md:text-sm mb-4 md:mb-8 hidden md:block">Experience the texture and quality of our stones firsthand.</p>
                <button className="px-4 py-2 md:px-8 md:py-3 bg-[#E6FF2B] text-[#0B4650] text-[10px] md:text-base font-bold rounded-lg md:rounded-xl hover:bg-white transition-all duration-300 shadow-xl">
                  Get in Touch
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumOfferings;