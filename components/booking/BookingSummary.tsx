'use client';

import React from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useBooking } from '@/contexts/BookingContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function BookingSummary() {
  const t = useTranslations('booking.summary');
  const tServices = useTranslations('booking.serviceSelector.services');
  const { bookingData, calculatePrice, nextStep, prevStep, setCurrentStep, updateBookingData } = useBooking();

  const addOns = [
    { id: 'eco-friendly', label: t('addOns.ecoFriendly'), price: 10 },
    { id: 'inside-fridge', label: t('addOns.insideFridge'), price: 15 },
    { id: 'inside-oven', label: t('addOns.insideOven'), price: 15 },
    { id: 'windows', label: t('addOns.windows'), price: 20 },
  ];

  const toggleAddOn = (addOnId: string) => {
    const currentAddOns = bookingData.addOns || [];
    const newAddOns = currentAddOns.includes(addOnId)
      ? currentAddOns.filter(id => id !== addOnId)
      : [...currentAddOns, addOnId];
    updateBookingData({ addOns: newAddOns });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getServiceTitle = () => {
    const serviceKey = bookingData.serviceType.replace('-', '');
    return tServices(`${serviceKey}.title`);
  };

  const getFrequencyLabel = () => {
    switch (bookingData.frequency) {
      case 'weekly':
        return t('frequency.weekly');
      case 'bi-weekly':
        return t('frequency.biWeekly');
      case 'monthly':
        return t('frequency.monthly');
      default:
        return t('frequency.oneTime');
    }
  };

  const getTimeLabel = () => {
    switch (bookingData.selectedTime) {
      case 'morning':
        return t('time.morning');
      case 'afternoon':
        return t('time.afternoon');
      case 'evening':
        return t('time.evening');
      default:
        return '';
    }
  };

  const calculateBasePrice = (): number => {
    // Same logic as in BookingContext but without discounts
    let basePrice = 0;

    if (bookingData.serviceType === 'home-cleaning') {
      const prices: Record<string, number> = {
        '1br': 70, '2br': 90, '3br': 110, '4br': 130, '5br': 150
      };
      basePrice = prices[bookingData.propertySize] || 90;
    } else if (bookingData.serviceType === 'office-cleaning') {
      const prices: Record<string, number> = {
        'small': 100, 'medium': 180, 'large': 280
      };
      basePrice = prices[bookingData.propertySize] || 100;
    } else if (bookingData.serviceType === 'deep-cleaning') {
      const prices: Record<string, number> = {
        '1br': 120, '2br': 150, '3br': 180, '4br': 210, '5br': 240
      };
      basePrice = prices[bookingData.propertySize] || 150;
    } else if (bookingData.serviceType === 'move-cleaning') {
      const prices: Record<string, number> = {
        '1br': 150, '2br': 200, '3br': 250, '4br': 300, '5br': 350
      };
      basePrice = prices[bookingData.propertySize] || 200;
    }

    return basePrice;
  };

  const getDiscount = (): number => {
    const basePrice = calculateBasePrice();
    switch (bookingData.frequency) {
      case 'weekly':
        return basePrice * 0.10;
      case 'bi-weekly':
        return basePrice * 0.15;
      case 'monthly':
        return basePrice * 0.20;
      default:
        return 0;
    }
  };

  const getAddOnsTotal = (): number => {
    return addOns
      .filter(addOn => bookingData.addOns.includes(addOn.id))
      .reduce((total, addOn) => total + addOn.price, 0);
  };

  const basePrice = calculateBasePrice();
  const discount = getDiscount();
  const addOnsTotal = getAddOnsTotal();
  const totalPrice = calculatePrice();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{t('serviceDetails')}</h3>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                >
                  <FaEdit /> {t('edit')}
                </button>
              </div>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('service')}:</dt>
                  <dd className="font-medium text-gray-900">{getServiceTitle()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('propertySize')}:</dt>
                  <dd className="font-medium text-gray-900">{bookingData.propertySize.toUpperCase()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('propertyType')}:</dt>
                  <dd className="font-medium text-gray-900 capitalize">{bookingData.propertyType}</dd>
                </div>
              </dl>
            </Card>

            {/* Date & Time */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{t('dateTime')}</h3>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                >
                  <FaEdit /> {t('edit')}
                </button>
              </div>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('date')}:</dt>
                  <dd className="font-medium text-gray-900">{formatDate(bookingData.selectedDate)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('timeSlot')}:</dt>
                  <dd className="font-medium text-gray-900">{getTimeLabel()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('frequencyLabel')}:</dt>
                  <dd className="font-medium text-gray-900">{getFrequencyLabel()}</dd>
                </div>
              </dl>
            </Card>

            {/* Property Details */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{t('propertyDetails')}</h3>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                >
                  <FaEdit /> {t('edit')}
                </button>
              </div>
              <dl className="space-y-3">
                <div>
                  <dt className="text-gray-600 mb-1">{t('address')}:</dt>
                  <dd className="font-medium text-gray-900">{bookingData.address}</dd>
                </div>
                {bookingData.accessInstructions && (
                  <div>
                    <dt className="text-gray-600 mb-1">{t('accessInstructions')}:</dt>
                    <dd className="text-gray-900">{bookingData.accessInstructions}</dd>
                  </div>
                )}
                {bookingData.specialRequests && (
                  <div>
                    <dt className="text-gray-600 mb-1">{t('specialRequests')}:</dt>
                    <dd className="text-gray-900">{bookingData.specialRequests}</dd>
                  </div>
                )}
                {bookingData.uploadedPhotos.length > 0 && (
                  <div>
                    <dt className="text-gray-600 mb-2">{t('photos')}:</dt>
                    <dd className="flex gap-2">
                      {bookingData.uploadedPhotos.slice(0, 3).map((file, index) => (
                        <div key={index} className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {bookingData.uploadedPhotos.length > 3 && (
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-sm">
                          +{bookingData.uploadedPhotos.length - 3}
                        </div>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </Card>

            {/* Add-ons */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t('addOnsTitle')}</h3>
              <div className="space-y-3">
                {addOns.map((addOn) => {
                  const isSelected = bookingData.addOns.includes(addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAddOn(addOn.id)}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                        <span className="font-medium text-gray-900">{addOn.label}</span>
                      </div>
                      <span className="text-gray-600">+€{addOn.price}</span>
                    </label>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Price Summary - Sticky */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t('priceBreakdown')}</h3>
              <dl className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('basePrice')}:</dt>
                  <dd className="font-medium text-gray-900">€{basePrice}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <dt>{t('discount')}:</dt>
                    <dd>-€{discount.toFixed(0)}</dd>
                  </div>
                )}
                {addOnsTotal > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('addOnsLabel')}:</dt>
                    <dd className="font-medium text-gray-900">+€{addOnsTotal}</dd>
                  </div>
                )}
              </dl>
              <div className="flex justify-between items-center mb-6">
                <dt className="text-xl font-bold text-gray-900">{t('total')}:</dt>
                <dd className="text-2xl font-bold text-primary-600">€{totalPrice}</dd>
              </div>
              {bookingData.frequency !== 'one-time' && (
                <p className="text-sm text-gray-600 mb-4">
                  {t('recurringNote')}
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button onClick={prevStep} variant="outline" size="lg">
          {t('back')}
        </Button>
        <Button onClick={nextStep} size="lg">
          {t('continue')}
        </Button>
      </div>
    </div>
  );
}
