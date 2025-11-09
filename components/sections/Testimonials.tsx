'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import GridPattern from '@/components/backgrounds/GridPattern';

interface TestimonialsProps {
  locale: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ locale }) => {
  const t = useTranslations('testimonials');
  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50/20 to-primary-50/30 overflow-hidden">
      <GridPattern type="dots" color="#22c55e" opacity={0.12} spacing={24} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/10 via-transparent to-blue-100/10 pointer-events-none" />
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: '1',
              nameKey: 'items.0.name',
              roleKey: 'items.0.role',
              contentKey: 'items.0.content',
              rating: 5,
              avatar: 'https://i.pravatar.cc/150?img=1',
            },
            {
              id: '2',
              nameKey: 'items.1.name',
              roleKey: 'items.1.role',
              companyKey: 'items.1.company',
              contentKey: 'items.1.content',
              rating: 5,
              avatar: 'https://i.pravatar.cc/150?img=12',
            },
            {
              id: '3',
              nameKey: 'items.2.name',
              roleKey: 'items.2.role',
              contentKey: 'items.2.content',
              rating: 5,
              avatar: 'https://i.pravatar.cc/150?img=5',
            },
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 backdrop-blur-sm bg-white/80 border border-white/20">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic">
                  "{t(testimonial.contentKey)}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={testimonial.avatar}
                      alt={t(testimonial.nameKey)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t(testimonial.nameKey)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t(testimonial.roleKey)}
                      {testimonial.companyKey && `, ${t(testimonial.companyKey)}`}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};