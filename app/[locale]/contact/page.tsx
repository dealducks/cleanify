'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Map } from '@/components/ui/Map';
import { ContactFormData } from '@/types';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  const t = useTranslations('contact');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data);
    alert(t('successMessage'));
    reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('pageTitle')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('pageDescription')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-2xl text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t('infoCards.phone.title')}</h3>
                <p className="text-gray-600 mb-2">{t('infoCards.phone.description')}</p>
                <a href={`tel:${t('phoneRaw')}`} className="text-primary-600 hover:text-primary-700 font-medium">
                  {t('phone')}
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-2xl text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t('infoCards.email.title')}</h3>
                <p className="text-gray-600 mb-2">{t('infoCards.email.description')}</p>
                <a href={`mailto:${t('email')}`} className="text-primary-600 hover:text-primary-700 font-medium">
                  {t('email')}
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-2xl text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t('infoCards.address.title')}</h3>
                <p className="text-gray-600 mb-2">{t('infoCards.address.description')}</p>
                <p className="text-primary-600 font-medium whitespace-pre-line">
                  {t('infoCards.address.value')}
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form and Info */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('formTitle')}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label={t('form.name.label')}
                      placeholder={t('form.name.placeholder')}
                      {...register('name', { required: t('form.name.required') })}
                      error={errors.name?.message}
                    />

                    <Input
                      label={t('form.email.label')}
                      type="email"
                      placeholder={t('form.email.placeholder')}
                      {...register('email', {
                        required: t('form.email.required'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('form.email.invalid'),
                        },
                      })}
                      error={errors.email?.message}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label={t('form.phone.label')}
                      type="tel"
                      placeholder={t('form.phone.placeholder')}
                      {...register('phone')}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('form.service.label')}
                      </label>
                      <select
                        {...register('service')}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">{t('form.service.placeholder')}</option>
                        <option value="home-cleaning">{t('form.service.options.home')}</option>
                        <option value="office-cleaning">{t('form.service.options.office')}</option>
                        <option value="deep-cleaning">{t('form.service.options.deep')}</option>
                        <option value="move-cleaning">{t('form.service.options.move')}</option>
                        <option value="other">{t('form.service.options.other')}</option>
                      </select>
                    </div>
                  </div>

                  <Textarea
                    label={t('form.message.label')}
                    placeholder={t('form.message.placeholder')}
                    {...register('message', { required: t('form.message.required') })}
                    error={errors.message?.message}
                    rows={6}
                  />

                  <Button type="submit" size="lg" className="w-full">
                    {t('form.submit')}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Business Hours */}
              <Card className="p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaClock className="text-xl text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t('businessHours.title')}</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>{t('businessHours.days.weekdays')}</span>
                    <span className="font-medium">{t('businessHours.times.weekdays')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('businessHours.days.saturday')}</span>
                    <span className="font-medium">{t('businessHours.times.saturday')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('businessHours.days.sunday')}</span>
                    <span className="font-medium">{t('businessHours.times.sunday')}</span>
                  </div>
                </div>
              </Card>

              {/* Quick Info */}
              <Card className="p-6 bg-primary-50 border-primary-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('quickResponse.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    <span>{t('quickResponse.items.0')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    <span>{t('quickResponse.items.1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    <span>{t('quickResponse.items.2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    <span>{t('quickResponse.items.3')}</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t('mapSection.title')}
            </h2>
            <p className="text-gray-600">
              {t('mapSection.description')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-96"
          >
            <Map location="Ružinov, Bratislava, Slovakia" zoom={13} />
          </motion.div>
        </Container>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-white">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('faqSection.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {t('faqSection.description')}
            </p>
            <Button variant="outline" size="lg">
              {t('faqSection.button')}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}