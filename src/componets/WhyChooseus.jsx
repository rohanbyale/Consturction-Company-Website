import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StructureSVG = () => (
  <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}>
    <defs>
      <style>{`
        @keyframes riseUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .rise { animation: riseUp 0.7s ease both; }
        @keyframes winFlicker  { 0%,100%{fill-opacity:.08} 50%{fill-opacity:.22} }
        @keyframes winFlicker2 { 0%,100%{fill-opacity:.10} 50%{fill-opacity:.28} }
        @keyframes spireFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes dimDash     { from{stroke-dashoffset:0} to{stroke-dashoffset:20} }
        @keyframes groundPulse { 0%,100%{stroke-opacity:.3} 50%{stroke-opacity:.7} }
        .win-a  { animation: winFlicker  2.8s ease-in-out infinite; }
        .win-b  { animation: winFlicker  3.4s ease-in-out infinite .4s; }
        .win-c  { animation: winFlicker2 2.2s ease-in-out infinite .9s; }
        .win-d  { animation: winFlicker  4.0s ease-in-out infinite 1.3s; }
        .spire-g{ animation: spireFloat  3s ease-in-out infinite; transform-origin:100px 14px; }
        .dim-ln { animation: dimDash     4s linear infinite; }
        .gnd-m  { animation: groundPulse 2s ease-in-out infinite; }
      `}</style>
    </defs>
    <line x1="10" y1="205" x2="190" y2="205" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
    <rect x="40" y="197" width="120" height="8" fill="#1a1a1a" fillOpacity="0.12" stroke="#1a1a1a" strokeWidth="1"/>
    <rect x="60" y="44" width="80" height="154" fill="#1a1a1a" fillOpacity="0.05" stroke="#1a1a1a" strokeWidth="1.5"/>
    {[66,88,110,132,154,176].map((y,i) => (
      <line key={i} x1="60" y1={y} x2="140" y2={y} stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.4"/>
    ))}
    {[0,1,2].map(col => [0,1,2,3,4,5].map(row => (
      <rect key={`${col}-${row}`}
        className={['win-a','win-b','win-c','win-d','win-a','win-b'][(col+row)%6]}
        x={66 + col*24} y={50 + row*22} width="16" height="15"
        fill="#1a1a1a" fillOpacity={0.08 + row*0.012}
        stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.5"
        style={{ animationDelay:`${(col*0.3+row*0.15).toFixed(2)}s` }}/>
    )))}
    <rect x="56" y="36" width="88" height="10" fill="#1a1a1a" fillOpacity="0.1" stroke="#1a1a1a" strokeWidth="1.2"/>
    <g className="spire-g">
      <line x1="100" y1="36" x2="100" y2="12" stroke="#1a1a1a" strokeWidth="1.5"/>
      <polygon points="100,6 96,16 104,16" fill="#1a1a1a" fillOpacity="0.7"/>
      <circle cx="100" cy="6" r="2" fill="#1a1a1a"/>
      <line x1="100" y1="22" x2="112" y2="18" stroke="#1a1a1a" strokeWidth="0.8"/>
    </g>
    <rect x="18" y="90" width="42" height="107" fill="#1a1a1a" fillOpacity="0.04" stroke="#1a1a1a" strokeWidth="1"/>
    {[0,1,2,3].map(row => [0,1].map(col => (
      <rect key={`lw-${row}-${col}`} className="win-b"
        x={23 + col*17} y={98 + row*22} width="11" height="14"
        fill="#1a1a1a" fillOpacity="0.09"
        stroke="#1a1a1a" strokeWidth="0.4" strokeOpacity="0.45"
        style={{ animationDelay:`${(row*0.2+col*0.1).toFixed(2)}s` }}/>
    )))}
    <rect x="140" y="106" width="38" height="91" fill="#1a1a1a" fillOpacity="0.04" stroke="#1a1a1a" strokeWidth="1"/>
    {[0,1,2].map(row => (
      <rect key={`rw-${row}`} className="win-c"
        x={144} y={114 + row*22} width="11" height="14"
        fill="#1a1a1a" fillOpacity="0.09"
        stroke="#1a1a1a" strokeWidth="0.4" strokeOpacity="0.4"
        style={{ animationDelay:`${(row*0.25).toFixed(2)}s` }}/>
    ))}
    <line className="dim-ln" x1="152" y1="44" x2="166" y2="44" stroke="#1a1a1a" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 3"/>
    <line className="dim-ln" x1="152" y1="197" x2="166" y2="197" stroke="#1a1a1a" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 3"/>
    <line className="dim-ln" x1="162" y1="44" x2="162" y2="197" stroke="#1a1a1a" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="2 3"/>
    <polygon points="162,44 159,52 165,52" fill="#1a1a1a" fillOpacity="0.3"/>
    <polygon points="162,197 159,189 165,189" fill="#1a1a1a" fillOpacity="0.3"/>
    <text x="170" y="125" fill="#1a1a1a" fillOpacity="0.35" fontSize="7" fontFamily="monospace" textAnchor="middle" transform="rotate(90,170,125)">48.0M</text>
    {[0,1,2,3,4].map(i => (
      <line key={i} className="gnd-m" x1={14+i*44} y1="205" x2={14+i*44} y2="211"
        stroke="#1a1a1a" strokeWidth="0.8" strokeOpacity="0.3"
        style={{ animationDelay:`${i*0.2}s` }}/>
    ))}
  </svg>
);

const FloorPlanSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}>
    <defs>
      <style>{`
        @keyframes scanLine  { 0%{transform:translateY(10px);opacity:0} 5%{opacity:.18} 95%{opacity:.18} 100%{transform:translateY(190px);opacity:0} }
        @keyframes doorSwing { 0%,100%{d:path("M80 140 A24 24 0 0 1 80 116")} 50%{d:path("M80 140 A24 24 0 0 1 56 140")} }
        @keyframes doorSwng2 { 0%,100%{d:path("M110 66 A22 22 0 0 0 132 66")} 50%{d:path("M110 66 A22 22 0 0 0 110 88")} }
        @keyframes northSpin { 0%,80%,100%{transform:rotate(0deg)} 40%{transform:rotate(20deg)} }
        @keyframes labelFade { 0%,100%{fill-opacity:.3} 50%{fill-opacity:.55} }
        @keyframes gridPls   { 0%,100%{stroke-opacity:.07} 50%{stroke-opacity:.14} }
        .scan-bar{ animation: scanLine  4s linear     infinite; }
        .door1   { animation: doorSwing 4s ease-in-out infinite; }
        .door2   { animation: doorSwng2 5s ease-in-out infinite 1s; }
        .n-arrow { animation: northSpin 6s ease-in-out infinite; transform-origin:176px 24px; }
        .rm-lbl  { animation: labelFade 3s ease-in-out infinite; }
        .g-line  { animation: gridPls   3s ease-in-out infinite; }
      `}</style>
    </defs>
    {[...Array(9)].map((_,i) => (
      <line key={`g-h-${i}`} className="g-line" x1="10" y1={30+i*19} x2="190" y2={30+i*19}
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" style={{ animationDelay:`${i*0.1}s` }}/>
    ))}
    {[...Array(9)].map((_,i) => (
      <line key={`g-v-${i}`} className="g-line" x1={10+i*20} y1="10" x2={10+i*20} y2="190"
        stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" style={{ animationDelay:`${i*0.1+0.05}s` }}/>
    ))}
    <line className="scan-bar" x1="16" y1="0" x2="184" y2="0" stroke="rgba(238,252,85,0.28)" strokeWidth="1.5"/>
    <rect x="16" y="16" width="168" height="168" stroke="rgba(255,255,255,0.75)" strokeWidth="4" fill="rgba(255,255,255,0.04)"/>
    <line x1="16" y1="90" x2="110" y2="90" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
    <line x1="110" y1="16" x2="110" y2="140" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
    <line x1="16" y1="140" x2="80" y2="140" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
    <line x1="110" y1="140" x2="184" y2="140" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
    <path className="door1" d="M80 140 A24 24 0 0 1 80 116" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" fill="none" strokeDasharray="2 2"/>
    <line x1="80" y1="140" x2="80" y2="116" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
    <path className="door2" d="M110 66 A22 22 0 0 0 132 66" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" strokeDasharray="2 2"/>
    <line x1="110" y1="66" x2="110" y2="44" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
    <text className="rm-lbl" x="60" y="58" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace" textAnchor="middle">ROOM A</text>
    <text className="rm-lbl" x="148" y="76" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace" textAnchor="middle" style={{ animationDelay:'0.5s' }}>ROOM B</text>
    <text className="rm-lbl" x="50" y="122" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace" textAnchor="middle" style={{ animationDelay:'1s' }}>ROOM C</text>
    <text className="rm-lbl" x="148" y="166" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace" textAnchor="middle" style={{ animationDelay:'1.5s' }}>ROOM D</text>
    <rect x="24" y="24" width="30" height="50" rx="2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7"/>
    <rect x="24" y="24" width="30" height="12" rx="1" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
    <rect x="120" y="28" width="40" height="26" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7"/>
    <circle cx="122" cy="30" r="2" fill="rgba(255,255,255,0.2)"/>
    <circle cx="158" cy="30" r="2" fill="rgba(255,255,255,0.2)"/>
    <circle cx="122" cy="52" r="2" fill="rgba(255,255,255,0.2)"/>
    <circle cx="158" cy="52" r="2" fill="rgba(255,255,255,0.2)"/>
    <line x1="16" y1="8" x2="184" y2="8" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
    <polygon points="16,5 16,11 12,8" fill="rgba(255,255,255,0.25)"/>
    <polygon points="184,5 184,11 188,8" fill="rgba(255,255,255,0.25)"/>
    <text x="100" y="6" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="monospace" textAnchor="middle">14.0 M</text>
    <g className="n-arrow" transform="translate(176,24)">
      <circle cx="0" cy="0" r="8" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" fill="none"/>
      <polygon points="0,-7 -3,0 3,0" fill="rgba(255,255,255,0.5)"/>
      <polygon points="0,7 -3,0 3,0" fill="rgba(255,255,255,0.15)"/>
      <text x="0" y="-10" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace" textAnchor="middle">N</text>
    </g>
  </svg>
);

const EcoHouseSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}>
    <defs>
      <style>{`
        @keyframes sunRay  { 0%,100%{stroke-opacity:.3;transform:scaleX(1)} 50%{stroke-opacity:.65;transform:scaleX(1.35)} }
        @keyframes sunGlow { 0%,100%{fill-opacity:.08} 50%{fill-opacity:.2} }
        @keyframes treeSwy { 0%,100%{transform:rotate(0deg)} 33%{transform:rotate(2.5deg)} 66%{transform:rotate(-2deg)} }
        @keyframes treeSw2 { 0%,100%{transform:rotate(0deg)} 33%{transform:rotate(-2.5deg)} 66%{transform:rotate(2deg)} }
        @keyframes solarPs { 0%,100%{fill-opacity:.12;stroke-opacity:.45} 50%{fill-opacity:.32;stroke-opacity:.75} }
        @keyframes smokeR  { 0%{transform:translateY(0) scaleX(1);opacity:.35} 100%{transform:translateY(-18px) scaleX(1.5);opacity:0} }
        @keyframes leafSp  { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(10deg) scale(1.12)} }
        .sun-c  { animation: sunGlow 3s ease-in-out infinite; transform-origin:164px 30px; }
        .sun-r  { animation: sunRay  3s ease-in-out infinite; transform-origin:164px 30px; }
        .tree-l { animation: treeSwy 4s ease-in-out infinite; transform-origin:18px 182px; }
        .tree-r { animation: treeSw2 4.5s ease-in-out infinite; transform-origin:182px 182px; }
        .solar  { animation: solarPs 2.5s ease-in-out infinite; }
        .smk1   { animation: smokeR  2.2s ease-out infinite; }
        .smk2   { animation: smokeR  2.2s ease-out infinite .7s; }
        .leaf-b { animation: leafSp  5s ease-in-out infinite; transform-origin:85px 66px; }
      `}</style>
    </defs>
    <circle className="sun-c" cx="164" cy="30" r="16" fill="#1a1a1a" fillOpacity="0.08" stroke="#1a1a1a" strokeWidth="1" strokeOpacity="0.35"/>
    {[0,45,90,135,180,225,270,315].map((deg,i) => (
      <line key={i} className="sun-r"
        x1={164+20*Math.cos(deg*Math.PI/180)} y1={30+20*Math.sin(deg*Math.PI/180)}
        x2={164+26*Math.cos(deg*Math.PI/180)} y2={30+26*Math.sin(deg*Math.PI/180)}
        stroke="#1a1a1a" strokeWidth="1" strokeOpacity="0.3"
        style={{ animationDelay:`${i*0.08}s` }}/>
    ))}
    <line x1="6" y1="182" x2="194" y2="182" stroke="#1a1a1a" strokeWidth="1.8" strokeOpacity="0.4"/>
    <rect x="38" y="92" width="124" height="90" fill="#1a1a1a" fillOpacity="0.05" stroke="#1a1a1a" strokeWidth="1.4" strokeOpacity="0.5"/>
    <polygon points="26,92 100,34 174,92" fill="#1a1a1a" fillOpacity="0.07" stroke="#1a1a1a" strokeWidth="1.5" strokeOpacity="0.55"/>
    <line x1="100" y1="34" x2="100" y2="92" stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.2"/>
    <rect x="120" y="48" width="16" height="38" fill="#1a1a1a" fillOpacity="0.07" stroke="#1a1a1a" strokeWidth="1" strokeOpacity="0.4"/>
    <rect x="116" y="44" width="24" height="7" fill="#1a1a1a" fillOpacity="0.1" stroke="#1a1a1a" strokeWidth="0.8" strokeOpacity="0.4"/>
    <ellipse className="smk1" cx="128" cy="42" rx="4" ry="3" fill="#1a1a1a" fillOpacity="0.15"/>
    <ellipse className="smk2" cx="132" cy="40" rx="3" ry="2.5" fill="#1a1a1a" fillOpacity="0.1"/>
    {[0,1,2,3].map(i => (
      <rect key={i} className="solar"
        x={50+i*14} y={58+i*8} width="12" height="8"
        fill="#1a1a1a" fillOpacity="0.12"
        stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.45"
        transform={`rotate(-35, ${56+i*14}, ${62+i*8})`}
        style={{ animationDelay:`${i*0.2}s` }}/>
    ))}
    <rect x="46" y="104" width="34" height="28" fill="#1a1a1a" fillOpacity="0.1" stroke="#1a1a1a" strokeWidth="1" strokeOpacity="0.45"/>
    <line x1="63" y1="104" x2="63" y2="132" stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.3"/>
    <line x1="46" y1="118" x2="80" y2="118" stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.3"/>
    <rect x="120" y="104" width="34" height="28" fill="#1a1a1a" fillOpacity="0.1" stroke="#1a1a1a" strokeWidth="1" strokeOpacity="0.45"/>
    <line x1="137" y1="104" x2="137" y2="132" stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.3"/>
    <line x1="120" y1="118" x2="154" y2="118" stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.3"/>
    <path d="M84 182 L84 148 Q100 134 116 148 L116 182" fill="#1a1a1a" fillOpacity="0.08" stroke="#1a1a1a" strokeWidth="1.1" strokeOpacity="0.5"/>
    <circle cx="112" cy="162" r="2" fill="#1a1a1a" fillOpacity="0.4"/>
    <g className="tree-l">
      <line x1="18" y1="182" x2="18" y2="144" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.45"/>
      <circle cx="18" cy="132" r="16" fill="#1a1a1a" fillOpacity="0.07" stroke="#1a1a1a" strokeWidth="0.8" strokeOpacity="0.35"/>
      <circle cx="18" cy="122" r="10" fill="#1a1a1a" fillOpacity="0.09" stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.3"/>
    </g>
    <g className="tree-r">
      <line x1="182" y1="182" x2="182" y2="150" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.45"/>
      <circle cx="182" cy="138" r="14" fill="#1a1a1a" fillOpacity="0.07" stroke="#1a1a1a" strokeWidth="0.8" strokeOpacity="0.35"/>
      <circle cx="182" cy="129" r="9" fill="#1a1a1a" fillOpacity="0.08" stroke="#1a1a1a" strokeWidth="0.6" strokeOpacity="0.28"/>
    </g>
    <g className="leaf-b">
      <path d="M76 70 Q82 58 94 62 Q82 74 76 70Z" fill="#1a1a1a" fillOpacity="0.25" stroke="#1a1a1a" strokeWidth="0.8" strokeOpacity="0.4"/>
      <line x1="76" y1="70" x2="84" y2="62" stroke="#1a1a1a" strokeWidth="0.7" strokeOpacity="0.3"/>
    </g>
  </svg>
);

const SafetyHelmetSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}>
    <defs>
      <style>{`
        @keyframes wireSwg { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(3.5deg)} 75%{transform:rotate(-3deg)} }
        @keyframes hookBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        @keyframes trsFlsh { 0%,100%{stroke-opacity:.18} 50%{stroke-opacity:.42} }
        @keyframes helmGlw { 0%,100%{fill-opacity:.10;stroke-opacity:.6} 50%{fill-opacity:.2;stroke-opacity:.9} }
        @keyframes badgeDr { 0%,60%,100%{stroke-dashoffset:30} 80%{stroke-dashoffset:0} }
        @keyframes stripMv { from{transform:translateX(0)} to{transform:translateX(18px)} }
        @keyframes crnrPls { 0%,100%{stroke-opacity:.25} 50%{stroke-opacity:.65} }
        .wire-g  { animation: wireSwg 3s ease-in-out infinite; transform-origin:100px 20px; }
        .hook-g  { animation: hookBob 2s ease-in-out infinite; }
        .trs-d   { animation: trsFlsh 2.5s ease-in-out infinite; }
        .helm-d  { animation: helmGlw 3s ease-in-out infinite; }
        .bdg-chk { animation: badgeDr 4s ease-in-out infinite; stroke-dasharray:30; }
        .c-strp  { animation: stripMv 1s linear infinite; }
        .crnr    { animation: crnrPls 2s ease-in-out infinite; }
      `}</style>
    </defs>
    <line x1="10" y1="20" x2="190" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="10" y1="20" x2="10" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    <line x1="190" y1="20" x2="190" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    {[0,1,2,3,4].map(i => (
      <line key={i} className="trs-d"
        x1={10+i*36} y1="20" x2={28+i*36} y2="10"
        stroke="rgba(255,255,255,0.18)" strokeWidth="0.8"
        style={{ animationDelay:`${i*0.15}s` }}/>
    ))}
    <line x1="10" y1="10" x2="190" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    <g className="wire-g">
      <line x1="100" y1="20" x2="100" y2="54" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeDasharray="3 3"/>
      <g className="hook-g">
        <path d="M100 54 Q106 54 108 60 Q110 68 104 72 Q98 76 96 70"
          stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="100" cy="54" r="3" fill="rgba(255,255,255,0.4)"/>
      </g>
    </g>
    <path className="helm-d" d="M36 130 Q36 78 100 72 Q164 78 164 130 Z"
      fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
    <rect x="26" y="128" width="148" height="14" rx="5"
      fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
    <line x1="100" y1="72" x2="100" y2="128" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="3 3"/>
    <path d="M50 128 Q68 100 100 72" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" fill="none"/>
    <path d="M150 128 Q132 100 100 72" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" fill="none"/>
    <line x1="36" y1="120" x2="164" y2="120" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
    <path d="M46 142 Q100 162 154 142" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3"/>
    <path d="M100 92 L108 96 L108 108 Q100 114 92 108 L92 96 Z"
      fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
    <path className="bdg-chk" d="M94 102 L98 106 L107 96" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
    <clipPath id="stripeClip2"><rect x="10" y="172" width="180" height="8"/></clipPath>
    <g clipPath="url(#stripeClip2)">
      <g className="c-strp">
        {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
          <rect key={i} x={-8+i*18} y="172" width="10" height="8"
            fill={i%2===0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)'}/>
        ))}
      </g>
    </g>
    <line x1="10" y1="172" x2="190" y2="172" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
    <line x1="10" y1="180" x2="190" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
    {[[10,188],[190,188]].map(([x,y],i)=>(
      <g key={i} className="crnr" style={{ animationDelay:`${i*0.5}s` }}>
        <line x1={x} y1={y} x2={x+(i===0?10:-10)} y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        <line x1={x} y1={y} x2={x} y2={y-8} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      </g>
    ))}
  </svg>
);

const features = [
  { id:'01', title:'Built to Last',   desc:'High-grade materials and proven structural systems — engineered to stand strong for generations.', bg:'#EEFC55', textDark:true,  Illustration:StructureSVG,    tag:'Structural', accentLine:'#1a1a1a' },
  { id:'02', title:'Smart Planning',  desc:'Advanced 3D tools and precision blueprints catch problems before they appear on site.',            bg:'#1A2222', textDark:false, Illustration:FloorPlanSVG,    tag:'Design',     accentLine:'#EEFC55' },
  { id:'03', title:'Eco-Friendly',    desc:'Sustainable materials, passive solar design and green architecture reduce environmental impact.',   bg:'#E6E8E3', textDark:true,  Illustration:EcoHouseSVG,     tag:'Green',      accentLine:'#1a1a1a' },
  { id:'04', title:'Safety First',    desc:'Site-certified protocols and ISO-rated processes protect every team member and every structure.',   bg:'#1A2222', textDark:false, Illustration:SafetyHelmetSVG, tag:'Certified',  accentLine:'#EEFC55' },
];

const WhyChooseUs = () => {
  return (
    <section className="relative bg-[#F5F5F3] pt-20 overflow-hidden" style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="px-6 md:px-14 mb-14">
          <div className="flex items-center gap-3 mb-6">
            
            <span className="bg-[#1a1a1a] text-[#EEFC55] px-4 py-1.5 font-mono text-[10px] tracking-[0.45em] uppercase font-bold">Why Choose Urbanrise builders</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif" }}
            className="text-[clamp(52px,4vw,84px)] font-black uppercase text-[#1a1a1a] leading-[0.88] tracking-tight">
            Quality is our<br/>
            <span className="text-transparent" style={{ WebkitTextStroke:'0.1px #1a1a1a' }}>Standard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const { Illustration, textDark, accentLine } = item;
            const tc = textDark ? '#1a1a1a' : '#ffffff';
            return (
              <motion.div key={item.id}
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay:index*0.11, duration:0.7, ease:[0.16,1,0.3,1] }}
                className="group relative flex flex-col overflow-hidden cursor-default"
                style={{ background:item.bg, minHeight:500, borderRight:'1px solid rgba(0,0,0,0.06)' }}>
                <div className="relative flex-shrink-0 overflow-hidden"
                  style={{ height:260, borderBottom:`1px solid rgba(${textDark?'0,0,0':'255,255,255'},0.08)` }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage:`radial-gradient(circle, ${textDark?'rgba(26,26,26,0.08)':'rgba(255,255,255,0.06)'} 1px, transparent 1px)`, backgroundSize:'16px 16px' }}/>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-mono text-[8px] uppercase tracking-[0.35em] font-bold px-2 py-0.5 rounded-sm"
                      style={{ color:accentLine, border:`1px solid ${accentLine}`, opacity:0.5 }}>
                      {item.tag}
                    </span>
                  </div>
                  <span className="absolute top-4 left-4 z-10 font-mono text-xs font-bold" style={{ color:tc, opacity:0.3 }}>{item.id}</span>
                  <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-700 ease-out group-hover:scale-105">
                    <Illustration/>
                  </div>
                </div>
                <div className="flex flex-col flex-1 justify-between px-8 py-8">
                  <div>
                    <h4 style={{ fontFamily:"'Bebas Neue',sans-serif", color:tc }}
                      className="text-[42px] md:text-[46px] font-black uppercase tracking-wide leading-none mb-4">
                      {item.title}
                    </h4>
                    <p className="text-[13.5px] leading-relaxed font-medium max-w-[220px]" style={{ color:tc, opacity:0.65 }}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 h-[2px] rounded-full transition-all duration-500 ease-out w-10 group-hover:w-full"
                    style={{ background:accentLine, opacity:0.4 }}/>
                </div>
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-400">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <line x1="20" y1="0" x2="20" y2="20" stroke={tc} strokeWidth="1.5"/>
                    <line x1="0" y1="20" x2="20" y2="20" stroke={tc} strokeWidth="1.5"/>
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="px-6 md:px-14 py-12 flex flex-wrap items-center justify-between gap-8 border-t border-black/[0.07]">
          <div className="flex gap-12 md:gap-20">
            {[{label:'Success Rate',val:'100%'},{label:'Certification',val:'ISO-9001'},{label:'Projects Done',val:'450+'}].map((s,i) => (
              <div key={i}>
                <span className="block font-mono text-[9px] uppercase tracking-[0.45em] text-gray-400 font-bold mb-1">{s.label}</span>
                <span className="text-[clamp(28px,4vw,40px)] font-black text-[#1a1a1a]" style={{ fontFamily:"'Bebas Neue',sans-serif" }}>{s.val}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:block opacity-25">
            <svg width="200" height="44" viewBox="0 0 200 44" fill="none">
              <polyline points="0,22 24,22 32,6 40,38 48,6 56,38 64,22 88,22 96,10 104,34 112,10 120,34 128,22 200,22"
                stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              {[[32,6],[48,6],[96,10],[112,10]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="#1a1a1a"/>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;