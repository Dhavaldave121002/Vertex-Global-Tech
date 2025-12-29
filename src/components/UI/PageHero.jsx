import React from 'react';
import { motion } from 'framer-motion';

export default function PageHero({ title, subtitle, badge, highlight }) {
  return (
    <div className="relative py-20 lg:py-32 text-center z-10 px-4">
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-semibold text-sm tracking-widest uppercase backdrop-blur-md"
        >
          {badge}
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
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
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
