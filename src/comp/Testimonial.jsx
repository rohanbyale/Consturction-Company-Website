import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Ar. Rajesh Malhotra",
      role: "Studio Vista",
      text: "The texture and thermal insulation of their natural stones are unmatched. A legacy material.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Sanjay Singhania",
      role: "Project Manager, DLF",
      text: "Consistency in quality is rare with natural stones, but they deliver perfection every time.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Meera Deshpande",
      role: "Homeowner",
      text: "The way the stone changes character in the rain is something synthetic could never mimic.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-[#F9F7F2] font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[350px]">
          
          <div className="md:w-1/3 bg-[#0B4650] relative flex items-center justify-center p-8">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
               <Quote size={200} className="text-white -ml-10 -mt-10" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative z-10"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#E6FF2B] overflow-hidden shadow-2xl">
                  <img src={reviews[index].img} alt={reviews[index].name} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center relative">
            <Quote className="text-[#E6FF2B] w-10 h-10 mb-6 opacity-40" />
            
            <div className="min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-xl md:text-2xl font-serif text-[#0B4650] leading-snug mb-6 italic">
                    "{reviews[index].text}"
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-bold text-[#0B4650] uppercase tracking-widest">
                      {reviews[index].name}
                    </h4>
                    <p className="text-[#898A8D] text-[10px] uppercase font-semibold">
                      {reviews[index].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === i ? "w-8 bg-[#E6FF2B]" : "w-2 bg-[#0B4650]/10 hover:bg-[#0B4650]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-[#898A8D]">
            <div className="h-[1px] w-12 bg-[#898A8D]/20"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">4.9/5 Average Rating</p>
            <div className="h-[1px] w-12 bg-[#898A8D]/20"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;