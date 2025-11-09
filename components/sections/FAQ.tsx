'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import GridPattern from '@/components/backgrounds/GridPattern';
import LightRays from '@/components/backgrounds/LightRays';

interface FAQProps {
  locale: string;
}

export const FAQ: React.FC<FAQProps> = ({ locale }) => {
  const t = useTranslations('faq');
  const faqs = [
    { id: '1', questionKey: 'items.0.question', answerKey: 'items.0.answer' },
    { id: '2', questionKey: 'items.1.question', answerKey: 'items.1.answer' },
    { id: '3', questionKey: 'items.2.question', answerKey: 'items.2.answer' },
    { id: '4', questionKey: 'items.3.question', answerKey: 'items.3.answer' },
    { id: '5', questionKey: 'items.4.question', answerKey: 'items.4.answer' },
  ];
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <GridPattern type="lines" color="#22c55e" opacity={0.06} spacing={48} />
      <LightRays color="#22c55e" opacity={0.08} position="top-right" />
      <LightRays color="#fbbf24" opacity={0.06} position="bottom-left" />
      <Container size="lg" className="relative z-10">
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

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {t(faq.questionKey)}
                </span>
                <FaChevronDown
                  className={cn(
                    'text-primary-600 flex-shrink-0 transition-transform duration-200',
                    openId === faq.id && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {t(faq.answerKey)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};