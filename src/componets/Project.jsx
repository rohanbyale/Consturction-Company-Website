import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { id: "01", title: "Helix Tower", type: "Structural", area: "12,000 m²", img: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "02", title: "Orion Hub", type: "Industrial", area: "45,000 m²", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
  { id: "03", title: "Sea Port", type: "Infrastructure", area: "89,000 m²", img: "https://www.ship-technology.com/wp-content/uploads/sites/8/2023/02/shutterstock_777494179.jpg" },
  { id: "04", title: "Vortex Hub", type: "Commercial", area: "22,500 m²", img: "https://i.pinimg.com/736x/4d/7e/57/4d7e57b8fcdd4c0e4ed9125cf7ca7f60.jpg" },
  { id: "05", title: "Iron Lattice", type: "Framework", area: "15,200 m²", img: "https://i.pinimg.com/1200x/d5/1a/eb/d51aebb00da408e8ceb2649571eeebfe.jpg" },
  { id: "06", title: "Apex Dome", type: "Civic", area: "31,000 m²", img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800" }
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      // break-inside-avoid ensures cards don't split across columns in Pinterest view
      className={`relative group mb-12 break-inside-avoid ${index % 2 !== 0 ? 'md:mt-12' : ''}`} 
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer">
        <motion.img 
          src={project.img} 
          alt={project.title}
          // REMOVED GRAYSCALE & BRIGHTNESS as requested to keep natural color
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
        />
        
        <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-[#D4AF37] font-bold tracking-widest">
              PRJ_DATA_{project.id}
            </span>
            <ArrowUpRight size={20} className="text-[#1a1a1a]" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-black/10 pb-2">
              <span className="text-[9px] font-mono uppercase text-gray-400">Typology</span>
              <span className="text-[9px] font-mono uppercase font-bold text-[#1a1a1a]">{project.type}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-2">
              <span className="text-[9px] font-mono uppercase text-gray-400">Total Area</span>
              <span className="text-[9px] font-mono uppercase font-bold text-[#1a1a1a]">{project.area}</span>
            </div>
            <p className="text-[10px] leading-relaxed text-gray-500 pt-2 italic">
              Validated structural synthesis for high-density environments.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#D4AF37] font-bold tracking-[0.3em]">0{index + 1}</span>
          <div className="h-[1px] w-4 bg-gray-200" />
          <h3 className="text-xl font-black uppercase tracking-tighter text-[#1a1a1a]">
            {project.title}
          </h3>
        </div>
        <p className="text-[9px] text-gray-400 font-mono uppercase tracking-[0.4em] ml-11">
          Deployment // 2026
        </p>
      </div>
    </motion.div>
  );
};

const ProjectGrid = () => {
  return (
    <section className="bg-[#F5F5F3] py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
           
                <span className="bg-black text-[#EEFC55] p-2 font-mono text-[11px] tracking-[0.4em] uppercase font-bold">
              The Portfolio
            </span>
            </div>
            <h2 
            style={{ fontFamily: "'Bebas Neue',sans-serif",}}
            className="text-5xl md:text-7xl font-black uppercase tracking-wide text-[#1a1a1a] leading-[0.85]">
              Structural <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: '0.1px #1a1a1a' }}>Synthesis.</span>
            </h2>
          </div>
          <p className="text-gray-400 font-mono text-[9px] uppercase tracking-widest leading-loose max-w-[200px] text-right">
            Total Projects: 248 <br />
            Global Reach: 14 <br />
            ISO Certified: 2026
          </p>
        </div>

        {/* MOBILE: columns-2 creates the Pinterest masonry effect
            DESKTOP: lg:grid-cols-3 restores your exact layout
        */}
        <div className="columns-2 gap-4 md:gap-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:columns-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

       <div className="mt-20 flex justify-center">
          <motion.button 
            whileHover="hover"
            className="relative px-8 py-4 overflow-hidden border border-gray-200"
          >
            <motion.div 
              variants={{ hover: { y: "-100%" } }}
              className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]"
            >
             Archive Index
            </motion.div>
            <motion.div 
              variants={{ hover: { y: 0 } }}
              initial={{ y: "100%" }}
              className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.4em]"
            >
             View More
            </motion.div>
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
};

export default ProjectGrid;