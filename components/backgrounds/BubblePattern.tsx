'use client';

import { motion } from 'framer-motion';

interface BubblePatternProps {
  density?: 'low' | 'medium' | 'high';
  color?: string;
  opacity?: number;
}

export default function BubblePattern({
  density = 'medium',
  color = 'currentColor',
  opacity = 0.1
}: BubblePatternProps) {
  const bubbleCounts = {
    low: 15,
    medium: 25,
    high: 40
  };

  const bubbles = Array.from({ length: bubbleCounts[density] }, (_, i) => ({
    id: i,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bubbleGradient">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        {bubbles.map((bubble) => (
          <motion.circle
            key={bubble.id}
            cx={`${bubble.cx}%`}
            cy={`${bubble.cy}%`}
            r={bubble.r}
            fill="url(#bubbleGradient)"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1, 0],
              opacity: [0, opacity, opacity, 0],
              cy: [`${bubble.cy}%`, `${bubble.cy - 20}%`]
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>
    </div>
  );
}
