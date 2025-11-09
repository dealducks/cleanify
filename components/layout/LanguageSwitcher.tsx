'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { locales, localeNames, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    // Save to localStorage
    localStorage.setItem('preferredLocale', newLocale);

    // Get current path without locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
      >
        <FaGlobe className="text-gray-600" />
        <span className="hidden md:inline text-sm font-medium text-gray-700">
          {localeNames[currentLocale as Locale]}
        </span>
        <FaChevronDown
          className={cn(
            'text-xs text-gray-600 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={cn(
                'w-full px-4 py-2 text-left text-sm hover:bg-primary-50 transition-colors flex items-center justify-between',
                currentLocale === locale && 'bg-primary-50 text-primary-600 font-medium'
              )}
            >
              <span>{localeNames[locale]}</span>
              {currentLocale === locale && (
                <span className="text-primary-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};