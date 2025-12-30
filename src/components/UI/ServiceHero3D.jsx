import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ServiceHero3D({ title, subtitle, badge, highlight }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Check immediately
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-[60vh] lg:min-h-[80vh] bg-[#030712] flex items-center justify-center overflow-hidden pt-20">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-semibold text-sm tracking-widest uppercase backdrop-blur-md"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight max-w-5xl mx-auto"
        >
          {title.split(highlight).map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-500">
                  {highlight}
                </span>
              )}
            </React.Fragment>
          ))}
          {!highlight && title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <a href="/contact?tab=schedule" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <span>Start Project</span>
            <i className="bi bi-arrow-right"></i>
          </a>
        </motion.div>
      </div>

    </div>
  );
}


