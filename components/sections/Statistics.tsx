'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import BubblePattern from '@/components/backgrounds/BubblePattern';
import SparklePattern from '@/components/backgrounds/SparklePattern';

interface StatisticsProps {
  locale: string;
}

export const Statistics: React.FC<StatisticsProps> = ({ locale }) => {
  const t = useTranslations('statistics');

  return (
    <section className="relative py-16 bg-primary-50 overflow-hidden">
      <BubblePattern density="medium" color="#22c55e" opacity={0.15} />
      <SparklePattern density="low" color="#22c55e" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: '1', valueKey: 'residential.value', labelKey: 'residential.label', suffix: '+' },
            { id: '2', valueKey: 'commercial.value', labelKey: 'commercial.label', suffix: '+' },
            { id: '3', valueKey: 'satisfaction.value', labelKey: 'satisfaction.label', suffix: '%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary-600 mb-2">
                {t(stat.valueKey)}{stat.suffix}
              </div>
              <div className="text-gray-700 font-medium">
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};