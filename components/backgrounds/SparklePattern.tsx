'use client';

import { motion } from 'framer-motion';

interface SparklePatternProps {
  density?: 'low' | 'medium' | 'high';
  color?: string;
}

export default function SparklePattern({
  density = 'low',
  color = '#22c55e'
}: SparklePatternProps) {
  const sparkleCounts = {
    low: 8,
    medium: 15,
    high: 25
  };

  const sparkles = Array.from({ length: sparkleCounts[density] }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 16 + 8,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill={color}
              opacity="0.6"
            />
            <path
              d="M12 6L12.75 9.25L16 10L12.75 10.75L12 14L11.25 10.75L8 10L11.25 9.25L12 6Z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
