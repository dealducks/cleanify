'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  locale: string;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = useTranslations('hero');
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 overflow-hidden">
      <Container className="py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              🌟 {t('badge')}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('title')}
              <span className="block text-primary-600">{t('titleHighlight')}</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/booking`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {t('cta')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&h=800&fit=crop"
                alt="Professional Cleaning Service"
                fill
                className="object-cover"
                priority
              />
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t('ecoFriendly.title')}</div>
                    <div className="text-sm text-gray-600">{t('ecoFriendly.subtitle')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-200 rounded-full blur-2xl opacity-60"></div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};