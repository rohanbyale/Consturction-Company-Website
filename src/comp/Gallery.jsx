import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Maximize2 } from 'lucide-react';

const StoneGallery = () => {
  const galleryItems = [
    { id: 1, title: "Silver Grey Quartzite", cat: "Wall Cladding", img: "https://i.pinimg.com/736x/68/37/54/6837546cdb19458d9a4aaa5180bc08f6.jpg", height: "h-64 md:h-80" },
    { id: 2, title: "Copper Slate", cat: "Flooring", img: "https://i.pinimg.com/1200x/e2/82/71/e28271f0ae3a6549c8e0a36ba7ab736c.jpg", height: "h-48 md:h-64" },
    { id: 3, title: "Rustic Ledge", cat: "Exterior", img: "https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=600&q=80", height: "h-72 md:h-96" },
    { id: 4, title: "Honed Basalt", cat: "Modern Interior", img: "https://i.pinimg.com/1200x/c6/2a/f0/c62af0e90acddfd103e5c0cb419469fa.jpg", height: "h-56 md:h-72" },
    { id: 5, title: "Desert Sandstone", cat: "Patios", img: "https://i.pinimg.com/1200x/70/65/ad/7065ad255859bec235ddd1e9296f20e2.jpg", height: "h-64 md:h-80" },
    { id: 6, title: "Kandla Grey", cat: "Driveways", img: "https://i.pinimg.com/736x/54/d3/41/54d3416054e9ec6a9aa3d402a381d30f.jpg", height: "h-48 md:h-64" },
    { id: 7, title: "Teakwood Sandstone", cat: "Feature Wall", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", height: "h-72 md:h-96" },
    { id: 8, title: "Black Limestone", cat: "Pool Deck", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80", height: "h-56 md:h-72" },
  ];

  return (
    <section 
    id='gallery'
    className="py-12 md:py-20 bg-[#F9F7F2] font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="mb-10 md:mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif text-[#0B4650] mb-3 md:mb-4"
          >
            Design <span className="italic font-light text-[#898A8D]">Inspiration</span>
          </motion.h2>
          <div className="w-12 md:w-16 h-1 bg-[#E6FF2B] mx-auto mb-4 md:mb-6" />
          <p className="text-[#898A8D] text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
            Curated Natural Stone Applications
          </p>
        </div>

        <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative break-inside-avoid group cursor-pointer"
            >
              <div className={`relative overflow-hidden rounded-sm bg-gray-200 transition-all duration-500 shadow-sm hover:shadow-xl ${item.height}`}>
                <img 
                  src={item.img} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-[#0B4650]/70 md:bg-[#0B4650]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-3 md:p-6">
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex justify-between items-center text-[#E6FF2B]">
                      <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold">{item.cat}</span>
                      <Maximize2 className="hidden md:block w-4 h-4" />
                    </div>
                    <h4 className="text-white text-sm md:text-lg font-serif italic leading-tight">
                      {item.title}
                    </h4>
                    <div className="pt-2 md:pt-4 flex items-center gap-2 text-white/70 text-[8px] md:text-[10px] uppercase tracking-widest">
                      <span>View</span>
                      <ExternalLink className="w-2 md:w-3 h-2 md:h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 md:mt-20 flex flex-col md:flex-row items-center justify-between border-t border-[#0B4650]/10 pt-8 md:pt-12"
        >
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-[#0B4650] font-serif text-xl md:text-2xl">Visualizing a project?</h3>
            <p className="text-[#898A8D] text-xs md:text-sm">Request a physical sample palette for your site.</p>
          </div>
          <button className="w-full md:w-auto px-8 py-3 md:py-4 bg-[#0B4650] text-[#E6FF2B] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#E6FF2B] hover:text-[#0B4650] transition-all shadow-lg active:scale-95">
            Order Samples
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StoneGallery;