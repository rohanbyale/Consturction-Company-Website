import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis'; // 1. Import Lenis

// Components
import WaabiNavbar from './componets/Navbar';
import Footer from './componets/Footer'; 
import Prealoader from './componets/Prealoader';
import ScrollToTop from './componets/Scrolltotop';
import Home from './pages/Home';
import About from './pages/About';
import ProjectM from './pages/ProjectM';
import Contact from './pages/Contact';
import Career from './pages/Career';
import HomeSvg from './componets/Homesvg'
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard expo easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // 3. Connect Lenis to RequestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 4. Handle Loading Timer
    const timer = setTimeout(() => setLoading(false), 2800);

    return () => {
      clearTimeout(timer);
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <Router>
      <ScrollToTop /> 
      
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[9999]"
          >
            <Prealoader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="flex flex-col min-h-screen"
      >
        <WaabiNavbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<ProjectM />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
          </Routes>
        </main>
        {/* <HomeSvg /> */}
        <Footer />
      </motion.div>
    </Router>
  );
};

export default App;