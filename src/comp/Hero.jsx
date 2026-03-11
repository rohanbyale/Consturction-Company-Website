import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UltraStoneHero = () => {
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    setMousePos({ x: moveX, y: moveY });
  };

  return (
    <div className="relative w-full h-screen bg-[#0B4650] overflow-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              y: "100%", // Slide entire preloader DOWN
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-[#0B4650] flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
                <div className="relative overflow-hidden w-[300px] h-[400px] md:w-[450px] md:h-[600px] z-10 shadow-2xl">
                    <motion.img
                        initial={{ scale: 1.7 }}
                        animate={{ scale: 1}}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        src="https://i.pinimg.com/736x/fe/48/ff/fe48ff90f977285670f6288eb0eb5bf9.jpg"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-[#E6FF2B] font-serif italic text-4xl"
                        >
                            Est. 1974
                        </motion.span>
                    </div>
                </div>
                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-white whitespace-nowrap pointer-events-none z-0"
                >
                    PUNE STONE
                </motion.h2>
            </div>
          </motion.div>
        ) : (
          <motion.section
            key="hero"
            initial={{ y: "-100%", opacity: 0 }} // Hero starts from TOP (-100%)
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full overflow-hidden bg-[#0B4650] cursor-default"
          >
            <motion.div
              animate={{ x: mousePos.x, y: mousePos.y, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 15, damping: 30 }}
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-[#0B4650]/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B4650] via-transparent to-[#0B4650]/30" />
            </motion.div>

            <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-50">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-white font-serif text-2xl tracking-tighter"
              >
                PUNE<span className="text-[#E6FF2B] font-bold">STONE</span>.CO
              </motion.div>
           
            </nav>

            <div className="relative z-20 h-full flex items-center px-6 md:px-20">
              <div className="max-w-6xl w-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-[1px] bg-[#E6FF2B] mb-10"
                />

                <h1 className="flex flex-col">
                  <div className="overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-white text-5xl md:text-9xl font-serif leading-none"
                    >
                      Timeless <span className="italic font-light opacity-50">Elegance</span>
                    </motion.span>
                  </div>
                  
                  <div className="flex items-center mt-2 md:mt-4 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="hidden md:block origin-left w-24 h-16 mr-6 overflow-hidden rounded-sm"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1542726922-8a0a42ae764d?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Stone texture"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-[#E6FF2B] text-4xl md:text-8xl font-serif"
                    >
                      Sourced in Pune.
                    </motion.span>
                  </div>
                </h1>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="mt-12 text-[#F9F7F2]/70 text-base md:text-lg max-w-xl font-light leading-relaxed border-l border-white/10 pl-8"
                >
                  From the rugged charm of cobblestones to the polished grace of marble, 
                  we supply the raw beauty that defines Pune's most iconic landscapes.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-8"
                >
                  <button className="group relative px-10 py-5 bg-[#E6FF2B] text-[#0B4650] text-xs font-bold uppercase tracking-[0.2em] overflow-hidden">
                    <span className="relative z-10">Request Sample</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  <button className="text-white text-xs uppercase tracking-widest font-medium flex items-center gap-4 group">
                    <span className="h-[1px] w-8 bg-white/30 group-hover:w-12 group-hover:bg-[#E6FF2B] transition-all" />
                    View Gallery
                  </button>
                </motion.div>
              </div>
            </div>

            <div className="absolute bottom-10 left-6 right-6 md:left-20 md:right-20 flex justify-between items-end">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 2.4 }} 
                className="flex gap-10"
              >
                <div className="hidden md:block">
                  <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Durability</p>
                  <p className="text-white font-serif italic text-sm">Grade A+ Natural</p>
                </div>
              </motion.div>
              <div className="flex flex-col items-center gap-4">
                <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] mb-4">Scroll</span>
                <motion.div 
                    animate={{ height: [40, 80, 40] }} 
                    transition={{ repeat: Infinity, duration: 2.5 }} 
                    className="w-[1px] bg-gradient-to-b from-[#E6FF2B] to-transparent" 
                />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UltraStoneHero;