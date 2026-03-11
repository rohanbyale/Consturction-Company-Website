import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const testimonials = [
  {
    id: "01",
    name: "Alex Sterling",
    role: "Property Developer",
    content: "The attention to detail in the blueprint phase saved us months of rework. Truly the gold standard in construction.",
    rating: 5
  },
  {
    id: "02",
    name: "Sarah Jenkins",
    role: "Homeowner",
    content: "They didn't just build a house; they built a legacy. The sustainable materials used are world-class.",
    rating: 5
  },
  {
    id: "03",
    name: "Marcus Chen",
    role: "Architectural Lead",
    content: "Their integration of 3D planning with real-time site updates is a game changer for our industry.",
    rating: 5
  },
  {
    id: "04",
    name: "Elena Rodriguez",
    role: "City Planner",
    content: "Professional, punctual, and precise. Their safety protocols are the best I've seen in 15 years.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="bg-[#fafafa] py-16 px-4 md:px-6 lg:px-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Matching your 'Why Choose Us' style */}
        <div className="mb-12">
          <header className="flex items-center gap-3 mb-3">
          
            <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">
              Client Stories
            </span>
          </header>
         
        </div>

        {/* Testimonial Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white border border-gray-100 p-5 md:p-8 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-500 relative"
            >
              {/* Quote Icon SVG - Gold Accent */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12M3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12" stroke="#D4AF37" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-[#1a1a1a] text-xs md:text-sm font-medium leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#1a1a1a]">
                  {item.name}
                </h4>
                <p className="text-[#D4AF37] font-mono text-[9px] uppercase tracking-tighter">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Footer Line */}
        <div className="mt-12 flex justify-end">
          <div className="flex items-center gap-4 ">
              <div className="mt-20 flex justify-center">
                   <Link to="/feedback" className="block">
          <motion.button 
      
            whileHover="hover"
            className="relative px-8 py-4 overflow-hidden border border-gray-200"
          >
            <motion.div 
              variants={{ hover: { y: "-100%" } }}
              className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]"
            >
              Rate us
            </motion.div>
            <motion.div 
              variants={{ hover: { y: 0 } }}
              initial={{ y: "100%" }}
              className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.4em]"
            >
              Give Feedback
            </motion.div>
          </motion.button>
          </Link>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;