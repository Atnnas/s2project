'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedButtonText({ 
  text, 
  baseColor = 'currentColor', 
  glowColor = 'rgba(255,255,255,0.6)',
  className = '',
  delay = 0,
  repeatDelay = 6
}) {
  if (!text) return null;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ color: baseColor, textShadow: '0 0 0px transparent' }}
          animate={{ 
            color: [baseColor, '#ffffff', baseColor],
            textShadow: [
              '0 0 0px transparent', 
              '0 0 10px rgba(255,255,255,0.5)', 
              '0 0 0px transparent'
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 10,
            delay: delay + (i * 0.1),
            ease: "easeInOut"
          }}
          className={char === ' ' ? 'mr-[0.25em]' : ''}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
