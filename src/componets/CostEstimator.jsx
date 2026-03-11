import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, HardHat, Ruler, MapPin, ArrowRight, RotateCcw, ShieldCheck, Zap, Crosshair } from 'lucide-react';

const CostEstimator = () => {
  const [area, setArea] = useState(1200);
  const [floors, setFloors] = useState(1);
  const [quality, setQuality] = useState('Standard');
  const [location, setLocation] = useState('Urban');
  const [estimate, setEstimate] = useState(0);

  const BASE_RATE = 1850; 
  const QUALITY_MULTIPLIER = { Standard: 1, Premium: 1.3, Luxury: 1.8 };
  const LOCATION_MULTIPLIER = { Urban: 1.1, Suburban: 1, Rural: 0.9 };

  useEffect(() => {
    const totalSqFt = area * floors;
    const calculatedCost = totalSqFt * BASE_RATE * QUALITY_MULTIPLIER[quality] * LOCATION_MULTIPLIER[location];
    setEstimate(calculatedCost);
  }, [area, floors, quality, location]);

  return (
    <section className="bg-[#F5F5F3] py-16 px-4 font-sans selection:bg-[#FFD700]">
      <div className="max-w-6xl mx-auto">
        
        {/* Aesthetic Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="relative">
            
            <h2
              style={{ fontFamily: "'Bebas Neue',sans-serif",}}
            className="font-black text-black uppercase tracking-wide leading-none text-5xl md:text-6xl">
              Cost <span className="text-transparent" style={{ WebkitTextStroke: '0.1px black' }}>Engine</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
          
          </div>
        </div>

        {/* Main Console Box */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] rounded-sm overflow-hidden">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black z-20 pointer-events-none" />

          {/* Configuration Side */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-black/5">
            <div className="space-y-12">
              
              {/* Area Slider */}
              <div className="group">
                <div className="flex justify-between items-end mb-6">
                  <label className="text-black font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Ruler size={14} /> 01. Dimension Analysis
                  </label>
                  <div className="text-black font-mono font-bold text-2xl">
                    {area} <span className="text-[10px] text-gray-400">SQ.FT</span>
                  </div>
                </div>
                <input 
                  type="range" min="500" max="15000" step="100" 
                  value={area} onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-1 bg-gray-100 appearance-none cursor-pointer accent-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* Elevation Selection */}
                <div className="space-y-4">
                  <label className="text-black font-black uppercase text-[10px] tracking-[0.2em] opacity-50 flex items-center gap-2">
                    <HardHat size={14} /> 02. Elevation Grade
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setFloors(num)}
                        className={`flex-1 py-3 border font-bold text-[10px] transition-all duration-300 ${
                          floors === num 
                            ? 'bg-black text-[#FFD700] border-black' 
                            : 'bg-white text-black border-gray-100 hover:border-black'
                        }`}
                      >
                        G+{num-1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Site Index */}
                <div className="space-y-4">
                  <label className="text-black font-black uppercase text-[10px] tracking-[0.2em] opacity-50 flex items-center gap-2">
                    <MapPin size={14} /> 03. Site Index
                  </label>
                  <select 
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-gray-50 border border-transparent text-black p-3 font-bold uppercase text-[10px] tracking-widest outline-none focus:bg-white focus:border-black transition-all appearance-none cursor-pointer"
                  >
                    <option value="Urban">Metro / Tier 1</option>
                    <option value="Suburban">Tier 2 / Suburban</option>
                    <option value="Rural">Rural / Semi-Urban</option>
                  </select>
                </div>
              </div>

              {/* Spec Grade */}
              <div className="space-y-4">
                <label className="text-black font-black uppercase text-[10px] tracking-[0.2em] opacity-50">04. Finish Specification</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.keys(QUALITY_MULTIPLIER).map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`p-4 border transition-all duration-300 relative overflow-hidden ${
                        quality === q 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-100 bg-white text-black hover:border-black'
                      }`}
                    >
                      <p className={`text-[7px] font-black uppercase mb-1 tracking-widest ${quality === q ? 'text-[#FFD700]' : 'text-gray-300'}`}>Grade</p>
                      <p className="text-xs font-black uppercase">{q}</p>
                      {quality === q && <motion.div layoutId="activeSpec" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD700]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel (The Bill) */}
          <div className="lg:col-span-5 bg-[#DBDF00] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div className="bg-black text-white px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.3em]">
                  TX_ID: 2026-SK
                </div>
                <ShieldCheck size={18} className="text-black/30" />
              </div>

              <h3 className="text-black/40 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Estimated Capital Outlay</h3>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={estimate}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-8"
                >
                  <span className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">
                    ₹{estimate.toLocaleString('en-IN')}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="space-y-4 pt-8 border-t border-black/10">
                <div className="flex justify-between text-black font-bold uppercase text-[10px] tracking-tight">
                  <span className="opacity-40">Unit Rate</span>
                  <span>₹{(estimate/(area*floors)).toFixed(0)} <span className="opacity-40">/ SQ.FT</span></span>
                </div>
                <div className="flex justify-between text-black font-bold uppercase text-[10px] tracking-tight">
                  <span className="opacity-40">Delivery Forecast</span>
                  <span>{8 + (floors * 2)} Months</span>
                </div>
              </div>

              {/* Precise Progress Gauges */}
              <div className="mt-12 space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                      <span>Materials Inventory</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full h-[2px] bg-black/5">
                      <motion.div initial={{width:0}} whileInView={{width: '65%'}} className="h-full bg-black"/>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                      <span>Human Capital</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full h-[2px] bg-black/5">
                      <motion.div initial={{width:0}} whileInView={{width: '35%'}} className="h-full bg-black/40"/>
                    </div>
                 </div>
              </div>
            </div>

            {/* Final Actions */}
            <div className="mt-12 relative z-10">
              <motion.button 
                whileHover={{ backgroundColor: '#000', color: '#fff' }}
                className="w-full bg-transparent border border-black text-black py-5 font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 transition-colors"
              >
                Generate Report <ArrowRight size={14} />
              </motion.button>
              
              <button 
                onClick={() => {setArea(1200); setFloors(1); setQuality('Standard');}}
                className="w-full mt-4 text-black/40 hover:text-black transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RotateCcw size={10} /> Purge Configuration
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center px-2">
          <p className="text-gray-300 font-mono text-[8px] uppercase tracking-widest">
            *Market Index Adjusted: Mar 2026
          </p>
          <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest">Core_Engine_Live</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;