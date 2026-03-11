import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const values = [
  {
    id: "01",
    title: "Safety First",
    desc: "Zero-compromise protocols for every structural node in our network.",
    className: "md:col-span-1 md:row-span-1",
    span: "col"
  },
  {
    id: "02",
    title: "Innovative Design",
    desc: "We create unique architectural designs that combine aesthetics and functionality.",
    className: "md:col-span-1 md:row-span-2",
    span: "row"
  },
  {
    id: "03",
    title: "Quality Construction",
    desc: "Our projects are built to last, using only the finest materials.",
    className: "md:col-span-1 md:row-span-2",
    span: "row"
  },
  {
    id: "04",
    title: "Customer-Centric",
    desc: "We work closely with you to ensure your vision is realized from start to finish.",
    className: "md:col-span-1 md:row-span-2",
    span: "row"
  },
  {
    id: "05",
    title: "Sustainability",
    desc: "Building for a circular economy with 100% recyclable frameworks.",
    className: "md:col-span-1 md:row-span-1",
    span: "col"
  },
  {
    id: "06",
    title: "Transparency",
    desc: "Radical data-sharing across the entire build lifecycle.",
    className: "md:col-span-1 md:row-span-1",
    span: "col"
  }
];

const BlueprintValues = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-[#E2E600] rounded-b-2xl py-20 px-10 overflow-hidden text-[#1a1a1a] relative"
      style={{ minHeight: '75vh' }}
    >
      {/* Animated SVG Grid Lines — connected corner to corner */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Outer frame */}
        <motion.rect
          x="32" y="32"
          width="calc(100% - 64px)" height="calc(100% - 64px)"
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Overshoot corner markers */}
        {[
          [0, 0], ['100%', 0], [0, '100%'], ['100%', '100%']
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="4"
            fill="#1a1a1a"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.3 } : {}}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto relative">
        {/* Connected outer overshoot lines */}
        <div className="absolute -top-8 bottom-0 left-0 w-[1px] bg-black/20" />
        <div className="absolute -top-8 bottom-0 right-0 w-[1px] bg-black/20" />
        <div className="absolute top-0 -left-8 -right-8 h-[1px] bg-black/20" />
        <div className="absolute bottom-0 -left-8 -right-8 h-[1px] bg-black/20" />

        {/* Corner cross marks — connected endpoints */}
        {[
          "top-0 left-0", "top-0 right-0",
          "bottom-0 left-0", "bottom-0 right-0"
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-3 h-3`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-3 -right-3 h-[1px] bg-black/40" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 -bottom-3 w-[1px] bg-black/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/60" />
          </motion.div>
        ))}

        {/* Main Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 border border-black/20"
          style={{ minHeight: '600px' }}
        >
          {/* Header Cell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-1 md:row-span-1 border-b border-r border-black/20 p-8 flex flex-col justify-end relative overflow-hidden"
          >
            {/* Animated scan line */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-black/10"
              initial={{ top: "0%" }}
              animate={inView ? { top: ["0%", "100%"] } : {}}
              transition={{ duration: 2, delay: 0.5, ease: "linear" }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] opacity-40 mb-2">Core_Values</span>
            <h2
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-5xl font-black uppercase tracking-wide leading-[0.85]"
            >
              Our<br />Principles
            </h2>
            <motion.div
              className="absolute bottom-3 right-3 flex gap-[3px]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] h-[3px] rounded-full bg-black/20"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 1 + i * 0.05 }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Value Cards */}
          {values.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * (idx + 1), ease: "easeOut" }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
              className={`p-8 flex flex-col justify-start relative group border-black/20 transition-all duration-500 ${item.className}`}
              style={{
                borderRight: idx !== 2 && idx !== 5 ? '1px solid rgba(0,0,0,0.2)' : undefined,
                borderBottom: [0, 2, 3].includes(idx) ? '1px solid rgba(0,0,0,0.2)' : undefined,
              }}
            >
              {/* ID + node dot */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <motion.span
                  className="text-lg font-bold font-mono tracking-tighter"
                  whileHover={{ letterSpacing: '0.15em' }}
                  transition={{ duration: 0.3 }}
                >
                  {item.id}
                </motion.span>
                <motion.div
                  className="w-2 h-2 rounded-full border border-black/30 relative"
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-black"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </div>

              {/* Text content */}
              <div className="max-w-[240px] relative z-10">
                <motion.h3
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  className="text-3xl font-black uppercase mb-3 leading-tight"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-[12px] leading-relaxed font-medium opacity-60 group-hover:opacity-90 transition-opacity">
                  {item.desc}
                </p>
              </div>

              {/* Animated underline on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-black/60"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {/* Corner bracket */}
              <div className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-black/60" />
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-black/60" />
              </div>

              {/* Pulse ring on hover */}
              <motion.div
                className="absolute top-6 right-6 w-12 h-12 rounded-full border border-black/10 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.5 }}
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>
          ))}

          {/* Image Node — inside grid, spanning last column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 1.2, ease: "circOut" }}
            className="md:col-span-1 md:row-span-1 overflow-hidden relative group border-l border-black/20"
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
              alt="Architecture"
              className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#E2E600]/40 mix-blend-multiply pointer-events-none" />
            {/* Label overlay */}
            <motion.div
              className="absolute bottom-4 left-4"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.4 }}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] bg-[#E2E600]/80 px-2 py-1 text-black/70">
                Built_To_Last
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom axis label */}
        <motion.div
          className="mt-4 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30">Est. 2024</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30">6 Core Principles</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30">v2.0</span>
        </motion.div>
      </div>
    </section>
  );
};

export default BlueprintValues;