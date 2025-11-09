'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface HomeCleaningPageProps {
  params: {
    locale: string;
  };
}

export default function HomeCleaningPage({ params: { locale } }: HomeCleaningPageProps) {
  const t = useTranslations('services.home');
  const tPage = useTranslations('servicePages.home');
  const tCommon = useTranslations('servicePages.common');
  const tPricing = useTranslations('pricing');

  const serviceImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop';

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {t('description')}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">{tCommon('rating')} ({tPage('reviews')})</span>
              </div>
              <Link href={`/${locale}/booking`}>
                <Button size="lg">{tPage('bookNow')}</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={serviceImage}
                alt={t('title')}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            {tCommon('whatsIncluded')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['0', '1', '2'].map((idx, index) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{t(`features.${idx}`)}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tPage('pricingTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {tPage('pricingDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['basic', 'standard', 'premium'].map((plan, index) => {
              const price = plan === 'basic' ? 50 : plan === 'standard' ? 80 : 90;
              const featureCount = plan === 'basic' ? 1 : plan === 'standard' ? 2 : 4;

              return (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-8 ${plan === 'standard' ? 'ring-2 ring-primary-600' : ''}`}>
                    {plan === 'standard' && (
                      <div className="bg-primary-600 text-white text-sm font-bold py-1 px-4 rounded-full inline-block mb-4">
                        {tCommon('popular')}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                      {tPricing(plan)}
                    </h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        €{price}
                      </span>
                      <span className="text-gray-600">{tCommon('perVisit')}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {Array.from({ length: featureCount }).map((_, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FaCheckCircle className="text-primary-600" />
                          <span className="text-sm">{tPage(`pricingFeatures.${plan}.${idx}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/${locale}/booking`}>
                      <Button
                        variant={plan === 'standard' ? 'primary' : 'outline'}
                        className="w-full"
                      >
                        {tCommon('selectPlan')}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              {tPage('cta.title')}
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              {tPage('cta.description')}
            </p>
            <Link href={`/${locale}/booking`}>
              <Button size="lg" variant="secondary">
                {tPage('cta.button')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}