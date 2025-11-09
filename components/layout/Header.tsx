// EXAMPLE: Updated Header with i18n support
// Replace your Header.tsx with this after migration

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');

  // Navigation items with translation keys
  const navigationItems = [
    { label: t('home'), href: `/${locale}` },
    { label: t('about'), href: `/${locale}/about` },
    {
      label: t('services'),
      href: `/${locale}/services`,
      children: [
        { label: t('homeCleaning'), href: `/${locale}/services/home-cleaning` },
        { label: t('officeCleaning'), href: `/${locale}/services/office-cleaning` },
      ]
    },
    { label: t('blog'), href: `/${locale}/blog` },
    { label: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center relative">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">Cleanify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <>
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                      <span>{item.label}</span>
                      <FaChevronDown className="text-xs" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 first:rounded-t-lg last:rounded-b-lg transition-colors',
                            pathname === child.href && 'bg-primary-50 text-primary-600'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-gray-700 hover:text-primary-600 transition-colors font-medium',
                      pathname === item.href && 'text-primary-600'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side: Language Switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <Link href={`/${locale}/contact`}>
              <Button>{t('getQuote')}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <Container>
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <>
                      <div className="px-4 py-2 text-gray-900 font-medium">
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-8 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600',
                            pathname === child.href && 'bg-primary-50 text-primary-600'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg',
                        pathname === item.href && 'bg-primary-50 text-primary-600'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Language Switcher in Mobile */}
              <div className="px-4 pt-4 border-t">
                <LanguageSwitcher currentLocale={locale} />
              </div>

              {/* CTA in Mobile */}
              <div className="px-4 pt-4">
                <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">{t('getQuote')}</Button>
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};