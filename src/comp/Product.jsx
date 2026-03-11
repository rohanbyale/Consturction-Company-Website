import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Box, Info, ChevronDown } from 'lucide-react';

const StoneProducts = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products = [
    {
      title: "Basalt",
      subtitle: "Volcanic Strength",
      description: "A fine-grained volcanic rock known for its extreme density and uniform charcoal aesthetic.",
      details: { density: "2.9 g/cm³", finish: "Honed / Flamed", use: "Driveways" },
      img: "https://images.unsplash.com/photo-1542726922-8a0a42ae764d?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Limestone",
      subtitle: "Sedimentary Elegance",
      description: "Characterized by soft earth tones and fossilized textures with a timeless organic feel.",
      details: { density: "2.5 g/cm³", finish: "Sandblasted", use: "Pool Decks" },
      img: "https://plus.unsplash.com/premium_photo-1675526110163-cf61f5d39bf9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Granite",
      subtitle: "The Eternal Rock",
      description: "Formed from cooling magma, Granite is the gold standard for heavy-duty durability.",
      details: { density: "2.7 g/cm³", finish: "Polished", use: "High Traffic" },
      img: "https://cms.interiorcompany.com/wp-content/uploads/2024/10/granite-at-a-glance-pros-and-cons.jpg"
    },
    {
      title: "Sandstone",
      subtitle: "Artistry of Nature",
      description: "Famous for its distinct timber-like grains and naturally slip-resistant hues.",
      details: { density: "2.3 g/cm³", finish: "Natural Cleft", use: "Garden Paths" },
      img: "https://img.pikbest.com/wp/202344/sandstone-wall-high-resolution-background-captivating-texture-with-natural-patterns_9915067.jpg!w700wp"
    }
  ];

  return (
    <section  id='product'
     className="bg-[#0B4650] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <div className="p-8 md:p-20 bg-[#F9F7F2]">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#898A8D] mb-4 block">Product Showcase</span>
        <h2 className="text-4xl md:text-7xl font-serif text-[#0B4650]">The <span className="italic font-light">Stone</span> Edit</h2>
      </div>

      <div className="flex flex-col lg:flex-row h-[auto] lg:h-[700px] w-full bg-[#0B4650]">
        {products.map((stone, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              onClick={() => setExpandedIndex(index)}
              initial={false}
              animate={{ 
                height: isMobile ? (isExpanded ? '500px' : '70px') : '100%',
                width: isMobile ? '100%' : (isExpanded ? '100%' : '100px'),
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden cursor-pointer group"
            >
              <motion.img 
                src={stone.img} 
                className="absolute inset-0 h-full w-full object-cover"
                animate={{ scale: isExpanded ? 1 : 1.2, opacity: isExpanded ? 1 : 0.4 }}
              />
              
              <div className={`absolute inset-0 bg-black/40 transition-opacity ${isExpanded ? 'opacity-30' : 'opacity-70'}`} />

              {!isExpanded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex lg:items-center justify-between lg:justify-center p-6 lg:p-0 pointer-events-none"
                >
                  <span className="lg:-rotate-90 text-white font-serif text-lg tracking-widest uppercase">
                    {stone.title}
                  </span>
                  <ChevronDown className="text-white lg:hidden opacity-50" />
                </motion.div>
              )}

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end text-white"
                  >
                    <span className="text-[#E6FF2B] text-[10px] font-bold uppercase tracking-widest mb-2">{stone.subtitle}</span>
                    <h3 className="text-4xl md:text-8xl font-serif mb-4">{stone.title}</h3>
                    <p className="text-white/80 text-sm md:text-lg mb-6 max-w-md">{stone.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pb-6 border-t border-white/20 pt-6 max-w-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-[#E6FF2B]">
                          <Box size={14} /><span className="text-[9px] uppercase font-bold text-white/50">Density</span>
                        </div>
                        <span className="text-xs md:text-sm font-medium">{stone.details.density}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-[#E6FF2B]">
                          <Info size={14} /><span className="text-[9px] uppercase font-bold text-white/50">Best For</span>
                        </div>
                        <span className="text-xs md:text-sm font-medium">{stone.details.use}</span>
                      </div>
                    </div>

                    <button className="flex items-center gap-4 group/btn">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Explore Collection</span>
                      <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-[#E6FF2B] group-hover/btn:text-[#0B4650] transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StoneProducts;