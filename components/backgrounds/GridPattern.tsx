'use client';

interface GridPatternProps {
  type?: 'dots' | 'lines' | 'diagonal';
  color?: string;
  opacity?: number;
  spacing?: number;
}

export default function GridPattern({
  type = 'lines',
  color = '#22c55e',
  opacity = 0.05,
  spacing = 32
}: GridPatternProps) {
  if (type === 'dots') {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
              <circle cx={spacing / 2} cy={spacing / 2} r="1.5" fill={color} opacity={opacity} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>
    );
  }

  if (type === 'diagonal') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="diagonal-pattern" x="0" y="0" width={spacing * 2} height={spacing * 2} patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2={spacing * 2} y2={spacing * 2} stroke={color} strokeWidth="1" opacity={opacity} />
              <line x1={spacing * 2} y1="0" x2="0" y2={spacing * 2} stroke={color} strokeWidth="1" opacity={opacity * 0.5} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-pattern)" />
        </svg>
      </div>
    );
  }

  // Default: lines
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid-pattern" x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2={spacing} stroke={color} strokeWidth="0.5" opacity={opacity} />
            <line x1="0" y1="0" x2={spacing} y2="0" stroke={color} strokeWidth="0.5" opacity={opacity} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}
