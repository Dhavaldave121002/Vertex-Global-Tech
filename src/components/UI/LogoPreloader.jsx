import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/vglogo.jpg';

const LogoPreloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden font-sans">

      {/* Background Glow - Matches Site Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Logo Container */}
        <motion.div
          className="relative w-32 h-32 md:w-40 md:h-40 mb-8 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(37,99,235,0.3)] bg-black"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={logo}
            alt="Vertex Logo"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 1 }}
          />
        </motion.div>

        {/* Text */}
        <div className="text-center space-y-4">
          <motion.h1
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
              VERTEX GLOBAL TECH
            </span>
          </motion.h1>

          <motion.p
            className="text-blue-500 font-medium tracking-[0.3em] uppercase text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Innovating the Future
          </motion.p>
        </div>

        {/* Loading Line */}
        <motion.div
          className="w-48 h-[2px] bg-gray-800 rounded-full mt-10 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default LogoPreloader;
