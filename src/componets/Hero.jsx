import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// ABOUT SECTION — zero changes to original code
// ─────────────────────────────────────────────────────────────
const AboutSection = () => {
  const containerRef = useRef(null);
  const timelineRef  = useRef(null);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const xTranslate = useTransform(timelineProgress, [0, 1], ['30%', '-80%']);

  const timelineEvents = [
    { year: '1998', task: 'Foundation Laid',  desc: 'Company started in Mumbai.'               },
    { year: '2010', task: '100 Milestones',   desc: 'Successfully hit 100 projects.'           },
    { year: '2020', task: 'Urban Pulse',       desc: 'Expansion to 12 major cities.'            },
    { year: '2024', task: 'Apex Era',          desc: '500+ Mega-structures completed.'          },
    { year: '2026', task: 'The Future',        desc: 'Digital Integration & Sustainability.'   },
  ];

  return (
    <div ref={containerRef} className="bg-[#FFFFFF] py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative flex flex-col lg:block">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 lg:absolute lg:top-0 lg:left-0 w-full lg:w-1/2 space-y-6 md:space-y-10 pointer-events-none mb-10 lg:mb-0"
        >
          <div className="inline-block">
            <span className="text-[#D4AF37]  font-mono text-xs tracking-[0.4em] uppercase bg-orange-800 rounded p-2 pb-2">
              The Genesis
            </span>
          </div>
          <h2 className="text-[#1A1A1A] text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] uppercase tracking-tighter">
            Engineering <br />
            <span className="italic text-outline">The Silent </span> <br />
            Giants.
          </h2>
          <div className="bg-[#1A1A1A] text-[#E5E2DA] p-8 md:p-14 lg:ml-20 shadow-2xl pointer-events-auto w-full lg:max-w-lg">
            <p className="text-base md:text-lg font-medium leading-relaxed opacity-90">
              Founded on the principle of structural integrity, we have spent 16 years turning
              complex blueprints into India's most iconic skylines. Our mission is the fusion of
              brutalist strength with artistic grace.
            </p>
            <div className="flex gap-6 md:gap-10 pt-8 mt-8 border-t border-white/20">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#D4AF37] mb-2 font-mono tracking-widest">Vision</p>
                <p className="text-xs font-bold uppercase tracking-widest">Global Prowess</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#D4AF37] mb-2 font-mono tracking-widest">Mission</p>
                <p className="text-xs font-bold uppercase tracking-widest">Absolute Precision</p>
              </div>
            </div>
          </div>
        </motion.div>

      <motion.div
  initial={{ clipPath: 'inset(0 0 100% 0)' }}
  whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
  viewport={{ once: true }}
  transition={{ duration: 1.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
  className="relative w-full lg:ml-auto lg:w-3/5 h-[350px] md:h-[500px] lg:h-[700px] z-10 overflow-hidden"
>
  <motion.video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-1000 scale-110"
  >
    <source 
      src="/about.mp4" 
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </motion.video>

  {/* Overlay Frame */}
  <div className="absolute inset-0 border-[10px] md:border-[20px] border-[#E5E2DA]/50 pointer-events-none" />
  
  {/* Optional: Subtle Dark Overlay to help text pop if needed */}
  <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors duration-1000" />
</motion.div>

        <div className="hidden md:block absolute -bottom-10 lg:-bottom-20 right-10 lg:right-20 text-[12vw] font-black text-[#1A1A1A]/5 pointer-events-none select-none uppercase">
          Legacy
        </div>
      </div>

      <div ref={timelineRef} className="mt-20 md:mt-40 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1A1A1A]/10 z-0" />
        <motion.div
          style={{ x: useTransform(timelineProgress, [0, 1], ['0%', '-30%']) }}
          className="absolute -top-12 md:-top-24 left-0 text-[15vw] font-black text-[#1A1A1A]/[0.02] pointer-events-none whitespace-nowrap"
        >
          HISTORY HISTORY HISTORY
        </motion.div>
        <motion.div
          style={{ x: xTranslate }}
          className="flex gap-10 md:gap-20 py-10 md:py-20 px-6 md:px-10 cursor-grab active:cursor-grabbing"
        >
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="min-w-[250px] md:min-w-[300px] relative group">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-[#D4AF37] rounded-full mb-4 md:mb-6 relative z-10 group-hover:scale-150 transition-transform" />
              <h3 className="text-5xl md:text-6xl font-black text-[#1A1A1A] mb-2">{event.year}</h3>
              <p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">{event.task}</p>
              <p className="text-[#1A1A1A]/60 text-sm font-medium leading-relaxed max-w-[200px]">{event.desc}</p>
              <div className="absolute top-2 left-2 h-full w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .text-outline { color: transparent; -webkit-text-stroke: 1px #1A1A1A; }
      `}</style>
    </div>
  );
};


// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
const SCROLL_TOTAL = 250;

const Hero = () => {
  const sentinelRef   = useRef(null);
  const rafRef        = useRef(null);
  const scrollRef     = useRef(0);
  const sentTopRef    = useRef(0);

  const [scroll, setScroll]           = useState(0);
  const [size, setSize]               = useState({ w: 1200, h: 800 });
  const [sentinelTop, setSentinelTop] = useState(0);
  const [headingRevealed, setHeadingRevealed] = useState(false);

  useEffect(() => {
    const measure = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
      if (sentinelRef.current) {
        const t = sentinelRef.current.getBoundingClientRect().top + window.scrollY;
        setSentinelTop(t);
        sentTopRef.current = t;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // rAF-throttled scroll listener — eliminates setState on every pixel
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScroll(scrollRef.current);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeadingRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  const { w: vw, h: vh } = size;

  const relScroll      = Math.max(scroll - sentinelTop, 0);
  const transitionDist = vh * 1.5;
  const rawTotal       = Math.min(relScroll / transitionDist, 1);

  const rawA = Math.min(rawTotal / 0.45, 1);
  const eA   = rawA < 0.5 ? 4*rawA**3 : 1-(-2*rawA+2)**3/2;

  const rawB = Math.min(Math.max((rawTotal - 0.45) / 0.55, 0), 1);
  const eB   = rawB < 0.5 ? 4*rawB**3 : 1-(-2*rawB+2)**3/2;

  // overlay visible until transition is fully done
  const overlayVisible = rawTotal < 1;

  // Hero
  const heroY  = eA * -vh * 0.45;
  const heroOp = Math.max(1 - eA * 1.9, 0);

  // Video
  const startW = 224, startH = 132, startR = 44, startB = 44;
  const vidW  = startW + eA * (vw  - startW);
  const vidH  = startH + eA * (vh  - startH);
  const vidR  = startR * (1 - eA);
  const vidB  = startB * (1 - eA);
  const vidBr = 12    * (1 - eA);

  // Video stays fully visible — About slides OVER it
  const vidOp    = 1;
  const vidScale = 1;

  // About panel: translate from 100vh → 0, driven purely by eB
  // Use CSS transform directly on a persistently mounted div (no conditional render)
  const aboutSlideY = (1 - eB) * 100; // percent of viewport height

  const labelOp    = Math.max(1 - eA * 5, 0);
  const titleOp    = Math.max((eA - 0.6) * 3.5, 0) * Math.max(1 - eB * 3, 0);
  const hintOp     = Math.max(1 - eA * 7, 0);
  const continueOp = Math.min(Math.max(eA * 3 - 2, 0), 1) * Math.max(1 - eB * 5, 0);
  const overlayOp  = Math.max(1 - eB * 1.1, 0);

  // Word clip reveal
  const wordRevealStyle = () => ({
    display: 'inline-block',
    overflow: 'hidden',
    verticalAlign: 'bottom',
  });
  const wordInnerStyle = (delayIdx) => ({
    display: 'inline-block',
    transform: headingRevealed ? 'translateY(0%)' : 'translateY(105%)',
    transition: `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delayIdx * 0.12}s`,
    willChange: 'transform',
  });
  const subRevealStyle = (delayIdx) => ({
    opacity: headingRevealed ? 1 : 0,
    transform: headingRevealed ? 'translateY(0px)' : 'translateY(18px)',
    transition: `opacity 0.8s ease ${0.6 + delayIdx * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.6 + delayIdx * 0.15}s`,
    willChange: 'transform, opacity',
  });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;0,900;1,700;1,900&family=Bebas+Neue&family=DM+Sans:wght@300;400;700&display=swap"
      />

      {/* SENTINEL */}
      <div ref={sentinelRef} style={{ height: 0, pointerEvents: 'none' }} />

      {/* SCROLL SPACE */}
      <div style={{ height: `${transitionDist}px`, pointerEvents: 'none' }} />

      {/* ── FIXED OVERLAY — always mounted, visibility via opacity/pointerEvents ── */}
      <div style={{
        position: 'fixed', inset: 0,
        zIndex: 100,
        // Keep in DOM always to avoid remount flicker; hide via pointer-events when done
        opacity: overlayVisible ? 1 : 0,
        pointerEvents: overlayVisible && overlayOp > 0.04 ? 'auto' : 'none',
        // GPU layer promotion for the whole overlay
        willChange: 'opacity',
      }}>

        {/* White background fades with overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#ffffff',
          opacity: overlayOp,
          willChange: 'opacity',
        }} />

        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', justifyContent: 'space-between',
          padding: '0 80px',
          opacity: 0.07 * overlayOp,
          pointerEvents: 'none', zIndex: 1,
        }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width: 1, height: '100%', background: '#1A1A1A' }} />
          ))}
        </div>

        {/* ── HERO CONTENT slides up ── */}
        <div style={{
          position: 'absolute', inset: 0,
          transform: `translateY(${heroY}px)`,
          opacity: heroOp,
          zIndex: 10,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}>
          {/* Monolith image */}
          <div style={{
            position: 'absolute', right: '9%', top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(180px,21vw,360px)', height: 'clamp(260px,29vw,500px)',
            overflow: 'hidden', zIndex: 20,
            boxShadow: '22px 22px 60px rgba(0,0,0,0.14)',
          }}>
            <img
              src="https://i.pinimg.com/736x/36/11/c6/3611c62b84ec213640f2ed066cf945db.jpg"
              alt="Architectural Concrete"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
          </div>

          {/* Typography with word clip reveal */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: '0 5.5vw',
            zIndex: 30,
          }}>
            {/* Line 1 */}
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(50px,11vw,160px)',
              lineHeight: 0.9, letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              display: 'flex', gap: '0.25em', alignItems: 'flex-end',
            }}>
              <span style={wordRevealStyle()}>
                <span style={{ ...wordInnerStyle(0), color: '#1A1A1A' }}>STRUCTURED</span>
              </span>
              <span style={wordRevealStyle()}>
                <span style={{ ...wordInnerStyle(1), color: 'transparent', WebkitTextStroke: '1.5px #1A1A1A' }}>CHAOS</span>
              </span>
            </div>

            {/* Line 2 */}
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(64px,11vw,160px)',
              lineHeight: 0.9, letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              display: 'flex', gap: '0.25em', alignItems: 'flex-end',
            }}>
              <span style={wordRevealStyle()}>
                <span style={{ ...wordInnerStyle(2), color: '#1A1A1A' }}>POURED</span>
              </span>
              <span style={wordRevealStyle()}>
                <span style={{
                  ...wordInnerStyle(3),
                  fontFamily: "'Bebas Neue',sans-serif",
                  color: '#D4AF37',
                  fontSize: 'clamp(68px,11.5vw,168px)',
                }}>ART.</span>
              </span>
            </div>
          </div>

          {/* Footer row */}
          <div style={{
            position: 'absolute', bottom: 36, left: 0,
            width: '100%', padding: '0 44px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            zIndex: 40,
          }}>
            <div style={subRevealStyle(0)}>
              <p style={{
                color: '#1A1A1A', fontSize: 10, fontWeight: 700,
                lineHeight: 1.75, textTransform: 'uppercase',
                letterSpacing: '0.18em', margin: '0 0 12px',
              }}>
                [ 01 ] Global Standards<br />[ 02 ] Indian Soul
              </p>
              <div style={{ height: 1.5, background: '#1A1A1A', width: 200 }} />
            </div>
            <div style={{
              ...subRevealStyle(1),
              background: '#1A1A1A', color: '#E5E2DA',
              width: 88, height: 88, borderRadius: '50%',
              fontWeight: 700, fontSize: 9,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1.55, textAlign: 'center',
            }}>Begin<br />Journey</div>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: 148, left: '50%',
            transform: 'translateX(-50%)',
            opacity: hintOp, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 8, letterSpacing: '0.36em', color: '#1A1A1A', textTransform: 'uppercase', fontWeight: 700 }}>Scroll</span>
            <div style={{ width: 1, height: 36, background: '#1A1A1A', animation: 'hrPulse 1.7s ease-in-out infinite' }} />
          </div>
        </div>

        {/* ── VIDEO — stays visible, About slides over it ── */}
        <div style={{
          position: 'absolute',
          bottom: vidB,
          right: vidR,
          width: vidW,
          height: vidH,
          borderRadius: vidBr,
          overflow: 'hidden',
          zIndex: 60,
          opacity: vidOp,
          transform: `scale(${vidScale})`,
          transformOrigin: 'bottom right',
          boxShadow: `0 ${10*(1-eA)}px ${36*(1-eA)+4}px rgba(0,0,0,${0.38*(1-eA)+0.1})`,
          willChange: 'width, height, border-radius',
        }}>
          <video autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src="https://www.pexels.com/download/video/6033941/" type="video/mp4" />
          </video>

          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg,rgba(0,0,0,0.25) 0%,transparent 55%)',
            opacity: 1 - eA, pointerEvents: 'none',
          }} />

          <div style={{ position: 'absolute', bottom: 10, left: 12, opacity: labelOp, pointerEvents: 'none' }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.25em', textTransform: 'uppercase', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>▶ Preview</span>
          </div>

          <div style={{ position: 'absolute', top: 9, right: 9, width: 16, height: 16, border: '1px solid #D4AF37', borderRadius: 2, opacity: labelOp, pointerEvents: 'none' }} />

          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 50%)',
            opacity: titleOp, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', padding: 'clamp(20px,4vw,56px)',
          }}>
            <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 10px' }}>
              [ Reel 2025 ]
            </p>
        
          </div>

          <div style={{
            position: 'absolute', bottom: 32, right: 40,
            opacity: continueOp, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 8, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', fontWeight: 700 }}>Continue</span>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.5)', animation: 'hrPulse 1.7s ease-in-out infinite' }} />
          </div>
        </div>

        {/* ── ABOUT PANEL — always mounted, position driven by eB ──
            Stays off-screen (translateY 100vh) until Phase B begins.
            No conditional render = zero blink / remount flash.         ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 80,
          // GPU-promoted transform — smooth 60fps slide
          transform: `translateY(${aboutSlideY}vh)`,
          willChange: 'transform',
          boxShadow: eB > 0 ? '0 -20px 60px rgba(0,0,0,0.14)' : 'none',
          borderRadius: '18px 18px 0 0',
          background: '#ffffff',
          // Only intercept pointer events once meaningfully in view
          pointerEvents: eB > 0.15 ? 'auto' : 'none',
          // Clip so off-screen content never bleeds
          overflow: 'hidden',
        }}>
          {/* Drag pill */}
          <div style={{
            position: 'absolute', top: 10, left: '50%',
            transform: 'translateX(-50%)',
            width: 36, height: 4, borderRadius: 2,
            background: 'rgba(0,0,0,0.1)',
            zIndex: 10,
          }} />
          <AboutSection />
        </div>

      </div>

      {/* ── STATIC About below scroll space (shown once overlay is gone) ── */}
      <AboutSection />

      <style>{`
        @keyframes hrPulse {
          0%,100% { opacity:1; transform:scaleY(1); }
          50%      { opacity:0.3; transform:scaleY(0.45); }
        }
      `}</style>
    </>
  );
};


export default Hero;




