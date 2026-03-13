import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const BuildingSVG = ({ progress }) => {

  const totalFloors = 8;
  const builtFloors = Math.floor((progress / 100) * totalFloors);
  const cx = 160, groundY = 290;
  const floorH = 28, bldW = 96, bldX = 112;

  return (
    <svg viewBox="0 0 320 310" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 260, height: 260 }}>
      <defs>
        <style>{`
          @keyframes craneSwing { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(6deg)} 70%{transform:rotate(-4deg)} }
          @keyframes hookBob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
          @keyframes sparks     { 0%{opacity:0;transform:scale(0)} 30%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.5) translate(6px,-6px)} }
          @keyframes workerBob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
          @keyframes scanH      { from{transform:translateX(-200px)} to{transform:translateX(200px)} }
          @keyframes groundPls  { 0%,100%{opacity:.3} 50%{opacity:.7} }
          @keyframes winGlow    { 0%,100%{fill-opacity:.08} 50%{fill-opacity:.22} }
          @keyframes dust1      { 0%{transform:translate(0,0) scale(1);opacity:.4} 100%{transform:translate(-12px,-18px) scale(1.8);opacity:0} }
          @keyframes dust2      { 0%{transform:translate(0,0) scale(1);opacity:.35} 100%{transform:translate(14px,-20px) scale(2);opacity:0} }
          @keyframes dashFlow   { from{stroke-dashoffset:0} to{stroke-dashoffset:-24} }
          @keyframes beaconBlnk { 0%,100%{opacity:1} 50%{opacity:.1} }
          .crane-arm  { animation: craneSwing 3.5s ease-in-out infinite; transform-origin:208px 48px; }
          .hook-grp   { animation: hookBob    2s   ease-in-out infinite; }
          .worker-bob { animation: workerBob  1.6s ease-in-out infinite; }
          .win-glow   { animation: winGlow    2.8s ease-in-out infinite; }
          .scan-bar   { animation: scanH      3s   linear     infinite; }
          .d-flow     { animation: dashFlow   3s   linear     infinite; }
          .beacon     { animation: beaconBlnk 1.2s step-end   infinite; }
          .dust-a     { animation: dust1 2.4s ease-out infinite; }
          .dust-b     { animation: dust2 2.4s ease-out infinite .8s; }
          .gnd-pulse  { animation: groundPls  2s   ease-in-out infinite; }
        `}</style>

        {/* Scan clip */}
        <clipPath id="scanClip">
          <rect x={bldX} y={groundY - totalFloors * floorH - 10} width={bldW} height={totalFloors * floorH + 10}/>
        </clipPath>

        {/* Yellow glow filter */}
        <filter id="yGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── GROUND ── */}
      <line className="gnd-pulse" x1="20" y1={groundY} x2="300" y2={groundY}
        stroke="#eefc55" strokeWidth="1.5" strokeOpacity="0.3"/>
      {/* Ground hash */}
      {[...Array(14)].map((_,i) => (
        <line key={i} x1={20+i*20} y1={groundY} x2={20+i*20-6} y2={groundY+10}
          stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.15"/>
      ))}

      {/* ── FOUNDATION ── */}
      <rect x={bldX - 8} y={groundY - 8} width={bldW + 16} height={10}
        fill="#eefc55" fillOpacity="0.08" stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.4"/>

      {/* ── SCAFFOLDING (left side) ── */}
      <line x1={bldX - 16} y1={groundY} x2={bldX - 16} y2={groundY - builtFloors * floorH}
        stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.3"/>
      <line x1={bldX - 26} y1={groundY} x2={bldX - 26} y2={groundY - builtFloors * floorH}
        stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.2"/>
      {[...Array(builtFloors)].map((_,i) => (
        <g key={i}>
          <line x1={bldX-26} y1={groundY-i*floorH-floorH/2}
                x2={bldX-16} y2={groundY-i*floorH-floorH/2}
            stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.25"/>
          <line x1={bldX-26} y1={groundY-i*floorH}
                x2={bldX-16} y2={groundY-i*floorH-floorH}
            stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.15"/>
        </g>
      ))}

      {/* ── SCAFFOLDING (right side) ── */}
      <line x1={bldX + bldW + 16} y1={groundY} x2={bldX + bldW + 16} y2={groundY - builtFloors * floorH}
        stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.3"/>
      <line x1={bldX + bldW + 26} y1={groundY} x2={bldX + bldW + 26} y2={groundY - builtFloors * floorH}
        stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.2"/>
      {[...Array(builtFloors)].map((_,i) => (
        <g key={i}>
          <line x1={bldX+bldW+16} y1={groundY-i*floorH-floorH/2}
                x2={bldX+bldW+26} y2={groundY-i*floorH-floorH/2}
            stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.25"/>
        </g>
      ))}

      {/* ── BUILDING FLOORS (revealed bottom-up) ── */}
      {[...Array(totalFloors)].map((_,floor) => {
        const y = groundY - (floor + 1) * floorH;
        const isBuilt = floor < builtFloors;
        const isTop   = floor === builtFloors - 1;
        if (!isBuilt) return null;
        return (
          <motion.g key={floor}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
            style={{ transformOrigin: `${cx}px ${y + floorH}px` }}>

            {/* Floor slab */}
            <rect x={bldX} y={y} width={bldW} height={floorH}
              fill="#eefc55" fillOpacity="0.05"
              stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.35"/>

            {/* Floor line */}
            <line x1={bldX} y1={y + floorH} x2={bldX + bldW} y2={y + floorH}
              stroke="#eefc55" strokeWidth="0.9" strokeOpacity="0.4"/>

            {/* Windows — 3 per floor */}
            {[0,1,2].map(w => (
              <rect key={w} className="win-glow"
                x={bldX + 8 + w * 28} y={y + 6}
                width="16" height="14"
                fill="#eefc55" fillOpacity="0.08"
                stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.4"
                style={{ animationDelay:`${(floor*0.3+w*0.15).toFixed(2)}s` }}/>
            ))}

            {/* Active construction top — yellow accent */}
            {isTop && (
              <>
                <rect x={bldX} y={y} width={bldW} height="4"
                  fill="#eefc55" fillOpacity="0.3" filter="url(#softGlow)"/>
                {/* Worker silhouette on top */}
                <g className="worker-bob" style={{ transformOrigin:`${cx}px ${y}px` }}>
                  {/* Body */}
                  <rect x={cx - 3} y={y - 14} width="6" height="10"
                    fill="#eefc55" fillOpacity="0.6"/>
                  {/* Hard hat */}
                  <path d={`M${cx-5} ${y-15} Q${cx} ${y-22} ${cx+5} ${y-15}`}
                    fill="#eefc55" fillOpacity="0.7"/>
                  {/* Arm holding tool */}
                  <line x1={cx+3} y1={y-10} x2={cx+10} y2={y-7}
                    stroke="#eefc55" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round"/>
                </g>
                {/* Dust puffs */}
                <ellipse className="dust-a" cx={bldX + 8} cy={y + 2} rx="5" ry="3"
                  fill="#eefc55" fillOpacity="0.2"/>
                <ellipse className="dust-b" cx={bldX + bldW - 10} cy={y + 2} rx="4" ry="3"
                  fill="#eefc55" fillOpacity="0.2"/>
              </>
            )}
          </motion.g>
        );
      })}

      {/* ── CRANE ── */}
      {/* Mast */}
      <rect x="202" y="48" width="12" height={groundY - 48}
        fill="#eefc55" fillOpacity="0.05"
        stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.4"/>
      {/* Mast bracing */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i}
          x1={i%2===0 ? 202 : 214} y1={60+i*32}
          x2={i%2===0 ? 214 : 202} y2={60+(i+1)*32}
          stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.2"/>
      ))}
      {/* Jib arm — swings */}
      <g className="crane-arm">
        {/* Main jib */}
        <line x1="208" y1="48" x2="290" y2="48"
          stroke="#eefc55" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
        {/* Counter jib */}
        <line x1="208" y1="48" x2="150" y2="48"
          stroke="#eefc55" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
        {/* Counter weight */}
        <rect x="138" y="44" width="14" height="10"
          fill="#eefc55" fillOpacity="0.15" stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.4"/>
        {/* Stay cables */}
        {[240, 265, 285].map((x,i) => (
          <line key={i} x1="208" y1="34" x2={x} y2="48"
            stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.3"/>
        ))}
        <line x1="208" y1="34" x2="155" y2="48"
          stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.25"/>
        {/* Cab top */}
        <rect x="200" y="30" width="16" height="12"
          fill="#eefc55" fillOpacity="0.1" stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.45"/>
        {/* Beacon */}
        <circle className="beacon" cx="208" cy="28" r="3"
          fill="#eefc55" filter="url(#yGlow)" fillOpacity="0.9"/>

        {/* Trolley + wire + hook */}
        <g className="hook-grp">
          <rect x="253" y="44" width="10" height="7"
            fill="#eefc55" fillOpacity="0.15" stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.4"/>
          <line className="d-flow" x1="258" y1="51" x2="258" y2="120"
            stroke="#eefc55" strokeWidth="0.9" strokeOpacity="0.35" strokeDasharray="4 4"/>
          {/* Hook shape */}
          <path d="M258 120 Q264 120 266 128 Q268 136 262 140 Q256 144 254 136"
            stroke="#eefc55" strokeWidth="1.6" strokeOpacity="0.55"
            fill="none" strokeLinecap="round"/>
          <circle cx="258" cy="120" r="2.5" fill="#eefc55" fillOpacity="0.4"/>
          {/* Load block */}
          <rect x="250" y="140" width="16" height="12"
            fill="#eefc55" fillOpacity="0.12" stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.5"/>
        </g>
      </g>

      {/* ── HUD SCAN LINE ── */}
      <g clipPath="url(#scanClip)">
        <line className="scan-bar" x1="0" y1={groundY - builtFloors * floorH + 6}
          x2="60" y2={groundY - builtFloors * floorH + 6}
          stroke="#eefc55" strokeWidth="1" strokeOpacity="0.4"/>
      </g>

      {/* ── CORNER MARKS ── */}
      {[[20,20],[300,20],[20,295],[300,295]].map(([x,y],i) => (
        <g key={i} opacity="0.2">
          <line x1={x} y1={y} x2={x+(i%2===0?12:-12)} y2={y}
            stroke="#eefc55" strokeWidth="1"/>
          <line x1={x} y1={y} x2={x} y2={y+(i<2?12:-12)}
            stroke="#eefc55" strokeWidth="1"/>
        </g>
      ))}

      {/* ── GRID DOTS (faint background) ── */}
      {[0,1,2,3,4,5,6].map(col => [0,1,2,3,4,5,6,7].map(row => (
        <circle key={`${col}-${row}`}
          cx={20 + col * 44} cy={20 + row * 38} r="0.8"
          fill="#eefc55" fillOpacity="0.07"/>
      )))}

    </svg>
  );
};

/* ═══════════════════════════════════════════════
   MAIN PRELOADER
═══════════════════════════════════════════════ */
const PillarLoader = () => {
  const [progress, setProgress]   = useState(0);
  const [phase, setPhase]         = useState('loading'); // 'loading' | 'done'
  const [statusText, setStatus]   = useState('Laying Foundation');

  const statuses = [
    [0,  'Laying Foundation'],
    [18, 'Pouring Concrete'],
    [35, 'Structural Frame'],
    [52, 'Installing Floors'],
    [68, 'Curtain Wall'],
    [82, 'Finishing Floors'],
    [94, 'Final Inspection'],
    [100,'Structure Complete'],
  ];

  useEffect(() => {
    // Simulate loading — replace with real load logic
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 3.5 + 0.5, 100);
        // Update status text
        for (let i = statuses.length - 1; i >= 0; i--) {
          if (next >= statuses[i][0]) { setStatus(statuses[i][1]); break; }
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('done'), 600);
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0A1128' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background blueprint grid */}
          
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #0A1128 100%)' }}/>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-6">

            {/* Logo / brand stamp */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-6 h-6 bg-[#eefc55] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <polygon points="7,1 13,4 13,10 7,13 1,10 1,4" fill="#0A1128"/>
                </svg>
              </div>
              <span className="font-mono text-[10px] tracking-[0.5em] text-[#eefc55] uppercase font-bold opacity-70">
             𝓤𝓻𝓫𝓪𝓷𝓡𝓲𝓼𝓮 𝓑𝓾𝓲𝓵𝓭𝓮𝓻𝓼
              </span>
            </motion.div>

            {/* The Building SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <BuildingSVG progress={Math.round(progress)}/>

              {/* Progress % overlaid on building */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <motion.span
                  key={Math.round(progress)}
                  className="font-mono text-[#eefc55] font-black leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44 }}
                >
                  {Math.round(progress)}
                </motion.span>
                <span className="font-mono text-[#eefc55] text-lg opacity-50">%</span>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 flex flex-col gap-2">
              <div className="relative h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #eefc55, #d4f040)',
                    width: `${progress}%`,
                    transition: 'width 0.1s linear',
                    boxShadow: '0 0 10px rgba(238,252,85,0.6)',
                  }}/>
                {/* Shimmer */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                    animation: 'shimmer 1.5s linear infinite',
                  }}/>
              </div>

              {/* Status line */}
              <div className="flex justify-between items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusText}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="font-mono text-[9px] text-[#eefc55] uppercase tracking-[0.35em] opacity-60"
                  >
                    {statusText}
                  </motion.span>
                </AnimatePresence>
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                  {Math.round(progress)}/100
                </span>
              </div>
            </div>

            {/* Floor indicators — 8 blocks */}
            <div className="flex gap-1.5 mt-1">
              {[...Array(8)].map((_,i) => {
                const filled = (progress / 100) * 8 > i;
                const partial = (progress / 100) * 8 > i && (progress / 100) * 8 < i + 1;
                return (
                  <motion.div
                    key={i}
                    className="h-[6px] rounded-sm"
                    style={{
                      width: 22,
                      background: filled
                        ? partial
                          ? `linear-gradient(90deg, #eefc55 ${((progress/100)*8 - i) * 100}%, rgba(238,252,85,0.15) 0%)`
                          : '#eefc55'
                        : 'rgba(238,252,85,0.1)',
                      boxShadow: filled && !partial ? '0 0 6px rgba(238,252,85,0.5)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                );
              })}
            </div>
            <span className="font-mono text-[8px] text-white/15 uppercase tracking-[0.5em]">
              Floor Progress
            </span>

          </div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#eefc55] animate-pulse"/>
            <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.5em]">
              Establishing_Foundation
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#eefc55] animate-pulse" style={{ animationDelay:'0.5s' }}/>
          </motion.div>

          <style>{`
            @keyframes shimmer {
              from { transform: translateX(-100%); }
              to   { transform: translateX(400%);  }
            }
          `}</style>

        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default PillarLoader;
