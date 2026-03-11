import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Home, Map, ArrowRight, ShieldCheck } from 'lucide-react';

const Card = ({ app, index }) => {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (index * 0.04)]);

  return (
    <div 
      ref={container} 
      className="h-[100dvh] md:h-auto flex items-start justify-center sticky top-0 md:relative md:py-0"
    >
      <motion.div
        style={{ 
          top: 0,
          scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : scale
        }}
        className="bg-white md:bg-white w-full h-full md:h-full md:rounded-sm md:shadow-sm border-b md:border border-[#0B4650]/5 flex flex-col overflow-hidden"
      >
        {/* 1. Hero Image */}
        <div className="relative h-[45vh] md:aspect-[3/4] md:h-auto overflow-hidden shrink-0">
          <img 
            src={app.img} 
            alt={app.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute bottom-4 right-4 md:bottom-0 md:right-0 bg-[#0B4650] text-[#E6FF2B] p-4 shadow-lg z-10">
            {React.cloneElement(app.icon, { className: "w-6 h-6 md:w-5 md:h-5" })}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent md:hidden" />
        </div>

        {/* 2. Content */}
        <div className="flex flex-col flex-grow p-6 md:p-5 text-center items-center justify-between md:justify-start">
          <div className="w-full space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-[#0B4650]/30 text-[9px] md:text-[8px] font-black tracking-[0.3em] uppercase">
                {app.tags[0]}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#E6FF2B]" />
              <span className="text-[#0B4650]/30 text-[9px] md:text-[8px] font-black tracking-[0.3em] uppercase">
                {app.tags[1]}
              </span>
            </div>
            
            <h3 className="text-3xl md:text-2xl font-serif text-[#0B4650] tracking-tight">
              {app.title}
            </h3>
            
            <p className="text-[#898A8D] text-sm md:text-[12px] leading-relaxed max-w-md mx-auto line-clamp-4 md:line-clamp-none">
              {app.desc}
            </p>
          </div>

          <div className="w-full mt-auto md:mt-6">
            <div className="bg-[#F9F7F2] md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none md:border-t md:border-gray-100 space-y-3 md:space-y-2 mb-8 md:mb-6">
              {app.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[11px] md:text-[10px] text-[#0B4650]/70 font-semibold justify-center">
                  <ShieldCheck className="w-4 h-4 md:w-3 md:h-3 text-[#0B4650]" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 text-[#0B4650] font-black text-[10px] md:text-[9px] uppercase tracking-[0.4em] border-b-2 border-[#E6FF2B] pb-2 w-fit mx-auto transition-all shrink-0"
            >
              Explore Collection <ArrowRight className="w-4 h-4 md:w-3.5 md:h-3.5 text-[#0B4650]" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ApplicationPage = () => {
  const applications = [
    {
      title: "Pavers",
      icon: <Map />,
      desc: "Timeless charm and unmatched durability for driveways and landscapes. Crafted from natural granite and basalt to withstand heavy vehicle loads even in extreme weather conditions.",
      details: ["Compressive Strength: 150MPa", "Water Absorption: <0.5%", "Slip Resistance: R11 Grade"],
      img: "https://i.pinimg.com/1200x/fe/b4/df/feb4df26a3751587b836e5ca1b9cce5a.jpg",
      tags: ["Eco-friendly", "Basalt"]
    },
    {
      title: "Interior",
      icon: <Home />,
      desc: "Transform living spaces with unique textures. From fireplaces to custom tabletops that blend luxury with a natural, breathable aesthetic for modern architectural needs.",
      details: ["Stain Resistant Coating", "Zero VOC Emission", "Custom Edge Profiling"],
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
      tags: ["Versatile", "Marble"]
    },
    {
      title: "Exterior",
      icon: <Compass />,
      desc: "Enhance curb appeal with durable façades. Our natural stone cladding retains its lustre even under direct sunlight and harsh monsoons without structural wear.",
      details: ["UV Resistant Color", "Thermal Insulation", "Mechanical Clamping"],
      img: "https://i.pinimg.com/736x/6c/4d/ec/6c4decc5ead7ab1a1ec3f1276a2f92b9.jpg",
      tags: ["UV Resistant", "Cladding"]
    }
  ];

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
     
      <header className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-sm pt-8 md:pt-12 pb-6 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-[#0B4650] px-3 py-1 shadow-sm">
            <span className="text-[#E6FF2B] uppercase tracking-[0.4em] text-[9px] font-black">
              Applications
            </span>
          </div>
          <div className="h-[1px] w-10 bg-[#0B4650]/20" />
          <span className="text-[#0B4650]/40 text-[9px] font-bold tracking-widest uppercase italic font-serif">
            Technical Precision
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto md:px-6">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-6 lg:gap-8">
          {applications.map((app, i) => (
            <Card key={i} app={app} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ApplicationPage;