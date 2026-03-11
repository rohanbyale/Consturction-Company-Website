import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  MeshTransmissionMaterial 
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Diamond, MousePointer2, Share2, Award, X, MoveRight, Layers } from 'lucide-react';
import * as THREE from 'three';

// 1. Optimized 3D Specimen Component
function SpecialStone({ isOpen, setIsOpen }) {
  const meshRef = useRef();
  const { mouse } = useThree();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotation logic - follows mouse movement
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.4, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.4, 0.1);
    meshRef.current.position.y = Math.sin(time) * 0.15;
    
    // Scale transition logic
    const targetScale = isOpen ? 1.4 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        castShadow 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <icosahedronGeometry args={[2.8, 0]} /> {/* Increased base size */}
        <MeshTransmissionMaterial
          backside
          samples={10}
          thickness={isOpen ? 0.2 : 1.5}
          chromaticAberration={0.06}
          anisotropy={0.5}
          distortion={isOpen ? 0.8 : 0.1}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#0B4650" 
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function LuxurySpecialPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#F9F7F2] text-[#0B4650] overflow-hidden flex flex-col font-sans selection:bg-[#E6FF2B]">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: isOpen ? 1.2 : 1, opacity: isOpen ? 0.5 : 0.2 }}
          className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-[#0B4650] blur-[140px] rounded-full" 
        />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#E6FF2B]/30 blur-[120px] rounded-full" />
      </div>

      {/* HEADER */}
      <nav className="relative z-50 flex justify-between items-center p-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0B4650] rounded-full flex items-center justify-center font-serif italic text-[#E6FF2B] text-xl">S</div>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase hidden sm:block">Sahyadri</span>
        </div>
        <div className="flex gap-8 items-center">
          <Share2 size={20} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
        </div>
      </nav>

      {/* HERO CONTENT */}
      <main className="relative flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* TEXT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isOpen ? 0.1 : 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-[#0B4650]/10 px-4 py-1.5 rounded-full mb-6">
              <Layers size={12} className="text-[#0B4650]" />
              <span className="text-[9px] font-black uppercase tracking-widest">Specimen 47/100</span>
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-serif italic leading-[0.85] tracking-tighter mb-8">
              Silent <br /> Witness.
            </h1>
            <p className="max-w-md text-sm text-[#0B4650]/70 leading-relaxed">
              Basaltic formation from the Deccan Traps, captured in a moment of crystalline perfection.
            </p>
          </motion.div>
        </div>

        {/* 3D CANVAS CONTAINER */}
        <div className="absolute inset-0 lg:left-1/2 lg:w-1/2 h-full z-10">
          <Canvas dpr={[1, 2]} shadows>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
              <Environment preset="night" /> {/* High contrast for teal stone */}
              <spotLight position={[10, 10, 10]} intensity={2.5} color="#E6FF2B" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#0B4650" />
              
              <SpecialStone isOpen={isOpen} setIsOpen={setIsOpen} />
              
              <ContactShadows 
                position={[0, -3.5, 0]} 
                opacity={0.3} 
                scale={15} 
                blur={3} 
                far={10} 
                color="#0B4650" 
              />
            </Suspense>
          </Canvas>
        </div>

        {/* CORNER DATA PANEL */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 50 }}
              className="absolute right-6 top-6 lg:right-12 lg:top-12 z-50 w-80"
            >
              <div className="bg-[#0B4650] text-[#F9F7F2] p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#E6FF2B]">Internal Matrix</span>
                  <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-full hover:bg-[#E6FF2B] hover:text-[#0B4650] transition-colors">
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 opacity-50">
                      <Diamond size={12} />
                      <span className="text-[8px] uppercase font-bold tracking-widest">Luster</span>
                    </div>
                    <span className="text-xl font-serif italic">Vitreous</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 opacity-50">
                      <Layers size={12} />
                      <span className="text-[8px] uppercase font-bold tracking-widest">Cleavage</span>
                    </div>
                    <span className="text-xl font-serif italic">Perfect / Cubic</span>
                  </div>
                </div>

                <button className="w-full mt-10 py-4 bg-[#E6FF2B] text-[#0B4650] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                  Start Acquisition
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="relative z-30 p-8 flex justify-between items-center bg-white/40 backdrop-blur-xl border-t border-[#0B4650]/5">
        <div className="flex items-center gap-4">
          <Award size={18} />
          <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Verified Origin</span>
        </div>
        
        {!isOpen && (
          <motion.div className="flex items-center gap-3 animate-pulse">
            <MousePointer2 size={14} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Click to inspect</span>
          </motion.div>
        )}
      </footer>
    </div>
  );
}