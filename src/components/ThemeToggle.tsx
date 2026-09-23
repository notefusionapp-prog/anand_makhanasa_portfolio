import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = false, className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-300 cursor-pointer ${
        isDark 
          ? 'bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-750 hover:border-slate-600 shadow-sm' 
          : 'bg-slate-100 text-slate-700 border border-slate-200/90 hover:bg-slate-200/80 hover:text-slate-900 shadow-xs'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-amber-500"
        >
          <Sun className="w-4 h-4 fill-amber-500/20" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-indigo-400"
        >
          <Moon className="w-4 h-4 fill-indigo-400/20" />
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none pr-1">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </motion.button>
  );
};
