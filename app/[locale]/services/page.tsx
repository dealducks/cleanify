'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHome, FaBuilding, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  FaHome: <FaHome className="text-4xl" />,
  FaBuilding: <FaBuilding className="text-4xl" />,
};

interface ServicesPageProps {
  params: {
    locale: string;
  };
}

export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
  const t = useTranslations('services');
  const tPricing = useTranslations('pricing');
  const tCommon = useTranslations('common');

  const servicesData = [
    {
      id: '1',
      key: 'home',
      slug: 'home-cleaning',
      icon: 'FaHome',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
    },
    {
      id: '2',
      key: 'office',
      slug: 'office-cleaning',
      icon: 'FaBuilding',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    },
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('description')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services Detailed */}
      <section className="py-20 bg-white">
        <Container>
          <div className="space-y-20">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={service.image}
                        alt={t(`${service.key}.title`)}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-6 left-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg text-primary-600">
                        {iconMap[service.icon]}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {t(`${service.key}.title`)}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {t(`${service.key}.description`)}
                    </p>

                    <h3 className="font-bold text-gray-900 mb-3">What's Included:</h3>
                    <ul className="space-y-2 mb-6">
                      {['0', '1', '2'].map((idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{t(`${service.key}.features.${idx}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t('startingAt')}</p>
                          <p className="text-3xl font-bold text-gray-900">
                            €{t(`${service.key}.price`)}
                          </p>
                        </div>
                        <Link href={`/${locale}/services/${service.slug}`}>
                          <Button size="lg" className="flex items-center gap-2">
                            {t('learnMore')}
                            <FaArrowRight />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tPricing('title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {tPricing('description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['basic', 'standard', 'premium'].map((plan, index) => (
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
                      {tPricing('mostPopular')}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                    {tPricing(plan)}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {tPricing(`plans.${plan}`)}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      €{plan === 'basic' ? '60' : plan === 'standard' ? '100' : '140'}
                    </span>
                    <span className="text-gray-600">{tPricing('perVisit')}</span>
                  </div>
                  <Link href={`/${locale}/booking`}>
                    <Button
                      variant={plan === 'standard' ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      {tCommon('getStarted')}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link href={`/${locale}/booking`}>
              <Button size="lg" variant="secondary">
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}