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
    lx: 80, ly: 540,
    ax: 260, ay: 572,
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
  const Y0 = 590;
  const bx = 240, bw = 490;
  const flH = 120; // floor height
  const numFloors = 4;
  const wallT = 18; // exterior wall thickness

  /* concrete fill — solid charcoal-grey for cut sections */
  const concFill   = "#1c2b1a";
  const concStroke = "#eefc55";
  const glassBlue  = "rgba(160,210,235,0.13)";
  const glassBright = "rgba(200,235,255,0.22)";
  const soilFill   = "#121a10";
  const groundFill = "#0e160c";

  return (
    <svg
      viewBox="0 0 980 640"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <style>{`
          @keyframes craneSwg  { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(3.5deg)} 70%{transform:rotate(-2.5deg)} }
          @keyframes hookBob   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
          @keyframes wireFlow  { from{stroke-dashoffset:0} to{stroke-dashoffset:-16} }
          @keyframes beaconBlk { 0%,100%{opacity:1} 49%{opacity:.1} }
          @keyframes workerBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
          .crane-a { animation: craneSwg  4s ease-in-out infinite; transform-origin:780px 58px; }
          .hook-g  { animation: hookBob   2.2s ease-in-out infinite; }
          .wire-f  { animation: wireFlow  2.5s linear infinite; }
          .beacon  { animation: beaconBlk 1.3s step-end infinite; }
          .wrk-bob { animation: workerBob 1.8s ease-in-out infinite; transform-origin:${bx+74}px ${Y0-5*flH-58}px; }
        `}</style>

        {/* Glows */}
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow2" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.5"/>
        </filter>

        {/* Concrete cross-hatch pattern */}
        <pattern id="concHatch" width="10" height="10" patternUnits="userSpaceOnUse">
          <line x1="0" y1="10" x2="10" y2="0" stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.09"/>
          <line x1="-2" y1="2" x2="2" y2="-2" stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.09"/>
          <line x1="8" y1="12" x2="12" y2="8" stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.09"/>
        </pattern>

        {/* Foundation soil hatch */}
        <pattern id="soilHatch" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="6" x2="12" y2="6" stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.07"/>
          <circle cx="3" cy="3" r="0.8" fill="#eefc55" fillOpacity="0.05"/>
          <circle cx="9" cy="9" r="0.8" fill="#eefc55" fillOpacity="0.05"/>
        </pattern>

        {/* Glass gradient — realistic blue tint */}
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(180,225,255)" stopOpacity="0.18"/>
          <stop offset="40%" stopColor="rgb(160,210,240)" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="rgb(100,170,220)" stopOpacity="0.04"/>
        </linearGradient>
        <linearGradient id="glassShimmer" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0.16"/>
          <stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0"/>
        </linearGradient>

        {/* Wall gradient — depth on exterior wall face */}
        <linearGradient id="wallFaceGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e2e1c" stopOpacity="1"/>
          <stop offset="100%" stopColor="#162214" stopOpacity="1"/>
        </linearGradient>

        {/* Sky gradient */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1208" stopOpacity="1"/>
          <stop offset="100%" stopColor="#060e04" stopOpacity="1"/>
        </linearGradient>

        {/* Building body gradient */}
        <linearGradient id="bldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#182616"/>
          <stop offset="50%" stopColor="#121e10"/>
          <stop offset="100%" stopColor="#0f1a0d"/>
        </linearGradient>

        {/* Lift car gradient */}
        <linearGradient id="liftGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#243820" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#1a2a18" stopOpacity="0.95"/>
        </linearGradient>

        {/* Highlight for window active */}
        <linearGradient id="winActive" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(238,252,85)" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="rgb(238,252,85)" stopOpacity="0.05"/>
        </linearGradient>
      </defs>

      {/* ── FAINT BLUEPRINT GRID ── */}
      {[...Array(20)].map((_,i) => (
        <line key={`gv${i}`} x1={i*50} y1="0" x2={i*50} y2="640"
          stroke="#eefc55" strokeWidth="0.25" strokeOpacity="0.03"/>
      ))}
      {[...Array(14)].map((_,i) => (
        <line key={`gh${i}`} x1="0" y1={i*48} x2="980" y2={i*48}
          stroke="#eefc55" strokeWidth="0.25" strokeOpacity="0.03"/>
      ))}

      {/* ── SOIL / EARTH BELOW GROUND ── */}
      <rect x="0" y={Y0} width="980" height="100" fill={soilFill}/>
      <rect x="0" y={Y0} width="980" height="100" fill="url(#soilHatch)"/>
      {/* soil layer lines */}
      <line x1="0" y1={Y0+28} x2="980" y2={Y0+28}
        stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="18 8"/>
      <line x1="0" y1={Y0+58} x2="980" y2={Y0+58}
        stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.06" strokeDasharray="18 8"/>
      <line x1="0" y1={Y0+86} x2="980" y2={Y0+86}
        stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="18 8"/>
      {/* ground gravel texture dots */}
      {[...Array(40)].map((_,i)=>(
        <circle key={i} cx={120+i*18+(i%3)*6} cy={Y0+12+(i%4)*4} r={0.8+(i%2)*0.4}
          fill="#eefc55" fillOpacity="0.05"/>
      ))}

      {/* ── GROUND LINE ── */}
      <line x1="0" y1={Y0} x2="980" y2={Y0}
        stroke="#eefc55" strokeWidth="2" strokeOpacity="0.45"/>
      {/* Ground tick marks */}
      {[...Array(24)].map((_,i) => (
        <line key={i} x1={i*42} y1={Y0} x2={i*42-10} y2={Y0+14}
          stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.15"/>
      ))}

      {/* ── BASEMENT SLAB & WALLS ── */}
      {/* Main basement fill */}
      <rect x={bx} y={Y0} width={bw} height="52"
        fill={concFill} stroke={concStroke} strokeWidth="1.2" strokeOpacity="0.35"/>
      <rect x={bx} y={Y0} width={bw} height="52"
        fill="url(#concHatch)"/>
      {/* Left wall thick section */}
      <rect x={bx} y={Y0} width={wallT} height="52"
        fill="#233420" stroke={concStroke} strokeWidth="0.7" strokeOpacity="0.4"/>
      {/* Right wall thick section */}
      <rect x={bx+bw-wallT} y={Y0} width={wallT} height="52"
        fill="#233420" stroke={concStroke} strokeWidth="0.7" strokeOpacity="0.4"/>
      {/* Waterproof membrane line */}
      <line x1={bx} y1={Y0+5} x2={bx+bw} y2={Y0+5}
        stroke="#eefc55" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 3"/>
      <line x1={bx} y1={Y0+8} x2={bx+bw} y2={Y0+8}
        stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="6 3"/>

      {/* ── FOUNDATION PILES ── */}
      {[bx+55, bx+155, bx+265, bx+365, bx+bw-155, bx+bw-55].map((px, i) => (
        <g key={i}>
          {/* pile cap */}
          <rect x={px-18} y={Y0+52} width="36" height="22"
            fill="#1e2e1c" stroke="#eefc55" strokeWidth="0.9" strokeOpacity="0.38"/>
          <rect x={px-18} y={Y0+52} width="36" height="22" fill="url(#concHatch)"/>
          {/* pile shaft */}
          <rect x={px-8} y={Y0+74} width="16" height="36"
            fill="#182816" stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.3"/>
          {/* pile rebar dots */}
          {[-4,0,4].map((dx,ri)=>(
            <circle key={ri} cx={px+dx} cy={Y0+82} r="1.5"
              fill="#eefc55" fillOpacity="0.25"/>
          ))}
          {/* pile tip ellipse */}
          <ellipse cx={px} cy={Y0+110} rx="8" ry="3"
            fill="#162214" stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.22"/>
          {/* pile depth dashes */}
          <line x1={px} y1={Y0+110} x2={px} y2={Y0+128}
            stroke="#eefc55" strokeWidth="1.2" strokeOpacity="0.18" strokeDasharray="3 2"/>
        </g>
      ))}

      {/* ── BUILDING BODY (interior) ── */}
      <rect x={bx} y={Y0-numFloors*flH-flH} width={bw} height={numFloors*flH+flH}
        fill="url(#bldGrad)"/>

      {/* ── EXTERIOR WALLS — Left ── */}
      {/* Left outer face — visible 3D-ish wall surface */}
      <rect x={bx} y={Y0-numFloors*flH-flH} width={wallT} height={numFloors*flH+flH}
        fill="#263c22" stroke="#eefc55" strokeWidth="1.2" strokeOpacity="0.45"/>
      <rect x={bx} y={Y0-numFloors*flH-flH} width={wallT} height={numFloors*flH+flH}
        fill="url(#concHatch)"/>
      {/* facade stone/concrete panel lines */}
      {[...Array(numFloors+1)].map((_,fl)=>{
        const ty = Y0-(fl+1)*flH;
        return (
          <line key={fl} x1={bx} y1={ty} x2={bx+wallT} y2={ty}
            stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.2"/>
        );
      })}

      {/* ── EXTERIOR WALLS — Right (non-core side) ── */}
      <rect x={bx+bw-wallT} y={Y0-numFloors*flH-flH} width={wallT} height={numFloors*flH+flH}
        fill="#263c22" stroke="#eefc55" strokeWidth="1.2" strokeOpacity="0.45"/>
      <rect x={bx+bw-wallT} y={Y0-numFloors*flH-flH} width={wallT} height={numFloors*flH+flH}
        fill="url(#concHatch)"/>

      {/* ── FLOOR SLABS — every floor ── */}
      {[1,2,3,4,5].map(fl => {
        const fy = Y0 - fl*flH;
        const isActive = active === "slab";
        const slabH = 14;
        return (
          <g key={fl}>
            {/* slab body — concrete section */}
            <rect x={bx} y={fy} width={bw} height={slabH}
              fill={isActive ? "#2a4226" : "#1e301c"}
              stroke="#eefc55" strokeWidth={isActive ? 1.4 : 0.9}
              strokeOpacity={isActive ? 0.85 : 0.38}
              style={{ transition:"all 0.35s" }}/>
            <rect x={bx} y={fy} width={bw} height={slabH}
              fill="url(#concHatch)"/>
            {/* soffit line (bottom of slab — visible interior edge) */}
            <line x1={bx+wallT} y1={fy+slabH} x2={bx+bw-wallT} y2={fy+slabH}
              stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.14"/>
            {/* rebar circles in section */}
            {isActive && [bx+42, bx+120, bx+200, bx+290, bx+370].map((rx,ri)=>(
              <circle key={ri} cx={rx} cy={fy+7} r="3"
                fill="none" stroke="#eefc55" strokeWidth="1" strokeOpacity="0.65"/>
            ))}
            {/* PT tendon line */}
            {isActive && (
              <line x1={bx+wallT+4} y1={fy+7} x2={bx+bw-wallT-4} y2={fy+7}
                stroke="#eefc55" strokeWidth="1" strokeOpacity="0.4"
                strokeDasharray="12 6"/>
            )}
          </g>
        );
      })}

      {/* ── STRUCTURAL COLUMNS ── */}
      {[bx+42, bx+164, bx+302, bx+bw-164, bx+bw-42].map((cx2, i) => {
        const isActive = active === "columns";
        return (
          <g key={i}>
            {/* column body — filled concrete section */}
            <rect x={cx2-16} y={Y0-numFloors*flH-flH+2} width="32" height={numFloors*flH+flH-2}
              fill={isActive ? "#2e4a2a" : "#1e321a"}
              stroke="#eefc55" strokeWidth={isActive ? 1.5 : 0.9}
              strokeOpacity={isActive ? 0.85 : 0.32}
              style={{ transition:"all 0.35s" }}/>
            <rect x={cx2-16} y={Y0-numFloors*flH-flH+2} width="32" height={numFloors*flH+flH-2}
              fill="url(#concHatch)"/>
            {/* rebar corner dots in column section */}
            {isActive && [[-10,-10],[10,-10],[-10,10],[10,10]].map(([dx,dy],ri)=>{
              const midY = Y0-numFloors*flH/2-flH/2;
              return (
                <circle key={ri} cx={cx2+dx} cy={midY+dy} r="2.5"
                  fill="none" stroke="#eefc55" strokeWidth="1" strokeOpacity="0.6"/>
              );
            })}
          </g>
        );
      })}

      {/* ── GLASS CURTAIN WALL + WINDOWS ── */}
      {[0,1,2,3].map(fl => {
        const fy = Y0 - (fl+1)*flH;
        const isWinActive  = active === "windows";
        const isFacadeActive = active === "facade";
        const isAny = isWinActive || isFacadeActive;
        return (
          <g key={fl}>
            {/* 4 glass bays per floor */}
            {[0,1,2,3].map(bay => {
              const wx = bx + wallT + 10 + bay * 86;
              const ww = 72, wh = flH - 26;
              return (
                <g key={bay}>
                  {/* aluminium frame (outer) */}
                  <rect x={wx-2} y={fy-flH+17} width={ww+4} height={wh+4}
                    fill="#1a2a18" stroke="#eefc55"
                    strokeWidth={isAny ? 1.2 : 0.7}
                    strokeOpacity={isAny ? 0.75 : 0.28}
                    style={{ transition:"all 0.35s" }}/>
                  {/* glass pane */}
                  <rect x={wx} y={fy-flH+19} width={ww} height={wh}
                    fill={isAny ? "url(#winActive)" : "url(#glassGrad)"}
                    style={{ transition:"all 0.35s" }}/>
                  {/* glass shimmer */}
                  <rect x={wx+2} y={fy-flH+19} width={ww*0.28} height={wh}
                    fill="url(#glassShimmer)" rx="1"/>
                  {/* horizontal transom */}
                  <line x1={wx} y1={fy-flH+19+wh*0.48} x2={wx+ww} y2={fy-flH+19+wh*0.48}
                    stroke="#eefc55" strokeWidth="0.8"
                    strokeOpacity={isAny ? 0.45 : 0.18}
                    style={{ transition:"all 0.35s" }}/>
                  {/* vertical mullion */}
                  <line x1={wx+ww*0.5} y1={fy-flH+19} x2={wx+ww*0.5} y2={fy-flH+19+wh}
                    stroke="#eefc55" strokeWidth="0.8"
                    strokeOpacity={isAny ? 0.4 : 0.14}
                    style={{ transition:"all 0.35s" }}/>
                </g>
              );
            })}
            {/* Spandrel panel strip above window on left */}
            <rect x={bx+wallT} y={fy-flH+14} width="8" height={flH-14}
              fill="#1c2e1a" stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.18"/>
          </g>
        );
      })}

      {/* ── BALCONIES ── */}
      {[0,1,2,3].map(fl => {
        const fy = Y0 - (fl+1)*flH;
        const isActive = active === "balcony";
        return (
          <g key={fl}>
            {/* cantilever slab */}
            <rect x={bx-74} y={fy-flH+flH-16} width="78" height="14"
              fill={isActive ? "#2a4226" : "#1e301a"}
              stroke="#eefc55" strokeWidth={isActive ? 1.3 : 0.8}
              strokeOpacity={isActive ? 0.82 : 0.32}
              style={{ transition:"all 0.35s" }}/>
            <rect x={bx-74} y={fy-flH+flH-16} width="78" height="14"
              fill="url(#concHatch)"/>
            {/* soffit drip edge */}
            <line x1={bx-74} y1={fy-flH+flH-2} x2={bx} y2={fy-flH+flH-2}
              stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.15"/>
            {/* glass balustrade */}
            <rect x={bx-74} y={fy-flH+flH-48} width="74" height="34"
              fill="rgba(160,210,235,0.07)"
              stroke="#eefc55" strokeWidth={isActive ? 1.1 : 0.6}
              strokeOpacity={isActive ? 0.7 : 0.25}
              style={{ transition:"all 0.35s" }}/>
            {/* balustrade glass shimmer */}
            <rect x={bx-72} y={fy-flH+flH-46} width="16" height="30"
              fill="url(#glassShimmer)" rx="0"/>
            {/* posts */}
            {[0,1,2,3].map(p => (
              <line key={p}
                x1={bx-68+p*20} y1={fy-flH+flH-16}
                x2={bx-68+p*20} y2={fy-flH+flH-44}
                stroke="#eefc55" strokeWidth="1.4"
                strokeOpacity={isActive ? 0.6 : 0.22}
                style={{ transition:"all 0.35s" }}/>
            ))}
            {/* handrail */}
            <line x1={bx-74} y1={fy-flH+flH-46} x2={bx-2} y2={fy-flH+flH-46}
              stroke="#eefc55" strokeWidth="1.4"
              strokeOpacity={isActive ? 0.65 : 0.25}
              style={{ transition:"all 0.35s" }}/>
          </g>
        );
      })}

      {/* ── ELEVATOR / STAIR CORE ── */}
      {(() => {
        const isActive = active === "elevator";
        const cx = bx + bw - 182, cw = 142;
        return (
          <>
            {/* core RC walls */}
            <rect x={cx} y={Y0-numFloors*flH-flH} width={cw} height={numFloors*flH+flH}
              fill={isActive ? "#243a20" : "#1a2e18"}
              stroke="#eefc55" strokeWidth={isActive ? 1.6 : 1}
              strokeOpacity={isActive ? 0.8 : 0.35}
              style={{ transition:"all 0.35s" }}/>
            <rect x={cx} y={Y0-numFloors*flH-flH} width={cw} height={numFloors*flH+flH}
              fill="url(#concHatch)"/>
            {/* Core wall label */}
            <text x={cx+cw/2} y={Y0-numFloors*flH/2-flH/2}
              fill="#eefc55" fillOpacity={isActive ? 0.55 : 0.18}
              fontSize="7" fontFamily="monospace" textAnchor="middle"
              transform={`rotate(-90, ${cx+cw/2}, ${Y0-numFloors*flH/2-flH/2})`}
              style={{ transition:"all 0.35s" }}>
              RC CORE 220mm
            </text>

            {/* Lift shaft opening */}
            <rect x={cx+8} y={Y0-numFloors*flH-flH+8} width="66" height={numFloors*flH+flH-16}
              fill="#0f180e" stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.25"/>
            {/* lift cars per floor */}
            {[0,1,2,3].map(fl => (
              <g key={fl}>
                {/* lift car box */}
                <rect x={cx+12} y={Y0-(fl+1)*flH+18} width="58" height={flH-32}
                  fill="url(#liftGrad)"
                  stroke="#eefc55" strokeWidth="0.9"
                  strokeOpacity={isActive ? 0.55 : 0.22}
                  style={{ transition:"all 0.35s" }}/>
                {/* door centre line */}
                <line x1={cx+41} y1={Y0-(fl+1)*flH+20} x2={cx+41} y2={Y0-(fl+1)*flH+flH-18}
                  stroke="#eefc55" strokeWidth="0.6" strokeOpacity={isActive ? 0.35 : 0.12}
                  style={{ transition:"all 0.35s" }}/>
                {/* floor indicator dot */}
                <circle cx={cx+58} cy={Y0-(fl+1)*flH+10} r="2.5"
                  fill="#eefc55" fillOpacity={isActive ? 0.5 : 0.15}
                  style={{ transition:"all 0.35s" }}/>
              </g>
            ))}

            {/* Staircase section */}
            <rect x={cx+78} y={Y0-numFloors*flH-flH+8} width="58" height={numFloors*flH+flH-16}
              fill="#0e160c" stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.18"/>
            {[0,1,2,3].map(fl => {
              const sy = Y0 - (fl+1)*flH;
              return (
                <g key={fl}>
                  {/* stair treads — zig-zag */}
                  <polyline
                    points={`
                      ${cx+80},${sy}
                      ${cx+80},${sy-flH+32}
                      ${cx+118},${sy-flH+32}
                      ${cx+118},${sy-flH+60}
                      ${cx+80},${sy-flH+60}
                      ${cx+80},${sy-flH}
                    `}
                    fill="none" stroke="#eefc55" strokeWidth="1"
                    strokeOpacity={isActive ? 0.55 : 0.18}
                    style={{ transition:"all 0.35s" }}/>
                  {/* tread nosings */}
                  {[0,1,2,3,4].map(t=>(
                    <line key={t}
                      x1={cx+80} y1={sy-flH+32+t*6}
                      x2={cx+118} y2={sy-flH+32+t*6}
                      stroke="#eefc55" strokeWidth="0.4"
                      strokeOpacity={isActive ? 0.3 : 0.1}
                      style={{ transition:"all 0.35s" }}/>
                  ))}
                </g>
              );
            })}
          </>
        );
      })()}

      {/* ── MEP RISER DUCT ── */}
      {(() => {
        const isActive = active === "mep";
        const mx = bx+bw-186;
        return (
          <>
            {/* duct outer */}
            <rect x={mx} y={Y0-numFloors*flH-flH+8} width="10" height={numFloors*flH+flH-16}
              fill={isActive ? "#2e4828" : "#1c2e18"}
              stroke="#eefc55" strokeWidth={isActive ? 1.6 : 0.9}
              strokeOpacity={isActive ? 0.92 : 0.45}
              style={{ transition:"all 0.35s" }}/>
            {/* duct inner (hollow) */}
            <rect x={mx+2} y={Y0-numFloors*flH-flH+10} width="6" height={numFloors*flH+flH-20}
              fill="#0a100a"
              stroke="#eefc55" strokeWidth="0.4" strokeOpacity="0.2"/>
            {/* duct segments */}
            {[1,2,3,4].map(fl=>(
              <line key={fl}
                x1={mx} y1={Y0-fl*flH}
                x2={mx+10} y2={Y0-fl*flH}
                stroke="#eefc55" strokeWidth="1"
                strokeOpacity={isActive ? 0.6 : 0.22}
                style={{ transition:"all 0.35s" }}/>
            ))}
          </>
        );
      })()}

      {/* ── ROOF SLAB + PARAPET ── */}
      {(() => {
        const ry = Y0 - (numFloors+1)*flH;
        const isActive = active === "roof";
        return (
          <>
            {/* insulation board */}
            <rect x={bx+wallT} y={ry-26} width={bw-wallT*2} height="14"
              fill={isActive ? "#263e22" : "#1a2e18"}
              stroke="#eefc55" strokeWidth="0.6"
              strokeDasharray="6 3"
              strokeOpacity={isActive ? 0.55 : 0.18}
              style={{ transition:"all 0.35s" }}/>
            {/* insulation zigzag pattern */}
            {[...Array(8)].map((_,i)=>(
              <polyline key={i}
                points={`${bx+wallT+i*54},${ry-26} ${bx+wallT+i*54+27},${ry-18} ${bx+wallT+(i+1)*54},${ry-26}`}
                fill="none" stroke="#eefc55" strokeWidth="0.5"
                strokeOpacity={isActive ? 0.28 : 0.1}
                style={{ transition:"all 0.35s" }}/>
            ))}
            {/* waterproof membrane */}
            <rect x={bx} y={ry-12} width={bw} height="10"
              fill={isActive ? "#2a4222" : "#1e3018"}
              stroke="#eefc55" strokeWidth={isActive ? 1.5 : 0.8}
              strokeOpacity={isActive ? 0.88 : 0.38}
              style={{ transition:"all 0.35s" }}/>
            <rect x={bx} y={ry-12} width={bw} height="10"
              fill="url(#concHatch)"/>
            {/* membrane lap lines */}
            {[bx+90, bx+240, bx+380, bx+520].map((lx,i)=>(
              <line key={i} x1={lx} y1={ry-12} x2={lx} y2={ry-2}
                stroke="#eefc55" strokeWidth="0.8" strokeOpacity={isActive ? 0.35 : 0.12}
                style={{ transition:"all 0.35s" }}/>
            ))}

            {/* Left parapet wall — RC */}
            <rect x={bx} y={ry-64} width={wallT+6} height="52"
              fill={isActive ? "#2e4828" : "#1e3418"}
              stroke="#eefc55" strokeWidth={isActive ? 1.5 : 1}
              strokeOpacity={isActive ? 0.85 : 0.42}
              style={{ transition:"all 0.35s" }}/>
            <rect x={bx} y={ry-64} width={wallT+6} height="52"
              fill="url(#concHatch)"/>
            {/* Right parapet wall — RC */}
            <rect x={bx+bw-wallT-6} y={ry-64} width={wallT+6} height="52"
              fill={isActive ? "#2e4828" : "#1e3418"}
              stroke="#eefc55" strokeWidth={isActive ? 1.5 : 1}
              strokeOpacity={isActive ? 0.85 : 0.42}
              style={{ transition:"all 0.35s" }}/>
            <rect x={bx+bw-wallT-6} y={ry-64} width={wallT+6} height="52"
              fill="url(#concHatch)"/>
            {/* parapet coping cap */}
            <rect x={bx-3} y={ry-68} width={wallT+12} height="6"
              fill="#2a3e26" stroke="#eefc55" strokeWidth="0.8"
              strokeOpacity={isActive ? 0.72 : 0.3}
              style={{ transition:"all 0.35s" }}/>
            <rect x={bx+bw-wallT-9} y={ry-68} width={wallT+12} height="6"
              fill="#2a3e26" stroke="#eefc55" strokeWidth="0.8"
              strokeOpacity={isActive ? 0.72 : 0.3}
              style={{ transition:"all 0.35s" }}/>
            {/* top roof line */}
            <line x1={bx} y1={ry-64} x2={bx+bw} y2={ry-64}
              stroke="#eefc55" strokeWidth={isActive ? 2 : 1.5}
              strokeOpacity={isActive ? 0.78 : 0.42}
              style={{ transition:"all 0.35s" }}/>
            {/* Roof drain stub */}
            <circle cx={bx+bw/2} cy={ry-8} r="5"
              fill="#0a100a" stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.3"/>
            <circle cx={bx+bw/2} cy={ry-8} r="2.5"
              fill="#eefc55" fillOpacity="0.12"/>
          </>
        );
      })()}

      {/* ── BUILDING OUTLINE (drawn on top) ── */}
      <rect x={bx} y={Y0-(numFloors+1)*flH-68} width={bw} height={(numFloors+1)*flH+68}
        fill="none" stroke="#eefc55" strokeWidth="1.8" strokeOpacity="0.42"/>

      {/* ── TOWER CRANE ── */}
      {/* mast */}
      <rect x="766" y="58" width="16" height={Y0-58}
        fill="#1a281a" stroke="#eefc55" strokeWidth="1" strokeOpacity="0.38"/>
      {/* mast diagonal bracing */}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={i}
          x1={i%2===0 ? 766 : 782} y1={66+i*58}
          x2={i%2===0 ? 782 : 766} y2={66+(i+1)*58}
          stroke="#eefc55" strokeWidth="0.7" strokeOpacity="0.2"/>
      ))}
      {/* crane cab */}
      <rect x="761" y="34" width="22" height="18"
        fill="#1e3018" stroke="#eefc55" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="764" y="37" width="8" height="10"
        fill="rgba(160,210,235,0.14)" stroke="#eefc55" strokeWidth="0.5" strokeOpacity="0.35"/>
      <g className="crane-a">
        {/* jib (main boom) */}
        <line x1="774" y1="58" x2="928" y2="58"
          stroke="#eefc55" strokeWidth="2.8" strokeLinecap="round" strokeOpacity="0.55"/>
        {/* counter-jib */}
        <line x1="774" y1="58" x2="654" y2="58"
          stroke="#eefc55" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.38"/>
        {/* counter weight */}
        <rect x="638" y="55" width="18" height="14"
          fill="#243c20" stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.45"/>
        {/* stay cables */}
        {[830,872,916].map((x,i) => (
          <line key={i} x1="774" y1="40" x2={x} y2="58"
            stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.22"/>
        ))}
        <line x1="774" y1="40" x2="664" y2="58"
          stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.18"/>
        {/* trolley */}
        <rect x="858" y="55" width="14" height="8"
          fill="#243c1e" stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.45"/>
        {/* beacon */}
        <circle className="beacon" cx="774" cy="32" r="4"
          fill="#eefc55" filter="url(#glow)"/>
        {/* hook assembly */}
        <g className="hook-g">
          <line className="wire-f"
            x1="865" y1="63" x2="865" y2="142"
            stroke="#eefc55" strokeWidth="1.2" strokeOpacity="0.42"
            strokeDasharray="4 4"/>
          {/* hook */}
          <path d="M865 142 Q872 142 874 150 Q876 160 870 164 Q864 168 862 160"
            fill="none" stroke="#eefc55" strokeWidth="2.2"
            strokeOpacity="0.55" strokeLinecap="round"/>
          {/* load block */}
          <rect x="852" y="164" width="30" height="20"
            fill="#1e3018" stroke="#eefc55" strokeWidth="1" strokeOpacity="0.42"/>
          <line x1="858" y1="167" x2="858" y2="182"
            stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.3"/>
          <line x1="867" y1="167" x2="867" y2="182"
            stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.3"/>
          <line x1="876" y1="167" x2="876" y2="182"
            stroke="#eefc55" strokeWidth="0.6" strokeOpacity="0.3"/>
        </g>
      </g>

      {/* ── WORKER ON ROOF ── */}
      <g className="wrk-bob">
        {/* legs */}
        <rect x={bx+70} y={Y0-(numFloors+1)*flH-80} width="5" height="12"
          fill="#eefc55" fillOpacity="0.5"/>
        <rect x={bx+79} y={Y0-(numFloors+1)*flH-80} width="5" height="12"
          fill="#eefc55" fillOpacity="0.5"/>
        {/* body — hi-vis vest */}
        <rect x={bx+68} y={Y0-(numFloors+1)*flH-94} width="17" height="16"
          fill="#eefc55" fillOpacity="0.58"/>
        {/* head */}
        <ellipse cx={bx+76} cy={Y0-(numFloors+1)*flH-100} rx="6" ry="5.5"
          fill="#eefc55" fillOpacity="0.5"/>
        {/* hard hat */}
        <path d={`M${bx+69} ${Y0-(numFloors+1)*flH-102} Q${bx+76} ${Y0-(numFloors+1)*flH-112} ${bx+83} ${Y0-(numFloors+1)*flH-102}`}
          fill="#eefc55" fillOpacity="0.72"/>
        {/* arm holding clipboard */}
        <line x1={bx+85} y1={Y0-(numFloors+1)*flH-90}
              x2={bx+95} y2={Y0-(numFloors+1)*flH-86}
          stroke="#eefc55" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round"/>
        {/* clipboard */}
        <rect x={bx+93} y={Y0-(numFloors+1)*flH-92} width="8" height="10"
          fill="#162414" stroke="#eefc55" strokeWidth="0.8" strokeOpacity="0.45"/>
      </g>

      {/* ── ACTIVE HIGHLIGHT DOTS ── */}
      {ANNOTATIONS.map(a => {
        const isActive = active === a.id;
        return isActive ? (
          <g key={a.id}>
            <circle cx={a.ax} cy={a.ay} r="8"
              fill="#eefc55" fillOpacity="0.12" filter="url(#glow2)"/>
            <circle cx={a.ax} cy={a.ay} r="5"
              fill="#eefc55" fillOpacity="0.9" filter="url(#glow)"/>
            <circle cx={a.ax} cy={a.ay} r="12"
              fill="none" stroke="#eefc55" strokeWidth="1.2" strokeOpacity="0.5"
              style={{ animation:"ringPop 2s ease-out infinite" }}/>
          </g>
        ) : (
          <circle key={a.id}
            cx={a.ax} cy={a.ay} r="3.5"
            fill="#eefc55" fillOpacity="0.28"/>
        );
      })}

      {/* ── LEADER LINES & ARROWHEADS ── */}
      {ANNOTATIONS.map((a) => {
        const isActive = active === a.id;
        const elbowX = a.side === "left" ? a.lx + 130 : a.lx - 80;
        return (
          <g key={a.id} opacity={isActive ? 1 : 0.3}
            style={{ transition:"opacity 0.3s" }}>
            <polyline
              points={`${a.lx + (a.side==="left"?90:-90)},${a.ly} ${elbowX},${a.ly} ${a.ax},${a.ay}`}
              fill="none"
              stroke="#eefc55"
              strokeWidth={isActive ? 1.5 : 0.8}
              strokeDasharray={isActive ? "none" : "4 3"}
              strokeOpacity={isActive ? 1 : 0.55}
              style={{ transition:"all 0.3s" }}/>
            <polygon
              points={`${a.ax},${a.ay} ${a.ax+(a.side==="left"?-10:10)},${a.ay-5} ${a.ax+(a.side==="left"?-10:10)},${a.ay+5}`}
              fill="#eefc55"
              fillOpacity={isActive ? 1 : 0.45}
              style={{ transition:"all 0.3s" }}/>
          </g>
        );
      })}

      {/* ── DIMENSION LINES ── */}
      {[0,1,2,3].map(fl => (
        <g key={fl} opacity="0.18">
          <line x1={bx+bw+14} y1={Y0-(fl)*flH}     x2={bx+bw+28} y2={Y0-(fl)*flH}
            stroke="#eefc55" strokeWidth="0.5" strokeDasharray="2 3"/>
          <line x1={bx+bw+14} y1={Y0-(fl+1)*flH}   x2={bx+bw+28} y2={Y0-(fl+1)*flH}
            stroke="#eefc55" strokeWidth="0.5" strokeDasharray="2 3"/>
          <line x1={bx+bw+22} y1={Y0-(fl)*flH}     x2={bx+bw+22} y2={Y0-(fl+1)*flH}
            stroke="#eefc55" strokeWidth="0.6"/>
          <polygon points={`${bx+bw+22},${Y0-fl*flH} ${bx+bw+19},${Y0-fl*flH-8} ${bx+bw+25},${Y0-fl*flH-8}`}
            fill="#eefc55" fillOpacity="0.5"/>
          <polygon points={`${bx+bw+22},${Y0-(fl+1)*flH} ${bx+bw+19},${Y0-(fl+1)*flH+8} ${bx+bw+25},${Y0-(fl+1)*flH+8}`}
            fill="#eefc55" fillOpacity="0.5"/>
          <text x={bx+bw+38} y={Y0-fl*flH-56}
            fill="#eefc55" fillOpacity="0.42"
            fontSize="8" fontFamily="'Share Tech Mono',monospace"
            transform={`rotate(90,${bx+bw+38},${Y0-fl*flH-56})`}>
            3.6 M
          </text>
        </g>
      ))}

      <style>{`@keyframes ringPop { 0%{r:12;opacity:.55} 100%{r:28;opacity:0} }`}</style>
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
          : "rgba(10,18,6,0.78)",
        border: `1px solid ${isActive ? "rgba(238,252,85,0.65)" : "rgba(238,252,85,0.14)"}`,
        backdropFilter: "blur(8px)",
        padding: "8px 12px",
        transition: "all 0.25s ease",
        boxShadow: isActive ? "0 0 22px rgba(238,252,85,0.14)" : "none",
      }}
    >
      <div style={{
        position:"absolute", top:0, left:0,
        width: isActive ? "100%" : "28px", height:"2px",
        background:"#eefc55",
        transition:"width 0.4s ease",
      }}/>
      <div style={{
        fontFamily:"'Share Tech Mono', monospace",
        fontSize: 9, letterSpacing:"0.3em",
        color:"#eefc55", opacity: 0.5,
        textTransform:"uppercase", marginBottom: 3,
      }}>
        {ann.spec}
      </div>
      <div style={{
        fontFamily:"'Bebas Neue', sans-serif",
        fontSize: 16,
        color: isActive ? "#eefc55" : "#e8f5d0",
        lineHeight: 1, marginBottom: 5, letterSpacing:"0.05em",
      }}>
        {ann.label}
      </div>
      <div style={{
        fontFamily:"'Share Tech Mono', monospace",
        fontSize: 8.5, color:"rgba(238,252,85,0.45)",
        lineHeight: 1.5, whiteSpace:"pre-line",
        display: isActive ? "block" : "none",
      }}>
        {ann.sub}
      </div>
      <div style={{
        position:"absolute", top: "50%", transform:"translateY(-50%)",
        [ann.side === "left" ? "right" : "left"]: -5,
        width: 8, height: 8, borderRadius:"50%",
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

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const t = setInterval(() => {
      if (active) return;
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
          <div style={{ height:1, width:32, background:"#eefc55" }}/>
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
            fontSize:"clamp(38px,5vw,68px)",
            color:"#f0fde0", lineHeight:0.88,
            textTransform:"uppercase", letterSpacing:"0.02em", margin:0,
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
        maxWidth:980, height:660,
      }}>
        <BuildingSVG active={active} onHover={setActive}/>
        {ANNOTATIONS.map((a, i) => (
          <LabelCard
            key={a.id} ann={a} active={active}
            onHover={setActive} index={i} visible={visible}
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
          margin:"0 48px", padding:"20px 0",
          display:"flex", gap:48, flexWrap:"wrap",
          alignItems:"center", justifyContent:"space-between",
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
        <svg width="160" height="36" viewBox="0 0 160 36" fill="none" style={{ opacity:0.2 }}>
          <polyline
            points="0,18 18,18 26,4 34,32 42,4 50,32 58,18 80,18 88,8 96,28 104,8 112,28 120,18 160,18"
            stroke="#eefc55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {[[26,4],[42,4],[88,8],[104,8]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#eefc55"/>
          ))}
        </svg>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=DM+Sans:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}