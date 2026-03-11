import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Globe, Compass, Clock, Building2, Users } from 'lucide-react';

const OfficeStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const officeHours = { open: 9, close: 19, workDays: [1, 2, 3, 4, 5, 6] };

  const getStatus = () => {
    const day = currentTime.getDay();
    const hour = currentTime.getHours();
    const isOpen =
      officeHours.workDays.includes(day) &&
      hour >= officeHours.open &&
      hour < officeHours.close;
    return isOpen
      ? { label: 'Studio Open', color: '#EEFC55' }
      : { label: 'Studio Closed', color: '#ff4444' };
  };

  const status = getStatus();

  const s = currentTime.getSeconds();
  const m = currentTime.getMinutes();
  const h = currentTime.getHours();

  const secondsDeg = (s / 60) * 360;
  const minutesDeg = (m / 60) * 360 + (s / 60) * 6;
  const hoursDeg = ((h % 12) / 12) * 360 + (m / 60) * 30;

  const scheduleRows = [
    { days: 'Mon – Sat', time: '09:00 – 19:00', note: 'Standard Operations', active: currentTime.getDay() !== 0 },
    { days: 'Sunday',    time: 'Closed', note: 'Weekly Maintenance', active: currentTime.getDay() === 0 },
  ];

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section
      style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
      className="bg-[#0a0a0a] min-h-screen py-16 px-4 flex items-center justify-center overflow-hidden"
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 25% 60%, rgba(238,252,85,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 40%, rgba(238,252,85,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1300px] relative z-10">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[9px] tracking-[0.5em] uppercase text-white/30">
            Current Studio Availability
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div
          className="rounded-[2.5rem] border border-white/[0.07] overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 100%)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Top status bar */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: status.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: status.color }}
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">
                {status.label}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/20">
              <Globe size={11} className="text-[#EEFC55]" />
              <span className="text-[9px] tracking-widest uppercase">Pusad, MH · GMT+5:30</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
            
            {/* COL 1: ANALOG CLOCK */}
            <div className="flex flex-col items-center justify-center p-10 gap-6">
              <div className="relative" style={{ width: 220, height: 220 }}>
                <svg viewBox="0 0 200 200" width="220" height="220" style={{ filter: 'drop-shadow(0 0 24px rgba(238,252,85,0.08))' }}>
                  <circle cx="100" cy="100" r="96" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.08" />
                  <circle cx="100" cy="100" r="90" fill="#111" stroke="white" strokeWidth="0.4" strokeOpacity="0.12" />
                  <circle cx="100" cy="100" r="86" fill="none" stroke="#EEFC55" strokeWidth="0.5" strokeDasharray="1 5" strokeOpacity="0.2" />
                  {[...Array(12)].map((_, i) => (
                    <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                      <line x1="100" y1="14" x2="100" y2={i % 3 === 0 ? 26 : 20} stroke="white" strokeWidth={i % 3 === 0 ? 2 : 1} strokeOpacity={i % 3 === 0 ? 0.6 : 0.25} strokeLinecap="round" />
                    </g>
                  ))}
                  <g transform={`rotate(${hoursDeg} 100 100)`}><line x1="100" y1="100" x2="100" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" /></g>
                  <g transform={`rotate(${minutesDeg} 100 100)`}><line x1="100" y1="100" x2="100" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></g>
                  <g transform={`rotate(${secondsDeg} 100 100)`}><line x1="100" y1="100" x2="100" y2="22" stroke="#EEFC55" strokeWidth="1" strokeLinecap="round" /></g>
                  <circle cx="100" cy="100" r="5" fill="#1a1a1a" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                  <circle cx="100" cy="100" r="2.5" fill="#EEFC55" />
                </svg>
                <div className="absolute top-1 right-1 w-9 h-9 rounded-full flex items-center justify-center border border-white/10" style={{ background: 'rgba(238,252,85,0.07)' }}>
                  <Compass size={14} className="text-[#EEFC55]" style={{ animation: 'spin 12s linear infinite' }} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-1">Live Feed</div>
                <div className="text-4xl font-black tabular-nums" style={{ color: '#EEFC55' }}>{pad(s)}</div>
              </div>
            </div>

            {/* COL 2: DIGITAL TIME + STUDIO INFO */}
            <div className="flex flex-col justify-center p-10 gap-8">
              <div>
                <div className="text-[80px] font-black tabular-nums leading-none" style={{ letterSpacing: '-0.05em' }}>
                  <span className="text-white">{pad(h)}</span>
                  <span className="text-[#EEFC55]" style={{ animation: 'blink 1s step-end infinite' }}>:</span>
                  <span className="text-white">{pad(m)}</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-white/20 text-[11px] tracking-[0.4em] uppercase">
                    {currentTime.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>

              {/* REPLACED: Stats with Studio Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-white/[0.07] bg-white/[0.03]">
                  <Building2 size={13} className="text-[#EEFC55] mb-2" />
                  <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1">Office</p>
                  <p className="text-[11px] text-white/70 font-bold">Main Studio</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/[0.07] bg-white/[0.03]">
                  <Users size={13} className="text-[#EEFC55] mb-2" />
                  <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1">Presence</p>
                  <p className="text-[11px] text-white/70 font-bold">Available</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-white/25 mb-2 uppercase tracking-widest">
                  <span>Minute Progress</span>
                  <span>{s}s</span>
                </div>
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full transition-none" style={{ width: `${(s / 60) * 100}%`, background: '#EEFC55' }} />
                </div>
              </div>
            </div>

            {/* COL 3: SCHEDULE + CTA */}
            <div className="flex flex-col justify-between p-10 gap-8">
              <div>
                <div className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-5">Weekly Hours</div>
                <div className="space-y-0 divide-y divide-white/[0.06]">
                  {scheduleRows.map((row, i) => (
                    <div key={i} className="py-4 flex items-center gap-3">
                      <div className="w-1 rounded-full h-9" style={{ background: row.active ? '#EEFC55' : 'rgba(255,255,255,0.08)' }} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-bold uppercase ${row.active ? 'text-white' : 'text-white/30'}`}>{row.days}</span>
                          <span className={`text-[10px] font-mono ${row.active ? 'text-[#EEFC55]' : 'text-white/20'}`}>{row.time}</span>
                        </div>
                        <div className="text-[9px] uppercase tracking-widest mt-0.5 text-white/15">{row.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.35em] flex items-center justify-center gap-2 bg-[#EEFC55] text-black hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Book a Consultation <ChevronRight size={14} />
                </button>
                <button className="w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.35em] flex items-center justify-center gap-2 border border-white/[0.1] text-white/60 hover:bg-white/5 transition-all">
                  <MapPin size={14} className="text-[#EEFC55]" /> Locate Studio
                </button>
              </div>
            </div>

          </div>
        </div>
        <div className="text-center mt-5 text-[9px] text-white/15 tracking-[0.3em] uppercase">
          Studio Operational Status · 2026
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
};

export default OfficeStatus;