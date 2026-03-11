import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   CONSTRUCTION ANATOMY — SCROLL DRIVEN
   • Uses window/page scroll (no inner scroll div)
   • Each scene uses a UNIQUE accent color to highlight that part
   • Right-side info panel slides in per scene
   • Building dims to grey, only active zone stays colored
   • Leader lines draw in animated per scene
═══════════════════════════════════════════════════════════════ */

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=DM+Sans:wght@300;400;600&display=swap');`;

const SCENE_COLORS = {
  overview:   { main:"#EEFC55", dim:"rgba(238,252,85,"  },
  exterior:   { main:"#EEFC55", dim:"rgba(238,252,85,"  },
  foundation: { main:"#FF6B35", dim:"rgba(255,107,53,"  },
  structure:  { main:"#00D4FF", dim:"rgba(0,212,255,"   },
  mep:        { main:"#FF3CAC", dim:"rgba(255,60,172,"  },
  facade:     { main:"#7FFF00", dim:"rgba(127,255,0,"   },
  roof:       { main:"#FFD700", dim:"rgba(255,215,0,"   },
};

const SCENES = [
  {
    id:"overview",
    label:"OVERVIEW",
    title:"Sanket Construction",
    subtitle:"Master Site Plan · Pusad, MH · 2026",
    viewBox:"0 0 1000 640",
    info:{
      category:"Project Overview",
      stats:[
        {l:"Project Type",v:"G+4 Residential"},
        {l:"Total Height",v:"19.8 M"},
        {l:"Plot Area",   v:"620 m²"},
        {l:"BUA / Floor", v:"490 m²"},
        {l:"Structure",   v:"RCC Frame"},
        {l:"Location",    v:"Pusad, MH"},
      ],
      desc:"A modern residential complex engineered with deep structural integrity, passive solar design, and precision curtain-wall systems.",
    },
  },
  {
    id:"exterior",
    label:"ELEVATION",
    title:"Building Exterior",
    subtitle:"East Elevation · G+4 · 24.0M Width",
    viewBox:"160 30 660 580",
    info:{
      category:"Elevation Detail",
      stats:[
        {l:"Floor Height", v:"3.6 M"},
        {l:"Floors",       v:"G + 4"},
        {l:"Facade",       v:"Unitised CW"},
        {l:"Balconies",    v:"4 Levels"},
        {l:"Crane Reach",  v:"28.0 M"},
        {l:"Status",       v:"Under Const."},
      ],
      desc:"East-facing primary elevation with cantilevered balconies and full-height curtain wall. Crane positioned for material hoisting.",
    },
  },
  {
    id:"foundation",
    label:"FOUNDATION",
    title:"Deep Foundation",
    subtitle:"Bored Piles · M40 Grade · 4.0m Depth",
    viewBox:"190 490 630 175",
    info:{
      category:"Substructure",
      stats:[
        {l:"Pile Type",  v:"Bored Cast-in-situ"},
        {l:"Pile Dia.",  v:"1200 mm"},
        {l:"Pile Depth", v:"4.0 M"},
        {l:"Pile Cap",   v:"M40 Concrete"},
        {l:"Wall Thk.",  v:"300 mm RC"},
        {l:"Waterproof", v:"BS 8102 Type C"},
      ],
      desc:"Deep bored piles transfer structural loads to bearing strata. Pile caps distribute column loads across pile groups efficiently.",
    },
  },
  {
    id:"structure",
    label:"STRUCTURE",
    title:"Structural Frame",
    subtitle:"RCC Columns · PT Slabs · Shear Core",
    viewBox:"190 185 640 355",
    info:{
      category:"Superstructure",
      stats:[
        {l:"Column Size", v:"500 × 500 mm"},
        {l:"Steel Grade", v:"Fe-500 TMT"},
        {l:"Slab System", v:"Post-Tensioned"},
        {l:"Slab Thk.",   v:"150 mm"},
        {l:"Core Wall",   v:"220 mm RC"},
        {l:"Seismic",     v:"Zone III"},
      ],
      desc:"Post-tensioned flat-plate slabs span between RCC columns, minimising structural depth. Shear core resists all lateral loads.",
    },
  },
  {
    id:"mep",
    label:"SERVICES",
    title:"MEP Services",
    subtitle:"Electrical · Plumbing · HVAC Risers",
    viewBox:"548 90 245 480",
    info:{
      category:"Building Services",
      stats:[
        {l:"Lift Car",    v:"1100×1400mm"},
        {l:"Stair Width", v:"1200mm Clear"},
        {l:"Riser Size",  v:"900×600mm"},
        {l:"Fire Rating", v:"2 Hours"},
        {l:"Core Wall",   v:"220mm RC"},
        {l:"Standard",    v:"NBC 2016"},
      ],
      desc:"MEP risers, lift shaft and escape staircase are housed within the fire-rated RC shear core for safety and space efficiency.",
    },
  },
  {
    id:"facade",
    label:"FAÇADE",
    title:"Curtain Wall Façade",
    subtitle:"Double-Glazed Unitised · Low-E Glass",
    viewBox:"145 148 335 420",
    info:{
      category:"Envelope System",
      stats:[
        {l:"System",      v:"Unitised CW"},
        {l:"Glazing",     v:"6+12Ar+6 Low-E"},
        {l:"U-Value",     v:"1.4 W/m²K"},
        {l:"Frame",       v:"Alu. AAMA 2605"},
        {l:"Balcony",     v:"1200mm Cantilever"},
        {l:"Balustrade",  v:"12mm Toughened"},
      ],
      desc:"Thermally-broken aluminium unitised curtain wall panels with argon-filled double glazing reduce solar heat gain by 38%.",
    },
  },
  {
    id:"roof",
    label:"ROOF",
    title:"Roof & Parapet",
    subtitle:"Torch-on Membrane · EPS Insulation · RC Parapet",
    viewBox:"185 18 640 195",
    info:{
      category:"Roof System",
      stats:[
        {l:"Membrane",   v:"4-Ply Torch-on"},
        {l:"Insulation", v:"75mm EPS Board"},
        {l:"Parapet Ht.",v:"900 mm"},
        {l:"Parapet Thk",v:"300 mm RC"},
        {l:"Standard",   v:"IS 3067 Grade"},
        {l:"Live Load",  v:"1.5 kN/m²"},
      ],
      desc:"Four-ply torch-applied waterproof membrane over EPS insulation board ensures long-term weatherproofing and thermal performance.",
    },
  },
];

const ANNOTATIONS = {
  exterior:[
    {x:796,y:120,dir:"left", text:"Crane Beacon",      sub:"Active Construction"},
    {x:820,y:320,dir:"right",text:"Height 19.8M",      sub:"G + 4 Floors"},
    {x:218,y:330,dir:"left", text:"Balcony Level",     sub:"1200mm Cantilever"},
  ],
  foundation:[
    {x:295,y:528,dir:"left", text:"Pile Cap",          sub:"M40 Grade Concrete"},
    {x:500,y:558,dir:"right",text:"Bored Pile 1200mm", sub:"4.0m into Strata"},
    {x:710,y:515,dir:"right",text:"Retaining Wall",    sub:"300mm RC + Wprf."},
  ],
  structure:[
    {x:250,y:252,dir:"left", text:"RCC Column",        sub:"500×500mm Fe-500"},
    {x:490,y:242,dir:"right",text:"PT Floor Slab",     sub:"150mm Post-Tensioned"},
    {x:724,y:298,dir:"right",text:"Shear Core",        sub:"220mm RC Wall"},
    {x:252,y:395,dir:"left", text:"Floor Rebar",       sub:"Fe-500 TMT Cage"},
  ],
  mep:[
    {x:602,y:148,dir:"right",text:"Lift Shaft",        sub:"1100×1400mm Car"},
    {x:608,y:318,dir:"right",text:"Escape Stair",      sub:"1200mm Clear Width"},
    {x:600,y:472,dir:"right",text:"MEP Riser Duct",    sub:"900×600mm Fire-Rated"},
  ],
  facade:[
    {x:252,y:188,dir:"left", text:"Unitised Panel",    sub:"U-Value 1.4 W/m²K"},
    {x:255,y:318,dir:"left", text:"Tilt-Turn Window",  sub:"AAMA 2605 Aluminium"},
    {x:222,y:428,dir:"left", text:"Cantilever Balcony",sub:"1200mm Projection"},
    {x:248,y:508,dir:"left", text:"Glass Balustrade",  sub:"12mm Toughened"},
  ],
  roof:[
    {x:302,y:62, dir:"left", text:"RC Parapet 900mm",  sub:"300mm Thick Wall"},
    {x:492,y:52, dir:"right",text:"Torch-on Membrane", sub:"4-Ply Waterproofing"},
    {x:694,y:68, dir:"right",text:"EPS Insulation",    sub:"75mm Board"},
  ],
};

/* ═══ BUILDING SVG ═══ */
function BuildingSVG({ sceneId, C, annOp }) {
  const Y0=590,bx=220,bw=540,flH=90;
  const cols=[bx+36,bx+160,bx+280,bx+400,bx+bw-36];
  const A=C.main;
  const CA=(o)=>C.dim+o+")";
  const isOv=sceneId==="overview"||sceneId==="exterior";
  const isFn=sceneId==="foundation";
  const isSt=sceneId==="structure";
  const isMp=sceneId==="mep";
  const isFc=sceneId==="facade";
  const isRf=sceneId==="roof";
  const dim=(active,base)=>active?base:base*0.22;
  const T=".5s";

  return (
    <>
      {/* SKYLINE */}
      {[[20,310,82,280],[110,230,62,360],[28,288,32,302]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h}
          fill="rgba(238,252,85,.018)" stroke="rgba(238,252,85,.1)" strokeWidth=".6"/>
      ))}
      {[[820,290,92,300],[918,190,68,400],[858,355,52,235]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h}
          fill="rgba(238,252,85,.018)" stroke="rgba(238,252,85,.1)" strokeWidth=".6"/>
      ))}
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x={15+i*195} y={375+i%3*38} width={34+i*4} height={215-i*18}
          fill="rgba(238,252,85,.008)" stroke="rgba(238,252,85,.06)" strokeWidth=".4"/>
      ))}

      {/* GROUND */}
      <line x1="0" y1={Y0} x2="1000" y2={Y0} stroke="rgba(238,252,85,.35)" strokeWidth="1.6"/>
      {[...Array(26)].map((_,i)=>(
        <line key={i} x1={i*40} y1={Y0} x2={i*40-7} y2={Y0+10}
          stroke="rgba(238,252,85,.1)" strokeWidth=".6"/>
      ))}

      {/* BASEMENT */}
      <rect x={bx} y={Y0} width={bw} height="52"
        fill={isFn?CA(.09):"rgba(238,252,85,.035)"}
        stroke={isFn?A:"rgba(238,252,85,1)"}
        strokeWidth={isFn?1.4:.8} strokeOpacity={isFn?1:.25}
        style={{transition:T}}/>
      {[...Array(13)].map((_,i)=>(
        <line key={i} x1={bx+i*42} y1={Y0} x2={bx+i*42-14} y2={Y0+52}
          stroke={isFn?A:"rgba(238,252,85,1)"}
          strokeWidth=".4" strokeOpacity={isFn?.2:.06}
          style={{transition:T}}/>
      ))}
      <line x1={bx} y1={Y0+5} x2={bx+bw} y2={Y0+5}
        stroke={isFn?A:"rgba(238,252,85,1)"}
        strokeWidth="1.2" strokeOpacity={isFn?.75:.35}
        strokeDasharray="6 3" style={{transition:T}}/>
      <rect x={bx} y={Y0} width="17" height="52"
        fill={isFn?CA(.25):"rgba(238,252,85,.1)"}
        style={{transition:T}}/>
      <rect x={bx+bw-17} y={Y0} width="17" height="52"
        fill={isFn?CA(.25):"rgba(238,252,85,.1)"}
        style={{transition:T}}/>

      {/* PILES */}
      {[bx+60,bx+160,bx+280,bx+400,bx+bw-60].map((px,i)=>(
        <g key={i}>
          <rect x={px-12} y={Y0+52} width="24" height="32"
            fill={isFn?CA(.15):"rgba(238,252,85,.04)"}
            stroke={isFn?A:"rgba(238,252,85,1)"}
            strokeWidth={isFn?1.2:.5} strokeOpacity={isFn?1:.18}
            style={{transition:T}}/>
          <line x1={px} y1={Y0+84} x2={px} y2={Y0+106}
            stroke={isFn?A:"rgba(238,252,85,1)"}
            strokeWidth="1.6" strokeOpacity={isFn?.6:.12}
            strokeDasharray="3 2" style={{transition:T}}/>
          <ellipse cx={px} cy={Y0+107} rx="15" ry="5"
            fill={isFn?CA(.12):"rgba(238,252,85,.04)"}
            stroke={isFn?A:"rgba(238,252,85,1)"}
            strokeWidth={isFn?.8:.4} strokeOpacity={isFn?.65:.14}
            style={{transition:T}}/>
        </g>
      ))}

      {/* MAIN BODY */}
      <rect x={bx} y={Y0-5*flH} width={bw} height={5*flH}
        fill="rgba(8,18,6,.65)" stroke="rgba(238,252,85,.5)" strokeWidth="1.8"/>

      {/* FLOOR SLABS */}
      {[1,2,3,4,5].map(fl=>{
        const fy=Y0-fl*flH;
        return (
          <g key={fl}>
            <rect x={bx} y={fy-10} width={bw} height="10"
              fill={isSt?CA(.24):"rgba(238,252,85,.1)"}
              stroke={isSt?A:"rgba(238,252,85,1)"}
              strokeWidth={isSt?1.5:.7} strokeOpacity={isSt?1:.35}
              style={{transition:T}}/>
            {isSt&&[...Array(10)].map((_,r)=>(
              <circle key={r} cx={bx+28+r*52} cy={fy-5} r="2"
                fill={A} fillOpacity=".55"/>
            ))}
          </g>
        );
      })}

      {/* COLUMNS */}
      {cols.map((cx2,i)=>(
        <rect key={i} x={cx2-15} y={Y0-5*flH-2} width="30" height={5*flH+2}
          fill={isSt?CA(.2):"rgba(238,252,85,.08)"}
          stroke={isSt?A:"rgba(238,252,85,1)"}
          strokeWidth={isSt?1.7:.8} strokeOpacity={isSt?1:.28}
          style={{transition:T}}/>
      ))}

      {/* SHEAR CORE */}
      <rect x={bx+bw-182} y={Y0-5*flH} width="142" height={5*flH}
        fill={isMp?CA(.12):isSt?CA(.1):"rgba(238,252,85,.04)"}
        stroke={isMp?A:isSt?A:"rgba(238,252,85,1)"}
        strokeWidth={isMp||isSt?1.7:.8}
        strokeOpacity={isMp||isSt?1:.28}
        style={{transition:T}}/>
      {[1,2,3,4].map(fl=>(
        <rect key={fl}
          x={bx+bw-174} y={Y0-fl*flH+16} width="54" height="56"
          fill={isMp?CA(.12):"rgba(238,252,85,.04)"}
          stroke={isMp?A:"rgba(238,252,85,1)"}
          strokeWidth={isMp?.9:.5} strokeOpacity={isMp?.75:.22}
          style={{transition:T}}/>
      ))}
      {[1,2,3,4].map(fl=>(
        <polyline key={fl}
          points={`${bx+bw-112},${Y0-(fl-1)*flH} ${bx+bw-112},${Y0-fl*flH+62} ${bx+bw-56},${Y0-fl*flH+62} ${bx+bw-56},${Y0-fl*flH+30} ${bx+bw-112},${Y0-fl*flH+30}`}
          fill="none"
          stroke={isMp?A:"rgba(238,252,85,1)"}
          strokeWidth={isMp?1:.5} strokeOpacity={isMp?.65:.17}
          style={{transition:T}}/>
      ))}

      {/* MEP RISER */}
      <rect x={bx+bw-187} y={Y0-5*flH} width="9" height={5*flH}
        fill={isMp?CA(.38):"rgba(238,252,85,.1)"}
        stroke={isMp?A:"rgba(238,252,85,1)"}
        strokeWidth={isMp?1.5:.6} strokeOpacity={isMp?1:.4}
        style={{transition:T}}/>
      {isMp&&[1,2,3,4].map(fl=>(
        <rect key={fl}
          x={bx+bw-186} y={Y0-fl*flH+10}
          width="7" height={flH-22}
          fill={CA(.18)} stroke={A} strokeWidth=".5" strokeOpacity=".5"/>
      ))}

      {/* FACADE WINDOWS */}
      {[1,2,3,4].map(fl=>{
        const fy=Y0-fl*flH;
        return [0,1,2,3].map(bay=>{
          const wx=bx+50+bay*100;
          return (
            <g key={`${fl}-${bay}`}>
              <rect x={wx} y={fy-flH+14} width="82" height={flH-26}
                fill={isFc?CA(.16):"rgba(238,252,85,.06)"}
                stroke={isFc?A:"rgba(238,252,85,1)"}
                strokeWidth={isFc?1.3:.5} strokeOpacity={isFc?1:.28}
                className="win-f"
                style={{animationDelay:`${(fl*.25+bay*.12).toFixed(2)}s`,transition:T}}/>
              <line x1={wx+41} y1={fy-flH+14} x2={wx+41} y2={fy-28}
                stroke={isFc?A:"rgba(238,252,85,1)"}
                strokeWidth=".4" strokeOpacity={isFc?.4:.12}/>
              <line x1={wx} y1={fy-flH+flH/2} x2={wx+82} y2={fy-flH+flH/2}
                stroke={isFc?A:"rgba(238,252,85,1)"}
                strokeWidth=".3" strokeOpacity={isFc?.3:.1}/>
              {isFc&&<rect x={wx+3} y={fy-flH+16} width="8" height="30"
                fill={A} fillOpacity=".08" rx="1"/>}
            </g>
          );
        });
      })}

      {/* BALCONIES */}
      {[1,2,3,4].map(fl=>{
        const fy=Y0-fl*flH;
        return (
          <g key={fl}>
            <rect x={bx-68} y={fy-10} width="72" height="10"
              fill={isFc?CA(.2):"rgba(238,252,85,.08)"}
              stroke={isFc?A:"rgba(238,252,85,1)"}
              strokeWidth={isFc?1.3:.6} strokeOpacity={isFc?1:.3}
              style={{transition:T}}/>
            <rect x={bx-68} y={fy-44} width="70" height="36"
              fill={isFc?CA(.07):"rgba(238,252,85,.03)"}
              stroke={isFc?A:"rgba(238,252,85,1)"}
              strokeWidth={isFc?.9:.5} strokeOpacity={isFc?.7:.22}
              style={{transition:T}}/>
            {[0,1,2,3].map(p=>(
              <line key={p}
                x1={bx-62+p*17} y1={fy-10} x2={bx-62+p*17} y2={fy-40}
                stroke={isFc?A:"rgba(238,252,85,1)"}
                strokeWidth="1" strokeOpacity={isFc?.62:.18}
                style={{transition:T}}/>
            ))}
          </g>
        );
      })}

      {/* ROOF */}
      {(()=>{
        const ry=Y0-5*flH;
        return (
          <>
            <rect x={bx} y={ry-9} width={bw} height="9"
              fill={isRf?CA(.28):"rgba(238,252,85,.09)"}
              stroke={isRf?A:"rgba(238,252,85,1)"}
              strokeWidth={isRf?1.8:.7} strokeOpacity={isRf?1:.32}
              style={{transition:T}}/>
            <rect x={bx+5} y={ry-21} width={bw-10} height="12"
              fill={isRf?CA(.12):"rgba(238,252,85,.04)"}
              stroke={isRf?A:"rgba(238,252,85,1)"}
              strokeWidth=".5" strokeDasharray="5 3"
              strokeOpacity={isRf?.55:.15}
              style={{transition:T}}/>
            {isRf&&[...Array(16)].map((_,i)=>(
              <rect key={i} x={bx+8+i*32} y={ry-20} width="28" height="10"
                fill={CA(.07)} stroke={A} strokeWidth=".3" strokeOpacity=".35"/>
            ))}
            {[bx,bx+bw-26].map((rx,i)=>(
              <rect key={i} x={rx} y={ry-57} width="26" height="48"
                fill={isRf?CA(.2):"rgba(238,252,85,.07)"}
                stroke={isRf?A:"rgba(238,252,85,1)"}
                strokeWidth={isRf?1.5:.8} strokeOpacity={isRf?1:.35}
                style={{transition:T}}/>
            ))}
            <line x1={bx} y1={ry-57} x2={bx+bw} y2={ry-57}
              stroke={isRf?A:"rgba(238,252,85,1)"}
              strokeWidth={isRf?2.2:1.4} strokeOpacity={isRf?1:.45}
              style={{transition:T}}/>
          </>
        );
      })()}

      {/* CRANE */}
      <rect x="790" y="52" width="13" height={Y0-52}
        fill="rgba(238,252,85,.04)" stroke="rgba(238,252,85,.3)" strokeWidth=".9"/>
      {[0,1,2,3,4,5,6,7].map(i=>(
        <line key={i}
          x1={i%2===0?790:803} y1={62+i*64}
          x2={i%2===0?803:790} y2={62+(i+1)*64}
          stroke="rgba(238,252,85,.15)" strokeWidth=".5"/>
      ))}
      <g className="crane-a">
        <line x1="796" y1="52" x2="942" y2="52" stroke="rgba(238,252,85,.6)" strokeWidth="2.4" strokeLinecap="round"/>
        <line x1="796" y1="52" x2="672" y2="52" stroke="rgba(238,252,85,.4)" strokeWidth="1.7" strokeLinecap="round"/>
        <rect x="659" y="47" width="15" height="11" fill="rgba(238,252,85,.14)" stroke="rgba(238,252,85,.4)" strokeWidth=".7"/>
        {[842,882,930].map((x,i)=>(
          <line key={i} x1="796" y1="38" x2={x} y2="52" stroke="rgba(238,252,85,.2)" strokeWidth=".6"/>
        ))}
        <line x1="796" y1="38" x2="677" y2="52" stroke="rgba(238,252,85,.18)" strokeWidth=".6"/>
        <rect x="787" y="30" width="18" height="14" fill="rgba(238,252,85,.1)" stroke="rgba(238,252,85,.5)" strokeWidth=".9"/>
        <circle className="beacon" cx="796" cy="27" r="3" fill="#EEFC55" filter="url(#yglow)"/>
        <g className="hook-g">
          <rect x="870" y="48" width="11" height="7" fill="rgba(238,252,85,.14)" stroke="rgba(238,252,85,.4)" strokeWidth=".6"/>
          <line className="wire-f" x1="875" y1="55" x2="875" y2="128"
            stroke="rgba(238,252,85,.4)" strokeWidth="1" strokeDasharray="4 4"/>
          <path d="M875 128 Q882 128 884 136 Q886 146 880 150 Q874 154 872 146"
            fill="none" stroke="rgba(238,252,85,.55)" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="875" cy="128" r="2.5" fill="rgba(238,252,85,.4)" filter="url(#yglow)"/>
          <rect x="862" y="150" width="26" height="15"
            fill="rgba(238,252,85,.1)" stroke="rgba(238,252,85,.4)" strokeWidth=".7"/>
        </g>
      </g>

      {/* WORKER */}
      <g className="wrk-bob">
        <rect x={bx+82} y={Y0-5*flH-68} width="8" height="14" fill="#EEFC55" fillOpacity=".5"/>
        <ellipse cx={bx+86} cy={Y0-5*flH-74} rx="5" ry="5" fill="#EEFC55" fillOpacity=".5"/>
        <path d={`M${bx+80} ${Y0-5*flH-76} Q${bx+86} ${Y0-5*flH-84} ${bx+92} ${Y0-5*flH-76}`}
          fill="#EEFC55" fillOpacity=".68"/>
        <line x1={bx+94} y1={Y0-5*flH-64} x2={bx+104} y2={Y0-5*flH-60}
          stroke="#EEFC55" strokeWidth="1.8" strokeOpacity=".5" strokeLinecap="round"/>
      </g>

      {/* DIMENSION LINES */}
      {[0,1,2,3,4].map(fl=>(
        <g key={fl} opacity=".14">
          <line x1={bx+bw+12} y1={Y0-fl*flH} x2={bx+bw+24} y2={Y0-fl*flH}
            stroke="#EEFC55" strokeWidth=".4" strokeDasharray="2 3"/>
          <line x1={bx+bw+12} y1={Y0-(fl+1)*flH} x2={bx+bw+24} y2={Y0-(fl+1)*flH}
            stroke="#EEFC55" strokeWidth=".4" strokeDasharray="2 3"/>
          <line x1={bx+bw+19} y1={Y0-fl*flH} x2={bx+bw+19} y2={Y0-(fl+1)*flH}
            stroke="#EEFC55" strokeWidth=".4"/>
          <text x={bx+bw+28} y={Y0-fl*flH-38}
            fill="#EEFC55" fillOpacity=".5" fontSize="7" fontFamily="monospace"
            transform={`rotate(90,${bx+bw+28},${Y0-fl*flH-38})`}>
            {fl===0?"GF":"F"+fl} 3.6M
          </text>
        </g>
      ))}

      {/* ANNOTATIONS */}
      {ANNOTATIONS[sceneId]&&ANNOTATIONS[sceneId].map((ann,i)=>{
        const side=ann.dir==="left"?-1:1;
        const ex=ann.x+side*82;
        const lbx=ann.dir==="left"?ex-138:ex+2;
        return (
          <g key={i} opacity={annOp} style={{transition:"opacity .3s"}}>
            <circle cx={ann.x} cy={ann.y} r="4"
              fill={A} fillOpacity=".95" filter="url(#yglow2)"/>
            <circle cx={ann.x} cy={ann.y} r="9"
              fill="none" stroke={A} strokeWidth="1.2" strokeOpacity=".5"
              style={{animation:`dotRing 2.2s ease-out infinite`,animationDelay:`${i*0.35}s`}}/>
            <polyline
              points={`${ann.x},${ann.y} ${ann.x},${ann.y-20} ${ex},${ann.y-20}`}
              fill="none" stroke={A} strokeWidth="1.3" strokeOpacity=".75"/>
            <polygon points={`${ex},${ann.y-20} ${ex-side*8},${ann.y-24} ${ex-side*8},${ann.y-16}`}
              fill={A} fillOpacity=".7"/>
            <g transform={`translate(${lbx},${ann.y-56})`}>
              <rect x="0" y="0" width="135" height="42" rx="1"
                fill="rgba(3,8,2,0.92)" stroke={A} strokeWidth=".9" strokeOpacity=".65"/>
              <rect x="0" y="0" width="135" height="3" fill={A} fillOpacity=".85"/>
              <text x="8" y="17" fill={A} fillOpacity=".55"
                fontSize="7" fontFamily="'Share Tech Mono',monospace" letterSpacing="1.2">
                {ann.sub}
              </text>
              <text x="8" y="34" fill="#efffdf"
                fontSize="14" fontFamily="'Bebas Neue',sans-serif" letterSpacing=".8">
                {ann.text}
              </text>
            </g>
          </g>
        );
      })}
    </>
  );
}

/* ═══ INFO PANEL ═══ */
function InfoPanel({scene,C,visible}){
  const inf=scene.info;
  return (
    <div style={{
      position:"fixed",top:0,right:0,bottom:0,
      width:276,
      background:"rgba(3,8,2,0.94)",
      borderLeft:`1px solid ${C.dim}0.22)`,
      backdropFilter:"blur(16px)",
      transform:visible?"translateX(0)":"translateX(100%)",
      transition:"transform .55s cubic-bezier(.16,1,.3,1), border-color .5s",
      display:"flex",flexDirection:"column",
      padding:"24px 22px",
      gap:16,
      zIndex:50,
      overflowY:"auto",
    }}>
      <div style={{
        position:"absolute",top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg,${C.main},transparent)`,
        transition:"background .5s",
      }}/>
      <div style={{
        position:"absolute",top:0,left:0,bottom:0,width:2,
        background:`linear-gradient(180deg,${C.main},transparent 60%)`,
        transition:"background .5s",
      }}/>

      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
        <div style={{
          width:8,height:8,borderRadius:"50%",
          background:C.main,boxShadow:`0 0 10px ${C.main}`,
          animation:"blink 1.4s step-end infinite",
          transition:"background .5s",
        }}/>
        <span style={{
          fontFamily:"'Share Tech Mono',monospace",
          fontSize:7.5,letterSpacing:"0.45em",
          color:C.main,textTransform:"uppercase",opacity:.65,
          transition:"color .5s",
        }}>{inf.category}</span>
      </div>

      <div>
        <div style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:26,color:"#f2fde4",
          lineHeight:.9,letterSpacing:".02em",textTransform:"uppercase",
        }}>{scene.title}</div>
        <div style={{
          fontFamily:"'Share Tech Mono',monospace",
          fontSize:8.5,color:C.main,opacity:.4,
          marginTop:7,letterSpacing:".1em",lineHeight:1.65,
          transition:"color .5s",
        }}>{scene.subtitle}</div>
      </div>

      <div style={{height:1,background:`${C.dim}0.22)`,transition:"background .5s"}}/>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px 7px"}}>
        {inf.stats.map((s,i)=>(
          <div key={i} style={{
            padding:"9px 10px",
            background:`${C.dim}0.07)`,
            border:`1px solid ${C.dim}0.2)`,
            borderRadius:2,
            transition:"background .5s,border .5s",
          }}>
            <div style={{
              fontFamily:"'Share Tech Mono',monospace",
              fontSize:6.5,letterSpacing:"0.3em",
              color:C.main,opacity:.5,textTransform:"uppercase",
              marginBottom:5,transition:"color .5s",
            }}>{s.l}</div>
            <div style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:17,color:"#efffdf",letterSpacing:".04em",lineHeight:1,
            }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{height:1,background:`${C.dim}0.22)`,transition:"background .5s"}}/>

      <p style={{
        fontFamily:"'DM Sans',sans-serif",
        fontSize:11.5,color:"rgba(230,255,210,.45)",
        lineHeight:1.7,margin:0,fontWeight:300,
      }}>{inf.desc}</p>

      <div style={{marginTop:"auto",display:"flex",gap:4,alignItems:"center"}}>
        {SCENES.map((s,i)=>(
          <div key={s.id} style={{
            flex:s.id===scene.id?3:1,height:3,borderRadius:1.5,
            background:s.id===scene.id?C.main:`${C.dim}0.2)`,
            boxShadow:s.id===scene.id?`0 0 6px ${C.main}`:"none",
            transition:"all .4s ease,background .5s",
          }}/>
        ))}
      </div>

      <div style={{
        fontFamily:"'Share Tech Mono',monospace",
        fontSize:7,color:C.main,opacity:.3,
        letterSpacing:"0.4em",textAlign:"center",
        transition:"color .5s",
      }}>
        {String(SCENES.findIndex(s=>s.id===scene.id)+1).padStart(2,"0")}
        {" / "}{String(SCENES.length).padStart(2,"0")}
        {" — "}{scene.label}
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function ConstructionScroll(){
  const [scrollP,  setScrollP]  = useState(0);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [sceneP,   setSceneP]   = useState(0);
  const rafRef = useRef(null);
  const TOTAL  = SCENES.length;

  useEffect(()=>{
    document.body.style.height=`${TOTAL*260}vh`;
    document.documentElement.style.scrollBehavior="auto";
    document.body.style.background="#060e04";
    return ()=>{
      document.body.style.height="";
      document.body.style.background="";
    };
  },[]);

  useEffect(()=>{
    const onScroll=()=>{
      if(rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current=requestAnimationFrame(()=>{
        const max=document.body.scrollHeight-window.innerHeight;
        const p=max>0?window.scrollY/max:0;
        setScrollP(p);
        const si=Math.min(TOTAL-1,Math.floor(p*TOTAL));
        setSceneIdx(si);
        setSceneP((p*TOTAL)-si);
      });
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const scene=SCENES[sceneIdx];
  const nextS=SCENES[Math.min(sceneIdx+1,TOTAL-1)];
  const C=SCENE_COLORS[scene.id];

  const lerp=(a,b,t)=>a+(b-a)*t;
  const ease=(t)=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const ep=ease(sceneP);
  const cvb=scene.viewBox.split(" ").map(Number);
  const nvb=nextS.viewBox.split(" ").map(Number);
  const vb=cvb.map((v,i)=>lerp(v,nvb[i],ep).toFixed(2)).join(" ");
  const annOp=sceneP<.3?sceneP/.3:sceneP>.8?1-(sceneP-.8)/.2:1;
  const panelOn=sceneIdx>0;

  const svgRight=panelOn?276:0;

  return (
    <div style={{
      position:"fixed",inset:0,
      background:"#060e04",
      overflow:"hidden",
    }}>
      {/* BG grid */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:`linear-gradient(${C.dim}0.04) 1px,transparent 1px),linear-gradient(90deg,${C.dim}0.04) 1px,transparent 1px)`,
        backgroundSize:"48px 48px",
        transition:"background-image .7s",
      }}/>
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        background:`radial-gradient(ellipse 72% 62% at 42% 88%,${C.dim}0.07) 0%,transparent 65%)`,
        transition:"background .7s",
      }}/>

      {/* SVG CANVAS */}
      <div style={{
        position:"absolute",top:0,left:0,
        right:svgRight,bottom:0,
        transition:"right .55s cubic-bezier(.16,1,.3,1)",
      }}>
        <svg
          viewBox={vb}
          xmlns="http://www.w3.org/2000/svg"
          style={{width:"100%",height:"100%"}}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes winFlick{0%,100%{fill-opacity:.06}50%{fill-opacity:.2}}
              @keyframes craneSwg{0%,100%{transform:rotate(0deg)}38%{transform:rotate(4deg)}72%{transform:rotate(-3deg)}}
              @keyframes hookBob{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
              @keyframes wireFlow{from{stroke-dashoffset:0}to{stroke-dashoffset:-16}}
              @keyframes beaconBlk{0%,100%{opacity:1}49%{opacity:.08}}
              @keyframes wrkBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
              @keyframes dotRing{0%{r:9;stroke-opacity:.55}100%{r:26;stroke-opacity:0}}
              .win-f{animation:winFlick 3s ease-in-out infinite}
              .crane-a{animation:craneSwg 4s ease-in-out infinite;transform-origin:796px 52px}
              .hook-g{animation:hookBob 2.2s ease-in-out infinite}
              .wire-f{animation:wireFlow 2.5s linear infinite}
              .beacon{animation:beaconBlk 1.4s step-end infinite}
              .wrk-bob{animation:wrkBob 1.8s ease-in-out infinite;transform-origin:306px 446px}
            `}</style>
            <filter id="yglow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="yglow2" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <BuildingSVG sceneId={scene.id} C={C} annOp={annOp}/>
        </svg>
      </div>

      {/* INFO PANEL */}
      <InfoPanel scene={scene} C={C} visible={panelOn}/>

      {/* TOP LEFT HUD */}
      <div style={{
        position:"fixed",top:26,left:28,zIndex:60,pointerEvents:"none",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:22,height:1.5,background:C.main,opacity:.6,transition:"background .5s"}}/>
          <span style={{
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:7.5,letterSpacing:"0.5em",
            color:C.main,textTransform:"uppercase",opacity:.65,
            transition:"color .5s",
          }}>{scene.label}</span>
          <div style={{
            width:5,height:5,borderRadius:"50%",
            background:C.main,opacity:.9,
            boxShadow:`0 0 8px ${C.main}`,
            animation:"blink 1.4s step-end infinite",
            transition:"background .5s",
          }}/>
        </div>
        <div key={scene.id} style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:"clamp(26px,3.2vw,50px)",
          color:"#f0fde0",lineHeight:.88,
          letterSpacing:".02em",textTransform:"uppercase",
          animation:"fadeUp .45s ease both",
          maxWidth:340,
        }}>{scene.title}</div>
        <div style={{
          fontFamily:"'Share Tech Mono',monospace",
          fontSize:9,color:C.main,opacity:.38,
          marginTop:8,letterSpacing:".1em",
          animation:"fadeUp .45s ease .1s both",
          transition:"color .5s",
        }}>{scene.subtitle}</div>
      </div>

      {/* TOP RIGHT */}
      <div style={{
        position:"fixed",top:26,
        right:panelOn?298:24,
        zIndex:60,pointerEvents:"none",
        textAlign:"right",
        fontFamily:"'Share Tech Mono',monospace",
        fontSize:7.5,color:C.main,opacity:.26,
        letterSpacing:"0.3em",lineHeight:2,
        transition:"right .55s cubic-bezier(.16,1,.3,1),color .5s",
      }}>
        <div>DWG: SD-00{sceneIdx+1} / REV.04</div>
        <div>SANKET CONSTRUCTION · 2026</div>
      </div>

      {/* LEFT NAV */}
      <div style={{
        position:"fixed",left:10,top:"50%",
        transform:"translateY(-50%)",
        display:"flex",flexDirection:"column",gap:5,
        zIndex:60,
      }}>
        {SCENES.map((s,i)=>(
          <div key={s.id}
            onClick={()=>{
              const max=document.body.scrollHeight-window.innerHeight;
              window.scrollTo({top:(i/TOTAL)*max+1,behavior:"smooth"});
            }}
            title={s.label}
            style={{
              width:3,
              height:i===sceneIdx?42:16,
              borderRadius:1.5,
              background:i===sceneIdx?C.main:i<sceneIdx?"rgba(238,252,85,.45)":"rgba(238,252,85,.14)",
              boxShadow:i===sceneIdx?`0 0 10px ${C.main}`:"none",
              transition:"all .4s ease,background .5s",
              cursor:"pointer",
            }}/>
        ))}
      </div>

      {/* BOTTOM HUD */}
      <div style={{
        position:"fixed",bottom:22,left:28,
        right:panelOn?298:28,
        zIndex:60,pointerEvents:"none",
        display:"flex",alignItems:"flex-end",
        justifyContent:"space-between",
        transition:"right .55s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          <div style={{
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:7,letterSpacing:"0.45em",
            color:C.main,opacity:.32,textTransform:"uppercase",
          }}>Section Progress</div>
          <div style={{display:"flex",gap:5}}>
            {SCENES.map((s,i)=>(
              <div key={s.id} style={{
                height:3.5,borderRadius:2,
                width:i===sceneIdx?38:i<sceneIdx?20:10,
                background:i===sceneIdx?C.main:i<sceneIdx?`${C.dim}0.5)`:"rgba(238,252,85,.14)",
                boxShadow:i===sceneIdx?`0 0 8px ${C.main}`:"none",
                transition:"all .4s ease,background .5s",
              }}/>
            ))}
          </div>
          <div style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:10.5,color:C.main,opacity:.38,
            letterSpacing:"0.2em",transition:"color .5s",
          }}>
            {String(sceneIdx+1).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")} — {scene.label}
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          {sceneIdx<TOTAL-1&&(
            <div style={{
              fontFamily:"'Share Tech Mono',monospace",
              fontSize:7,color:C.main,opacity:.3,
              letterSpacing:"0.4em",
              animation:"scrollBounce 1.8s ease-in-out infinite",
              transition:"color .5s",
            }}>↓ SCROLL</div>
          )}
          {sceneIdx===TOTAL-1&&(
            <div style={{
              fontFamily:"'Share Tech Mono',monospace",
              fontSize:7,color:C.main,opacity:.4,
              letterSpacing:"0.4em",transition:"color .5s",
            }}>✓ COMPLETE</div>
          )}
          <div style={{width:1.5,height:56,background:"rgba(238,252,85,.1)",borderRadius:1,overflow:"hidden"}}>
            <div style={{
              width:"100%",height:`${scrollP*100}%`,
              background:C.main,boxShadow:`0 0 4px ${C.main}`,
              transition:"height .05s linear,background .5s",
            }}/>
          </div>
          <div style={{
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:6.5,color:C.main,opacity:.25,
            letterSpacing:"0.3em",transition:"color .5s",
          }}>{Math.round(scrollP*100)}%</div>
        </div>
      </div>

      {/* COLOR LEGEND */}
      {sceneIdx>0&&(
        <div style={{
          position:"fixed",bottom:22,
          right:panelOn?298:24,
          zIndex:60,pointerEvents:"none",
          display:"flex",alignItems:"center",gap:8,
          padding:"6px 12px",
          background:"rgba(3,8,2,.85)",
          border:`1px solid ${C.dim}0.28)`,
          backdropFilter:"blur(10px)",
          animation:"fadeUp .4s ease both",
          transition:"right .55s cubic-bezier(.16,1,.3,1),border .5s",
        }}>
          <div style={{
            width:9,height:9,borderRadius:"50%",
            background:C.main,boxShadow:`0 0 8px ${C.main}`,
            transition:"background .5s",
          }}/>
          <span style={{
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:7.5,color:C.main,
            letterSpacing:"0.3em",textTransform:"uppercase",opacity:.68,
            transition:"color .5s",
          }}>
            {scene.info.category}
          </span>
        </div>
      )}

      <style>{`
        ${FONTS}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}49%{opacity:.08}}
        @keyframes scrollBounce{0%,100%{transform:translateY(0);opacity:.28}50%{transform:translateY(5px);opacity:.55}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{display:none}
        html{scrollbar-width:none}
      `}</style>
    </div>
  );
}