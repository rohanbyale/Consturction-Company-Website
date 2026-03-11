import React from 'react';
import { motion } from 'framer-motion';
import { Send, Play } from 'lucide-react';

const ContactAndBrand = () => {
  const videoId = "VuzH5tBuPBc";
  
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`;

  return (
    <section className="min-h-screen bg-[#F9F7F2] font-sans overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white z-20"
        >
          <header className="mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#0B4650] mb-6">
              Get in <span className="italic font-light text-[#898A8D]">Touch</span>
            </h2>
            <p className="text-[#898A8D] max-w-md leading-relaxed">
              For any inquiries, please call 
              <a href="tel:+919999853053" className="text-[#0B4650] font-bold ml-1 hover:underline">+91-9999853053</a> 
              or fill out the form below.
            </p>
          </header>

          <form className="space-y-4 max-w-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
            </div>
            <Input placeholder="Phone" type="tel" />
            <Input placeholder="Subject" />
            <textarea 
              placeholder="Message" 
              rows="4"
              className="w-full p-4 bg-[#F9F7F2] border-b-2 border-transparent focus:border-[#E6FF2B] outline-none transition-all resize-none text-[#0B4650] placeholder-[#898A8D]"
            ></textarea>
            
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-[#0B4650]" />
              <span className="text-xs text-[#898A8D] group-hover:text-[#0B4650] transition-colors">
                I agree to be contacted by Cobble Stones Pvt. Ltd.
              </span>
            </label>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-12 py-4 bg-[#0B4650] text-[#E6FF2B] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl mt-4"
            >
              Submit Inquiry <Send size={14} />
            </motion.button>
          </form>
        </motion.div>

        <div className="w-full lg:w-1/2 relative bg-black overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full p-8 md:p-16 z-30 bg-gradient-to-b from-black/80 via-black/20 to-transparent">
             <div className="flex flex-col md:flex-row justify-between gap-8 text-white">
                <div>
                    <h3 className="text-[#E6FF2B] font-serif italic text-2xl mb-2">Head Office</h3>
                    <div className="text-xs opacity-80 space-y-1 font-light uppercase tracking-wider">
                        <p>Cobble Stones Pvt. Ltd.</p>
                        <p>Vishwakarma Colony, MB Road, New Delhi</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-[#E6FF2B] font-serif italic text-2xl mb-2">Careers</h3>
                    <a href="mailto:info@cobblestone.co.in" className="text-xs font-bold hover:text-[#E6FF2B] transition-colors underline decoration-[#E6FF2B]">
                        info@cobblestone.co.in
                    </a>
                </div>
             </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2">
              <iframe 
                className="w-full h-full object-cover"
                src={videoSrc}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                title="Cobblestone Brand Video"
              />
            </div>
            <div className="absolute inset-0 bg-black/30 z-10" />
          </div>

          <div className="absolute bottom-12 left-12 z-20 pointer-events-none">
             <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
             >
                <h1 className="text-6xl md:text-8xl font-serif text-white/20 select-none">COBBLE</h1>
             </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Input = ({ placeholder, type = "text" }) => (
  <input 
    type={type}
    placeholder={placeholder}
    className="w-full p-4 bg-[#F9F7F2] border-b-2 border-transparent focus:border-[#E6FF2B] outline-none transition-all text-[#0B4650] placeholder-[#898A8D]"
  />
);

export default ContactAndBrand;