import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { 
  Building2, HardHat, Ruler, 
  Hammer, Drill, ShieldCheck, ArrowUpRight 
} from 'lucide-react';

const services = [
  { id: "01", title: "Civil Engineering", icon: <Building2 />, desc: "Master-scale infrastructure including bridges and urban systems.", img: "https://i.pinimg.com/1200x/6b/44/eb/6b44eb18313162927b0d7aa978b61905.jpg" },
  { id: "02", title: "Structural Steel", icon: <HardHat />, desc: "Precision fabrication and erection of high-rise frameworks.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800" },
  { id: "03", title: "Pre-Construction", icon: <Ruler />, desc: "BIM modeling, cost estimation, and feasibility analysis.", img: "https://images.unsplash.com/photo-1601074231509-dce351c05199?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "04", title: "General Contracting", icon: <Hammer />, desc: "Full-spectrum site management and end-to-end execution.", img: "https://images.unsplash.com/photo-1509453721491-c3af5961df76?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "05", title: "Foundation Work", icon: <Drill />, desc: "Specialized deep piling and seismic earth reinforcement.", img: "https://images.unsplash.com/photo-1495036019936-220b29b930ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "06", title: "Safety & Quality", icon: <ShieldCheck />, desc: "ISO-certified risk mitigation and integrity testing.", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800" },
];

const ServiceCard = ({ service, index }) => {
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const iconX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const iconY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.2);
    mouseY.set(y * 0.2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: isEven ? 0 : 40 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative w-full mb-8 lg:mb-0"
    >
      <div className="relative h-[450px] md:h-[500px] overflow-hidden bg-[#111] border border-white/5 p-6 md:p-8 flex flex-col justify-between">
        
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0 bg-[#D4AF37] z-10"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 + 0.3 }}
            style={{ originY: 0 }}
          />
          <img 
            src={service.img} 
            alt="" 
            className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
          />
        </div>

        <div className="relative z-20 flex justify-between items-start">
          <span className="font-mono text-[10px] md:text-xs text-[#D4AF37] tracking-[0.3em]">{service.id}</span>
          <motion.div style={{ x: iconX, y: iconY }} className="text-white/30 group-hover:text-[#D4AF37] transition-colors">
            {React.cloneElement(service.icon, { size: 28, strokeWidth: 1 })}
          </motion.div>
        </div>

        <div className="relative z-20">
          <div className="overflow-hidden mb-4">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl md:text-2xl font-bold uppercase tracking-tighter text-[#E5E2DA]"
            >
              {service.title}
            </motion.h3>
          </div>
          <p className="text-xs md:text-sm text-white/50 max-w-[200px] mb-6 md:mb-8 group-hover:text-white transition-colors duration-500">
            {service.desc}
          </p>
          <motion.button className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Explore <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-[#D4AF37]"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const ServiceSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  // Fill effect for the title
  const fillWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <section ref={container} className="bg-[#0a0a0a] rounded-b-3xl py-20 md:py-32 px-4 md:px-12 relative overflow-hidden">
      {/* Background Radial for Trust Bar Feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <motion.div 
        style={{ x: textX }}
        className="absolute top-20 left-0 whitespace-nowrap text-[20vw] lg:text-[15vw] font-black uppercase text-white/[0.02] pointer-events-none leading-none hidden md:block"
      >
        Precision Engineering Infrastructure Excellence
      </motion.div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
               <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">
             Specializations
            </span>
            </div>
            <div className="relative inline-block">
               {/* Outline Layer */}
               <h2
               style={{ fontFamily: "'Bebas Neue',sans-serif",}}
               className="text-4xl  sm:text-5xl md:text-7xl font-bold uppercase tracking-wide text-outline opacity-30">
                Constructing <br />
                The Future.
              </h2>
              {/* Fill Layer */}
              <motion.h2 
                style={{ fontFamily: "'Bebas Neue',sans-serif",  clipPath: `inset(0 ${useTransform(fillWidth, w => 100 - parseFloat(w))}% 0 0)` }}
                className="absolute inset-0 text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-wide text-[#E5E2DA] select-none"
              >
                Constructing <br />
                <span className="italic font-light text-[#D4AF37]">.</span>
              </motion.h2>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-[#D4AF37] font-mono text-[10px] uppercase mb-2">Ref: 2026_Catalog</p>
            <p className="text-white/30 text-[11px] md:text-xs max-w-[280px] leading-relaxed">
              Applying technical rigor and innovative methodologies to the world's most complex structural challenges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-20 md:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {[
            { label: "Active Sites", val: "42" },
            { label: "Safety Rating", val: "A+" },
            { label: "Total Steel", val: "1.2M Tons" },
            { label: "Accuracy", val: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-[#D4AF37] font-mono text-[9px] md:text-[10px] uppercase mb-1 tracking-widest">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold text-white uppercase">{stat.val}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px #D4AF37;
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;