import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop devices with pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      if (target.closest('button') || target.closest('a')) {
        setCursorVariant('interactive');
        setCursorText('');
      } else if (target.closest('.project-card')) {
        setCursorVariant('project');
        setCursorText('VIEW');
      } else if (target.closest('.skill-card')) {
        setCursorVariant('skill');
        setCursorText('SKILL');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseOut = () => {
      setCursorVariant('default');
      setCursorText('');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      border: '2px solid rgba(6, 182, 212, 0.5)',
      opacity: 1
    },
    interactive: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      border: '2px solid rgba(6, 182, 212, 0.8)',
      opacity: 1
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(7, 10, 15, 0.8)',
      border: '2px solid rgba(16, 185, 129, 0.8)',
      opacity: 1
    },
    skill: {
      width: 72,
      height: 72,
      backgroundColor: 'rgba(7, 10, 15, 0.8)',
      border: '2px solid rgba(245, 158, 11, 0.8)',
      opacity: 1
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-sm"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest" style={{ color: cursorVariant === 'project' ? '#10b981' : '#f59e0b' }}>
            {cursorText}
          </span>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: cursorVariant === 'interactive' ? '#f59e0b' : '#06b6d4',
        }}
      />
    </>
  );
}
