// This file will replace app/layout.tsx
// After running migration script, rename this to layout.tsx

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cleanify - Professional Cleaning Services',
  description: 'Expert cleaning services for homes and offices. Eco-friendly, reliable, and thorough cleaning solutions.',
  keywords: 'cleaning services, home cleaning, office cleaning, professional cleaners, eco-friendly cleaning',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}