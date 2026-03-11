import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhyNaturalStones = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const benefits = [
    {
      title: "Natural Look & Feel",
      image: "https://i.pinimg.com/736x/56/62/b7/5662b720045522aad17301e45378b1cb.jpg",
      desc: "Unique textures and organic patterns that synthetic materials cannot replicate."
    },
    {
      title: "Extreme Weather Insulation",
      image: "https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=800&q=80",
      desc: "Natural thermal mass keeps interiors cool in Pune summers and warm in winters."
    },
    {
      title: "Low Maintenance",
      image: "https://i.pinimg.com/736x/a4/d0/e6/a4d0e6ff6c3d26f7d563aef218f0928a.jpg",
      desc: "Resistant to wear, aging beautifully with minimal upkeep over decades."
    },
    {
      title: "Unlimited Design Possibilities",
      image: "https://i.pinimg.com/736x/5e/3e/90/5e3e901657721385fef715b67e84e30a.jpg",
      desc: "From rugged cobblestones to honed interior tiles, the versatility is endless."
    },
    {
      title: "Eco-Friendly Choice",
      image: "https://i.pinimg.com/736x/4b/d0/81/4bd081a1d77b412adfe369364b1bf4a9.jpg",
      desc: "Ethically sourced, recyclable, and low carbon footprint compared to concrete."
    },
    {
      title: "Built to Last for Generations",
      image: "https://i.pinimg.com/736x/ba/64/36/ba64362f96ec2864edeb0616e3995cb5.jpg",
      desc: "A legacy material that gains character and value as it stands the test of time."
    }
  ];

  return (
    <section className="py-24 bg-[#F9F7F2] text-[#0B4650] font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        <header className="mb-16 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#0B4650]/50 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block"
          >
            Selection Criteria
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-[#0B4650] leading-tight"
          >
            Why Choose <br /> 
            <span className="italic font-light text-[#898A8D]">Natural Stones?</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-[#E6FF2B] mt-8 mx-auto lg:mx-0" />
        </header>

        <div className="space-y-4">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className={`group cursor-pointer overflow-hidden rounded-sm transition-all duration-500 border border-[#0B4650]/10 ${
                activeIndex === index ? "bg-white shadow-xl" : "bg-transparent hover:bg-white/50"
              }`}
            >
              <div className="p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className={`text-xl md:text-2xl font-serif italic transition-colors ${
                    activeIndex === index ? "text-[#E6FF2B]" : "text-[#0B4650]/20"
                  }`}>
                    0{index + 1}
                  </span>
                  <h3 className={`text-sm md:text-base font-bold tracking-widest uppercase transition-colors ${
                    activeIndex === index ? "text-[#0B4650]" : "text-[#0B4650]/60 group-hover:text-[#0B4650]"
                  }`}>
                    {item.title}
                  </h3>
                </div>
                
                <motion.div 
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  className={`transition-colors ${activeIndex === index ? "text-[#0B4650]" : "text-[#0B4650]/20"}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </motion.div>
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative h-64 md:h-80 w-full overflow-hidden rounded-sm"
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B4650]/40 to-transparent" />
                      </motion.div>

                      <div className="space-y-6">
                        <p className="text-[#898A8D] text-sm md:text-base leading-relaxed font-light">
                          {item.desc}
                        </p>
                        <button className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0B4650] group/btn">
                          <span className="bg-[#E6FF2B] w-8 h-[2px] group-hover/btn:w-12 transition-all" />
                          View Collection
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-[#0B4650] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#0B4650]/90 transition-all shadow-lg">
            Download Technical Catalog
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyNaturalStones;