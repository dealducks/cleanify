'use client';

import React from 'react';

interface MapProps {
  location?: string;
  zoom?: number;
  className?: string;
}

export const Map: React.FC<MapProps> = ({
  location = 'Ružinov, Bratislava, Slovakia',
  zoom = 14,
  className = ''
}) => {
  // Encode the location for URL
  const encodedLocation = encodeURIComponent(location);

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedLocation}&zoom=${zoom}`;

  // Alternative: Use iframe without API key (shows basic map)
  const basicMapUrl = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={basicMapUrl}
        title={`Map of ${location}`}
        className="border-0"
      />
    </div>
  );
};
