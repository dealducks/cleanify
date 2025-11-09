'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { BookingProvider } from '@/contexts/BookingContext';
import BookingWizard from '@/components/booking/BookingWizard';

interface BookingPageProps {
  params: { locale: string };
}

export default function BookingPage({ params: { locale } }: BookingPageProps) {
  const t = useTranslations('common');

  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {t('bookNow')}
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <BookingWizard />
            </div>
          </div>
        </Container>
      </div>
    </BookingProvider>
  );
}
