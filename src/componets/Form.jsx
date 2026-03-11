import React from 'react';
import { motion } from 'framer-motion';
import { Send, Plus, Paperclip } from 'lucide-react';

const BriefingForm = () => {
  const inputStyle = "w-full bg-transparent border-b border-black/10 py-4 font-mono text-sm focus:border-[#EEFC55] outline-none transition-all placeholder:opacity-30";
  const labelStyle = "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2";

  return (
    <section className="bg-[#F5F5F3] py-24 px-6 md:px-20 border-t border-black/5">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Form Header */}
        <div className="mb-16">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-5xl lg:text-6xl uppercase mb-4">
            Initialize <span className="text-white" style={{ WebkitTextStroke: '1px #1a1a1a' }}>Project Brief</span>
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-40"> Technical Inquiry</p>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Client Details */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <label className={labelStyle}>Full Name / Identity</label>
              <input type="text" placeholder="e.g. AR. JULIAN KANE" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Organization</label>
              <input type="text" placeholder="STUDIO / FIRM NAME" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Contact Electronic</label>
              <input type="email" placeholder="EMAIL@ADDRESS.COM" className={inputStyle} />
            </div>
          </div>

          {/* Right Column: Project Details */}
          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className={labelStyle}>Project Category</label>
                <select className={inputStyle}>
                  <option>RESIDENTIAL STRUCTURAL</option>
                  <option>COMMERCIAL COMPLEX</option>
                  <option>INDUSTRIAL AUDIT</option>
                  <option>SUSTAINABLE RETROFIT</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Estimated Timeline</label>
                <input type="text" placeholder="Q3 2026 - Q1 2027" className={inputStyle} />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Structural Requirements / Brief</label>
              <textarea 
                rows={4} 
                placeholder="DESCRIBE THE SCOPE, COMPLEXITY, AND SITE CONDITIONS..." 
                className={`${inputStyle} resize-none`}
              />
            </div>

            {/* Interaction Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
              <div className="flex items-center gap-6">
                <button type="button" className="group flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#EEFC55] group-hover:border-[#EEFC55] transition-all">
                    <Paperclip size={14} />
                  </div>
                  Attach Blueprints
                </button>
                <button type="button" className="group flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#EEFC55] group-hover:border-[#EEFC55] transition-all">
                    <Plus size={14} />
                  </div>
                  Add Collaborator
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto bg-[#1a1a1a] text-[#EEFC55] px-12 py-6 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#EEFC55] hover:text-[#1a1a1a] transition-colors shadow-2xl shadow-black/10"
              >
                Transmit Briefing <Send size={16} />
              </motion.button>
            </div>
          </div>

        </form>

        {/* Form Footer Status */}
        <div className="mt-20 flex items-center gap-4 opacity-20">
          <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-black rounded-full" />)}
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.5em] font-bold">
            End of Document // Secure Transmission Ready
          </span>
        </div>
      </div>
    </section>
  );
};

export default BriefingForm;