import React from 'react';
import { motion } from 'framer-motion';

const OurClients = () => {
  const row1 = [
    { name: "DLF", logo: "https://upload.wikimedia.org/wikipedia/commons/a/aa/DLF_logo.svg" },
    { name: "Radisson", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Radisson_logo.svg/1280px-Radisson_logo.svg.png" },
    { name: "Taj Hotels", logo: "https://www.vhv.rs/dpng/d/474-4740043_taj-hotels-logo-png-transparent-png.png" },
    { name: "JW Marriott", logo: "https://www.clipartmax.com/png/full/292-2927269_jw-marriott-marquis-dubai-logo.png" },
    { name: "Unitech", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTobNwF8tH1c7yUIIa1yiavlt0hr1ovIj5r5A&s" },
    { name: "Emaar", logo: "https://1000logos.net/wp-content/uploads/2020/09/Emaar-Properties-Logo-old.png" },
  ];

  const row2 = [
    { name: "M3M", logo: "https://m3mproject-gurgaon.com/images/logo2.png" },
    { name: "Hyatt", logo: "https://1000logos.net/wp-content/uploads/2019/11/Hyatt-Logo.png" },
    { name: "GMR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/GMR_Group_%28logo%29.svg/1280px-GMR_Group_%28logo%29.svg.png" },
    { name: "ATS", logo: "https://img.freepik.com/premium-vector/ats-triangle-letter-logo-design-with-triangle-shape-ats-triangle-logo-design-monogram-ats-triangle-vector-logo-template-with-red-color-ats-triangular-logo-simple-elegant-luxurious-logo_229120-114952.jpg?semt=ais_hybrid&w=740&q=80" },
    { name: "Ambience", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlw-Vj-cGKK6FJneg4NVym0Bf5SZOKgJA5pw&s" },
    { name: "Supertech", logo: "https://e7.pngegg.com/pngimages/46/389/png-clipart-logo-supertech-brand-gurugram-rng-text-logo.png" },
  ];

  const tickerVariants = {
    animate: {
      x: [0, -1000], 
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, 
          ease: "linear",
        },
      },
    },
    animateReverse: {
      x: [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    }
  };

  const LogoTrack = ({ items, reverse = false }) => (
    <div className="flex overflow-hidden group py-4">
      <motion.div 
        className="flex space-x-12 items-center whitespace-nowrap"
        variants={tickerVariants}
        animate={reverse ? "animateReverse" : "animate"}
      >
        {[...items, ...items, ...items].map((client, index) => (
          <div key={index} className="w-40 md:w-52 flex-shrink-0 flex justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
            <img 
              src={client.logo} 
              alt={client.name} 
              className="max-h-10 md:max-h-14 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#898A8D] mb-4"
        >
          Our Network
        </motion.h2>
        <h3 className="text-3xl md:text-5xl font-serif text-[#0B4650]">
          Trusted by <span className="italic font-light">Industry Leaders</span>
        </h3>
        <div className="w-20 h-1.5 bg-[#E6FF2B] mx-auto mt-8" />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="space-y-8">
          <LogoTrack items={row1} />
          <LogoTrack items={row2} reverse={true} />
        </div>
      </div>
    </section>
  );
};

export default OurClients;