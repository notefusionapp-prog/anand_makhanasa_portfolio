import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const SpotlightCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  // Smooth springs for position
  const mouseX = useSpring(-500, { stiffness: 450, damping: 35 });
  const mouseY = useSpring(-500, { stiffness: 450, damping: 35 });

  useEffect(() => {
    // Check if device supports fine pointer (mouse, trackpad)
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsTouch(false);
    } else {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none fixed top-0 left-0 z-30 w-[450px] h-[450px] rounded-full bg-[#0d6efd]/[0.035] dark:bg-[#0d6efd]/[0.05] blur-3xl transition-opacity duration-300"
    />
  );
};
