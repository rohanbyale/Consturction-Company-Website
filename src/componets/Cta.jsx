import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

/* ─────────────────────────────────────────────
   ARCHITECTURAL LINE-DRAWING HOUSE SVG
   Style: clean front-elevation drafting drawing
   Motion: stroke draws in once on scroll-enter.
   Only 3 subtle animations after: window warm
   glow pulse, lamp flicker, smoke wisp — all
   calm and non-distracting.
───────────────────────────────────────────── */
const HouseSVG = () => {
  const ref   = useRef();
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setDrawn(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Helper: returns transition style for draw-in
  const d = (delay = 0, dur = 1.2) => ({
    strokeDasharray: '1',
    strokeDashoffset: drawn ? '0' : '1',
    pathLength: 1,
    style: {
      transition: `stroke-dashoffset ${dur}s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
    },
  });

  const fade = (delay = 0) => ({
    style: {
      opacity: drawn ? 1 : 0,
      transition: `opacity 0.7s ease ${delay}s`,
    },
  });

  return (
    <svg ref={ref} viewBox="0 0 320 296"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', height:'100%', display:'block' }}
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes winPulse  { 0%,100%{opacity:.15} 50%{opacity:.32} }
          @keyframes winPulse2 { 0%,100%{opacity:.12} 50%{opacity:.28} }
          @keyframes winPulse3 { 0%,100%{opacity:.10} 50%{opacity:.22} }
          @keyframes lampFlick { 0%,100%{opacity:.55} 50%{opacity:.80} }
          @keyframes smokeUp   { 0%{transform:translateY(0) scaleX(1);opacity:.45}
                                 100%{transform:translateY(-16px) scaleX(1.5);opacity:0} }
          .wf1 { animation: winPulse  3.0s ease-in-out infinite; }
          .wf2 { animation: winPulse2 3.6s ease-in-out infinite .6s; }
          .wf3 { animation: winPulse3 4.2s ease-in-out infinite 1.2s; }
          .lf  { animation: lampFlick 2.8s ease-in-out infinite; }
          .s1  { animation: smokeUp   2.6s ease-out  infinite; }
          .s2  { animation: smokeUp   2.6s ease-out  infinite .9s; }
          .s3  { animation: smokeUp   2.6s ease-out  infinite 1.8s; }
        `}</style>

        {/* Very subtle warm fill for windows */}
        <radialGradient id="wg" cx="50%" cy="40%" r="65%">
          <stop offset="0%"   stopColor="#FFD700" stopOpacity="1"/>
          <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.3"/>
        </radialGradient>

        {/* Lamp halo */}
        <radialGradient id="lg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFD700" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
        </radialGradient>

        {/* Sky */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#080d18"/>
          <stop offset="100%" stopColor="#0e1525"/>
        </linearGradient>

        {/* House wall fill — barely visible tint */}
        <linearGradient id="wf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,215,0,0.035)"/>
          <stop offset="100%" stopColor="rgba(255,215,0,0.01)"/>
        </linearGradient>

        {/* Roof fill */}
        <linearGradient id="rf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,215,0,0.05)"/>
          <stop offset="100%" stopColor="rgba(255,215,0,0.015)"/>
        </linearGradient>

        {/* Ground shadow */}
        <radialGradient id="gs" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.3)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="320" height="296" fill="transparent" rx="12"/>

      {/* Stars — perfectly static */}
      {[[20,15,1],[52,10,0.8],[90,20,1],[145,8,0.7],[200,12,0.9],
        [238,18,1],[268,28,0.8],[300,10,1.1],[310,38,0.7],[14,48,0.6]
      ].map(([cx,cy,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="white"
          fillOpacity={0.15+(i%4)*0.08} {...fade(1.8)}/>
      ))}

      {/* Moon — clean line drawing */}
      <circle cx="270" cy="32" r="14" fill="none"
        stroke="rgba(255,253,220,0.15)" strokeWidth="0.5" {...fade(1.9)}/>
      <circle cx="270" cy="32" r="9"  fill="rgba(255,253,220,0.06)"
        stroke="rgba(255,253,220,0.22)" strokeWidth="0.75" {...fade(2.0)}/>

      {/* ── GROUND ── */}
      <line x1="0" y1="248" x2="320" y2="248"
        stroke="rgba(255,215,0,0.18)" strokeWidth="0.75"/>
      <rect x="0" y="248" width="320" height="48" fill="rgba(0,0,0,0.28)"/>
      {/* Lawn ellipse — gentle */}
      <ellipse cx="160" cy="249" rx="128" ry="7"
        fill="rgba(16,34,12,0.65)"/>
      {/* Building shadow */}
      <ellipse cx="160" cy="252" rx="88" ry="6" fill="url(#gs)"/>

      {/* ══════════════════════════════════════════
          HOUSE DRAWING — strokes drawn in on scroll
      ══════════════════════════════════════════ */}

      {/* ── FOUNDATION ── */}
      <rect x="64" y="226" width="192" height="22"
        fill="rgba(255,215,0,0.03)" stroke="rgba(255,215,0,0.35)" strokeWidth="1.1"
        {...d(0.05, 0.9)}/>
      <line x1="64" y1="233" x2="256" y2="233"
        stroke="rgba(255,215,0,0.12)" strokeWidth="0.4" {...d(0.15, 0.7)}/>

      {/* ── MAIN WALLS ── */}
      <rect x="72" y="140" width="176" height="88"
        fill="url(#wf)" stroke="rgba(255,215,0,0.55)" strokeWidth="1.3"
        {...d(0.25, 1.2)}/>

      {/* Brick coursing — ultra-subtle */}
      {[0,1,2,3,4,5].map(row =>
        [0,1,2,3,4,5].map(col => (
          <rect key={`${row}-${col}`}
            x={74+col*29+(row%2?14:0)} y={142+row*14}
            width="27" height="12"
            fill="none" stroke="rgba(255,215,0,0.045)" strokeWidth="0.35"
            {...fade(1.4)}
          />
        ))
      )}

      {/* ── ROOF ── */}
      <polygon points="52,140 160,50 268,140"
        fill="url(#rf)" stroke="rgba(255,215,0,0.65)" strokeWidth="1.4"
        {...d(0.45, 1.4)}/>
      {/* Overhang shadow line */}
      <line x1="52" y1="140" x2="268" y2="140"
        stroke="rgba(255,215,0,0.28)" strokeWidth="1.8" {...d(0.55, 0.9)}/>
      {/* Ridge centre line */}
      <line x1="160" y1="50" x2="160" y2="140"
        stroke="rgba(255,215,0,0.08)" strokeWidth="0.6" {...d(0.7, 0.7)}/>
      {/* Tile hatching */}
      {[0,1,2,3].map(row => {
        const y  = 60 + row*20;
        const s  = row/3.5;
        const x1 = 52 + s*108, x2 = 268 - s*108;
        const n  = Math.max(2, Math.round((x2-x1)/16));
        return [...Array(n)].map((_,i) => (
          <line key={`${row}-${i}`}
            x1={x1+i*((x2-x1)/n)} y1={y}
            x2={x1+i*((x2-x1)/n)+1.5} y2={y+18}
            stroke="rgba(255,215,0,0.06)" strokeWidth="0.4"
            {...fade(1.2)}
          />
        ));
      })}

      {/* ── CHIMNEY ── */}
      <rect x="188" y="68" width="20" height="50"
        fill="rgba(255,215,0,0.03)" stroke="rgba(255,215,0,0.42)" strokeWidth="1"
        {...d(0.8, 0.8)}/>
      <rect x="184" y="64" width="28" height="7"
        fill="rgba(255,215,0,0.05)" stroke="rgba(255,215,0,0.48)" strokeWidth="0.9"
        {...d(0.85, 0.6)}/>
      {/* Smoke — 3 gentle paths, not looping color */}
      <path className="s1" d="M196 62 Q199 54 196 46"
        fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1" strokeLinecap="round"/>
      <path className="s2" d="M200 62 Q204 53 200 44"
        fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.9" strokeLinecap="round"/>
      <path className="s3" d="M192 62 Q188 54 192 45"
        fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" strokeLinecap="round"/>

      {/* ── DORMER / ATTIC WINDOW ── */}
      <polyline points="146,112 160,96 174,112"
        fill="none" stroke="rgba(255,215,0,0.42)" strokeWidth="1"
        {...d(0.95, 0.7)}/>
      {/* Window fill — glowing */}
      <rect x="148" y="96" width="24" height="17"
        fill="url(#wg)" stroke="rgba(255,215,0,0.5)" strokeWidth="0.75"
        className="wf3"/>
      {/* Panes */}
      <line x1="160" y1="96" x2="160" y2="113" stroke="rgba(0,0,0,0.3)" strokeWidth="0.65"/>
      <line x1="148" y1="104" x2="172" y2="104" stroke="rgba(0,0,0,0.3)" strokeWidth="0.65"/>
      {/* Dormer side walls */}
      <line x1="148" y1="112" x2="148" y2="96" stroke="rgba(255,215,0,0.3)" strokeWidth="0.6"/>
      <line x1="172" y1="112" x2="172" y2="96" stroke="rgba(255,215,0,0.3)" strokeWidth="0.6"/>

      {/* ── LEFT WINDOW ── */}
      {/* Glass fill */}
      <rect x="84" y="154" width="44" height="36"
        fill="url(#wg)" stroke="none" className="wf1"/>
      {/* Frame */}
      <rect x="83" y="153" width="46" height="38"
        fill="none" stroke="rgba(255,215,0,0.6)" strokeWidth="1.1"
        {...d(0.65, 0.9)}/>
      {/* Outer shadow frame */}
      <rect x="81" y="151" width="50" height="42"
        fill="none" stroke="rgba(255,215,0,0.18)" strokeWidth="0.4"/>
      {/* Cross panes */}
      <line x1="106" y1="153" x2="106" y2="191"
        stroke="rgba(255,215,0,0.35)" strokeWidth="0.7" {...d(0.68, 0.5)}/>
      <line x1="83"  y1="172" x2="129" y2="172"
        stroke="rgba(255,215,0,0.35)" strokeWidth="0.7" {...d(0.7, 0.5)}/>
      {/* Sill */}
      <line x1="79" y1="192" x2="133" y2="192"
        stroke="rgba(255,215,0,0.4)" strokeWidth="1.4" strokeLinecap="round"
        {...d(0.72, 0.5)}/>
      {/* Lintel */}
      <line x1="80" y1="152" x2="132" y2="152"
        stroke="rgba(255,215,0,0.25)" strokeWidth="0.5" {...d(0.66, 0.4)}/>

      {/* ── RIGHT WINDOW ── */}
      <rect x="193" y="154" width="44" height="36"
        fill="url(#wg)" stroke="none" className="wf2"/>
      <rect x="192" y="153" width="46" height="38"
        fill="none" stroke="rgba(255,215,0,0.6)" strokeWidth="1.1"
        {...d(0.65, 0.9)}/>
      <rect x="190" y="151" width="50" height="42"
        fill="none" stroke="rgba(255,215,0,0.18)" strokeWidth="0.4"/>
      <line x1="215" y1="153" x2="215" y2="191"
        stroke="rgba(255,215,0,0.35)" strokeWidth="0.7" {...d(0.68, 0.5)}/>
      <line x1="192" y1="172" x2="238" y2="172"
        stroke="rgba(255,215,0,0.35)" strokeWidth="0.7" {...d(0.7, 0.5)}/>
      <line x1="188" y1="192" x2="242" y2="192"
        stroke="rgba(255,215,0,0.4)" strokeWidth="1.4" strokeLinecap="round"
        {...d(0.72, 0.5)}/>
      <line x1="189" y1="152" x2="241" y2="152"
        stroke="rgba(255,215,0,0.25)" strokeWidth="0.5" {...d(0.66, 0.4)}/>

      {/* ── DOOR ── */}
      {/* Frame outer */}
      <rect x="139" y="178" width="42" height="50"
        fill="rgba(255,215,0,0.05)" stroke="rgba(255,215,0,0.6)" strokeWidth="1.2"
        {...d(0.78, 0.9)}/>
      {/* Arch */}
      <path d="M139 186 Q160 168 181 186"
        fill="rgba(255,215,0,0.04)" stroke="rgba(255,215,0,0.45)" strokeWidth="0.8"
        {...d(0.82, 0.6)}/>
      {/* Centre split */}
      <line x1="160" y1="186" x2="160" y2="228"
        stroke="rgba(255,215,0,0.18)" strokeWidth="0.5" {...d(0.86, 0.4)}/>
      {/* Panels */}
      <rect x="142" y="190" width="15" height="14"
        fill="none" stroke="rgba(255,215,0,0.18)" strokeWidth="0.45" rx="1" {...fade(1.6)}/>
      <rect x="163" y="190" width="15" height="14"
        fill="none" stroke="rgba(255,215,0,0.18)" strokeWidth="0.45" rx="1" {...fade(1.6)}/>
      <rect x="142" y="208" width="36" height="16"
        fill="none" stroke="rgba(255,215,0,0.14)" strokeWidth="0.45" rx="1" {...fade(1.7)}/>
      {/* Knob */}
      <circle cx="174" cy="212" r="2.5"
        fill="#FFD700" fillOpacity="0.65" stroke="rgba(255,215,0,0.4)" strokeWidth="0.4"
        {...fade(1.8)}/>
      {/* Door lintel */}
      <line x1="136" y1="178" x2="184" y2="178"
        stroke="rgba(255,215,0,0.3)" strokeWidth="0.6" {...d(0.77, 0.4)}/>

      {/* ── PORCH STEPS ── */}
      <rect x="131" y="228" width="58" height="5"
        fill="rgba(255,215,0,0.04)" stroke="rgba(255,215,0,0.32)" strokeWidth="0.75"
        {...d(0.9, 0.6)}/>
      <rect x="135" y="233" width="50" height="4"
        fill="rgba(255,215,0,0.03)" stroke="rgba(255,215,0,0.22)" strokeWidth="0.5"
        {...d(0.93, 0.5)}/>
      <rect x="139" y="237" width="42" height="4"
        fill="rgba(255,215,0,0.02)" stroke="rgba(255,215,0,0.14)" strokeWidth="0.4"
        {...d(0.96, 0.4)}/>

      {/* ── LAMP POST ── */}
      <line x1="44" y1="248" x2="44" y2="198"
        stroke="rgba(255,215,0,0.45)" strokeWidth="1.1" strokeLinecap="round"
        {...d(1.05, 0.7)}/>
      <path d="M44 198 Q44 190 53 188"
        fill="none" stroke="rgba(255,215,0,0.45)" strokeWidth="1.1" strokeLinecap="round"
        {...d(1.1, 0.5)}/>
      {/* Lantern */}
      <rect x="50" y="184" width="14" height="9"
        fill="rgba(255,215,0,0.07)" stroke="rgba(255,215,0,0.52)" strokeWidth="0.7"
        {...d(1.14, 0.4)}/>
      <line x1="48" y1="184" x2="66" y2="184"
        stroke="rgba(255,215,0,0.52)" strokeWidth="0.9" strokeLinecap="round"/>
      {/* Glow halo */}
      <ellipse className="lf" cx="57" cy="188" rx="16" ry="12"
        fill="url(#lg)" {...fade(1.5)}/>

      {/* ── LEFT TREE (contour style) ── */}
      <line x1="26" y1="248" x2="26" y2="206"
        stroke="rgba(255,215,0,0.28)" strokeWidth="1.8" strokeLinecap="round"
        {...d(0.98, 0.6)}/>
      {/* Three concentric rings = canopy */}
      <circle cx="26" cy="196" r="17" fill="rgba(255,215,0,0.03)"
        stroke="rgba(255,215,0,0.22)" strokeWidth="0.7" {...d(1.02, 0.55)}/>
      <circle cx="26" cy="189" r="12" fill="rgba(255,215,0,0.035)"
        stroke="rgba(255,215,0,0.17)" strokeWidth="0.55" {...d(1.05, 0.5)}/>
      <circle cx="26" cy="183" r="7"  fill="rgba(255,215,0,0.04)"
        stroke="rgba(255,215,0,0.13)" strokeWidth="0.4" {...d(1.08, 0.4)}/>

      {/* ── RIGHT TREE ── */}
      <line x1="292" y1="248" x2="292" y2="208"
        stroke="rgba(255,215,0,0.28)" strokeWidth="1.8" strokeLinecap="round"
        {...d(0.98, 0.6)}/>
      <circle cx="292" cy="197" r="19" fill="rgba(255,215,0,0.03)"
        stroke="rgba(255,215,0,0.22)" strokeWidth="0.7" {...d(1.02, 0.55)}/>
      <circle cx="292" cy="190" r="13" fill="rgba(255,215,0,0.035)"
        stroke="rgba(255,215,0,0.17)" strokeWidth="0.55" {...d(1.05, 0.5)}/>
      <circle cx="292" cy="184" r="8"  fill="rgba(255,215,0,0.04)"
        stroke="rgba(255,215,0,0.13)" strokeWidth="0.4" {...d(1.08, 0.4)}/>

      {/* ── FENCE ── */}
      {/* Left section rails */}
      <line x1="72"  y1="226" x2="131" y2="226"
        stroke="rgba(255,215,0,0.28)" strokeWidth="0.7" {...d(1.1, 0.55)}/>
      <line x1="72"  y1="234" x2="131" y2="234"
        stroke="rgba(255,215,0,0.16)" strokeWidth="0.45" {...d(1.12, 0.45)}/>
      {[72,84,96,108,120,131].map((x,i) => (
        <g key={i} {...fade(1.5+i*0.03)}>
          <line x1={x} y1="221" x2={x} y2="239"
            stroke="rgba(255,215,0,0.22)" strokeWidth="0.7" strokeLinecap="round"/>
          <polygon points={`${x},219 ${x-2},221 ${x+2},221`}
            fill="rgba(255,215,0,0.22)"/>
        </g>
      ))}
      {/* Right section rails */}
      <line x1="189" y1="226" x2="248" y2="226"
        stroke="rgba(255,215,0,0.28)" strokeWidth="0.7" {...d(1.1, 0.55)}/>
      <line x1="189" y1="234" x2="248" y2="234"
        stroke="rgba(255,215,0,0.16)" strokeWidth="0.45" {...d(1.12, 0.45)}/>
      {[189,201,213,225,237,248].map((x,i) => (
        <g key={i} {...fade(1.5+i*0.03)}>
          <line x1={x} y1="221" x2={x} y2="239"
            stroke="rgba(255,215,0,0.22)" strokeWidth="0.7" strokeLinecap="round"/>
          <polygon points={`${x},219 ${x-2},221 ${x+2},221`}
            fill="rgba(255,215,0,0.22)"/>
        </g>
      ))}

      {/* ── PATHWAY ── */}
      <path d="M148 239 L136 248 L184 248 L172 239 Z"
        fill="rgba(255,215,0,0.03)" stroke="rgba(255,215,0,0.14)" strokeWidth="0.4"
        {...fade(1.6)}/>
      {[0,1].map(i => (
        <ellipse key={i} cx="160" cy={242+i*4} rx="9" ry="2"
          fill="none" stroke="rgba(255,215,0,0.09)" strokeWidth="0.35"
          {...fade(1.7+i*0.1)}/>
      ))}

      {/* ── ARCHITECTURAL ANNOTATION ── */}
      {/* Vertical dimension — left edge */}
      <line x1="8" y1="140" x2="8" y2="226"
        stroke="rgba(255,215,0,0.2)" strokeWidth="0.5" strokeDasharray="2 2" {...fade(2.0)}/>
      <line x1="4" y1="140" x2="12" y2="140"
        stroke="rgba(255,215,0,0.2)" strokeWidth="0.5" {...fade(2.0)}/>
      <line x1="4" y1="226" x2="12" y2="226"
        stroke="rgba(255,215,0,0.2)" strokeWidth="0.5" {...fade(2.0)}/>
      <text x="4" y="185" textAnchor="middle"
        fill="rgba(255,215,0,0.28)" fontSize="6" fontFamily="monospace"
        transform="rotate(-90,4,185)" {...fade(2.1)}>
        7.2 M
      </text>

      {/* Horizontal dimension — bottom */}
      <line x1="72"  y1="266" x2="248" y2="266"
        stroke="rgba(255,215,0,0.2)" strokeWidth="0.5" strokeDasharray="2 2" {...fade(2.0)}/>
      <line x1="72"  y1="262" x2="72"  y2="270"
        stroke="rgba(255,215,0,0.2)" strokeWidth="0.5" {...fade(2.0)}/>
      <line x1="248" y1="262" x2="248" y2="270"
        stroke="rgba(255,215,0,0.2)" strokeWidth="0.5" {...fade(2.0)}/>
      <text x="160" y="276" textAnchor="middle"
        fill="rgba(255,215,0,0.28)" fontSize="6" fontFamily="monospace" {...fade(2.1)}>
        12.0 M
      </text>

      {/* ── TITLE BAR ── */}
      <line x1="88" y1="286" x2="232" y2="286"
        stroke="rgba(255,215,0,0.14)" strokeWidth="0.4" {...fade(2.2)}/>
      <text x="160" y="293" textAnchor="middle"
        fill="rgba(255,215,0,0.25)" fontSize="6.5" fontFamily="monospace" letterSpacing="3"
        {...fade(2.3)}>
        FRONT ELEVATION
      </text>
    </svg>
  );
};

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const AnimatedCTA = () => {
  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:  { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <section className="bg-[#0f0f0f] py-12 md:py-20 px-4 relative overflow-hidden">

      {/* Blueprint grid */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cta-grid-sm" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,215,0,0.04)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="cta-grid-lg" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect width="120" height="120" fill="url(#cta-grid-sm)"/>
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(255,215,0,0.08)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid-lg)"/>
        </svg>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)' }}/>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,150,0,0.03) 0%, transparent 70%)' }}/>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-1 h-8 bg-[#FFD700] rounded-full"/>
          <span className="text-[#FFD700] font-mono text-[9px] uppercase font-bold tracking-[0.5em]">
            Operational Inquiry
          </span>
        </motion.div>

        {/* ── MAIN CARD ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/[0.07] relative group"
          style={{ background: 'linear-gradient(135deg,#161616 0%,#111 50%,#141414 100%)' }}
        >
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#FFD700] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"/>

          <div className="relative z-10 flex flex-col lg:flex-row">

            {/* LEFT: Text */}
            <div className="p-8 md:p-12 lg:w-[44%] flex flex-col justify-center">
              <motion.div variants={itemVariants} className="mb-5">
                <span className="bg-[#FFD700] text-black text-[9px] font-black px-3 py-1 rounded-full group-hover:bg-black group-hover:text-white transition-colors uppercase tracking-widest">
                  Direct Contact
                </span>
              </motion.div>

              <motion.h2 variants={itemVariants}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                className="text-4xl md:text-6xl font-black text-white uppercase tracking-wide mb-4 group-hover:text-black transition-colors duration-500 leading-[0.9]"
              >
                Start Your<br/>
                <span className="text-transparent group-hover:text-black transition-colors duration-500"
                  style={{ WebkitTextStroke: '1.5px white' }}>
                  Next Project.
                </span>
              </motion.h2>

              <motion.p variants={itemVariants}
                className="text-gray-400 text-sm md:text-base mb-8 max-w-sm group-hover:text-black/70 transition-colors duration-500 leading-relaxed"
              >
                Partner with{' '}
                <span className="text-white group-hover:text-black font-bold transition-colors duration-500">
                  Sanket Construction
                </span>{' '}
                for precision engineering and on-time delivery.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-row gap-6">
                <div className="flex items-center gap-2 text-white/80 group-hover:text-black/70 transition-colors duration-500 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={15} className="text-[#FFD700] group-hover:text-black transition-colors duration-500"/>
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 group-hover:text-black/70 transition-colors duration-500 text-[10px] font-bold uppercase tracking-widest">
                  <Clock size={15} className="text-[#FFD700] group-hover:text-black transition-colors duration-500"/>
                  <span>Pan-India</span>
                </div>
              </motion.div>
            </div>

            {/* CENTER: House architectural drawing */}
            <div className="hidden lg:flex lg:w-[29%] items-end justify-center px-2 pt-6 pb-0 relative overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-28 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(255,215,0,0.07) 0%, transparent 70%)' }}/>
              <div style={{ width: '100%', maxWidth: 244, position: 'relative', zIndex: 1 }}>
                <HouseSVG/>
              </div>
            </div>

            {/* RIGHT: Buttons */}
            <div className="p-8 md:p-10 lg:w-[27%] relative z-10 flex flex-col justify-center gap-3 border-t lg:border-t-0 lg:border-l border-white/[0.07] group-hover:border-black/10 transition-colors duration-500">

              <div className="absolute top-5 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <line x1="0" y1="0" x2="10" y2="0" stroke="#FFD700" strokeWidth="1.5"/>
                  <line x1="0" y1="0" x2="0"  y2="10" stroke="#FFD700" strokeWidth="1.5"/>
                </svg>
              </div>

              <motion.a variants={itemVariants}
                href="tel:+919876543210"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFD700] text-black flex items-center justify-between p-4 rounded-2xl font-black group/btn"
                style={{ boxShadow: '0 8px 24px rgba(255,215,0,0.2)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-black p-2 rounded-xl">
                    <Phone size={16} className="text-[#FFD700]"/>
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] uppercase opacity-60 leading-none mb-1 tracking-widest">Call HQ</p>
                    <p className="text-sm md:text-base tracking-tight leading-none">+91 98765 43210</p>
                  </div>
                </div>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
              </motion.a>

              <motion.a variants={itemVariants}
                href="mailto:office@sanket.com"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black flex items-center justify-between p-4 rounded-2xl font-black group/btn shadow-md border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#111] p-2 rounded-xl">
                    <Mail size={16} className="text-white"/>
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] uppercase opacity-50 leading-none mb-1 tracking-widest">Email Inquiry</p>
                    <p className="text-sm md:text-base tracking-tight leading-none">urbanrise@gmail.com</p>
                  </div>
                </div>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
              </motion.a>

              <div className="mt-2 pt-4 border-t border-white/[0.06] group-hover:border-black/10 transition-colors duration-500">
                <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-black/40 transition-colors duration-500 text-center">
                  Avg. response: &lt; 2 hrs
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={11} className="text-[#FFD700]"/>
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Verified 2026</span>
          </div>
          <span className="text-gray-700">|</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse"/>
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">450+ Active Partners</span>
          </div>
          <span className="text-gray-700">|</span>
          <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">18 Yrs Experience</span>
        </motion.div>

      </div>
    </section>
  );
};

export default AnimatedCTA;