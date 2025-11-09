'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ContactFormData } from '@/types';

interface ContactFormSectionProps {
  locale: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({ locale }) => {
  const t = useTranslations('contact');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data);
    // Add your form submission logic here
    alert(t('successMessage'));
    reset();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
      <Container size="lg">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              {t('title')}
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              {t('description')}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('callUs')}</h3>
                  <p className="text-primary-100">{t('phone')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('emailUs')}</h3>
                  <p className="text-primary-100">{t('email')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('visitUs')}</h3>
                  <p className="text-primary-100">{t('address')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  <option value="other">{t('form.service.options.other')}</option>
                </select>
              </div>

              <Textarea
                label={t('form.message.label')}
                placeholder={t('form.message.placeholder')}
                {...register('message', { required: t('form.message.required') })}
                error={errors.message?.message}
              />

              <Button type="submit" className="w-full" size="lg">
                {t('form.submit')}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};