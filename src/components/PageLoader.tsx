import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const PageLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#070d1e] text-[#0B1B3D] dark:text-white select-none transition-colors duration-300"
    >
      {/* Central Brand Mark */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-full bg-[#0d6efd] p-[2px] shadow-[0_4px_20px_rgba(13,110,253,0.35)] flex items-center justify-center">
            <span className="font-mono font-black text-xl text-white">AM</span>
          </div>
          {/* Subtle pulsating outer halo */}
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#0d6efd] blur-md -z-10"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center"
        >
          <div className="font-extrabold text-[#0B1B3D] dark:text-slate-100 text-base tracking-tight">Anand Makhanasa</div>
          <div className="text-xs text-[#0d6efd] dark:text-blue-400 font-bold mt-0.5">&lt;Flutter Developer /&gt;</div>
        </motion.div>
      </motion.div>

      {/* Minimal Progress Bar */}
      <div className="w-44 h-1.5 bg-blue-50 dark:bg-slate-900 rounded-full mt-7 overflow-hidden border border-blue-100/50 dark:border-blue-900/40">
        <motion.div
          className="h-full bg-[#0d6efd] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
};
