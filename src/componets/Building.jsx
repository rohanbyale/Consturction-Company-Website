import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ApexBuilding() {
  const mountRef = useRef(null);
  const st = useRef({ down: false, lx: 0, rotY: 0.3, zoom: 1.0 });
  const rafRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer (perf-first) ──
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06090f);
    scene.fog = new THREE.Fog(0x06090f, 90, 200);

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 400);
    camera.position.set(0, 18, 52);
    camera.lookAt(0, 18, 0);

    // ── Lights (minimal) ──
    scene.add(new THREE.AmbientLight(0x223355, 3.5));
    const sun = new THREE.DirectionalLight(0xfff0dd, 4.5);
    sun.position.set(40, 80, 40);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x4466aa, 1.2);
    fill.position.set(-30, 30, -20);
    scene.add(fill);
    scene.add(new THREE.HemisphereLight(0x223344, 0x111108, 1.0));

    const root = new THREE.Group();
    scene.add(root);

    // ── Shared materials ──
    const mk = (hex, r = 0.85, m = 0.05, ex = {}) =>
      new THREE.MeshStandardMaterial({ color: hex, roughness: r, metalness: m, ...ex });

    const conc     = mk(0x8a9199, 0.85, 0.05);
    const darkConc = mk(0x3d4550, 0.90);
    const glassB   = mk(0x5599cc, 0.06, 0.10, { transparent: true, opacity: 0.76 });
    const glassLit = mk(0xf8e090, 0.06, 0.05, { transparent: true, opacity: 0.68, emissive: 0xd4900a, emissiveIntensity: 0.32 });
    const steel    = mk(0xbbc8d4, 0.12, 0.96);
    const gold     = mk(0xd4960e, 0.28, 0.80, { emissive: 0xaa7000, emissiveIntensity: 0.12 });
    const ground   = mk(0x0e1520, 0.97);
    const plaza    = mk(0x161f2c, 0.88);

    // ── Geometry cache (reuse) ──
    const bGeo = {}; // key = "w_h_d"
    const getBox = (w, h, d) => {
      const k = `${w}_${h}_${d}`;
      if (!bGeo[k]) bGeo[k] = new THREE.BoxGeometry(w, h, d);
      return bGeo[k];
    };

    // Bottom-anchored box (y = bottom face)
    const BX = (p, w, h, d, mat, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y + h * 0.5, z);
      p.add(m); return m;
    };

    // ── Ground & Plaza ──
    const gnd = new THREE.Mesh(new THREE.PlaneGeometry(280, 280), ground);
    gnd.rotation.x = -Math.PI / 2;
    scene.add(gnd);

    BX(root, 28, 0.2, 22, plaza, 0, 0, 0);

    // Road dashes
    const dashM = mk(0xffffff, 0.5, 0, { emissive: 0xffffff, emissiveIntensity: 0.3 });
    for (let i = -3; i <= 3; i++) BX(root, 0.28, 0.01, 3.8, dashM, i * 1.5, 0.15, -12);

    // ── Podium (3 levels) ──
    const PH = 1.6;
    BX(root, 18, PH, 14, darkConc, 0, 0, 0);
    BX(root, 16, PH - 0.3, 0.09, glassB, 0, 0,   7.05);
    BX(root, 16, PH - 0.3, 0.09, glassB, 0, 0,  -7.05);
    BX(root, 16, PH, 12, darkConc, 0, PH, 0);
    BX(root, 14, PH - 0.3, 0.09, glassB, 0, PH,  6.05);
    BX(root, 14, PH, 11, darkConc, 0, PH * 2, 0);
    BX(root, 14.5, 0.25, 11.5, conc, 0, PH * 3, 0);

    const podTop = PH * 3 + 0.25;

    // ── Tower — 16 floors ──
    const FLOORS = 16, FH = 1.8, TW = 10, TD = 8;

    for (let i = 0; i < FLOORS; i++) {
      const y = podTop + i * FH;
      const tp = 1 - (i / FLOORS) * 0.06;
      const fw = TW * tp, fd = TD * tp;
      const gm = (i % 3 === 1) ? glassLit : glassB;

      // Slab
      BX(root, fw + 0.3, 0.18, fd + 0.3, i % 4 === 0 ? gold : conc, 0, y, 0);
      // Core
      BX(root, fw * 0.32, FH - 0.18, fd * 0.32, darkConc, 0, y + 0.09, 0);
      // Curtain walls (4 faces)
      BX(root, fw - 0.6, FH - 0.25, 0.09, gm, 0, y + 0.12,  fd * 0.5 + 0.05);
      BX(root, fw - 0.6, FH - 0.25, 0.09, gm, 0, y + 0.12, -fd * 0.5 - 0.05);
      BX(root, 0.09, FH - 0.25, fd - 0.6, gm,  fw * 0.5 + 0.05, y + 0.12, 0);
      BX(root, 0.09, FH - 0.25, fd - 0.6, gm, -fw * 0.5 - 0.05, y + 0.12, 0);
      // Corner columns
      [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([sx,sz]) =>
        BX(root, 0.28, FH, 0.28, steel, sx*(fw*0.5-0.12), y + FH*0.5, sz*(fd*0.5-0.12))
      );
      // Spandrel
      BX(root, fw + 0.15, 0.09, fd + 0.15, steel, 0, y + FH - 0.05, 0);
    }

    // ── Mech floor + antenna ──
    const mechY = podTop + FLOORS * FH;
    BX(root, TW * 0.92, 2.0, TD * 0.92, darkConc, 0, mechY, 0);
    BX(root, TW * 0.95, 0.22, TD * 0.95, conc, 0, mechY + 2.0, 0);
    BX(root, 3.5, 1.0, 2.5, darkConc, -2.5, mechY + 2.22, 0);
    BX(root, 2.0, 0.8, 2.0, darkConc,  2.0, mechY + 2.22, 0);

    // Antenna
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 5.5, 7), steel);
    ant.position.set(0.5, mechY + 2.22 + 2.75 + 0.5, 0.5);
    root.add(ant);

    // Beacon
    const beaconMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 7, 7),
      mk(0xff2200, 0.3, 0.1, { emissive: 0xff2200, emissiveIntensity: 3.0 })
    );
    const beaconY = mechY + 2.22 + 5.65;
    beaconMesh.position.set(0.5, beaconY, 0.5);
    root.add(beaconMesh);
    const beaconPt = new THREE.PointLight(0xff2200, 3, 10);
    beaconPt.position.set(0.5, beaconY, 0.5);
    root.add(beaconPt);

    // ── City background (merged mat per building) ──
    const cityData = [
      [-32,-10,6,22,6],[-28,8,5,14,5],[-38,0,4,10,4],
      [32,-8,7,28,6],[30,10,5,18,5],[38,2,4,12,4],
      [-18,-20,5,9,5],[18,-20,6,16,5],[0,-26,8,12,6],
    ];
    const cityMat = mk(0x0d1622, 0.95, 0, { emissive: 0x111e30, emissiveIntensity: 0.14 });
    const winMat  = mk(0xffe8a0, 0.5, 0, { emissive: 0xffe8a0, emissiveIntensity: 1.2, transparent: true, opacity: 0.85 });

    cityData.forEach(([x,z,w,h,d]) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cityMat);
      b.position.set(x, h * 0.5, z);
      scene.add(b);
      // Fewer windows (8 instead of 12, shared mat)
      for (let wi = 0; wi < 8; wi++) {
        const wm = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.26), winMat);
        wm.position.set(x + (Math.random()-0.5)*(w-0.8), Math.random()*(h-1.5)+1.0, z+d*0.5+0.02);
        scene.add(wm);
      }
    });

    // ── Stars (fewer, shared buffer) ──
    const sArr = new Float32Array(900);
    for (let i = 0; i < 300; i++) {
      const a = Math.random()*Math.PI*2, p = Math.acos(2*Math.random()-1), r = 150+Math.random()*40;
      sArr[i*3]   = r*Math.sin(p)*Math.cos(a);
      sArr[i*3+1] = Math.abs(r*Math.cos(p))+10;
      sArr[i*3+2] = r*Math.sin(p)*Math.sin(a);
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sArr, 3));
    scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.38, transparent: true, opacity: 0.6 })));

    // Moon
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(4, 14, 14),
      mk(0xeeeedd, 0.5, 0, { emissive: 0xddcc88, emissiveIntensity: 0.5 })
    );
    moon.position.set(70, 100, -140);
    scene.add(moon);

    // ── Controls ──
    const s = st.current;
    const onDown = e => { s.down = true; s.lx = e.clientX ?? e.touches?.[0]?.clientX ?? 0; };
    const onUp   = () => { s.down = false; };
    const onMove = e => {
      if (!s.down) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      s.rotY += (cx - s.lx) * 0.008; s.lx = cx;
    };
    const onWheel = e => { s.zoom = Math.max(0.5, Math.min(1.8, s.zoom + e.deltaY * 0.001)); };

    mount.addEventListener("mousedown", onDown);
    mount.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    mount.addEventListener("wheel", onWheel, { passive: true });

    // ── Animate ──
    let t = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      t += 0.012;
      if (!s.down) s.rotY += 0.0016;
      root.rotation.y = s.rotY;

      // Smooth zoom
      const tz = 52 * s.zoom;
      camera.position.z += (tz - camera.position.z) * 0.07;

      // Beacon flicker
      beaconPt.intensity = 2.5 + Math.sin(t * 4) * 1.5;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    setTimeout(() => setLoaded(true), 350);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      mount.removeEventListener("mousedown", onDown);
      mount.removeEventListener("touchstart", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      mount.removeEventListener("wheel", onWheel);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      Object.values(bGeo).forEach(g => g.dispose());
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "480px",
      background: "#06090f",
      position: "relative",
      overflow: "hidden",
      borderRadius: 4,
      fontFamily: "'Courier New', monospace",
    }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%", cursor: "ew-resize" }} />

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 54,
        background: "linear-gradient(to bottom, rgba(6,9,15,0.92) 0%, transparent 100%)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 22px",
        opacity: loaded ? 1 : 0, transition: "opacity 1.4s ease",
        pointerEvents: "none",
      }}>
        {/* Logo */}


        {/* Project label */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "rgba(212,150,14,0.55)", fontSize: 7.5, letterSpacing: "0.30em", marginBottom: 2 }}>PROJECT</div>
          <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 10, letterSpacing: "0.20em" }}>MERIDIAN TOWER · 2026</div>
        </div>

        {/* Status */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 11px",
          border: "1px solid rgba(212,150,14,0.38)",
          background: "rgba(212,150,14,0.06)",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4960e", display: "inline-block", animation: "lp 2s ease-in-out infinite" }}/>
          <span style={{ color: "#d4960e", fontSize: 8, letterSpacing: "0.20em" }}>LIVE VIEW</span>
        </div>
      </div>

      {/* Bottom */}
  
      {/* Drag hint */}
      <div style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        opacity: loaded ? 0.30 : 0, transition: "opacity 2.5s ease 1.4s",
        pointerEvents: "none", display: "flex", alignItems: "center", gap: 6,
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 6h10M7.5 3.5l2.5 2.5-2.5 2.5M4.5 3.5L2 6l2.5 2.5" stroke="white" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ color: "white", fontSize: 8, letterSpacing: "0.20em" }}>DRAG · SCROLL ZOOM</span>
      </div>

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(6,9,15,0.48) 100%)",
      }}/>

      <style>{`@keyframes lp{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </div>
  );
}