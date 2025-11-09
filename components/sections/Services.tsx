'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHome, FaBuilding, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import GridPattern from '@/components/backgrounds/GridPattern';
import FloatingParticles from '@/components/backgrounds/FloatingParticles';

const iconMap: Record<string, React.ReactNode> = {
  FaHome: <FaHome className="text-3xl" />,
  FaBuilding: <FaBuilding className="text-3xl" />,
};

interface ServicesProps {
  locale: string;
}

export const Services: React.FC<ServicesProps> = ({ locale }) => {
  const t = useTranslations('services');
  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-primary-50/30 to-white overflow-hidden">
      <GridPattern type="diagonal" color="#22c55e" opacity={0.08} spacing={40} />
      <FloatingParticles count={15} color="#22c55e" opacity={0.2} />
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-600 font-semibold uppercase tracking-wide text-sm">
              {t('subtitle')}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t('title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              id: '1',
              slug: 'home-cleaning',
              icon: 'FaHome',
              image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
              titleKey: 'home.title',
              descKey: 'home.shortDescription',
              features: ['home.features.0', 'home.features.1', 'home.features.2'],
              priceKey: 'home.price'
            },
            {
              id: '2',
              slug: 'office-cleaning',
              icon: 'FaBuilding',
              image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
              titleKey: 'office.title',
              descKey: 'office.shortDescription',
              features: ['office.features.0', 'office.features.1', 'office.features.2'],
              priceKey: 'office.price'
            },
          ].map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-primary-600">
                    {iconMap[service.icon]}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t(service.descKey)}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((featureKey, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="text-primary-500 mr-2">✓</span>
                        {t(featureKey)}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">{t('startingAt')}</span>
                      <div className="text-2xl font-bold text-gray-900">
                        €{t(service.priceKey)}
                      </div>
                    </div>
                    <Link href={`/${locale}/services/${service.slug}`}>
                      <Button variant="outline" className="flex items-center gap-2">
                        {t('learnMore')}
                        <FaArrowRight className="text-sm" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${locale}/services`}>
            <Button size="lg">{t('viewAll')}</Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};