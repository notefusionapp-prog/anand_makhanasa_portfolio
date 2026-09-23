import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WhatsAppIcon, WHATSAPP_URL } from './ProjectEnquiryModal';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      aria-label="Contact options"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center select-none print:hidden pointer-events-auto"
    >
      {/* Background ambient warm / green glow matching Reference Image 2 */}
      <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 via-emerald-500/25 to-emerald-400/20 rounded-full blur-xl pointer-events-none -z-10" />

      <div 
        className="relative flex items-center group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pill Badge: 'Talk on WhatsApp' matching Reference Image 2 */}
        <AnimatePresence>
          {(isHovered || true) && (
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:flex items-center gap-2 pr-5 pl-4 py-2.5 -mr-4 rounded-full bg-[#111827]/92 hover:bg-black dark:bg-[#15203b]/95 dark:hover:bg-[#1a294c] text-white shadow-xl border border-white/10 backdrop-blur-md transition-colors cursor-pointer text-xs font-semibold tracking-tight"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shadow-[0_0_8px_#25D366]" />
              <span>Talk on WhatsApp</span>
            </motion.a>
          )}
        </AnimatePresence>

        {/* Circular Floating WhatsApp Button matching Reference Image 2 */}
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Anand on WhatsApp"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,211,102,0.55)] transition-colors duration-200 cursor-pointer"
        >
          {/* Subtle concentric pulse wave */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/35 animate-ping pointer-events-none -z-10" />
          <span className="absolute -inset-2.5 rounded-full bg-[#25D366]/15 animate-pulse pointer-events-none -z-10" />

          {/* Official WhatsApp glyph */}
          <WhatsAppIcon className="w-7 h-7 text-white fill-current drop-shadow-sm" />
        </motion.a>

        {/* Mobile Tooltip indicator on tap/hover */}
        <div className="sm:hidden absolute bottom-full right-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-2.5 py-1 rounded-md bg-black/85 text-white text-[10px] font-medium whitespace-nowrap shadow-lg">
            Chat on WhatsApp
          </div>
        </div>
      </div>
    </aside>
  );
};
