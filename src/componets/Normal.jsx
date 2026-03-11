import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   CONSTRUCTION ANATOMY PAGE
   A fully annotated building cross-section.
   Leader lines draw in, then labels fade in sequentially.
   Hovering a label highlights its arrow and pulses the target.
═══════════════════════════════════════════════════════════ */

const ANNOTATIONS = [
  {
    id: "foundation",
    label: "Deep Foundation",
    sub: "Reinforced concrete pile-cap system\n1200mm bored piles @ 4m depth",
    spec: "M40 Grade Concrete",
    // arrow: from label anchor → to building point
    lx: 80, ly: 540,   // label center
    ax: 260, ay: 572,  // arrowhead tip on building
    side: "left",
  },
  {
    id: "columns",
    label: "Structural Columns",
    sub: "RCC columns 500×500mm\nFe-500 TMT rebar cage",
    spec: "2% Steel Ratio",
    lx: 68, ly: 430,
    ax: 230, ay: 470,
    side: "left",
  },
  {
    id: "slab",
    label: "Floor Slab",
    sub: "150mm flat-plate slab\nPost-tensioned tendons",
    spec: "PT Slab System",
    lx: 68, ly: 318,
    ax: 228, ay: 360,
    side: "left",
  },
  {
    id: "facade",
    label: "Curtain Wall Façade",
    sub: "Double-glazed unitised panels\n6mm+12Ar+6mm Low-E glass",
    spec: "U-Value: 1.4 W/m²K",
    lx: 68, ly: 210,
    ax: 240, ay: 240,
    side: "left",
  },
  {
    id: "roof",
    label: "Flat Roof + Parapet",
    sub: "Waterproof membrane + insulation\n300mm RC parapet wall",
    spec: "4-ply Torch-on System",
    lx: 68, ly: 104,
    ax: 268, ay: 128,
    side: "left",
  },
  {
    id: "elevator",
    label: "Elevator Core",
    sub: "220mm shear-wall RC core\nPRES staircase & lift shaft",
    spec: "Seismic Zone III",
    lx: 940, ly: 200,
    ax: 700, ay: 230,
    side: "right",
  },
  {
    id: "windows",
    label: "Operable Windows",
    sub: "Aluminium tilt-turn system\n1200×1500mm units, triple seal",
    spec: "AAMA 2605 Finish",
    lx: 960, ly: 310,
    ax: 720, ay: 330,
    side: "right",
  },
  {
    id: "balcony",
    label: "Cantilever Balcony",
    sub: "Thermally broken slab extension\nGlass balustrade 12mm toughened",
    spec: "1200mm projection",
    lx: 960, ly: 410,
    ax: 730, ay: 420,
    side: "right",
  },
  {
    id: "mep",
    label: "MEP Services Riser",
    sub: "Electrical, plumbing & HVAC\nVertical duct shaft 900×600mm",
    spec: "Fire-rated 2 Hr",
    lx: 960, ly: 490,
    ax: 726, ay: 488,
    side: "right",
  },
  {
    id: "basement",
    label: "Basement Retaining Wall",
    sub: "300mm RC basement wall\nWaterproof render + drainage board",
    spec: "BS8102 Type C",
    lx: 960, ly: 572,
    ax: 740, ay: 560,
    side: "right",
  },
];

/* ─── SVG building cross-section ─── */
const BuildingSVG = ({ active, onHover }) => {
  const Y0 = 590; // ground y
  const floors = [0, 1, 2, 3]; // 4 floors above ground
  const bx = 240, bw = 490; // building x, width

  return (
    <svg
      viewBox="0 0 980 640"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <style>{`
          @keyframes winFlick  { 0%,100%{fill-opacity:.12} 50%{fill-opacity:.28} }
          @keyframes craneSwg  { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(4deg)} 70%{transform:rotate(-3deg)} }
          @keyframes hookBob   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
          @keyframes wireFlow  { from{stroke-dashoffset:0} to{stroke-dashoffset:-16} }
          @keyframes smokeRise { 0%{transform:translateY(0) scale(1);opacity:.5} 100%{transform:translateY(-20px) scale(2);opacity:0} }
          @keyframes beaconBlk { 0%,100%{opacity:1} 49%{opacity:.1} }
          @keyframes dotPulse  { 0%,100%{r:4;opacity:.6} 50%{r:7;opacity:1} }
          @keyframes scanH     { from{transform:translateX(-60px)} to{transform:translateX(600px)} }
          @keyframes workerBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
          @keyframes groundPls { 0%,100%{stroke-opacity:.3} 50%{stroke-opacity:.65} }
          .win-f    { animation: winFlick   3s ease-in-out infinite; }
          .crane-a  { animation: craneSwg   4s ease-in-out infinite; transform-origin:780px 60px; }
          .hook-g   { animation: hookBob    2.2s ease-in-out infinite; }
          .wire-f   { animation: wireFlow   2.5s linear     infinite; }
          .smoke-a  { animation: smokeRise  2.6s ease-out   infinite; }
          .smoke-b  { animation: smokeRise  2.6s ease-out   infinite .9s; }
          .beacon   { animation: beaconBlk  1.3s step-end   infinite; }
          .dot-p    { animation: dotPulse   2s   ease-in-out infinite; }
          .scan-ln  { animation: scanH      5s   linear     infinite; }
          .wrk-bob  { animation: workerBob  1.8s ease-in-out infinite; }
          .gnd-pls  { animation: groundPls  2s   ease-in-out infinite; }
        `}</style>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow2" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="bldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a1a" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0d1a0d" stopOpacity="0.95"/>
        </linearGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eefc55" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#eefc55" stopOpacity="0.02"/>
        </linearGradient>
        <pattern id="crosshatch" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0,8 L8,0 M-1,1 L1,-1 M7,9 L9,7"
            stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.06"/>
        </pattern>
        <clipPath id="bldClip">
          <rect x={bx} y="90" width={bw} height={Y0 - 90}/>
        </clipPath>
      </defs>

      {/* ── BACKGROUND grid ── */}
      {[...Array(20)].map((_,i) => (
        <line key={`gv${i}`} x1={i*50} y1="0" x2={i*50} y2="640"
          stroke="#eefc55" strokeWidth="0.3" strokeOpacity="0.04"/>
      ))}
      {[...Array(14)].map((_,i) => (
        <line key={`gh${i}`} x1="0" y1={i*48} x2="980" y2={i*48}
          stroke="#eefc55" strokeWidth="0.3" strokeOpacity="0.04"/>
      ))}

      {/* ── SCAN LINE ── */}
      <clipPath id="scanClip"><rect x={bx} y="90" width={bw} height={Y0-90}/></clipPath>
      <g clipPath="url(#scanClip)">
        <line className="scan-ln" x1="0" y1="400" x2="60" y2="400"
          stroke="#eefc55" strokeWidth="1" strokeOpacity="0.15"/>
      </g>

      {/* ── GROUND ── */}
      <line className="gnd-pls" x1="0" y1={Y0} x2="980" y2={Y0}
        stroke="#eefc55" strokeWidth="1.5" strokeOpacity="0.3"/>
      {[...Array(25)].map((_,i) => (
        <line key={i} x1={i*40} y1={Y0} x2={i*40-8} y2={Y0+10}
          stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.1"/>
      ))}

      {/* ── BASEMENT ── */}
      <rect x={bx} y={Y0} width={bw} height="50"
        fill="url(#crosshatch)" stroke="#eefc55" strokeWidth="1"
        strokeOpacity="0.25"/>
      {/* basement wall highlight */}
      <rect x={bx} y={Y0} width="12" height="50"
        fill="#eefc55" fillOpacity="0.06"/>
      <rect x={bx+bw-12} y={Y0} width="12" height="50"
        fill="#eefc55" fillOpacity="0.06"/>
      {/* waterproof layer indicator */}
      <line x1={bx} y1={Y0+4} x2={bx+bw} y2={Y0+4}
        stroke="#eefc55" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 3"/>

      {/* ── FOUNDATION PILES ── */}
      {[bx+60, bx+160, bx+260, bx+360, bx+bw-160, bx+bw-60].map((px, i) => (
        <g key={i}>
          <rect x={px-10} y={Y0+50} width="20" height="30"
            fill="#eefc55" fillOpacity="0.08"
            stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.3"/>
          <line x1={px} y1={Y0+80} x2={px} y2={Y0+90}
            stroke="#eefc55" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="3 2"/>
          <ellipse cx={px} cy={Y0+90} rx="12" ry="4"
            fill="#eefc55" fillOpacity="0.06" stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.2"/>
        </g>
      ))}

      {/* ── MAIN BUILDING BODY ── */}
      <rect x={bx} y="90" width={bw} height={Y0-90}
        fill="url(#bldGrad)" stroke="#eefc55" strokeWidth="1.5" strokeOpacity="0.5"/>

      {/* ── FLOOR SLABS (4 floors + roof) ── */}
      {[0,1,2,3,4].map(fl => {
        const fy = Y0 - (fl+1)*120;
        const isActive = active === "slab";
        return (
          <g key={fl}>
            <rect x={bx} y={fy} width={bw} height="10"
              fill="#eefc55"
              fillOpacity={isActive ? 0.25 : 0.1}
              stroke="#eefc55" strokeWidth="0.9"
              strokeOpacity={isActive ? 0.8 : 0.4}
              style={{ transition:"all 0.3s" }}/>
            {/* rebar hint inside slab */}
            {[0,1,2,3,4,5,6,7,8].map(rb => (
              <line key={rb}
                x1={bx+30+rb*56} y1={fy+3} x2={bx+30+rb*56} y2={fy+7}
                stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.25"/>
            ))}
          </g>
        );
      })}

      {/* ── COLUMNS ── */}
      {[bx+40, bx+160, bx+300, bx+bw-160, bx+bw-40].map((cx2, i) => {
        const isActive = active === "columns";
        return (
          <rect key={i} x={cx2-14} y="100" width="28" height={Y0-100}
            fill="#eefc55" fillOpacity={isActive ? 0.2 : 0.07}
            stroke="#eefc55" strokeWidth="1"
            strokeOpacity={isActive ? 0.7 : 0.3}
            style={{ transition:"all 0.3s" }}/>
        );
      })}

      {/* ── ELEVATOR / STAIR CORE ── */}
      {(() => {
        const isActive = active === "elevator";
        return (
          <>
            <rect x={bx+bw-180} y="100" width="140" height={Y0-100}
              fill="#eefc55" fillOpacity={isActive ? 0.15 : 0.05}
              stroke="#eefc55" strokeWidth={isActive ? 1.5 : 0.9}
              strokeOpacity={isActive ? 0.7 : 0.3}
              strokeDasharray={isActive ? "none" : "4 3"}
              style={{ transition:"all 0.3s" }}/>
            {/* lift car */}
            {[0,1,2,3].map(fl => (
              <rect key={fl}
                x={bx+bw-165} y={Y0-(fl+1)*120+16}
                width="50" height="70"
                fill="#eefc55" fillOpacity="0.07"
                stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.3"/>
            ))}
            {/* stair zig */}
            {[0,1,2,3].map(fl => (
              <polyline key={fl}
                points={`${bx+bw-105},${Y0-(fl)*120} ${bx+bw-105},${Y0-(fl+1)*120+80} ${bx+bw-60},${Y0-(fl+1)*120+80} ${bx+bw-60},${Y0-(fl+1)*120+40} ${bx+bw-105},${Y0-(fl+1)*120+40}`}
                fill="none" stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.25"/>
            ))}
          </>
        );
      })()}

      {/* ── MEP RISER DUCT ── */}
      {(() => {
        const isActive = active === "mep";
        return (
          <rect x={bx+bw-185} y="100" width="8" height={Y0-100}
            fill="#eefc55" fillOpacity={isActive ? 0.3 : 0.1}
            stroke="#eefc55" strokeWidth={isActive ? 1.5 : 0.7}
            strokeOpacity={isActive ? 0.9 : 0.5}
            style={{ transition:"all 0.3s" }}/>
        );
      })()}

      {/* ── CURTAIN WALL / WINDOWS per floor ── */}
      {[0,1,2,3].map(fl => {
        const fy = Y0 - (fl+1)*120;
        const isWinActive = active === "windows";
        const isFacadeActive = active === "facade";
        return (
          <g key={fl}>
            {/* Glass bays */}
            {[0,1,2,3].map(bay => {
              const wx = bx + 55 + bay * 90;
              return (
                <g key={bay}>
                  {/* main glass pane */}
                  <rect
                    x={wx} y={fy+14} width="72" height="90"
                    fill="url(#glassGrad)"
                    fillOpacity={isWinActive || isFacadeActive ? 0.5 : 1}
                    stroke="#eefc55"
                    strokeWidth={isWinActive || isFacadeActive ? 1.2 : 0.6}
                    strokeOpacity={isWinActive || isFacadeActive ? 0.8 : 0.3}
                    className="win-f"
                    style={{ animationDelay:`${(fl*0.3+bay*0.15).toFixed(2)}s`,
                             transition:"stroke-width 0.3s, stroke-opacity 0.3s" }}/>
                  {/* frame divider */}
                  <line x1={wx+36} y1={fy+14} x2={wx+36} y2={fy+104}
                    stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.2"/>
                  <line x1={wx} y1={fy+60} x2={wx+72} y2={fy+60}
                    stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.15"/>
                  {/* glass shimmer */}
                  <rect x={wx+2} y={fy+16} width="6" height="40"
                    fill="#eefc55" fillOpacity="0.06" rx="1"/>
                </g>
              );
            })}
            {/* Facade panel between windows */}
            <rect x={bx} y={fy+12} width="50" height="92"
              fill="#eefc55" fillOpacity={isFacadeActive ? 0.15 : 0.04}
              stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.2"
              style={{ transition:"all 0.3s" }}/>
          </g>
        );
      })}

      {/* ── BALCONIES ── */}
      {[0,1,2,3].map(fl => {
        const fy = Y0 - (fl+1)*120;
        const isActive = active === "balcony";
        return (
          <g key={fl}>
            {/* slab extension */}
            <rect x={bx-70} y={fy+8} width="75" height="8"
              fill="#eefc55" fillOpacity={isActive ? 0.3 : 0.1}
              stroke="#eefc55" strokeWidth={isActive ? 1.2 : 0.7}
              strokeOpacity={isActive ? 0.8 : 0.35}
              style={{ transition:"all 0.3s" }}/>
            {/* glass balustrade */}
            <rect x={bx-70} y={fy-24} width="73" height="34"
              fill="#eefc55" fillOpacity="0.05"
              stroke="#eefc55" strokeWidth="0.7" strokeOpacity={isActive ? 0.6 : 0.25}
              style={{ transition:"all 0.3s" }}/>
            {/* balustrade posts */}
            {[0,1,2,3].map(p => (
              <line key={p}
                x1={bx-65+p*18} y1={fy+8} x2={bx-65+p*18} y2={fy-18}
                stroke="#eefc55" strokeWidth="0.9"
                strokeOpacity={isActive ? 0.5 : 0.2}
                style={{ transition:"all 0.3s" }}/>
            ))}
          </g>
        );
      })}

      {/* ── ROOF PARAPET ── */}
      {(() => {
        const ry = Y0 - 5*120;
        const isActive = active === "roof";
        return (
          <>
            {/* waterproof membrane */}
            <rect x={bx} y={ry-6} width={bw} height="6"
              fill="#eefc55" fillOpacity={isActive ? 0.3 : 0.1}
              stroke="#eefc55" strokeWidth="0.6" strokeOpacity={isActive ? 0.8 : 0.3}
              style={{ transition:"all 0.3s" }}/>
            {/* insulation layer hint */}
            <rect x={bx+4} y={ry-16} width={bw-8} height="10"
              fill="#eefc55" fillOpacity={isActive ? 0.12 : 0.04}
              stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.2"
              strokeDasharray="5 3" style={{ transition:"all 0.3s" }}/>
            {/* parapet walls */}
            <rect x={bx} y={ry-52} width="22" height="46"
              fill="#eefc55" fillOpacity={isActive ? 0.2 : 0.08}
              stroke="#eefc55" strokeWidth={isActive ? 1.2 : 0.8}
              strokeOpacity={isActive ? 0.8 : 0.4}
              style={{ transition:"all 0.3s" }}/>
            <rect x={bx+bw-22} y={ry-52} width="22" height="46"
              fill="#eefc55" fillOpacity={isActive ? 0.2 : 0.08}
              stroke="#eefc55" strokeWidth={isActive ? 1.2 : 0.8}
              strokeOpacity={isActive ? 0.8 : 0.4}
              style={{ transition:"all 0.3s" }}/>
            {/* roof top line */}
            <line x1={bx} y1={ry-52} x2={bx+bw} y2={ry-52}
              stroke="#eefc55" strokeWidth="1.5" strokeOpacity={isActive ? 0.7 : 0.35}
              style={{ transition:"all 0.3s" }}/>
          </>
        );
      })()}

      {/* ── CRANE ── */}
      <rect x="768" y="60" width="14" height={Y0-60}
        fill="#eefc55" fillOpacity="0.05"
        stroke="#eefc55" strokeWidth="1" strokeOpacity="0.35"/>
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={i}
          x1={i%2===0 ? 768 : 782} y1={70+i*58}
          x2={i%2===0 ? 782 : 768} y2={70+(i+1)*58}
          stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.18"/>
      ))}
      <g className="crane-a">
        <line x1="775" y1="60" x2="920" y2="60"
          stroke="#eefc55" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6"/>
        <line x1="775" y1="60" x2="660" y2="60"
          stroke="#eefc55" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4"/>
        <rect x="646" y="55" width="16" height="12"
          fill="#eefc55" fillOpacity="0.15" stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.4"/>
        {[820,860,900].map((x,i) => (
          <line key={i} x1="775" y1="44" x2={x} y2="60"
            stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.25"/>
        ))}
        <line x1="775" y1="44" x2="668" y2="60"
          stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.2"/>
        <rect x="767" y="36" width="16" height="14"
          fill="#eefc55" fillOpacity="0.1"
          stroke="#eefc55" strokeWidth="0.9" strokeOpacity="0.5"/>
        <circle className="beacon" cx="775" cy="33" r="3"
          fill="#eefc55" filter="url(#glow)"/>
        <g className="hook-g">
          <rect x="847" y="56" width="12" height="8"
            fill="#eefc55" fillOpacity="0.15"
            stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.4"/>
          <line className="wire-f"
            x1="853" y1="64" x2="853" y2="140"
            stroke="#eefc55" strokeWidth="1" strokeOpacity="0.4"
            strokeDasharray="4 4"/>
          <path d="M853 140 Q860 140 862 148 Q864 158 858 162 Q852 166 850 158"
            fill="none" stroke="#eefc55" strokeWidth="1.8"
            strokeOpacity="0.55" strokeLinecap="round"/>
          <circle cx="853" cy="140" r="2.5"
            fill="#eefc55" fillOpacity="0.4" filter="url(#glow)"/>
          {/* hanging load */}
          <rect x="840" y="162" width="26" height="18"
            fill="#eefc55" fillOpacity="0.1"
            stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.4"/>
          {/* concrete bag lines */}
          <line x1="845" y1="165" x2="845" y2="178"
            stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.3"/>
          <line x1="853" y1="165" x2="853" y2="178"
            stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.3"/>
          <line x1="861" y1="165" x2="861" y2="178"
            stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.3"/>
        </g>
      </g>

      {/* ── WORKER ON ROOF ── */}
      <g className="wrk-bob" style={{ transformOrigin:`${bx+80}px ${Y0-5*120-52}px` }}>
        <rect x={bx+68} y={Y0-5*120-70} width="7" height="12"
          fill="#eefc55" fillOpacity="0.55"/>
        <path d={`M${bx+65} ${Y0-5*120-58} Q${bx+71} ${Y0-5*120-52} ${bx+78} ${Y0-5*120-58}`}
          fill="#eefc55" fillOpacity="0.4" stroke="none"/>
        <ellipse cx={bx+71} cy={Y0-5*120-73} rx="5" ry="4"
          fill="#eefc55" fillOpacity="0.5"/>
        {/* hard hat */}
        <path d={`M${bx+65} ${Y0-5*120-74} Q${bx+71} ${Y0-5*120-82} ${bx+77} ${Y0-5*120-74}`}
          fill="#eefc55" fillOpacity="0.7"/>
      </g>

      {/* ── ACTIVE HIGHLIGHT DOT on building ── */}
      {ANNOTATIONS.map(a => {
        const isActive = active === a.id;
        return isActive ? (
          <circle key={a.id} className="dot-p"
            cx={a.ax} cy={a.ay} r="5"
            fill="#eefc55" fillOpacity="0.9"
            filter="url(#glow2)"/>
        ) : (
          <circle key={a.id}
            cx={a.ax} cy={a.ay} r="3"
            fill="#eefc55" fillOpacity="0.3"/>
        );
      })}

      {/* ── LEADER LINES & ARROWHEADS ── */}
      {ANNOTATIONS.map((a, i) => {
        const isActive = active === a.id;
        const elbowX = a.side === "left" ? a.lx + 130 : a.lx - 80;
        return (
          <g key={a.id} opacity={isActive ? 1 : 0.35}
            style={{ transition:"opacity 0.3s" }}>
            {/* elbow leader: label → elbow → building point */}
            <polyline
              points={`${a.lx + (a.side==="left"?90:-90)},${a.ly} ${elbowX},${a.ly} ${a.ax},${a.ay}`}
              fill="none"
              stroke="#eefc55"
              strokeWidth={isActive ? 1.4 : 0.8}
              strokeDasharray={isActive ? "none" : "4 3"}
              strokeOpacity={isActive ? 1 : 0.5}
              style={{ transition:"all 0.3s" }}/>
            {/* arrowhead at building point */}
            <polygon
              points={`${a.ax},${a.ay} ${a.ax+(a.side==="left"?-9:9)},${a.ay-5} ${a.ax+(a.side==="left"?-9:9)},${a.ay+5}`}
              fill="#eefc55"
              fillOpacity={isActive ? 1 : 0.5}
              style={{ transition:"all 0.3s" }}/>
          </g>
        );
      })}

      {/* ── DIMENSION ARROWS (right side) ── */}
      {[0,1,2,3].map(fl => (
        <g key={fl} opacity="0.2">
          <line x1={bx+bw+12} y1={Y0-(fl)*120} x2={bx+bw+28} y2={Y0-(fl)*120}
            stroke="#eefc55" strokeWidth="0.5" strokeDasharray="2 3"/>
          <line x1={bx+bw+12} y1={Y0-(fl+1)*120} x2={bx+bw+28} y2={Y0-(fl+1)*120}
            stroke="#eefc55" strokeWidth="0.5" strokeDasharray="2 3"/>
          <line x1={bx+bw+22} y1={Y0-(fl)*120} x2={bx+bw+22} y2={Y0-(fl+1)*120}
            stroke="#eefc55" strokeWidth="0.5"/>
          <polygon points={`${bx+bw+22},${Y0-fl*120} ${bx+bw+19},${Y0-fl*120-8} ${bx+bw+25},${Y0-fl*120-8}`}
            fill="#eefc55" fillOpacity="0.5"/>
          <polygon points={`${bx+bw+22},${Y0-(fl+1)*120} ${bx+bw+19},${Y0-(fl+1)*120+8} ${bx+bw+25},${Y0-(fl+1)*120+8}`}
            fill="#eefc55" fillOpacity="0.5"/>
          <text x={bx+bw+36} y={Y0-fl*120-54}
            fill="#eefc55" fillOpacity="0.45"
            fontSize="8" fontFamily="monospace"
            transform={`rotate(90,${bx+bw+36},${Y0-fl*120-54})`}>
            3.6 M
          </text>
        </g>
      ))}

    </svg>
  );
};

/* ─── Annotation Label Card ─── */
const LabelCard = ({ ann, active, onHover, index, visible }) => {
  const isActive = active === ann.id;
  return (
    <motion.div
      initial={{ opacity: 0, x: ann.side === "left" ? -20 : 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : (ann.side === "left" ? -20 : 20) }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      onMouseEnter={() => onHover(ann.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: "absolute",
        left: ann.side === "left" ? 8 : "auto",
        right: ann.side === "right" ? 8 : "auto",
        top: ann.ly - 36,
        width: 168,
        cursor: "pointer",
        background: isActive
          ? "rgba(238,252,85,0.12)"
          : "rgba(10,18,6,0.75)",
        border: `1px solid ${isActive ? "rgba(238,252,85,0.7)" : "rgba(238,252,85,0.15)"}`,
        backdropFilter: "blur(8px)",
        padding: "8px 12px",
        transition: "all 0.25s ease",
        boxShadow: isActive ? "0 0 20px rgba(238,252,85,0.15)" : "none",
      }}
    >
      {/* top accent bar */}
      <div style={{
        position:"absolute", top:0, left:0,
        width: isActive ? "100%" : "28px", height:"2px",
        background:"#eefc55",
        transition:"width 0.4s ease",
      }}/>

      <div style={{
        fontFamily:"'Share Tech Mono', monospace",
        fontSize: 9,
        letterSpacing:"0.3em",
        color:"#eefc55",
        opacity: 0.5,
        textTransform:"uppercase",
        marginBottom: 3,
      }}>
        {ann.spec}
      </div>
      <div style={{
        fontFamily:"'Bebas Neue', sans-serif",
        fontSize: 16,
        color: isActive ? "#eefc55" : "#e8f5d0",
        lineHeight: 1,
        marginBottom: 5,
        letterSpacing:"0.05em",
      }}>
        {ann.label}
      </div>
      <div style={{
        fontFamily:"'Share Tech Mono', monospace",
        fontSize: 8.5,
        color:"rgba(238,252,85,0.45)",
        lineHeight: 1.5,
        whiteSpace:"pre-line",
        display: isActive ? "block" : "none",
      }}>
        {ann.sub}
      </div>

      {/* connector dot */}
      <div style={{
        position:"absolute",
        top: "50%", transform:"translateY(-50%)",
        [ann.side === "left" ? "right" : "left"]: -5,
        width: 8, height: 8,
        borderRadius:"50%",
        background: isActive ? "#eefc55" : "rgba(238,252,85,0.3)",
        border:"1.5px solid #eefc55",
        boxShadow: isActive ? "0 0 10px rgba(238,252,85,0.6)" : "none",
        transition:"all 0.3s",
      }}/>
    </motion.div>
  );
};

/* ─── MAIN PAGE ─── */
export default function ConstructionAnnotated() {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // auto-cycle through annotations for demo
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const t = setInterval(() => {
      if (active) return; // stop cycling if user is hovering
      setActive(ANNOTATIONS[i % ANNOTATIONS.length].id);
      i++;
    }, 2200);
    return () => clearInterval(t);
  }, [visible, active]);

  return (
    <section
      ref={ref}
      style={{
        background: "#060e04",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* bg gradient glow */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 70% 60% at 50% 80%, rgba(238,252,85,0.04) 0%, transparent 70%)",
      }}/>

      {/* ── HEADER ── */}
      <div style={{ padding:"40px 48px 0", position:"relative", zIndex:10 }}>
        <motion.div
          initial={{ opacity:0, y:-14 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -14 }}
          transition={{ duration:0.7 }}
          style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}
        >
          
          <span style={{
            fontFamily:"'Share Tech Mono', monospace",
            fontSize:9, letterSpacing:"0.45em",
            color:"#eefc55", textTransform:"uppercase", fontWeight:700, opacity:0.6,
          }}>
            Technical Drawing — REF: SD-001
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity:0, y:12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
          transition={{ duration:0.8, delay:0.15 }}
          style={{
            fontFamily:"'Bebas Neue', sans-serif",
            fontSize:"clamp(38px,4vw,68px)",
            color:"#f0fde0",
            lineHeight:0.88,
            textTransform:"uppercase",
            letterSpacing:"0.02em",
            margin:0,
          }}
        >
          Building Anatomy<br/>
          <span style={{ color:"transparent", WebkitTextStroke:"1px rgba(238,252,85,0.4)" }}>
            Construction Detail
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity: visible ? 0.45 : 0 }}
          transition={{ duration:0.7, delay:0.3 }}
          style={{
            fontFamily:"'Share Tech Mono', monospace",
            fontSize:11, color:"#eefc55",
            marginTop:10, letterSpacing:"0.12em",
          }}
        >
          Hover any annotation to inspect structural details ↓
        </motion.p>
      </div>

      {/* ── DIAGRAM AREA ── */}
      <div style={{
        position:"relative",
        margin:"24px auto 0",
        maxWidth:980,
        height:660,
      }}>

        {/* SVG building */}
        <BuildingSVG active={active} onHover={setActive}/>

        {/* Annotation label cards — absolutely positioned over SVG */}
        {ANNOTATIONS.map((a, i) => (
          <LabelCard
            key={a.id}
            ann={a}
            active={active}
            onHover={setActive}
            index={i}
            visible={visible}
          />
        ))}

      </div>

      {/* ── BOTTOM STATS BAR ── */}
      <motion.div
        initial={{ opacity:0, y:16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration:0.7, delay:1.2 }}
        style={{
          borderTop:"1px solid rgba(238,252,85,0.1)",
          margin:"0 48px",
          padding:"20px 0",
          display:"flex",
          gap:48,
          flexWrap:"wrap",
          alignItems:"center",
          justifyContent:"space-between",
        }}
      >
        <div style={{ display:"flex", gap:40 }}>
          {[
            { l:"Total Floors", v:"G+4" },
            { l:"Floor Height", v:"3.6 M" },
            { l:"Total Height", v:"19.8 M" },
            { l:"Plot Area", v:"620 m²" },
            { l:"BUA / Floor", v:"490 m²" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily:"'Share Tech Mono', monospace",
                fontSize:8, letterSpacing:"0.4em",
                color:"#eefc55", opacity:0.4,
                textTransform:"uppercase", marginBottom:4,
              }}>{s.l}</div>
              <div style={{
                fontFamily:"'Bebas Neue', sans-serif",
                fontSize:26, color:"#f0fde0", lineHeight:1,
              }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* waveform decoration */}
        <svg width="160" height="36" viewBox="0 0 160 36" fill="none" style={{ opacity:0.2 }}>
          <polyline
            points="0,18 18,18 26,4 34,32 42,4 50,32 58,18 80,18 88,8 96,28 104,8 112,28 120,18 160,18"
            stroke="#eefc55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {[[26,4],[42,4],[88,8],[104,8]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#eefc55"/>
          ))}
        </svg>
      </motion.div>

      {/* font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=DM+Sans:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}