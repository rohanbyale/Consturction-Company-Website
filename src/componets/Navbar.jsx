import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WaabiNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu automatically when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { name: 'Home', path: '/', img: 'https://i.pinimg.com/1200x/03/27/ab/0327aba1ae4e46cd5b2088f8b6bca753.jpg' },
    { name: 'Company', path: '/about', img: 'https://i.pinimg.com/736x/1c/43/a1/1c43a10b81b0f7d6e4620d227de81386.jpg' },
    { name: 'Projects', path: '/project', img: 'https://i.pinimg.com/1200x/c0/10/d6/c010d6cd9b03edf89ca74001f80d4a05.jpg' },
    { name: 'Careers', path: '/career', img: 'https://i.pinimg.com/736x/b0/64/c9/b064c9a910ce05e4e740c31e274d8606.jpg' },
    { name: 'Contact', path: '/contact', img: 'https://i.pinimg.com/1200x/a8/b5/07/a8b5077eaacd76e1f2de2d951155e112.jpg' },
  ];

  // Current page logic - visible permanently now
  const currentPage = menuItems.find(item => item.path === location.pathname)?.name || 'Menu';

  return (
    <>
      {/* BACKGROUND OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/10 backdrop-blur-md z-[9998]"
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 flex flex-col items-center pt-6 pointer-events-none z-[9999] font-sans px-4">
        
        {/* THE MAIN PILL (Always Floating) */}
        <motion.div 
          className="w-full max-w-[400px] pointer-events-auto bg-white rounded-[10px] shadow-lg border border-gray-100 px-6 py-3 flex justify-between items-center z-20"
        >
          <div className="flex items-center gap-4">
            <span className="text-[24px] font-black tracking-tighter leading-none text-black">
              𝓤𝓡𝓑
            </span>
            {/* Vertical Divider */}
            <div className="w-[1px] h-4 bg-gray-200" />
            {/* PERMANENT CURRENT PAGE NAME */}
            <span className="text-[13px] text-black font-bold uppercase tracking-widest mt-1">
              {currentPage}
            </span>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <motion.div 
              animate={{ rotate: isOpen ? 135 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-2xl font-light text-black"
            >
              +
            </motion.div>
          </button>
        </motion.div>

        {/* THE TRANSPARENT GAP AND DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[400px] pointer-events-auto mt-4" // mt-4 creates the transparent gap
            >
              <div className="bg-white shadow-2xl rounded-[32px] border border-gray-100 overflow-hidden p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-8">
              URB
                </p>
                
                <nav className="flex flex-col gap-6">
                  {menuItems.map((item, index) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `group flex items-center ${isActive ? 'opacity-40' : ''}`}
                    >
                      <motion.div 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center w-full"
                      >
                        {/* ICON PREVIEW */}
                        <div className="w-12 h-12 rounded-xl overflow-hidden mr-6 shadow-inner bg-gray-100 flex-shrink-0">
                          <img 
                            src={item.img} 
                            alt={item.name} 
                            className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        
                        {/* LABEL */}
                        <span className="text-[32px] font-serif italic tracking-tight leading-none text-[#1a1a1a] group-hover:text-[#DEE200] transition-colors duration-300">
                          {item.name}
                        </span>
                      </motion.div>
                    </NavLink>
                  ))}
                </nav>

                {/* Optional Footer inside menu */}
                <div className="mt-10 pt-6 border-t border-gray-50 flex justify-between items-center">
                   <span className="text-[9px] font-mono text-gray-300">© 2026 URB</span>
                   <span className="text-[9px] font-mono text-gray-300 uppercase tracking-widest">Mumbai_Pune</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default WaabiNavbar;