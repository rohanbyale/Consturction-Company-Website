import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   TEXTURES  (small canvas → CanvasTexture, cached)
═══════════════════════════════════════════════════ */
function makeTex(fn, w = 256, h = 256) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  fn(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function brickTex() {
  return makeTex((g, w, h) => {
    g.fillStyle = "#c2afa0"; g.fillRect(0, 0, w, h);
    const bW = 52, bH = 20;
    for (let r = 0; r * bH < h + bH; r++) {
      const off = (r & 1) ? bW / 2 : 0;
      for (let c = -1; c * bW - off < w + bW; c++) {
        const x = c * bW - off, y = r * bH;
        const v = ((c * 7 + r * 13) & 31) - 15;
        g.fillStyle = `rgb(${180+v},${90+(v>>1)},${68+(v>>2)})`;
        g.fillRect(x+2, y+2, bW-4, bH-4);
        g.fillStyle="rgba(255,255,255,.07)"; g.fillRect(x+2,y+2,bW-4,3);
        g.fillStyle="rgba(0,0,0,.13)";       g.fillRect(x+2,y+bH-5,bW-4,3);
      }
    }
  }, 512, 256);
}

function shingleTex() {
  return makeTex((g, w, h) => {
    g.fillStyle = "#18140e"; g.fillRect(0, 0, w, h);
    const sW = 36, sH = 12;
    for (let r = 0; r * sH < h + sH; r++) {
      const off = (r & 1) ? sW / 2 : 0;
      for (let c = -1; c * sW - off < w + sW; c++) {
        const x = c * sW - off, y = r * sH;
        const v = ((c * 5 + r * 9) & 15) - 7, b = 46 + v;
        g.fillStyle = `rgb(${b+12},${b+9},${b+6})`;
        g.fillRect(x+1, y+1, sW-2, sH-2);
        g.fillStyle="rgba(255,255,255,.05)"; g.fillRect(x+1,y+1,sW-2,2);
        g.fillStyle="rgba(0,0,0,.18)";       g.fillRect(x+1,y+sH-3,sW-2,2);
      }
    }
  }, 512, 256);
}

function grassTex() {
  return makeTex((g, w, h) => {
    g.fillStyle = "#48783a"; g.fillRect(0, 0, w, h);
    const cs = ["#3a6a2c","#4e8438","#567a30","#3e6e2a"];
    for (let i = 0; i < 2800; i++) {
      g.fillStyle = cs[i & 3];
      g.fillRect((i * 137.5) % w, (i * 97.3) % h, 2 + (i & 2), 2);
    }
  });
}

function concreteTex(shade = "#bebab2") {
  return makeTex((g, w, h) => {
    g.fillStyle = shade; g.fillRect(0, 0, w, h);
    g.strokeStyle = "rgba(0,0,0,.07)"; g.lineWidth = 1;
    for (let x = 0; x < w; x += 68) { g.beginPath(); g.moveTo(x,0); g.lineTo(x,h); g.stroke(); }
    for (let y = 0; y < h; y += 68) { g.beginPath(); g.moveTo(0,y); g.lineTo(w,y); g.stroke(); }
    for (let i = 0; i < 280; i++) {
      g.fillStyle=`rgba(0,0,0,${.005+(i&3)*.003})`;
      g.fillRect((i*113)%w,(i*89)%h,2,2);
    }
  });
}

function doorTex() {
  return makeTex((g, w, h) => {
    g.fillStyle = "#28140a"; g.fillRect(0, 0, w, h);
    g.strokeStyle = "rgba(200,140,60,.06)"; g.lineWidth = 1;
    for (let i = 0; i < 16; i++) { g.beginPath(); g.moveTo(i*w/14,0); g.lineTo(i*w/14+2,h); g.stroke(); }
    [[.08,.05,.84,.44],[.08,.54,.84,.4]].forEach(([px,py,pw,ph]) => {
      g.strokeStyle="rgba(0,0,0,.5)"; g.lineWidth=3;
      g.strokeRect(px*w,py*h,pw*w,ph*h);
      g.fillStyle="rgba(0,0,0,.07)"; g.fillRect(px*w+2,py*h+2,pw*w-4,ph*h-4);
    });
  }, 128, 256);
}

/* ═══════════════════════════════════════════════════
   GEOMETRY + MATERIAL HELPERS
═══════════════════════════════════════════════════ */
// Geometry cache – reuse identical primitives
const _GC = {};
function G_BOX(w, h, d) {
  const k = `b${w}|${h}|${d}`;
  return _GC[k] || (_GC[k] = new THREE.BoxGeometry(w, h, d));
}
function G_CYL(rt, rb, h, s = 8) {
  const k = `c${rt}|${rb}|${h}|${s}`;
  return _GC[k] || (_GC[k] = new THREE.CylinderGeometry(rt, rb, h, s));
}
function G_CONE(r, h, s = 8) {
  const k = `co${r}|${h}|${s}`;
  return _GC[k] || (_GC[k] = new THREE.ConeGeometry(r, h, s));
}
function G_SPHERE(r, ws = 7, hs = 5) {
  const k = `s${r}|${ws}|${hs}`;
  return _GC[k] || (_GC[k] = new THREE.SphereGeometry(r, ws, hs));
}

// Material factories
const ML  = p => new THREE.MeshLambertMaterial(p);
const MSD = p => new THREE.MeshStandardMaterial(p);

// Place mesh
function put(scene, geo, mat, x, y, z, ry = 0, rx = 0, rz = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  if (rx) m.rotation.x = rx;
  if (ry) m.rotation.y = ry;
  if (rz) m.rotation.z = rz;
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
  return m;
}

/* ═══════════════════════════════════════════════════
   ROOF BUILDER — ExtrudeGeometry prism
   Guaranteed solid: no missing faces, correct normals.

   buildRoof(scene, roofMat, gableMat,
             cx, baseY, cz,   ← centre of wall top
             wallW, riseH, wallD,
             overhang)
═══════════════════════════════════════════════════ */
function buildRoof(scene, roofMat, gableMat,
                   cx, baseY, cz,
                   wallW, riseH, wallD,
                   ov = 0.55) {

  const eHW = wallW / 2 + ov;  // eave half-width
  const eHD = wallD / 2 + ov;  // eave half-depth (= extrusion half-length)

  /* ─ Roof prism via ExtrudeGeometry ─────────────────
     Cross section = gable triangle in the XZ plane.
     Extruded along Y (into the screen).  We then rotate.
  ─────────────────────────────────────────────────── */
  const shape = new THREE.Shape();
  shape.moveTo(-eHW, 0);
  shape.lineTo( eHW, 0);
  shape.lineTo(   0, riseH);
  shape.closePath();

  const extCfg = { depth: eHD * 2, bevelEnabled: false };
  const prismGeo = new THREE.ExtrudeGeometry(shape, extCfg);
  // ExtrudeGeometry extrudes along +Z.  Centre it and rotate so the ridge runs along Z.
  prismGeo.translate(0, 0, -eHD);  // centre along depth axis

  /* Split the geometry into two material groups:
       group 0 = end caps (the two gable triangles)  → gableMat
       group 1 = side quads  (the 2 slopes + bottom) → roofMat
     ExtrudeGeometry puts end caps in group 0, sides in group 1. */
  const roofMesh = new THREE.Mesh(prismGeo, [gableMat, roofMat]);
  roofMesh.position.set(cx, baseY, cz);
  roofMesh.castShadow = true;
  roofMesh.receiveShadow = true;
  scene.add(roofMesh);

  /* ─ Ridge cap ──────────────────────────────────── */
  const ridgeMat = ML({ color: "#1e1a12" });
  const rc = new THREE.Mesh(G_BOX(0.28, 0.24, eHD * 2 + 0.12), ridgeMat);
  rc.position.set(cx, baseY + riseH + 0.1, cz);
  rc.castShadow = true;
  scene.add(rc);

  /* ─ Fascia (eave boards, front+back) ─────────────*/
  const fasciaMat = ML({ color: "#ddd9d0" });
  [-1, 1].forEach(s => {
    const fz = cz + s * (eHD + 0.05);
    // Fascia board
    const fb = new THREE.Mesh(G_BOX(eHW * 2 + 0.16, 0.17, 0.2), fasciaMat);
    fb.position.set(cx, baseY - 0.04, fz);
    fb.castShadow = true;
    scene.add(fb);
    // Soffit
    const sf = new THREE.Mesh(G_BOX(eHW * 2 + 0.1, 0.06, ov * 0.82), fasciaMat);
    sf.position.set(cx, baseY - 0.04, cz + s * (wallD / 2 + ov * 0.45));
    scene.add(sf);
  });

  /* ─ Rake boards (along gable slopes, 4 edges) ────*/
  const ang  = Math.atan2(riseH, eHW);
  const sLen = Math.sqrt(eHW * eHW + riseH * riseH);
  [-1, 1].forEach(side => {        // left / right slope
    [-1, 1].forEach(front => {     // front / back gable
      const rb = new THREE.Mesh(G_BOX(sLen + 0.12, 0.13, 0.16), fasciaMat);
      rb.position.set(
        cx + side * eHW / 2,
        baseY + riseH / 2,
        cz + front * (eHD + 0.04)
      );
      rb.rotation.z = -side * ang;
      rb.castShadow = true;
      scene.add(rb);
    });
  });
}

/* ═══════════════════════════════════════════════════
   WINDOW HELPER
═══════════════════════════════════════════════════ */
function addWin(scene, x, y, z, w, h, ry, fMat, gMat) {
  const g = new THREE.Group();
  // Frame
  g.add(new THREE.Mesh(G_BOX(w+.2, h+.18, .13), fMat));
  // Glass
  const gp = new THREE.Mesh(new THREE.PlaneGeometry(w-.05, h-.05), gMat);
  gp.position.z = .05; g.add(gp);
  // Cross mullions
  g.add(new THREE.Mesh(G_BOX(w-.02, .05, .07), fMat));
  g.add(new THREE.Mesh(G_BOX(.05, h-.02, .07), fMat));
  // Sill
  const sill = new THREE.Mesh(G_BOX(w+.34, .08, .22), fMat);
  sill.position.set(0, -(h/2+.05), .06); g.add(sill);
  // Lintel
  const lin = new THREE.Mesh(G_BOX(w+.22, .07, .12), fMat);
  lin.position.set(0, h/2+.04, .01); g.add(lin);
  g.position.set(x, y, z); g.rotation.y = ry;
  g.children.forEach(c => { c.castShadow = true; c.receiveShadow = true; });
  scene.add(g);
}

/* ═══════════════════════════════════════════════════
   TREE + BUSH HELPERS
═══════════════════════════════════════════════════ */
function addTree(scene, x, z, tM, fM, s = 1) {
  put(scene, G_CYL(.09*s, .14*s, 1.7*s, 7), tM, x, .85*s, z);
  [[1.3*s, 1.5*s, 0], [1.0*s, 1.25*s, .62*s], [.62*s, .98*s, 1.22*s]]
    .forEach(([r, h, yo]) => put(scene, G_CONE(r, h, 8), fM, x, 1.6*s+yo, z));
}

function addBush(scene, x, z, mat, r = .36) {
  const m = new THREE.Mesh(G_SPHERE(r, 7, 5), mat);
  m.scale.y = .66; m.position.set(x, r*.66, z);
  m.castShadow = m.receiveShadow = true;
  scene.add(m);
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function Home3D() {
  const mountRef = useRef(null);
  const [hint, setHint] = useState(true);
  const [view, setView] = useState("FRONT");
  // Use a ref for camera state to avoid stale closure issues
  const cam = useRef({ phi:.42, theta:.34, r:22, sp:.42, st:.34, sr:22, vp:0, vt:0, drag:false, px:0, py:0 });

  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const C = cam.current;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    el.appendChild(renderer.domElement);

    /* ── Scene / Sky ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#87CEEB");
    scene.fog = new THREE.Fog("#b8d8f0", 45, 110);

    const skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(90, 16, 10),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
          top: { value: new THREE.Color("#1c5ca0") },
          bot: { value: new THREE.Color("#c8e8f8") },
        },
        vertexShader: `varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `varying vec3 vP;uniform vec3 top,bot;void main(){float t=clamp(vP.y/55.+.32,0.,1.);gl_FragColor=vec4(mix(bot,top,t),1.);}`,
      })
    );
    scene.add(skyDome);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(44, el.clientWidth / el.clientHeight, .1, 160);

    /* ── Lights ── */
    scene.add(new THREE.HemisphereLight("#b4d8ff", "#88a858", .65));
    scene.add(new THREE.AmbientLight("#ffe4cc", .28));

    const sun = new THREE.DirectionalLight("#fff4d0", 1.9);
    sun.position.set(14, 22, 10);
    sun.castShadow = true;
    sun.shadow.bias = -.0012;
    sun.shadow.normalBias = .02;
    sun.shadow.mapSize.set(1024, 1024);  // 1024 = fast, good quality
    Object.assign(sun.shadow.camera, { left:-28, right:28, top:22, bottom:-12, near:.5, far:90 });
    scene.add(sun);

    const fill = new THREE.DirectionalLight("#a8c4f0", .38);
    fill.position.set(-10, 7, -14); scene.add(fill);

    /* ── Textures ── */
    const BK = brickTex(), SH = shingleTex(), GR = grassTex();
    const CN = concreteTex(), DR = doorTex(), DV = concreteTex("#b2ae a6");

    /* ── MATERIALS ──────────────────────────────────
       MeshLambert for most surfaces (no specular calc = faster).
       MeshStandard only for glass, brass, chrome.
    ──────────────────────────────────────────────── */
    // Brick (walls)
    const bkM  = ML({ map: BK }); bkM.map.repeat.set(3, 2);
    const bkG  = ML({ map: BK }); bkG.map.repeat.set(2.2, 1.5);
    // bkDS = DoubleSide brick for gable triangles
    const bkDS = ML({ map: BK, side: THREE.DoubleSide }); bkDS.map.repeat.set(3, 2);
    // Roof shingles — DoubleSide so both gable caps + slopes render
    const roofM = MSD({ map: SH, roughness: .84, side: THREE.DoubleSide }); roofM.map.repeat.set(4, 3);
    // Ground
    const gndM  = ML({ map: GR }); gndM.map.repeat.set(18, 18);
    // Concrete / path
    const cnM   = ML({ map: CN }); cnM.map.repeat.set(4, 4);
    const drvM  = ML({ map: concreteTex("#b0aca4") }); drvM.map.repeat.set(2, 5);
    // Architectural trim
    const whtM  = ML({ color: "#f5f3ee" });
    const crmM  = ML({ color: "#eae6de" });
    const dkM   = ML({ color: "#24201a" });
    // Glass
    const glsM  = MSD({ color: "#80b8d8", roughness: .05, metalness: .08, transparent: true, opacity: .52, side: THREE.DoubleSide });
    // Door
    const drM   = ML({ map: DR });
    // Trees / plants
    const trnk  = ML({ color: "#6a4822" });
    const fol1  = ML({ color: "#386c22" });
    const fol2  = ML({ color: "#2c601a" });
    const bushM = ML({ color: "#3a6e2c" });
    const bush2 = ML({ color: "#2c6020" });
    // Garage door
    const garM  = ML({ color: "#e2dfd8" });
    // Hardware
    const brsM  = MSD({ color: "#c8a440", metalness: .9, roughness: .2 });
    const chrM  = MSD({ color: "#b0b8c0", metalness: .92, roughness: .14 });
    // Misc
    const stcM  = ML({ color: "#eeeae2" });
    const pvM   = ML({ color: "#b2aa9e" });
    const soilM = ML({ color: "#5a3c24" });
    const colM  = ML({ color: "#f3f1ed" });
    const chimM = ML({ map: BK }); chimM.map.repeat.set(1.6, 2.2);
    const chimDS = ML({ map: BK, side: THREE.DoubleSide }); chimDS.map.repeat.set(1.6, 2.2);

    /* ════════════════════════════════════════════════
       GROUND
    ════════════════════════════════════════════════ */
    const gnd = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), gndM);
    gnd.rotation.x = -Math.PI / 2; gnd.receiveShadow = true; scene.add(gnd);

    /* ════════════════════════════════════════════════
       FOUNDATION SLAB + PLINTH
    ════════════════════════════════════════════════ */
    put(scene, G_BOX(16.6, .46, 8.2), cnM,  1.8, .23, 0);
    put(scene, G_BOX(16.8, .3,  8.4), stcM, 1.8, .54, 0);

    /* ════════════════════════════════════════════════
       WALLS
         Main block  : 9 × 5.6 × 7.2  at cx=0
         Garage wing : 6.2 × 3.8 × 7.2 at cx=7.7
         Rear ext    : 4 × 3.2 × 4.6  at cx=-1.5,cz=-5.9
    ════════════════════════════════════════════════ */
    put(scene, G_BOX(9,   5.6, 7.2), bkM,  0,   3.08, 0);
    put(scene, G_BOX(6.2, 3.8, 7.2), bkG,  7.7, 2.1,  0);
    put(scene, G_BOX(4,   3.2, 4.6), bkG, -1.5, 1.8, -5.9);

    /* ════════════════════════════════════════════════
       ROOFS — ExtrudeGeometry prism (solid, no gaps)

       buildRoof(scene, slopeMat, gableMat,
                 cx, wallTopY, cz,
                 wallW, riseH, wallD, overhang)

       Wall tops:
         Main  : 0.46 (foundation) + 5.6 (wall)  = 6.06 — use 5.88 (belt at 0.18)
         Garage: 0.46 + 3.8 = 4.26 — use 3.92
         RearEx: 0.46 + 3.2 = 3.66 — use 3.36
    ════════════════════════════════════════════════ */
    buildRoof(scene, roofM, bkDS,   0,   5.88, 0,    9.0,  3.2, 7.2,  0.62);
    buildRoof(scene, roofM, bkDS,   7.7, 3.92, 0,    6.2,  2.1, 7.2,  0.52);
    buildRoof(scene, roofM, bkDS,  -1.5, 3.36,-5.9,  4.0,  1.4, 4.6,  0.4);

    // Cover the junction strip where main and garage roofs meet
    put(scene, G_BOX(.32, 3.6, .3), roofM, 4.65, 7.2, 0);

    /* ════════════════════════════════════════════════
       CHIMNEY
    ════════════════════════════════════════════════ */
    put(scene, G_BOX(.84, 4.4, .84), chimM,  -2.2, 7.7, -1.3);
    // Portion above main roof ridge (DoubleSide so gable shows it)
    put(scene, G_BOX(.84, 2.1, .84), chimDS, -2.2, 9.8, -1.3);
    // Cap stack
    put(scene, G_BOX(1.08,.14,1.08), dkM,   -2.2, 9.76,-1.3);
    put(scene, G_BOX(.66, .52, .66), dkM,   -2.2, 9.52,-1.3);
    put(scene, G_BOX(.96, .1,  .96), dkM,   -2.2, 9.24,-1.3);
    put(scene, G_CYL(.14,.18,.52,8), dkM,   -2.2, 10.05,-1.3);
    put(scene, G_CYL(.24,.24,.07,12),dkM,   -2.2, 10.33,-1.3);

    /* ════════════════════════════════════════════════
       ARCHITECTURAL TRIM
    ════════════════════════════════════════════════ */
    // Belt courses
    put(scene, G_BOX(9.4, .22, 7.6), crmM, 0,   1.5,  0);
    put(scene, G_BOX(6.6, .2,  7.6), crmM, 7.7, 1.28, 0);
    // Top cornice
    put(scene, G_BOX(9.4, .18, 7.6), crmM, 0,   5.82, 0);
    // Corner quoins (front face)
    [-4.74, 4.74].forEach(qx => {
      for (let i = 0; i < 6; i++) {
        const qH = 5.6 / 6, py = .32 + i * qH + qH / 2;
        const ex = .06 * (i & 1);
        put(scene, G_BOX(.26+ex, qH-.06, .26+ex), crmM, qx, py,  3.72);
        put(scene, G_BOX(.26+ex, qH-.06, .26+ex), crmM, qx, py, -3.72);
      }
    });

    /* ════════════════════════════════════════════════
       WINDOWS
    ════════════════════════════════════════════════ */
    const H2 = Math.PI / 2;
    // FRONT face (z=+3.72)
    addWin(scene, -2.28, 2.05, 3.74, 1.2,  1.48, 0,    whtM, glsM);
    addWin(scene,  2.28, 2.05, 3.74, 1.2,  1.48, 0,    whtM, glsM);
    addWin(scene, -2.28, 4.44, 3.74, 1.16, 1.32, 0,    whtM, glsM);
    addWin(scene,  2.28, 4.44, 3.74, 1.16, 1.32, 0,    whtM, glsM);
    // Bay window (center GF)
    put(scene, G_BOX(2.5, 1.65, .38), stcM,  0, 2.0,  3.97);
    put(scene, G_BOX(2.3, 1.5,  .06), glsM,  0, 2.0,  4.16);
    put(scene, G_BOX(2.5, .12,  .42), whtM,  0, 2.85, 3.98);
    put(scene, G_BOX(2.5, .12,  .42), whtM,  0, 1.17, 3.98);
    put(scene, G_BOX(.07, 1.65, .42), whtM, -1.2, 2.0, 3.98);
    put(scene, G_BOX(.07, 1.65, .42), whtM,  1.2, 2.0, 3.98);

    // BACK face (z=-3.72)
    addWin(scene, -2.1, 2.05,-3.74, 1.16, 1.44, Math.PI, whtM, glsM);
    addWin(scene,  2.1, 2.05,-3.74, 1.16, 1.44, Math.PI, whtM, glsM);
    addWin(scene, -2.1, 4.44,-3.74, 1.12, 1.3,  Math.PI, whtM, glsM);
    addWin(scene,  2.1, 4.44,-3.74, 1.12, 1.3,  Math.PI, whtM, glsM);

    // LEFT face (x=-4.72)
    addWin(scene, -4.76, 2.05,  1.4, 1.1,  1.42, -H2, whtM, glsM);
    addWin(scene, -4.76, 2.05, -1.4, 1.1,  1.42, -H2, whtM, glsM);
    addWin(scene, -4.76, 4.44,  0,   1.06, 1.3,  -H2, whtM, glsM);

    // RIGHT upper (x=+4.72)
    addWin(scene,  4.76, 4.44,  .9, .94, 1.26, H2, whtM, glsM);
    addWin(scene,  4.76, 4.44, -.9, .94, 1.26, H2, whtM, glsM);

    // GARAGE windows
    addWin(scene,  5.88, 3.1,  3.74, .96, .86, 0,    whtM, glsM);
    addWin(scene, 11.16, 2.24,  1.3, .88, .92, H2,   whtM, glsM);
    addWin(scene, 11.16, 2.24, -1.3, .88, .92, H2,   whtM, glsM);
    addWin(scene,  7.7,  4.04,-3.74, 1.0, 1.06, Math.PI, whtM, glsM);

    // REAR EXTENSION
    addWin(scene, -1.5, 2.0, -8.26, 1.0, 1.04, Math.PI, whtM, glsM);

    /* ════════════════════════════════════════════════
       FRONT DOOR  (with sidelights + transom)
    ════════════════════════════════════════════════ */
    // Frame
    put(scene, G_BOX(2.0, 2.62, .17), crmM, 0, 1.99, 3.72);
    // Main door leaf
    put(scene, G_BOX(1.08, 2.28, .07), drM,  0, 1.98, 3.76);
    // Transom
    put(scene, G_BOX(1.08,  .38, .07), glsM, 0, 3.27, 3.76);
    put(scene, G_BOX(1.08,  .14, .14), crmM, 0, 3.08, 3.72);
    // Sidelights
    put(scene, G_BOX(.32,  2.26, .07), glsM, -.7, 1.98, 3.76);
    put(scene, G_BOX(.32,  2.26, .07), glsM,  .7, 1.98, 3.76);
    // Handle
    put(scene, G_BOX(.07, .28, .09), brsM, .36, 1.96, 3.84);
    put(scene, G_BOX(.18, .07, .09), brsM, .28, 2.0,  3.84);

    /* ════════════════════════════════════════════════
       FRONT PORCH
    ════════════════════════════════════════════════ */
    put(scene, G_BOX(4.5, .2, 2.1), cnM,  0, .52, 4.82);
    // Steps
    put(scene, G_BOX(4.0, .18, .7),  crmM, 0, .36, 5.7);
    put(scene, G_BOX(3.5, .18, .64), crmM, 0, .18, 6.34);
    put(scene, G_BOX(3.0, .16, .58), crmM, 0, .02, 6.9);
    // Columns (×2)
    [-1.55, 1.55].forEach(cx => {
      put(scene, G_CYL(.112,.132,3.1,14), colM, cx, 2.17, 5.3);
      put(scene, G_BOX(.3,.13,.3), colM, cx, .57, 5.3);
      put(scene, G_BOX(.3,.13,.3), colM, cx, 3.76, 5.3);
    });
    // Porch entablature (ceiling slab)
    put(scene, G_BOX(3.9, .16, 1.5), crmM, 0, 3.9, 4.84);
    // Pediment face
    put(scene, G_BOX(3.9, .1, .08), crmM, 0, 3.98, 5.58);
    // Balusters
    [-1.5,-.75, 0, .75, 1.5].forEach(bx =>
      put(scene, G_CYL(.028,.028,.88, 6), whtM, bx, 1.08, 5.62)
    );
    put(scene, G_BOX(3.45, .08, .09), whtM, 0, 1.52, 5.62);
    put(scene, G_BOX(3.45, .05, .09), whtM, 0, .64,  5.62);

    /* ════════════════════════════════════════════════
       GARAGE DOOR  (4 horizontal panels, recessed)
    ════════════════════════════════════════════════ */
    for (let i = 0; i < 4; i++) {
      put(scene, G_BOX(5.0, .76, .12), garM, 7.7, .64+i*.78, 3.78);
      [-1.5, 0, 1.5].forEach(ox =>
        put(scene, G_BOX(1.38, .54, .05), crmM, 7.7+ox, .64+i*.78, 3.81)
      );
      if (i < 3) put(scene, G_BOX(5.0, .07, .14), crmM, 7.7, .27+i*.78, 3.8);
    }
    put(scene, G_BOX(5.2, 3.5, .18), crmM, 7.7, 2.0, 3.72);
    put(scene, G_BOX(.6,  .1,  .16), chrM, 7.7, 1.42, 3.88);

    /* ════════════════════════════════════════════════
       REAR DECK
    ════════════════════════════════════════════════ */
    put(scene, G_BOX(4.4, .16, 2.8), cnM, -1.5, .26, -9.2);
    [-2.0, 2.0].forEach(ox =>
      put(scene, G_CYL(.028,.028,1.08,6), whtM, -1.5+ox, .76, -10.5)
    );
    put(scene, G_BOX(4.6, .07, .09), whtM, -1.5, 1.32, -10.58);

    /* ════════════════════════════════════════════════
       DRIVEWAY + PATHS
    ════════════════════════════════════════════════ */
    put(scene, G_BOX(6.0, .05, 22), drvM, 7.7, .025, 12);
    [-3.1, 3.1].forEach(ox =>
      put(scene, G_BOX(.15, .07, 22), cnM, 7.7+ox, .035, 12)
    );
    // Front path
    put(scene, G_BOX(1.6, .07, 6.5), pvM, 0, .035, 7.9);

    /* ════════════════════════════════════════════════
       FLOWER BEDS  (soil strip)
    ════════════════════════════════════════════════ */
    put(scene, G_BOX(10.0, .08, 1.2), soilM,  0,   .04,  5.22);
    put(scene, G_BOX(1.2,  .08, 7.8), soilM, -5.7, .04,  .2);

    // Flowers — InstancedMesh per color (fast)
    const flGeo = G_SPHERE(.074, 6, 4);
    const flColors = ["#ff3050","#ffcc18","#e040cc","#f0f040","#30c8ff","#ff6820","#cc40ff","#40ff80"];
    flColors.forEach((col, ci) => {
      const inst = new THREE.InstancedMesh(flGeo, ML({color:col}), 5);
      const m4 = new THREE.Matrix4();
      for (let i = 0; i < 5; i++) {
        m4.setPosition(-4.5 + ci*.58, .22, 4.55 + i*.2 + Math.sin(ci+i)*.15);
        inst.setMatrixAt(i, m4);
      }
      inst.instanceMatrix.needsUpdate = true;
      inst.castShadow = true;
      scene.add(inst);
    });

    /* ════════════════════════════════════════════════
       TREES  (5 — fewer for perf)
    ════════════════════════════════════════════════ */
    addTree(scene, -8.5, -4.5, trnk, fol1, 1.28);
    addTree(scene, -8.0,  4.5, trnk, fol2, 1.12);
    addTree(scene, 13.5,  5.0, trnk, fol1, 1.44);
    addTree(scene, 12.5, -6.0, trnk, fol2, 1.18);
    addTree(scene, -5.5, -9.0, trnk, fol1,  .9);

    /* ════════════════════════════════════════════════
       BUSHES — InstancedMesh (single draw call)
    ════════════════════════════════════════════════ */
    const bushPositions = [
      [-3.8,5.2],[-2.4,5.2],[-.8,5.2],[.8,5.2],[2.4,5.2],[3.8,5.2],
      [-3.8,-4.3],[-2.4,-4.3],[-.8,-4.3],[.8,-4.3],[2.4,-4.3],[3.8,-4.3],
      [5.0,5.2],[6.6,5.2],[8.2,5.2],[9.8,5.2],[-5.9,2.6],[-5.9,-2.6],
    ];
    const bGeo = G_SPHERE(.36, 7, 5);
    const bInst = new THREE.InstancedMesh(bGeo, bushM, bushPositions.length);
    const bm = new THREE.Matrix4(), bs = new THREE.Matrix4().makeScale(1.1, .66, 1.0);
    bushPositions.forEach(([bx, bz], i) => {
      bm.makeTranslation(bx, .36*.66, bz).multiply(bs);
      bInst.setMatrixAt(i, bm);
    });
    bInst.instanceMatrix.needsUpdate = true;
    bInst.castShadow = true;
    scene.add(bInst);

    /* ════════════════════════════════════════════════
       SITE DETAILS
    ════════════════════════════════════════════════ */
    // Low retaining wall + gate posts
    put(scene, G_BOX(11.2,.42,.22), crmM, 0, .42, 5.82);
    [-2.1, 2.1].forEach(gx => {
      put(scene, G_BOX(.28,.9,.28),  crmM, gx, .9,  5.82);
      put(scene, G_BOX(.34,.1,.34),  crmM, gx, 1.36,5.82);
      put(scene, G_CONE(.1,.3,7),    dkM,  gx, 1.52,5.82);
    });
    // Mailbox
    put(scene, G_CYL(.04,.05,1.1,7), dkM, -7.5, .55, 11.2);
    put(scene, G_BOX(.44,.3,.62), ML({color:"#2a3848"}), -7.5, 1.15, 11.2);

    /* ════════════════════════════════════════════════
       CAMERA ORBIT (smooth, inertia)
    ════════════════════════════════════════════════ */
    const tgt = new THREE.Vector3(1.8, 2.4, 0);
    const syncCam = () => {
      camera.position.set(
        tgt.x + C.sr * Math.cos(C.st) * Math.sin(C.sp),
        tgt.y + C.sr * Math.sin(C.st),
        tgt.z + C.sr * Math.cos(C.st) * Math.cos(C.sp)
      );
      camera.lookAt(tgt);
    };
    syncCam();

    const onDown = e => {
      C.drag = true;
      C.px = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      C.py = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      C.vp = C.vt = 0;
      setHint(false);
      el.style.cursor = "grabbing";
    };
    const onMove = e => {
      if (!C.drag) return;
      const nx = e.clientX ?? e.touches?.[0]?.clientX ?? C.px;
      const ny = e.clientY ?? e.touches?.[0]?.clientY ?? C.py;
      C.vp = -(nx - C.px) / el.clientWidth  * 5.5;
      C.vt =  (ny - C.py) / el.clientHeight * 3.4;
      C.phi   = C.phi + C.vp;
      C.theta = Math.max(.06, Math.min(1.44, C.theta + C.vt));
      C.px = nx; C.py = ny;
      const a = ((C.phi % (Math.PI*2)) + Math.PI*2) % (Math.PI*2);
      setView(a < .82 || a > 5.46 ? "FRONT" : a < 2.38 ? "LEFT" : a < 3.88 ? "REAR" : "RIGHT");
    };
    const onUp   = () => { C.drag = false; el.style.cursor = "grab"; };
    const onWheel = e => {
      e.preventDefault();
      C.r = Math.max(6, Math.min(44, C.r + e.deltaY * .022));
    };

    el.addEventListener("mousedown",  onDown);
    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseup",    onUp);
    el.addEventListener("mouseleave", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove",  onMove, { passive: true });
    el.addEventListener("touchend",   onUp);
    el.addEventListener("wheel",      onWheel, { passive: false });
    el.style.cursor = "grab";

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Render loop ── */
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!C.drag) {
        C.vp *= .87; C.vt *= .85;
        C.phi   += C.vp;
        C.theta = Math.max(.06, Math.min(1.44, C.theta + C.vt));
      }
      C.sp += (C.phi   - C.sp) * .1;
      C.st += (C.theta - C.st) * .1;
      C.sr += (C.r     - C.sr) * .1;
      syncCam();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousedown",  onDown);
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseup",    onUp);
      el.removeEventListener("mouseleave", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onUp);
      el.removeEventListener("wheel",      onWheel);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  // View jump buttons
  const VIEWS = [
    { l: "FRONT", phi: .42 },
    { l: "RIGHT", phi: -Math.PI/2 + .4 },
    { l: "REAR",  phi: Math.PI + .42 },
    { l: "LEFT",  phi: Math.PI/2 + .4 },
  ];
  const jumpTo = phi => {
    cam.current.phi   = phi;
    cam.current.theta = .34;
    cam.current.r     = 22;
  };

  return (
    <div style={{ width:"100vw", height:"100vh", overflow:"hidden", position:"relative",
      fontFamily:"'Share Tech Mono',monospace", background:"#87ceeb" }}>

      {/* ── Canvas ── */}
      <div ref={mountRef} style={{ width:"100%", height:"100%" }} />

      {/* ── TOP BAR ── */}
      <div style={{ position:"absolute", top:0, left:0, right:0, pointerEvents:"none",
        background:"linear-gradient(180deg,rgba(2,6,14,.75) 0%,transparent 100%)",
        padding:"15px 22px 40px",
        display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        {/* Brand mark */}
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        
          <div>
            <div style={{ fontSize:8.5, letterSpacing:".55em",
              color:"#eefc55", opacity:.78, textTransform:"uppercase" }}>
             UrbanRise Builders
            </div>
            <div style={{ fontSize:6.5, letterSpacing:".4em",
              color:"rgba(238,252,85,.38)", textTransform:"uppercase", marginTop:2 }}>
              Pusad · Maharashtra · 2026
            </div>
          </div>
        </div>
        {/* View label */}
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:6.5, letterSpacing:".5em",
            color:"rgba(238,252,85,.36)", textTransform:"uppercase", marginBottom:3 }}>
            viewing
          </div>
          <div style={{ fontSize:15, letterSpacing:".45em",
            color:"#eefc55", opacity:.88, textTransform:"uppercase" }}>
            {view}
          </div>
        </div>
      </div>

      {/* ── LEFT: VIEW BUTTONS ── */}
      <div style={{ position:"absolute", left:18, top:"50%", transform:"translateY(-50%)",
        display:"flex", flexDirection:"column", gap:3 }}>
        {VIEWS.map(({ l, phi }) => {
          const active = view === l;
          return (
            <button key={l} onClick={() => jumpTo(phi)} style={{
              display:"flex", alignItems:"center", gap:9, padding:"9px 16px",
              background: active ? "rgba(238,252,85,.15)" : "rgba(2,6,14,.72)",
              backdropFilter:"blur(14px)",
              border:`1px solid ${active ? "rgba(238,252,85,.52)" : "rgba(238,252,85,.14)"}`,
              cursor:"pointer", outline:"none", transition:"all .2s",
            }}>
              <div style={{
                width:5, height:5, borderRadius:"50%", flexShrink:0, transition:"all .2s",
                background: active ? "#eefc55" : "rgba(238,252,85,.26)",
                boxShadow: active ? "0 0 8px rgba(238,252,85,.75)" : "none",
              }}/>
              <span style={{
                fontSize:7.5, letterSpacing:".42em", textTransform:"uppercase", transition:"color .2s",
                color: active ? "#eefc55" : "rgba(238,252,85,.38)",
                whiteSpace:"nowrap",
              }}>{l}</span>
            </button>
          );
        })}
      </div>

      {/* ── RIGHT: INFO PANEL ── */}
      <div style={{ position:"absolute", right:18, top:"50%", transform:"translateY(-50%)",
        background:"rgba(2,6,14,.72)", backdropFilter:"blur(14px)",
        border:"1px solid rgba(238,252,85,.14)",
        padding:"18px 14px", display:"flex", flexDirection:"column",
        alignItems:"center", gap:12 }}>
        {/* Compass */}
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="23" fill="none" stroke="rgba(238,252,85,.18)" strokeWidth="1"/>
          <circle cx="25" cy="25" r="19" fill="none" stroke="rgba(238,252,85,.08)"
            strokeWidth="1" strokeDasharray="2 4"/>
          {[["N",25,7,"#eefc55"],["E",44,28,"rgba(238,252,85,.4)"],
            ["S",25,46,"rgba(238,252,85,.4)"],["W",7,28,"rgba(238,252,85,.4)"]].map(([l,x,y,c])=>(
            <text key={l} x={x} y={y} textAnchor="middle" fontSize="8"
              fill={c} fontFamily="Share Tech Mono">{l}</text>
          ))}
          <circle cx="25" cy="25" r="2.5" fill="rgba(238,252,85,.6)"/>
        </svg>
        <div style={{ width:1, height:18, background:"rgba(238,252,85,.1)" }}/>
        {[["G+2","FLOORS"],["4 BHK","PLAN"],["2,400","SQ.FT"]].map(([v,l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:12, color:"rgba(238,252,85,.68)",
              letterSpacing:".1em", lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:6, letterSpacing:".38em",
              color:"rgba(238,252,85,.28)", textTransform:"uppercase", marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM CONTROLS ── */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, pointerEvents:"none",
        background:"linear-gradient(0deg,rgba(2,6,14,.72) 0%,transparent 100%)",
        padding:"28px 0 16px", display:"flex", justifyContent:"center" }}>
        {[["⟳","Drag · Rotate"],["⊕","Scroll · Zoom"],["⬡","4 Sides"],["◈","Shadows"]].map(([ic,lb],i,a) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:8, padding:"9px 20px",
            background:"rgba(2,6,14,.82)", backdropFilter:"blur(14px)",
            border:"1px solid rgba(238,252,85,.16)",
            borderRight: i < a.length-1 ? "none" : "1px solid rgba(238,252,85,.16)",
          }}>
            <span style={{ fontSize:13, color:"#eefc55", opacity:.55 }}>{ic}</span>
            <span style={{ fontSize:7, letterSpacing:".3em",
              color:"rgba(238,252,85,.34)", textTransform:"uppercase" }}>{lb}</span>
          </div>
        ))}
      </div>

      {/* ── DRAG HINT ── */}
      {hint && (
        <div style={{ position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)", pointerEvents:"none" }}>
          <div style={{ width:74, height:74, borderRadius:"50%",
            border:"2px solid rgba(238,252,85,.55)", animation:"rng1 2.6s ease forwards" }}/>
          <div style={{ position:"absolute", inset:18, borderRadius:"50%",
            border:"1.5px solid rgba(238,252,85,.38)", animation:"rng2 2.6s ease .35s forwards" }}/>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @keyframes rng1{0%{transform:scale(.25);opacity:.9}100%{transform:scale(3.5);opacity:0}}
        @keyframes rng2{0%{transform:scale(.38);opacity:.7}100%{transform:scale(3.0);opacity:0}}
        *{box-sizing:border-box}
        button:hover span{color:rgba(238,252,85,.72) !important}
        ::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  );
}