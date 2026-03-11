import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Home, ShieldCheck, Clock, Wallet, Ruler, FileText, Hammer, MapPin, HardHat, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
const ProcessFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const steps = [
    {
      id: "01",
      title: "Is my plot size too small for a good house?",
      icon: Ruler,
      content: "Not at all. We specialize in space-optimization. Whether you have a small narrow plot or a large corner site, we use smart engineering to make every square foot feel open, airy, and functional."
    },
    {
      id: "02",
      title: "How do I know my home will be safe and strong?",
      icon: ShieldCheck,
      content: "Safety is our non-negotiable foundation. We perform detailed soil analysis and earthquake-resistant structural calculations. Every beam and column is designed to exceed standard safety codes for your peace of mind."
    },
    {
      id: "03",
      title: "Will you help me get government permissions?",
      icon: FileText,
      content: "Yes, we handle the technical side of the paperwork. We provide the certified structural drawings and stability certificates required by the Pusad Municipal Council and other local authorities to ensure your build is 100% legal."
    },
    {
      id: "04",
      title: "How long does the design process take?",
      icon: Clock,
      content: "Typically, it takes 2 to 4 weeks to move from your initial idea to a final set of ready-to-build technical plans. We value precision over speed to ensure no mistakes are made on the construction site."
    },
    {
      id: "05",
      title: "Can I see my home in 3D before construction starts?",
      icon: Home,
      content: "Absolutely. We provide high-end 3D visualizations so you can walk through your home virtually. This helps you decide on room sizes and layouts before a single brick is even laid."
    },
    {
      id: "06",
      title: "Can we build a home on a tight budget?",
      icon: Wallet,
      content: "Smart engineering actually saves money. We optimize material usage (like steel and cement) so you don't overspend on 'guesswork' construction. We design to fit your budget, not the other way around."
    },
    {
      id: "07",
      title: "What if I want to make changes during construction?",
      icon: Hammer,
      content: "Minor changes are natural. However, we encourage finalizing the structural skeleton early on. If you need a change, our engineers quickly update the plans to ensure the building's strength is never compromised."
    },
    {
      id: "08",
      title: "Do you only provide designs, or do you visit the site?",
      icon: MapPin,
      content: "We don't just hand over drawings. Our team performs periodic site visits at crucial stages (like foundation laying and slab casting) to ensure the contractor is following our technical specifications perfectly."
    },
    {
      id: "09",
      title: "Are your designs modern or traditional?",
      icon: PenTool,
      content: "We don't stick to one style. Whether you want a 'Minimalist Brutalist' look, a modern glass-heavy villa, or a traditional Indian family home, we adapt our engineering to match your aesthetic taste."
    },
    {
      id: "10",
      title: "What is the first step to get started today?",
      icon: HardHat,
      content: "The first step is a free consultation. Bring your plot details and your 'wishlist.' We'll give you an initial feasibility report and a clear roadmap for your construction journey."
    }
  ];

  return (
    <section className="bg-[#F5F5F3] py-16 md:py-20 px-4 md:px-20 border-t border-black/5 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          
          {/* Left Side: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit mb-8 lg:mb-0 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.5em] text-[#1a1a1a]/30 block mb-4">
             
                  <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">
                Common Questions // FAQ
            </span>
              </span>
           
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-5xl sm:text-6xl lg:text-7xl uppercase leading-[0.85] mb-6 md:mb-8">
                HAVE <br /><span className="text-white" style={{ WebkitTextStroke: '1.5px #1a1a1a' }}>DOUBTS?</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0 font-medium border-l-2 border-[#EEFC55] pl-6 text-left">
                Building a home is a big decision. We've answered the most common questions to help you feel confident about your structural journey.
              </p>

              {/* ── SVG ILLUSTRATION: Thinking Man + Question Marks ── */}
              <div className="mt-10 flex justify-center lg:justify-start">
                <svg
                  viewBox="0 0 260 220"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-[260px]"
                  aria-hidden="true"
                >
                  <defs>
                    <style>{`
                      @keyframes floatQ1 { 0%,100%{transform:translateY(0px) rotate(-8deg);opacity:0.7} 50%{transform:translateY(-10px) rotate(-8deg);opacity:1} }
                      @keyframes floatQ2 { 0%,100%{transform:translateY(0px) rotate(6deg);opacity:0.5} 50%{transform:translateY(-14px) rotate(6deg);opacity:0.9} }
                      @keyframes floatQ3 { 0%,100%{transform:translateY(0px) rotate(-3deg);opacity:0.35} 50%{transform:translateY(-8px) rotate(-3deg);opacity:0.65} }
                      @keyframes blink   { 0%,90%,100%{scaleY:1} 95%{scaleY:0.08} }
                      @keyframes breathe { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.04)} }
                      @keyframes headTilt { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(6deg)} }
                      .q1 { animation: floatQ1 2.8s ease-in-out infinite; transform-origin: 178px 72px; }
                      .q2 { animation: floatQ2 3.4s ease-in-out infinite 0.4s; transform-origin: 210px 48px; }
                      .q3 { animation: floatQ3 4s ease-in-out infinite 0.9s; transform-origin: 235px 88px; }
                      .head { animation: headTilt 3.5s ease-in-out infinite; transform-origin: 108px 56px; }
                      .body { animation: breathe 3.5s ease-in-out infinite; transform-origin: 108px 130px; }
                    `}</style>
                  </defs>

                  {/* ── GROUND SHADOW ── */}
                  <ellipse cx="108" cy="208" rx="52" ry="7" fill="rgba(0,0,0,0.07)" />

                  {/* ── BODY (hard-hat construction worker) ── */}
                  <g className="body">
                    {/* Torso — hi-vis vest */}
                    <rect x="82" y="110" width="52" height="58" rx="6" fill="#1a1a1a" />
                    {/* Vest stripes */}
                    <rect x="82" y="118" width="52" height="8" fill="#EEFC55" opacity="0.9" />
                    <rect x="82" y="146" width="52" height="8" fill="#EEFC55" opacity="0.9" />
                    {/* Collar */}
                    <rect x="97" y="108" width="22" height="10" rx="3" fill="#2a2a2a" />

                    {/* Left arm — raised, hand on chin (thinking pose) */}
                    <rect x="56" y="112" width="28" height="10" rx="5" fill="#1a1a1a" transform="rotate(-38 56 112)" />
                    {/* Forearm up */}
                    <rect x="63" y="84" width="10" height="32" rx="5" fill="#c8956c" />
                    {/* Hand/fist at chin */}
                    <ellipse cx="68" cy="82" rx="9" ry="8" fill="#c8956c" />

                    {/* Right arm — down relaxed */}
                    <rect x="134" y="112" width="26" height="10" rx="5" fill="#1a1a1a" transform="rotate(20 134 112)" />

                    {/* Legs */}
                    <rect x="88" y="164" width="18" height="40" rx="5" fill="#2e3a4a" />
                    <rect x="110" y="164" width="18" height="40" rx="5" fill="#2e3a4a" />
                    {/* Boots */}
                    <rect x="84" y="198" width="24" height="10" rx="4" fill="#1a1a1a" />
                    <rect x="108" y="198" width="24" height="10" rx="4" fill="#1a1a1a" />
                  </g>

                  {/* ── HEAD ── */}
                  <g className="head">
                    {/* Hard hat */}
                    <ellipse cx="108" cy="46" rx="30" ry="8" fill="#EEFC55" />
                    <rect x="80" y="46" width="56" height="6" rx="2" fill="#d4e040" />
                    {/* Hat brim shadow */}
                    <ellipse cx="108" cy="52" rx="32" ry="4" fill="rgba(0,0,0,0.08)" />

                    {/* Face */}
                    <ellipse cx="108" cy="72" rx="22" ry="24" fill="#d4956c" />

                    {/* Eyes — with blink */}
                    <g style={{ animation:"blink 4s ease-in-out infinite", transformOrigin:"98px 68px" }}>
                      <ellipse cx="98" cy="68" rx="3.5" ry="4" fill="#1a1a1a" />
                      <circle cx="99.5" cy="66.5" r="1.2" fill="white" />
                    </g>
                    <g style={{ animation:"blink 4s ease-in-out infinite 0.05s", transformOrigin:"118px 68px" }}>
                      <ellipse cx="118" cy="68" rx="3.5" ry="4" fill="#1a1a1a" />
                      <circle cx="119.5" cy="66.5" r="1.2" fill="white" />
                    </g>

                    {/* Eyebrows — furrowed (thinking) */}
                    <path d="M93 62 Q98 59 103 61" fill="none" stroke="#5a3010" strokeWidth="2" strokeLinecap="round" />
                    <path d="M113 61 Q118 59 123 62" fill="none" stroke="#5a3010" strokeWidth="2" strokeLinecap="round" />

                    {/* Nose */}
                    <ellipse cx="108" cy="74" rx="3" ry="2" fill="#bf7a50" />

                    {/* Mouth — slight hmm expression */}
                    <path d="M101 82 Q108 79 115 82" fill="none" stroke="#8a4020" strokeWidth="1.8" strokeLinecap="round" />

                    {/* Ear */}
                    <ellipse cx="86" cy="72" rx="4" ry="6" fill="#c8856a" />
                    <ellipse cx="130" cy="72" rx="4" ry="6" fill="#c8856a" />

                    {/* Safety strap */}
                    <path d="M86 68 Q88 80 90 84" fill="none" stroke="#cc9900" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M130 68 Q128 80 126 84" fill="none" stroke="#cc9900" strokeWidth="1.5" strokeLinecap="round" />
                  </g>

                  {/* ── QUESTION MARKS (floating) ── */}

                  {/* Large Q — closest, brightest */}
                  <g className="q1">
                    <text x="162" y="88" fontFamily="'Georgia', serif" fontSize="38" fontWeight="bold"
                      fill="#1a1a1a" opacity="0.7">?</text>
                  </g>

                  {/* Medium Q — mid distance */}
                  <g className="q2">
                    <text x="198" y="62" fontFamily="'Georgia', serif" fontSize="26" fontWeight="bold"
                      fill="#EEFC55" opacity="0.85"
                      stroke="#1a1a1a" strokeWidth="0.5">?</text>
                  </g>

                  {/* Small Q — furthest, faintest */}
                  <g className="q3">
                    <text x="226" y="98" fontFamily="'Georgia', serif" fontSize="18" fontWeight="bold"
                      fill="#1a1a1a" opacity="0.3">?</text>
                  </g>

                  {/* ── THOUGHT BUBBLE (small dots from head) ── */}
                  <circle cx="140" cy="58" r="3.5" fill="#1a1a1a" opacity="0.12" />
                  <circle cx="150" cy="50" r="5" fill="#1a1a1a" opacity="0.09" />
                  <circle cx="162" cy="42" r="7" fill="#1a1a1a" opacity="0.06" />

                  {/* ── SMALL BLUEPRINT PAPER on ground ── */}
                  <g transform="translate(44, 188) rotate(-12)">
                    <rect x="0" y="0" width="32" height="22" rx="2" fill="#d4c87a" stroke="#b0a050" strokeWidth="0.75" />
                    <line x1="4" y1="6" x2="28" y2="6" stroke="#8a7030" strokeWidth="0.75" opacity="0.5" />
                    <line x1="4" y1="10" x2="22" y2="10" stroke="#8a7030" strokeWidth="0.75" opacity="0.5" />
                    <line x1="4" y1="14" x2="26" y2="14" stroke="#8a7030" strokeWidth="0.75" opacity="0.5" />
                    <rect x="4" y="16" width="10" height="4" fill="#8a7030" opacity="0.2" rx="1" />
                  </g>

                </svg>
              </div>
              {/* ── END SVG ── */}

            </motion.div>
          </div>

          {/* Right Side: Accordion Process */}
          <div className="lg:col-span-8">
            <div className="border-t border-black/10">
              {steps.map((step, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.div 
                    key={step.id} 
                    animate={{ 
                      backgroundColor: isActive ? "#1a1a1a" : "rgba(0,0,0,0)",
                    }}
                    className="border-b border-black/10 transition-colors duration-500"
                  >
                    <button
                      onClick={() => setActiveIndex(isActive ? null : index)}
                      className="w-full px-4 md:px-6 py-6 md:py-8 flex items-center justify-between text-left group outline-none"
                    >
                      <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
                        <span className={`hidden sm:block font-mono text-xs font-bold transition-colors duration-500 ${isActive ? 'text-[#EEFC55]' : 'opacity-20 group-hover:opacity-100'}`}>
                          {step.id}
                        </span>
                        <div className="flex items-center gap-4">
                          <step.icon 
                            size={20} 
                            strokeWidth={1.5} 
                            className={`flex-shrink-0 transition-colors duration-500 ${isActive ? 'text-[#EEFC55]' : 'opacity-40 group-hover:text-[#EEFC55]'}`} 
                          />
                          <h3 className={`text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight transition-all duration-500 ${isActive ? 'text-white translate-x-1 md:translate-x-4' : 'text-[#1a1a1a] group-hover:translate-x-2'}`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <div className={`flex-shrink-0 transition-all duration-500 ${isActive ? 'rotate-180 text-[#EEFC55]' : 'rotate-0 text-[#1a1a1a]'}`}>
                        {isActive ? <Minus size={20} /> : <Plus size={20} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 md:pb-10 px-4 sm:px-6 pl-12 sm:pl-20 md:pl-32 max-w-2xl">
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium mb-6">
                              {step.content}
                            </p>
                            <div className="flex gap-2">
                               <div className="h-1 w-12 bg-[#EEFC55]" />
                               <div className="h-1 w-2 bg-white/10" />
                               <div className="h-1 w-2 bg-white/10" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
<Link to={"/contact"} >
            {/* Technical Note Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12 p-6 bg-[#1a1a1a] text-white flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#EEFC55] rounded-full animate-ping flex-shrink-0" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-center sm:text-left leading-relaxed">Still have a specific question?</span>
              </div>
              <button className="text-[9px] font-black uppercase tracking-[0.4em] border-b border-[#EEFC55] pb-1 hover:text-[#EEFC55] transition-colors whitespace-nowrap">
                Contact Our Engineers Directly
              </button>
            </motion.div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessFAQ;