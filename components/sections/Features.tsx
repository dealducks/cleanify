'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaLeaf, FaClock, FaCheckCircle, FaShieldAlt, FaDollarSign } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import WavePattern from '@/components/backgrounds/WavePattern';
import SparklePattern from '@/components/backgrounds/SparklePattern';

const iconMap: Record<string, React.ReactNode> = {
  FaUserTie: <FaUserTie className="text-3xl" />,
  FaLeaf: <FaLeaf className="text-3xl" />,
  FaClock: <FaClock className="text-3xl" />,
  FaCheckCircle: <FaCheckCircle className="text-3xl" />,
  FaShieldAlt: <FaShieldAlt className="text-3xl" />,
  FaDollarSign: <FaDollarSign className="text-3xl" />,
};

interface FeaturesProps {
  locale: string;
}

export const Features: React.FC<FeaturesProps> = ({ locale }) => {
  const t = useTranslations('features');
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-primary-50/20 to-gray-50 overflow-hidden">
      <WavePattern position="both" color="#22c55e" opacity={0.12} />
      <SparklePattern density="low" color="#16a34a" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-primary-50/20 pointer-events-none" />
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 pt-8">
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: '1', icon: 'FaUserTie', titleKey: 'items.team.title', descKey: 'items.team.description' },
            { id: '2', icon: 'FaLeaf', titleKey: 'items.eco.title', descKey: 'items.eco.description' },
            { id: '3', icon: 'FaClock', titleKey: 'items.schedule.title', descKey: 'items.schedule.description' },
            { id: '4', icon: 'FaCheckCircle', titleKey: 'items.guarantee.title', descKey: 'items.guarantee.description' },
            { id: '5', icon: 'FaShieldAlt', titleKey: 'items.insured.title', descKey: 'items.insured.description' },
            { id: '6', icon: 'FaDollarSign', titleKey: 'items.pricing.title', descKey: 'items.pricing.description' },
          ].map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};