import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[2147483647] p-4 rounded-2xl bg-blue-600/10 backdrop-blur-xl border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] group"
          aria-label="Back to top"
        >
          <div className="relative overflow-hidden">
            <FaArrowUp className="text-xl transform group-hover:-translate-y-1 transition-transform" />
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
          </div>

          {/* Tech Scan Line Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-400/50 animate-scan"></div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
