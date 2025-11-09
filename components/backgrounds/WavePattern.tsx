'use client';

interface WavePatternProps {
  position?: 'top' | 'bottom' | 'both';
  color?: string;
  opacity?: number;
}

export default function WavePattern({
  position = 'both',
  color = '#22c55e',
  opacity = 0.1
}: WavePatternProps) {
  const WaveSVG = ({ flip = false }) => (
    <svg
      className={`w-full ${flip ? 'rotate-180' : ''}`}
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z"
        fill={color}
        opacity={opacity}
      />
      <path
        d="M0,80 C240,48 480,48 720,80 C960,112 1200,112 1440,80 L1440,120 L0,120 Z"
        fill={color}
        opacity={opacity * 0.6}
      />
    </svg>
  );

  return (
    <>
      {(position === 'top' || position === 'both') && (
        <div className="absolute top-0 left-0 w-full pointer-events-none">
          <WaveSVG />
        </div>
      )}
      {(position === 'bottom' || position === 'both') && (
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <WaveSVG flip />
        </div>
      )}
    </>
  );
}
