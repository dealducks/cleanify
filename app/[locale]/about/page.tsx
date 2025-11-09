'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {t('description1')}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {t('description2')}
              </p>
              <Link href={`/${locale}/booking`}>
                <Button size="lg">{tCommon('getStarted')}</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1000&h=800&fit=crop"
                alt="About Cleanify"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('values.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('values.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                key: 'excellence',
                icon: '⭐',
              },
              {
                key: 'sustainability',
                icon: '🌱',
              },
              {
                key: 'integrity',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t(`values.items.${value.key}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`values.items.${value.key}.description`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1000&h=800&fit=crop"
                alt="Why Choose Cleanify"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('whyChoose.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('whyChoose.description')}
              </p>

              <ul className="space-y-4">
                {t.raw('whyChoose.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('team.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('team.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.raw('team.members').map((member: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <div className="relative h-80">
                    <Image
                      src={`https://i.pravatar.cc/400?img=${index === 0 ? '10' : index === 1 ? '15' : '25'}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 mb-4 text-sm">
                      {member.bio}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                      >
                        <FaLinkedinIn />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                      >
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
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