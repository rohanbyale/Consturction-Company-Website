import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Zap, Shield, Factory } from 'lucide-react';

const ConstructionCTA = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-black py-20 px-6 lg:px-20 overflow-hidden relative min-h-[600px] flex items-center">
      
      {/* Background Decorative "Grid" and "Safety Stripe" */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full" 
             style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-[#FFD700] -skew-y-3 translate-y-20" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Content & Impact */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-12 bg-[#FFD700]" />
            <span className="text-[#FFD700] font-mono text-xs uppercase tracking-[0.5em] font-black">
              Deployment Phase 04
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            Ready to <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #FFD700' }}>Break Ground?</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
            From industrial blueprints to steel reality. Join forces with <span className="text-white font-bold">Sanket Construction</span> for your next high-impact infrastructure project.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Shield className="text-[#FFD700] shrink-0" size={20} />
              <span className="text-white text-[10px] font-mono uppercase tracking-widest font-bold">ISO 9001 Certified Safety</span>
            </div>
            <div className="flex items-start gap-3">
              <Factory className="text-[#FFD700] shrink-0" size={20} />
              <span className="text-white text-[10px] font-mono uppercase tracking-widest font-bold">Pan-India Operations</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Interactive "Command Center" */}
        <motion.div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          {/* Main Card */}
          <div className="bg-[#111] border-2 border-[#FFD700] p-10 md:p-16 rounded-sm relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]">
            
            {/* Terminal Top Bar */}
            <div className="absolute top-0 left-0 w-full h-8 bg-[#FFD700] flex items-center justify-between px-4">
              <span className="text-black font-mono text-[9px] font-black uppercase tracking-widest">Inquiry_Protocol.exe</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full border border-black" />
                <div className="w-2 h-2 rounded-full border border-black" />
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
            </div>

            <div className="space-y-8 mt-4">
              <div className="flex items-center gap-4">
                <Zap className="text-[#FFD700] animate-pulse" size={40} />
                <div className="text-white font-mono uppercase">
                  <p className="text-[10px] text-[#FFD700] opacity-60">Status: Pending_Request</p>
                  <p className="text-xl font-black">Secure Your Slot</p>
                </div>
              </div>

              <motion.button 
                whileHover={{ x: 10 }}
                className="w-full bg-[#FFD700] text-black py-5 flex items-center justify-between px-8 font-black uppercase text-sm tracking-widest group"
              >
                Launch Collaboration
                <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-300" />
              </motion.button>

              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between text-[#FFD700] font-mono text-[9px] font-bold uppercase tracking-widest">
                  <span>Latency: 24ms</span>
                  <span>Verified: 100%</span>
                </div>
                {/* Visual Audio Waveform Simulation */}
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: isHovered ? [4, 16, 4] : 4 }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                      className="w-1 bg-white/20 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Success Overlay (Hidden by default) */}
            <div className="absolute -bottom-1 -right-1 opacity-20 group-hover:opacity-40 transition-opacity">
               <CheckCircle2 size={120} className="text-[#FFD700]" />
            </div>
          </div>

          {/* Floating Detail Elements */}
          <div className="absolute -top-4 -right-4 bg-white text-black p-4 rotate-3 font-black text-xs uppercase hidden md:block">
             Next Site Audit: <span className="text-red-600">Active</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ConstructionCTA;