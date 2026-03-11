import { useEffect, useRef, useState } from "react";

export default function ConstructionDivider() {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setScrolled(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <section
        ref={ref}
        style={{
          background: "#0b0b0b",
          overflow: "hidden",
          position: "relative",
          padding: "0",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        {/* ── GRAIN TEXTURE OVERLAY ── */}
        <svg
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            pointerEvents: "none", opacity: 0.04, zIndex: 10,
          }}
        >
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* ── TOP DIAGONAL SLASH ── */}
        <div
          style={{
            height: 60,
            background: "#0b0b0b",
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)",
            position: "relative", zIndex: 5,
            marginBottom: -2,
          }}
        />

        {/* ── MAIN SVG SCENE ── */}
        <div style={{ position: "relative", lineHeight: 0 }}>
          <svg
            viewBox="0 0 1400 320"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", display: "block" }}
            aria-hidden="true"
          >
            <defs>
              {/* Sky gradient */}
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b0b0b" />
                <stop offset="100%" stopColor="#111" />
              </linearGradient>

              {/* Ground gradient */}
              <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1400" />
                <stop offset="100%" stopColor="#0b0b0b" />
              </linearGradient>

              {/* Building sheen */}
              <linearGradient id="buildGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1e1e1e" />
                <stop offset="50%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#161616" />
              </linearGradient>

              {/* Steel beam gradient */}
              <linearGradient id="steelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5A623" />
                <stop offset="100%" stopColor="#c47f00" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>

              {/* Soft glow for crane light */}
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>

              {/* Clip path for reveal animation */}
              <clipPath id="revealClip">
                <rect x="0" y="0" width="1400" height="320" />
              </clipPath>
            </defs>

            {/* Sky */}
            <rect x="0" y="0" width="1400" height="320" fill="url(#skyGrad)" />

            {/* ── MOON / SUN ── */}
            <circle cx="1260" cy="55" r="28" fill="none" stroke="#F5A623" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="1260" cy="55" r="20" fill="#F5A623" fillOpacity="0.08" />
            <circle cx="1260" cy="55" r="12" fill="#F5A623" fillOpacity="0.15" />

            {/* Stars */}
            {[
              [80,30],[180,18],[320,40],[500,22],[650,35],[820,15],[950,45],[1060,28],[1150,18],[1340,42],
              [130,55],[400,60],[750,50],[1100,60],[1200,35],
            ].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="1" fill="white" fillOpacity="0.4">
                <animate attributeName="fill-opacity" values="0.4;0.9;0.4" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* ── DISTANT BUILDINGS (BG) ── */}
            {[
              { x:30,  w:55, h:110, win:[[8,12,14,10],[8,30,14,10],[8,48,14,10],[28,12,14,10],[28,30,14,10]] },
              { x:100, w:40, h:80,  win:[[5,8,10,8],[5,25,10,8],[20,8,10,8],[20,25,10,8]] },
              { x:155, w:70, h:140, win:[[8,10,16,10],[30,10,16,10],[8,30,16,10],[30,30,16,10],[8,50,16,10],[30,50,16,10]] },
              { x:240, w:45, h:95,  win:[[6,10,12,8],[22,10,12,8],[6,28,12,8],[22,28,12,8]] },
              { x:300, w:55, h:120, win:[[6,10,14,9],[26,10,14,9],[6,28,14,9],[26,28,14,9],[6,46,14,9]] },
              // right side
              { x:1000,w:60, h:100, win:[[7,10,14,9],[28,10,14,9],[7,28,14,9],[28,28,14,9]] },
              { x:1075,w:50, h:130, win:[[6,10,12,8],[22,10,12,8],[6,28,12,8],[22,28,12,8],[6,46,12,8],[22,46,12,8]] },
              { x:1140,w:65, h:90,  win:[[7,10,15,9],[32,10,15,9],[7,28,15,9],[32,28,15,9]] },
              { x:1220,w:55, h:115, win:[[6,10,13,9],[26,10,13,9],[6,28,13,9],[26,28,13,9],[6,46,13,9],[26,46,13,9]] },
              { x:1290,w:80, h:105, win:[[8,10,16,9],[36,10,16,9],[8,28,16,9],[36,28,16,9],[8,46,16,9]] },
            ].map((b, i) => {
              const baseY = 260;
              return (
                <g key={i} opacity="0.5">
                  <rect x={b.x} y={baseY - b.h} width={b.w} height={b.h} fill="#161616" stroke="#252525" strokeWidth="0.5" />
                  {b.win.map(([wx,wy,ww,wh], j) => {
                    const lit = Math.random() > 0.45;
                    return (
                      <rect
                        key={j}
                        x={b.x + wx} y={baseY - b.h + wy}
                        width={ww} height={wh}
                        fill={lit ? "#F5A623" : "#1a1a1a"}
                        fillOpacity={lit ? 0.6 : 1}
                        rx="1"
                      >
                        {lit && <animate attributeName="fill-opacity" values="0.6;0.9;0.6" dur={`${3+j}s`} repeatCount="indefinite" />}
                      </rect>
                    );
                  })}
                </g>
              );
            })}

            {/* ── MAIN BUILDING UNDER CONSTRUCTION (center) ── */}
            <g>
              {/* Completed floors */}
              {[0,1,2,3].map(floor => (
                <g key={floor}>
                  <rect
                    x="540" y={260 - 40 - floor*50}
                    width="320" height="50"
                    fill="url(#buildGrad)" stroke="#2e2e2e" strokeWidth="1"
                  />
                  {/* Floor windows */}
                  {[0,1,2,3,4,5].map(w => {
                    const lit = (floor + w) % 3 !== 0;
                    return (
                      <rect
                        key={w}
                        x={550 + w*48} y={260 - 40 - floor*50 + 10}
                        width="30" height="25"
                        fill={lit ? "#F5A623" : "#1a1a2e"}
                        fillOpacity={lit ? 0.7 : 1}
                        rx="2"
                      >
                        {lit && (
                          <animate
                            attributeName="fill-opacity"
                            values="0.7;1;0.7"
                            dur={`${2.5+w*0.4+floor*0.2}s`}
                            repeatCount="indefinite"
                          />
                        )}
                      </rect>
                    );
                  })}
                  {/* Floor slab line */}
                  <line x1="540" y1={260 - 40 - floor*50} x2="860" y2={260 - 40 - floor*50} stroke="#F5A623" strokeWidth="1.5" strokeOpacity="0.4" />
                </g>
              ))}

              {/* Top floor - scaffolding / in progress */}
              <rect x="540" y={260-40-4*50} width="320" height="50" fill="#141414" stroke="#2e2e2e" strokeWidth="1" strokeDasharray="4 3" />

              {/* Scaffolding poles */}
              {[545, 600, 660, 720, 780, 840, 855].map((x, i) => (
                <rect key={i} x={x} y={260-40-4*50} width="4" height="52" fill="#3a3a3a" />
              ))}
              {/* Horizontal scaffolding */}
              {[0,1,2,3].map(r => (
                <rect key={r} x="545" y={260-40-4*50 + r*14} width="314" height="2.5" fill="#333" fillOpacity="0.8" />
              ))}

              {/* Warning stripe on scaffold */}
              <rect x="540" y={260-40-4*50+45} width="320" height="6" fill="none"
                stroke="#F5A623" strokeWidth="6" strokeDasharray="12 8" strokeOpacity="0.6" />
            </g>

            {/* ── CRANE ── */}
            <g>
              {/* Mast */}
              <rect x="870" y="30" width="12" height="232" fill="#2a2a2a" stroke="#F5A623" strokeWidth="0.5" strokeOpacity="0.4" />
              {/* Cross braces */}
              {[0,1,2,3,4,5,6].map(i => (
                <g key={i}>
                  <line x1="870" y1={30+i*33} x2="882" y2={30+i*33+16} stroke="#333" strokeWidth="1.5" />
                  <line x1="882" y1={30+i*33} x2="870" y2={30+i*33+16} stroke="#333" strokeWidth="1.5" />
                </g>
              ))}

              {/* Jib (horizontal arm) */}
              <rect x="756" y="26" width="220" height="8" fill="url(#steelGrad)" rx="2" />
              {/* Counter-jib */}
              <rect x="882" y="26" width="80" height="8" fill="#333" rx="2" />
              {/* Counter weight */}
              <rect x="950" y="22" width="30" height="16" fill="#2a2a2a" stroke="#444" strokeWidth="1" rx="2" />

              {/* Jib support cables */}
              <line x1="876" y1="26" x2="756" y2="34" stroke="#555" strokeWidth="1" />
              <line x1="876" y1="26" x2="900" y2="34" stroke="#555" strokeWidth="1" />

              {/* Trolley on jib */}
              <rect x="790" y="22" width="18" height="12" fill="#333" rx="2" />

              {/* Hoist cable */}
              <line x1="799" y1="34" x2="799" y2="170" stroke="#666" strokeWidth="1.5" strokeDasharray="3 2">
                <animateTransform attributeName="transform" type="translate" values="0,0;0,30;0,0" dur="4s" repeatCount="indefinite" />
              </line>

              {/* Hook + load */}
              <g>
                <animateTransform attributeName="transform" type="translate" values="0,0;0,30;0,0" dur="4s" repeatCount="indefinite" />
                <rect x="787" y="168" width="24" height="18" fill="#F5A623" fillOpacity="0.9" rx="3" />
                <line x1="795" y1="168" x2="795" y2="162" stroke="#888" strokeWidth="1.5" />
                <line x1="803" y1="168" x2="803" y2="162" stroke="#888" strokeWidth="1.5" />
              </g>

              {/* Crane tip warning light */}
              <circle cx="756" cy="30" r="5" fill="#F5A623" filter="url(#softGlow)">
                <animate attributeName="fill-opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
              </circle>

              {/* Cab */}
              <rect x="868" y="230" width="20" height="20" fill="#1e1e1e" stroke="#F5A623" strokeWidth="0.5" rx="2" />
              <rect x="871" y="232" width="6" height="6" fill="#F5A623" fillOpacity="0.6" rx="1" />
            </g>

            {/* ── SECOND SMALLER CRANE (left) ── */}
            <g opacity="0.7">
              <rect x="408" y="80" width="8" height="180" fill="#222" stroke="#555" strokeWidth="0.5" />
              {[0,1,2,3,4].map(i => (
                <g key={i}>
                  <line x1="408" y1={80+i*36} x2="416" y2={80+i*36+18} stroke="#2e2e2e" strokeWidth="1" />
                  <line x1="416" y1={80+i*36} x2="408" y2={80+i*36+18} stroke="#2e2e2e" strokeWidth="1" />
                </g>
              ))}
              <rect x="340" y="76" width="140" height="6" fill="#333" rx="2" />
              <rect x="416" y="76" width="50" height="6" fill="#2a2a2a" rx="2" />
              <line x1="412" y1="76" x2="340" y2="82" stroke="#444" strokeWidth="1" />
              {/* mini load */}
              <line x1="360" y1="82" x2="360" y2="180" stroke="#555" strokeWidth="1">
                <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="5s" repeatCount="indefinite" />
              </line>
              <rect x="352" y="178" width="16" height="12" fill="#c47f00" rx="2">
                <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="5s" repeatCount="indefinite" />
              </rect>
              <circle cx="340" cy="79" r="4" fill="#F5A623" filter="url(#softGlow)">
                <animate attributeName="fill-opacity" values="1;0.1;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* ── GROUND LEVEL ── */}
            <rect x="0" y="260" width="1400" height="60" fill="url(#groundGrad)" />
            {/* Ground line */}
            <line x1="0" y1="261" x2="1400" y2="261" stroke="#F5A623" strokeWidth="1" strokeOpacity="0.2" />

            {/* ── EXCAVATOR (left ground) ── */}
            <g transform="translate(120, 225)">
              {/* Body */}
              <rect x="0" y="10" width="65" height="30" fill="#1e1e1e" rx="4" stroke="#333" strokeWidth="1" />
              {/* Cab */}
              <rect x="5" y="0" width="35" height="20" fill="#252525" rx="3" stroke="#333" strokeWidth="1" />
              <rect x="8" y="3" width="12" height="8" fill="#F5A623" fillOpacity="0.2" rx="1" />
              {/* Tracks */}
              <rect x="-5" y="36" width="75" height="10" fill="#333" rx="5" />
              <rect x="-2" y="38" width="69" height="6" fill="#2a2a2a" rx="4" />
              {/* Arm */}
              <line x1="60" y1="10" x2="95" y2="-5" stroke="#444" strokeWidth="6" strokeLinecap="round" />
              <line x1="95" y1="-5" x2="115" y2="18" stroke="#3a3a3a" strokeWidth="5" strokeLinecap="round" />
              {/* Bucket */}
              <path d="M115 18 L128 12 L132 22 L118 28 Z" fill="#333" stroke="#444" strokeWidth="1" />
            </g>

            {/* ── CONSTRUCTION WORKERS ── */}
            {[680, 720, 760].map((x, i) => (
              <g key={i} transform={`translate(${x}, 240)`}>
                {/* Hard hat */}
                <ellipse cx="6" cy="-2" rx="7" ry="4" fill="#F5A623" />
                <rect x="1" y="-2" width="10" height="3" fill="#F5A623" />
                {/* Body */}
                <rect x="2" y="0" width="8" height="12" fill="#1e3a5f" rx="1" />
                {/* Legs */}
                <rect x="2" y="12" width="3" height="8" fill="#333" />
                <rect x="7" y="12" width="3" height="8" fill="#333" />
                {/* Arm animation */}
                <line x1="2" y1="4" x2="-2" y2={8 + (i%2)*4} stroke="#F5A623" strokeWidth="2" strokeLinecap="round">
                  {i === 1 && <animateTransform attributeName="transform" type="rotate" values="-10 2 4;20 2 4;-10 2 4" dur="1s" repeatCount="indefinite" />}
                </line>
                <line x1="10" y1="4" x2="14" y2={6 + (i%2)*3} stroke="#F5A623" strokeWidth="2" strokeLinecap="round">
                  {i === 0 && <animateTransform attributeName="transform" type="rotate" values="10 10 4;-15 10 4;10 10 4" dur="0.9s" repeatCount="indefinite" />}
                </line>
              </g>
            ))}

            {/* ── SAFETY FENCE ── */}
            {[540,580,620,660,700,740,780,820,860].map((x,i) => (
              <g key={i}>
                <rect x={x} y="248" width="3" height="14" fill="#F5A623" fillOpacity="0.8" />
                {i < 8 && (
                  <>
                    <line x1={x+3} y1="252" x2={x+40} y2="252" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1.5" />
                    <line x1={x+3} y1="258" x2={x+40} y2="258" stroke="#F5A623" strokeOpacity="0.3" strokeWidth="1" />
                  </>
                )}
              </g>
            ))}

            {/* ── DUST PARTICLES ── */}
            {[620,660,700,730,770].map((x,i) => (
              <circle key={i} cx={x} cy={245} r="2" fill="#F5A623" fillOpacity="0.3">
                <animate attributeName="cy" values={`${245};${245-20-(i*5)};${245-20-(i*5)}`} dur={`${1.5+i*0.2}s`} repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.3;0;0" dur={`${1.5+i*0.2}s`} repeatCount="indefinite" />
                <animate attributeName="cx" values={`${x};${x+(i%2===0?15:-15)};${x+(i%2===0?15:-15)}`} dur={`${1.5+i*0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* ── TRUCK (right side) ── */}
            <g transform="translate(1050, 228)">
              {/* Cargo */}
              <rect x="0" y="5" width="80" height="28" fill="#1a1a1a" stroke="#333" strokeWidth="1" rx="2" />
              {/* Cab */}
              <rect x="80" y="0" width="40" height="33" fill="#222" stroke="#333" strokeWidth="1" rx="3" />
              <rect x="85" y="4" width="16" height="10" fill="#F5A623" fillOpacity="0.15" rx="1" />
              {/* Wheels */}
              {[15, 45, 88, 108].map((wx, i) => (
                <g key={i}>
                  <circle cx={wx} cy="36" r="8" fill="#111" stroke="#444" strokeWidth="1.5" />
                  <circle cx={wx} cy="36" r="4" fill="#222" />
                </g>
              ))}
              {/* Headlight */}
              <circle cx="120" cy="20" r="3" fill="#F5A623" fillOpacity="0.8" filter="url(#glow)" />
            </g>

            {/* ── FOREGROUND GROUND DETAIL ── */}
            {/* Rubble / material piles */}
            <ellipse cx="480" cy="262" rx="35" ry="8" fill="#1a1a1a" />
            <ellipse cx="960" cy="262" rx="28" ry="7" fill="#1a1a1a" />
            {/* Ground marks */}
            <line x1="0" y1="270" x2="1400" y2="270" stroke="#1e1e1e" strokeWidth="1" strokeDasharray="20 10" />

          </svg>
        </div>

        {/* ── BOTTOM DIAGONAL SLASH ── */}
        <div
          style={{
            height: 60,
            background: "#0b0b0b",
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
            marginTop: -2, position: "relative", zIndex: 5,
          }}
        />

        {/* ── TEXT BANNER OVER SCENE ── */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            zIndex: 20,
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.3))" }} />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(28px, 5vw, 60px)",
                color: "#fff",
                letterSpacing: "0.18em",
                lineHeight: 1,
                textShadow: "0 0 40px rgba(245,166,35,0.3)",
              }}
            >
              BUILDING THE FUTURE
            </div>
            <div
              style={{
                fontSize: "clamp(9px, 1.2vw, 12px)",
                color: "rgba(245,166,35,0.7)",
                letterSpacing: "0.5em",
                marginTop: 6,
                textTransform: "uppercase",
              }}
            >
              Structure · Precision · Excellence
            </div>
          </div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(245,166,35,0.3), transparent)" }} />
        </div>
      </section>
    </>
  );
}