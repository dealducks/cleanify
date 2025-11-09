'use client';

interface LightRaysProps {
  color?: string;
  opacity?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default function LightRays({
  color = '#22c55e',
  opacity = 0.08,
  position = 'top-right'
}: LightRaysProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0 -rotate-45',
    'top-right': 'top-0 right-0 rotate-45',
    'bottom-left': 'bottom-0 left-0 rotate-45',
    'bottom-right': 'bottom-0 right-0 -rotate-45'
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-1/2 h-1/2 pointer-events-none overflow-hidden`}>
      <div className="relative w-full h-full">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute origin-bottom-left"
            style={{
              left: '50%',
              top: '50%',
              width: '200%',
              height: '2px',
              background: `linear-gradient(to right, ${color}, transparent)`,
              opacity: opacity,
              transform: `rotate(${i * 22.5}deg)`,
              transformOrigin: '0 0'
            }}
          />
        ))}
      </div>
    </div>
  );
}
