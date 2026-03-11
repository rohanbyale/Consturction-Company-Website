import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B4650] text-white pt-20 pb-6 font-sans relative overflow-hidden">
      {/* Soft Glow Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6FF2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content: 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16 border-b border-white/10 pb-16">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-tighter flex items-center gap-2">
              COBBLE <span className="text-[#E6FF2B] italic font-light">STONE</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Crafting architectural legacies since 2020. We provide premium natural stone solutions for luxury residential and commercial landscapes across the globe.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, backgroundColor: "rgba(230, 255, 43, 0.1)", color: "#E6FF2B" }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="lg:pl-10">
            <h4 className="text-[#E6FF2B] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Contact Us</h4>
            <ul className="space-y-5 text-sm text-white/60">
              <li className="flex items-start gap-4 group cursor-pointer">
                <MapPin size={20} className="text-[#E6FF2B] shrink-0" />
                <span className="group-hover:text-white transition-colors">1A, Shop No.3, Vishwakarma Colony, MB Road, New Delhi-110044</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone size={18} className="text-[#E6FF2B] shrink-0" />
                <a href="tel:+919999853053" className="group-hover:text-white transition-colors">+91 99998 53053</a>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail size={18} className="text-[#E6FF2B] shrink-0" />
                <a href="mailto:info@cobblestone.co.in" className="group-hover:text-white transition-colors">info@cobblestone.co.in</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Engagement */}
          <div>
            <h4 className="text-[#E6FF2B] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Newsletter</h4>
            <p className="text-white/60 text-sm mb-6">Receive design inspiration and new stock alerts.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 py-3.5 px-4 text-sm focus:outline-none focus:border-[#E6FF2B] transition-all rounded-sm placeholder:text-white/20"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E6FF2B] hover:scale-110 active:scale-95 transition-all">
                <SendIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-8 mb-6">
          <div className="text-white/30 text-[9px] uppercase tracking-[0.2em]">
            © {currentYear} Cobble Stones Pvt. Ltd. All Rights Reserved.
          </div>
          
          <div className="flex gap-10 text-white/30 text-[9px] uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5, backgroundColor: "#fff", color: "#0B4650" }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#E6FF2B] text-[#0B4650] flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(230,255,43,0.3)] transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        {/* Designer Signature */}
        <div className="flex justify-center items-center py-2">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="group cursor-default"
          >
            <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] flex items-center gap-3">
              Designed by 
              <span className="relative font-bold text-white/40 group-hover:text-[#E6FF2B] transition-colors duration-700">
                ROHAN
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E6FF2B] transition-all duration-500 group-hover:w-full" />
              </span>
            </p>
          </motion.div>
        </div>

      </div>
    </footer>
  );
};

const SendIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default Footer;