'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-white">Cleanify</span>
            </div>
            <p className="text-sm mb-4">
              {t('company.description')}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('quickLinks.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('quickLinks.services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('quickLinks.blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('quickLinks.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('services.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/services/home-cleaning`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('services.homeCleaning')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/office-cleaning`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('services.officeCleaning')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  {t('services.deepCleaning')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  {t('services.moveInOut')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  {t('services.windowCleaning')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-sm">{t('contact.address')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <a href={`tel:${t('contact.phoneRaw')}`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('contact.phone')}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <a href={`mailto:${t('contact.email')}`} className="text-sm hover:text-primary-400 transition-colors">
                  {t('contact.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-center md:text-left mb-4 md:mb-0">
              <p className="mb-2">
                &copy; {currentYear} Cleanify. {t('bottom.copyright')}
              </p>
              <p className="text-xs text-gray-500">
                Website made by <a href="https://pawlynx.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">PawLynx</a>
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm hover:text-primary-400 transition-colors">
                {t('bottom.privacy')}
              </Link>
              <Link href="#" className="text-sm hover:text-primary-400 transition-colors">
                {t('bottom.terms')}
              </Link>
              <Link href="#" className="text-sm hover:text-primary-400 transition-colors">
                {t('bottom.cookies')}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};