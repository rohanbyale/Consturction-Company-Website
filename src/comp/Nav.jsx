import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "Service", href: "#service" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-[60] px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-md border border-white/20 py-2 px-3 md:px-4 rounded-full shadow-lg"
          >
            
            <span className="font-bold text-[#0B4650] text-xs md:text-sm tracking-tighter">CobbleStone</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/20 p-1 md:p-1.5 md:pl-6 rounded-full shadow-lg"
          >
            <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0B4650]/70 mr-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-[#0B4650] transition-colors">
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <motion.button 
                whileHover={{ backgroundColor: "#000" }}
                className="bg-[#1A1C1E] text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest py-2 px-4 md:py-2.5 md:px-5 rounded-full"
              >
                Work With Us
              </motion.button>

              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-[#0B4650] hover:bg-[#F9F7F2] rounded-full transition-colors"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif text-[#0B4650] hover:text-[#898A8D] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-12 h-0.5 bg-[#E6FF2B] mt-4"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;