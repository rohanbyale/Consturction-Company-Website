import React from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════
   ARCHITECTURAL BACKGROUND SVG
   Blueprint-style city elevation drawing
   — buildings, crane, grid, annotations
═══════════════════════════════════════ */
const ArchBlueprintBg = () => (
  <svg
    viewBox="0 0 1200 500"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    aria-hidden="true"
  >
    <defs>
      <style>{`
        @keyframes bpDash   { from{stroke-dashoffset:0} to{stroke-dashoffset:-40} }
        @keyframes bpPulse  { 0%,100%{opacity:.06} 50%{opacity:.12} }
        @keyframes bpFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes bpBlink  { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes scanDown { 0%{transform:translateY(-10px);opacity:0} 8%{opacity:.08} 92%{opacity:.08} 100%{transform:translateY(510px);opacity:0} }
        @keyframes wireSwg  { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(2deg)} 70%{transform:rotate(-2deg)} }
        .bp-dash  { animation: bpDash   6s linear infinite; }
        .bp-pulse { animation: bpPulse  4s ease-in-out infinite; }
        .bp-float { animation: bpFloat  5s ease-in-out infinite; transform-origin:600px 60px; }
        .bp-blink { animation: bpBlink  1.8s step-end infinite; }
        .scan-ln  { animation: scanDown 8s linear infinite; }
        .wire-sw  { animation: wireSwg  4s ease-in-out infinite; transform-origin:880px 30px; }
      `}</style>

      {/* Blueprint grid pattern */}
      <pattern id="bpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(217,249,157,0.06)" strokeWidth="0.5"/>
      </pattern>
      <pattern id="bpGridLg" width="200" height="200" patternUnits="userSpaceOnUse">
        <rect width="200" height="200" fill="url(#bpGrid)"/>
        <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(217,249,157,0.1)" strokeWidth="1"/>
      </pattern>

      <filter id="bpGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* ── BASE GRID ── */}
    <rect width="1200" height="500" fill="url(#bpGridLg)"/>

    {/* ── SCAN LINE ── */}
    <line className="scan-ln" x1="0" y1="0" x2="1200" y2="0"
      stroke="rgba(217,249,157,0.12)" strokeWidth="1.5"/>

    {/* ── GROUND LINE ── */}
    <line x1="0" y1="420" x2="1200" y2="420"
      stroke="rgba(217,249,157,0.25)" strokeWidth="1.2"/>
    {/* Ground hash marks */}
    {[...Array(31)].map((_,i) => (
      <line key={i} x1={i*40} y1="420" x2={i*40-8} y2="432"
        stroke="rgba(217,249,157,0.12)" strokeWidth="0.8"/>
    ))}

    {/* ══════════════════════════════════
        BUILDINGS — left to right skyline
    ══════════════════════════════════ */}

    {/* ── BLDG 1: Short warehouse (far left) ── */}
    <rect x="20" y="310" width="110" height="110"
      fill="rgba(217,249,157,0.03)" stroke="rgba(217,249,157,0.2)" strokeWidth="1"/>
    {/* Floor lines */}
    <line x1="20" y1="350" x2="130" y2="350" stroke="rgba(217,249,157,0.08)" strokeWidth="0.5"/>
    <line x1="20" y1="385" x2="130" y2="385" stroke="rgba(217,249,157,0.08)" strokeWidth="0.5"/>
    {/* Windows */}
    {[0,1,2].map(col => [0,1].map(row => (
      <rect key={`b1-${col}-${row}`}
        x={30+col*30} y={320+row*35} width="18" height="22"
        fill="rgba(217,249,157,0.05)" stroke="rgba(217,249,157,0.18)" strokeWidth="0.6"/>
    )))}

    {/* ── BLDG 2: Medium tower ── */}
    <rect x="145" y="220" width="90" height="200"
      fill="rgba(217,249,157,0.03)" stroke="rgba(217,249,157,0.22)" strokeWidth="1"/>
    {[250,280,310,340,370,395].map((y,i) => (
      <line key={i} x1="145" y1={y} x2="235" y2={y}
        stroke="rgba(217,249,157,0.07)" strokeWidth="0.5"/>
    ))}
    {[0,1,2].map(col => [0,1,2,3,4].map(row => (
      <rect key={`b2-${col}-${row}`}
        x={152+col*26} y={228+row*36} width="16" height="24"
        fill="rgba(217,249,157,0.05)" stroke="rgba(217,249,157,0.15)" strokeWidth="0.5"/>
    )))}
    {/* Roof parapet */}
    <rect x="141" y="212" width="98" height="10"
      fill="rgba(217,249,157,0.05)" stroke="rgba(217,249,157,0.22)" strokeWidth="0.8"/>

    {/* ── BLDG 3: Tall skyscraper (hero, centre-left) ── */}
    <rect x="260" y="80" width="120" height="340"
      fill="rgba(217,249,157,0.03)" stroke="rgba(217,249,157,0.3)" strokeWidth="1.2"/>
    {/* Floor slabs */}
    {[110,140,170,200,230,260,290,320,350,380,405].map((y,i) => (
      <line key={i} x1="260" y1={y} x2="380" y2={y}
        stroke="rgba(217,249,157,0.07)" strokeWidth="0.5"/>
    ))}
    {/* Windows 4×11 */}
    {[0,1,2,3].map(col => [0,1,2,3,4,5,6,7,8,9].map(row => (
      <rect key={`b3-${col}-${row}`}
        x={268+col*27} y={88+row*30} width="18" height="20"
        fill="rgba(217,249,157,0.04)" stroke="rgba(217,249,157,0.14)" strokeWidth="0.5"/>
    )))}
    {/* Penthouse */}
    <rect x="280" y="62" width="80" height="20"
      fill="rgba(217,249,157,0.05)" stroke="rgba(217,249,157,0.28)" strokeWidth="0.9"/>
    {/* Spire */}
    <line x1="320" y1="62" x2="320" y2="28" stroke="rgba(217,249,157,0.4)" strokeWidth="1.2"/>
    <g className="bp-float">
      <polygon points="320,22 316,32 324,32" fill="rgba(217,249,157,0.3)"/>
      <line x1="320" y1="40" x2="334" y2="34" stroke="rgba(217,249,157,0.25)" strokeWidth="0.8"/>
      {/* Beacon blink */}
      <circle className="bp-blink" cx="320" cy="22" r="2.5" fill="#D9F99D" filter="url(#bpGlow)"/>
    </g>
    {/* Height dimension */}
    <line className="bp-dash" x1="388" y1="80" x2="400" y2="80"
      stroke="rgba(217,249,157,0.2)" strokeWidth="0.5" strokeDasharray="3 4"/>
    <line className="bp-dash" x1="388" y1="420" x2="400" y2="420"
      stroke="rgba(217,249,157,0.2)" strokeWidth="0.5" strokeDasharray="3 4"/>
    <line x1="396" y1="80" x2="396" y2="420"
      stroke="rgba(217,249,157,0.15)" strokeWidth="0.5" strokeDasharray="3 4"/>
    <polygon points="396,80 393,90 399,90" fill="rgba(217,249,157,0.2)"/>
    <polygon points="396,420 393,410 399,410" fill="rgba(217,249,157,0.2)"/>
    <text x="402" y="255" fill="rgba(217,249,157,0.25)" fontSize="8" fontFamily="monospace"
      textAnchor="start" transform="rotate(90,402,255)">62.5 M</text>

    {/* ── BLDG 4: Stepped tower ── */}
    {/* Base */}
    <rect x="410" y="200" width="140" height="220"
      fill="rgba(217,249,157,0.025)" stroke="rgba(217,249,157,0.22)" strokeWidth="1"/>
    {/* Step 2 */}
    <rect x="435" y="140" width="90" height="62"
      fill="rgba(217,249,157,0.03)" stroke="rgba(217,249,157,0.2)" strokeWidth="0.9"/>
    {/* Step 3 top */}
    <rect x="455" y="100" width="50" height="42"
      fill="rgba(217,249,157,0.04)" stroke="rgba(217,249,157,0.22)" strokeWidth="0.9"/>
    {/* Windows */}
    {[0,1,2,3].map(col => [0,1,2,3,4].map(row => (
      <rect key={`b4-${col}-${row}`}
        x={418+col*32} y={210+row*38} width="20" height="26"
        fill="rgba(217,249,157,0.04)" stroke="rgba(217,249,157,0.12)" strokeWidth="0.5"/>
    )))}

    {/* ── BLDG 5: Glass curtain wall (centre-right) ── */}
    <rect x="580" y="130" width="100" height="290"
      fill="rgba(217,249,157,0.03)" stroke="rgba(217,249,157,0.25)" strokeWidth="1.1"/>
    {/* Curtain wall grid */}
    {[0,1,2,3,4].map(col => (
      <line key={col} x1={580+col*20} y1="130" x2={580+col*20} y2="420"
        stroke="rgba(217,249,157,0.08)" strokeWidth="0.5"/>
    ))}
    {[...Array(12)].map((_,row) => (
      <line key={row} x1="580" y1={130+row*24} x2="680" y2={130+row*24}
        stroke="rgba(217,249,157,0.06)" strokeWidth="0.4"/>
    ))}
    {/* Top feature */}
    <rect x="576" y="120" width="108" height="12"
      fill="rgba(217,249,157,0.05)" stroke="rgba(217,249,157,0.28)" strokeWidth="0.8"/>

    {/* ── CRANE (right section) ── */}
    {/* Tower mast */}
    <rect x="872" y="100" width="16" height="320"
      fill="rgba(217,249,157,0.04)" stroke="rgba(217,249,157,0.3)" strokeWidth="1"/>
    {/* Mast diagonal bracing */}
    {[0,1,2,3,4,5,6,7].map(i => (
      <line key={i}
        x1={i%2===0 ? 872 : 888} y1={100+i*40}
        x2={i%2===0 ? 888 : 872} y2={100+(i+1)*40}
        stroke="rgba(217,249,157,0.15)" strokeWidth="0.6"/>
    ))}
    {/* Jib (horizontal boom) */}
    <line x1="700" y1="108" x2="1060" y2="108"
      stroke="rgba(217,249,157,0.35)" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Counter jib */}
    <line x1="888" y1="108" x2="700" y2="108"
      stroke="rgba(217,249,157,0.2)" strokeWidth="1.5"/>
    {/* Counter weight */}
    <rect x="700" y="104" width="30" height="16"
      fill="rgba(217,249,157,0.08)" stroke="rgba(217,249,157,0.25)" strokeWidth="0.8"/>
    {/* Jib truss stays */}
    {[920,960,1000,1040].map((x,i) => (
      <line key={i} x1="880" y1="90" x2={x} y2="108"
        stroke="rgba(217,249,157,0.14)" strokeWidth="0.7"/>
    ))}
    {/* Trolley + hoist wire + hook — swinging */}
    <g className="wire-sw">
      <rect x="958" y="104" width="12" height="8"
        fill="rgba(217,249,157,0.1)" stroke="rgba(217,249,157,0.3)" strokeWidth="0.7"/>
      <line x1="964" y1="112" x2="964" y2="180"
        stroke="rgba(217,249,157,0.3)" strokeWidth="0.9" strokeDasharray="4 4"/>
      {/* Hook */}
      <path d="M964 180 Q970 180 972 188 Q974 198 968 202 Q962 206 960 198"
        stroke="rgba(217,249,157,0.4)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <circle cx="964" cy="180" r="3" fill="rgba(217,249,157,0.25)"/>
    </g>

    {/* ── BLDG 6: Medium block (right) ── */}
    <rect x="710" y="240" width="130" height="180"
      fill="rgba(217,249,157,0.025)" stroke="rgba(217,249,157,0.18)" strokeWidth="1"/>
    {[0,1,2,3].map(col => [0,1,2].map(row => (
      <rect key={`b6-${col}-${row}`}
        x={720+col*30} y={254+row*48} width="20" height="34"
        fill="rgba(217,249,157,0.04)" stroke="rgba(217,249,157,0.12)" strokeWidth="0.5"/>
    )))}

    {/* ── BLDG 7: Slim residential (far right) ── */}
    <rect x="1030" y="160" width="80" height="260"
      fill="rgba(217,249,157,0.03)" stroke="rgba(217,249,157,0.2)" strokeWidth="1"/>
    {[0,1].map(col => [0,1,2,3,4,5,6].map(row => (
      <rect key={`b7-${col}-${row}`}
        x={1038+col*34} y={170+row*34} width="22" height="24"
        fill="rgba(217,249,157,0.04)" stroke="rgba(217,249,157,0.13)" strokeWidth="0.5"/>
    )))}
    <rect x="1026" y="152" width="88" height="10"
      fill="rgba(217,249,157,0.05)" stroke="rgba(217,249,157,0.22)" strokeWidth="0.8"/>

    {/* ── BLDG 8: Low-rise (far right corner) ── */}
    <rect x="1120" y="330" width="75" height="90"
      fill="rgba(217,249,157,0.025)" stroke="rgba(217,249,157,0.15)" strokeWidth="0.8"/>
    {[0,1].map(col => [0,1].map(row => (
      <rect key={`b8-${col}-${row}`}
        x={1128+col*28} y={342+row*34} width="18" height="22"
        fill="rgba(217,249,157,0.04)" stroke="rgba(217,249,157,0.1)" strokeWidth="0.5"/>
    )))}

    {/* ── ANNOTATIONS ── */}
    {/* Width span line */}
    <line className="bp-pulse" x1="260" y1="446" x2="380" y2="446"
      stroke="rgba(217,249,157,0.2)" strokeWidth="0.6"/>
    <polygon points="260,443 260,449 254,446" fill="rgba(217,249,157,0.2)"/>
    <polygon points="380,443 380,449 386,446" fill="rgba(217,249,157,0.2)"/>
    <text x="320" y="458" fill="rgba(217,249,157,0.2)" fontSize="7"
      fontFamily="monospace" textAnchor="middle">24.0 M</text>

    {/* Site boundary dashed */}
    <rect x="14" y="60" width="1172" height="366"
      fill="none" stroke="rgba(217,249,157,0.07)" strokeWidth="0.8"
      strokeDasharray="6 8"/>

    {/* Compass rose — bottom right */}
    <g transform="translate(1150,460)" opacity="0.3">
      <circle cx="0" cy="0" r="14" stroke="rgba(217,249,157,0.4)" strokeWidth="0.7" fill="none"/>
      <polygon points="0,-12 -3,-4 3,-4" fill="rgba(217,249,157,0.7)"/>
      <polygon points="0,12 -3,4 3,4" fill="rgba(217,249,157,0.2)"/>
      <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(217,249,157,0.3)" strokeWidth="0.6"/>
      <text x="0" y="-16" fill="rgba(217,249,157,0.5)" fontSize="6"
        fontFamily="monospace" textAnchor="middle">N</text>
    </g>

    {/* Scale bar — bottom left */}
    <g transform="translate(20,460)" opacity="0.3">
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={i*20} y="0" width="20" height="5"
          fill={i%2===0 ? 'rgba(217,249,157,0.4)' : 'rgba(217,249,157,0.1)'}
          stroke="rgba(217,249,157,0.3)" strokeWidth="0.4"/>
      ))}
      <text x="0" y="14" fill="rgba(217,249,157,0.4)" fontSize="6" fontFamily="monospace">0</text>
      <text x="100" y="14" fill="rgba(217,249,157,0.4)" fontSize="6" fontFamily="monospace">50M</text>
      <text x="42" y="-4" fill="rgba(217,249,157,0.3)" fontSize="5.5" fontFamily="monospace">SCALE 1:500</text>
    </g>

    {/* Title block — top left corner */}
    <rect x="14" y="14" width="180" height="38"
      fill="rgba(217,249,157,0.02)" stroke="rgba(217,249,157,0.12)" strokeWidth="0.6"/>
    <line x1="14" y1="28" x2="194" y2="28" stroke="rgba(217,249,157,0.1)" strokeWidth="0.5"/>
    <text x="22" y="25" fill="rgba(217,249,157,0.25)" fontSize="7"
      fontFamily="monospace" letterSpacing="2">SITE ELEVATION — MASTER PLAN</text>
    <text x="22" y="44" fill="rgba(217,249,157,0.15)" fontSize="6"
      fontFamily="monospace">DWG NO: SE-001 / REV.03 / 2026</text>

  </svg>
);

const CompanyManifesto = () => {
  return (
    <section className="bg-[#1A1A1A] h-auto lg:h-[50vh] flex items-center py-16 md:py-0 px-6 md:px-12 overflow-hidden relative border-y border-white/5">

      {/* ── ARCHITECTURAL BLUEPRINT BACKGROUND ── */}
      <ArchBlueprintBg />

      {/* Gradient veil — keeps text readable */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.75) 55%, rgba(26,26,26,0.55) 100%)' }}/>

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* CONTENT SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT COLUMN: PRIMARY IDENTITY (7 COLS) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#D9F99D] font-mono text-[9px] tracking-[0.5em] uppercase font-bold block mb-4">
                The Core Mission
              </span>

              <h2
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                className="text-6xl md:text-[85px] font-black text-white uppercase leading-[0.8] mb-8"
              >
                Beyond <br />
                <span className="text-white/20">The Horizon.</span>
              </h2>

              <p className="text-lg md:text-xl text-white font-medium leading-tight tracking-tight italic max-w-xl">
                "We don't just build apartments; we engineer the containers of human legacy, merging deep structural integrity with expansive, user-centric design."
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: SECONDARY DETAIL (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full lg:pt-14">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xs md:text-sm text-white/50 leading-relaxed font-sans text-justify border-l border-[#D9F99D]/30 pl-6">
                At the heart of our operations lies a radical commitment to the dweller's journey. We understand that a building is more than its structural load—it is a living, breathing ecosystem. Our projects are 'Deep-Large' by design, utilizing advanced AI-modeling to ensure every square inch provides maximum utility.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
                  className="bg-[#E2E600] text-[#1A1A1A] px-8 py-3.5 font-bold uppercase text-[9px] tracking-[0.3em] transition-all"
                >
                  Our Philosophy
                </motion.button>
               
             
              </div>
            </motion.div>
          </div>

        </div>

        {/* RADAR DECORATION */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-[400px] h-[400px] border border-[#D9F99D] rounded-full"
          />
        </div>

      </div>
    </section>
  );
};

export default CompanyManifesto;