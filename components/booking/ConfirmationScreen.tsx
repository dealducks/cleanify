'use client';

import React, { useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useBooking } from '@/contexts/BookingContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function ConfirmationScreen() {
  const t = useTranslations('booking.confirmation');
  const { bookingData, updateBookingData, prevStep, calculatePrice, resetBooking } = useBooking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.fullName || bookingData.fullName.length < 2) {
      newErrors.fullName = t('errors.nameRequired');
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!bookingData.email || !emailRegex.test(bookingData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!bookingData.phone || !phoneRegex.test(bookingData.phone)) {
      newErrors.phone = t('errors.phoneInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Generate booking reference
    const ref = 'CLN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookingReference(ref);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Send data to backend/email service
    console.log('Booking submitted:', {
      ...bookingData,
      bookingReference: ref,
      totalPrice: calculatePrice(),
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="mb-8">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('success.title')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('success.subtitle')}
          </p>
          <div className="inline-block bg-primary-50 border-2 border-primary-200 rounded-lg px-6 py-3">
            <p className="text-sm text-gray-600 mb-1">{t('success.reference')}</p>
            <p className="text-2xl font-bold text-primary-600">{bookingReference}</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto p-8 text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {t('success.whatNext')}
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <FaEnvelope className="text-xl text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{t('success.step1.title')}</p>
                <p className="text-sm text-gray-600">{t('success.step1.description')}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <FaPhone className="text-xl text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{t('success.step2.title')}</p>
                <p className="text-sm text-gray-600">{t('success.step2.description')}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <FaCalendar className="text-xl text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{t('success.step3.title')}</p>
                <p className="text-sm text-gray-600">{t('success.step3.description')}</p>
              </div>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t">
            <p className="text-gray-700 mb-4">
              {t('success.questions')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  resetBooking();
                  setIsSubmitted(false);
                }}
                variant="outline"
                className="flex-1"
              >
                {t('success.bookAnother')}
              </Button>
              <Link href="/" className="flex-1">
                <Button className="w-full">
                  {t('success.backHome')}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <Card className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {t('contactDetails')}
            </h3>

            <div className="space-y-4">
              <Input
                label={t('form.name.label')}
                placeholder={t('form.name.placeholder')}
                value={bookingData.fullName}
                onChange={(e) => updateBookingData({ fullName: e.target.value })}
                error={errors.fullName}
                required
              />

              <Input
                label={t('form.email.label')}
                type="email"
                placeholder={t('form.email.placeholder')}
                value={bookingData.email}
                onChange={(e) => updateBookingData({ email: e.target.value })}
                error={errors.email}
                required
              />

              <Input
                label={t('form.phone.label')}
                type="tel"
                placeholder={t('form.phone.placeholder')}
                value={bookingData.phone}
                onChange={(e) => updateBookingData({ phone: e.target.value })}
                error={errors.phone}
                required
              />
            </div>
          </Card>

          <Card className="p-8 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t('bookingSummary')}
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">{t('summary.service')}:</dt>
                <dd className="font-medium text-gray-900">{bookingData.serviceType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">{t('summary.date')}:</dt>
                <dd className="font-medium text-gray-900">
                  {bookingData.selectedDate?.toLocaleDateString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">{t('summary.total')}:</dt>
                <dd className="text-lg font-bold text-primary-600">€{calculatePrice()}</dd>
              </div>
            </dl>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              {t('privacyNotice')}
            </p>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t max-w-2xl">
        <Button onClick={prevStep} variant="outline" size="lg">
          {t('back')}
        </Button>
        <Button onClick={handleSubmit} size="lg">
          {t('submitBooking')}
        </Button>
      </div>
    </div>
  );
}
