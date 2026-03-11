import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Globe, Leaf, Award, ArrowRight } from 'lucide-react';

const WhyUs = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headingX = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const coreValues = [
    {
      title: "70 Years",
      fullTitle: "70 Years of Mastery",
      desc: "Founded in 1954, we blend traditional stone-cutting techniques with modern precision to honor the architectural legacy of Maharashtra.",
      features: ["Traditional Craft", "Modern Precision"],
      icon: <Award className="w-4 h-4 md:w-5 md:h-5" />,
      img: "https://i.pinimg.com/736x/78/4a/bb/784abbd81e65c07c8a3b38556bc1ff4d.jpg"
    },
    {
      title: "Global",
      fullTitle: "Global Sourcing",
      desc: "We bypass middlemen to source directly from exclusive quarries in Italy, Brazil, and Norway, ensuring rare textures and elite durability.",
      features: ["Direct Import", "Rare Textures"],
      icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
      img: "https://i.pinimg.com/1200x/f2/ae/18/f2ae18bfd1991c7ca16a2e5b60f3d794.jpg"
    },
    {
      title: "Ethics",
      fullTitle: "Earth-First Ethics",
      desc: "Our zero-waste policy includes advanced water filtration and solar-powered processing plants to protect the Sahyadri ecosystem.",
      features: ["Zero Waste", "Solar Powered"],
      icon: <Leaf className="w-4 h-4 md:w-5 md:h-5" />,
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
    },
    {
      title: "Quality",
      fullTitle: "Certified Quality",
      desc: "Every slab undergoes ultrasonic flaw detection and 12-point manual inspection before being polished for Pune's high-end estates.",
      features: ["12-Point Check", "Flaw Detection"],
      icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />,
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="bg-[#F9F7F2] py-8 md:py-16 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="mb-8 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-[#0B4650] px-3 py-1 mb-4"
          >
            <span className="text-[#E6FF2B] uppercase tracking-[0.3em] text-[9px] font-black">
              The Cobble Stone Distinction
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <motion.h2 
              style={{ x: headingX }}
              className="text-5xl md:text-8xl lg:text-9xl font-serif text-[#0B4650] leading-[0.85] tracking-tight"
            >
              Why <br />
              <span className="italic font-light text-[#0B4650]/40">Choose Us?</span>
            </motion.h2>

            <p className="text-[#898A8D] max-w-[280px] text-xs md:text-sm leading-relaxed">
              Blending heritage with precision since 1954 to deliver stones that last generations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-10">
          {coreValues.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative h-[280px] md:h-[380px] overflow-hidden rounded-sm cursor-pointer shadow-sm"
            >
              <div className="relative z-20 p-4 md:p-8 h-full flex flex-col justify-between bg-transparent md:bg-white md:group-hover:bg-transparent transition-all duration-500">
                <div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#E6FF2B] md:bg-[#0B4650] text-[#0B4650] md:text-[#E6FF2B] rounded-full flex items-center justify-center mb-4 md:mb-6 md:group-hover:bg-[#E6FF2B] md:group-hover:text-[#0B4650] transition-all duration-500">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-sm md:text-xl font-serif text-white md:text-[#0B4650] mb-1 md:mb-3 md:group-hover:text-white transition-colors duration-500">
                    {window.innerWidth < 768 ? item.title : item.fullTitle}
                  </h3>
                  
                  <p className="text-white/90 md:text-[#898A8D] text-[10px] md:text-[13px] font-light leading-tight md:leading-relaxed md:group-hover:text-white/80 transition-colors duration-500 line-clamp-4 md:line-clamp-none">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3 md:mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                    {item.features.map((feat, idx) => (
                        <span key={idx} className="text-[7px] md:text-[9px] border border-[#E6FF2B] text-[#E6FF2B] px-1.5 py-0.5 rounded-full uppercase font-bold">
                            {feat}
                        </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 md:gap-2 text-[8px] md:text-[10px] font-black tracking-widest text-[#E6FF2B] md:text-[#0B4650] md:group-hover:text-[#E6FF2B] transition-colors uppercase">
                  Explore <ArrowRight className="w-2 h-2 md:w-3 md:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute inset-0 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                <img src={item.img} alt="" className="w-full h-full object-cover scale-100 md:scale-110 md:group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B4650] via-[#0B4650]/80 md:via-[#0B4650]/70 to-[#0B4650]/40" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0B4650] rounded-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 h-32 md:h-48 lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover opacity-40 grayscale" 
                alt="Greenery"
              />
            </div>
            
            <div className="lg:col-span-8 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="text-[#E6FF2B] w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[#E6FF2B] text-[8px] md:text-[10px] font-black tracking-widest uppercase">Earth-First Commitment</span>
              </div>
              
              <h4 className="text-white font-serif text-2xl md:text-5xl mb-3">
                Beauty that <span className="italic text-[#E6FF2B]">Heals</span>
              </h4>
              
              <p className="text-white/60 font-light text-xs md:text-sm mb-6 leading-relaxed max-w-xl">
                Our closed-loop water systems ensure your legacy supports a greener Sahyadri.
              </p>

              <button className="flex items-center gap-3 bg-[#E6FF2B] text-[#0B4650] w-fit px-6 py-2 md:px-8 md:py-3 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all hover:bg-white">
                Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-between items-center gap-4 border-t border-[#0B4650]/10 pt-6 opacity-40 grayscale">
          {["ISO 9001", "ESTD 1954", "SUSTAINABLE", "PUNE HERITAGE"].map((tag) => (
            <span key={tag} className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-[#0B4650]">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;