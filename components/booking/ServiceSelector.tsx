'use client';

import React from 'react';
import { FaHome, FaBuilding, FaBroom, FaTruck, FaCheck } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useBooking } from '@/contexts/BookingContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ServiceSelector() {
  const t = useTranslations('booking.serviceSelector');
  const { bookingData, updateBookingData, nextStep } = useBooking();

  const services = [
    {
      id: 'home-cleaning',
      icon: FaHome,
      title: t('services.homecleaning.title'),
      description: t('services.homecleaning.description'),
    },
    {
      id: 'office-cleaning',
      icon: FaBuilding,
      title: t('services.officecleaning.title'),
      description: t('services.officecleaning.description'),
    },
    {
      id: 'deep-cleaning',
      icon: FaBroom,
      title: t('services.deepcleaning.title'),
      description: t('services.deepcleaning.description'),
    },
    {
      id: 'move-cleaning',
      icon: FaTruck,
      title: t('services.movecleaning.title'),
      description: t('services.movecleaning.description'),
    },
  ];

  const propertyTypes = [
    { id: 'apartment', label: t('propertyTypes.apartment') },
    { id: 'house', label: t('propertyTypes.house') },
    { id: 'office', label: t('propertyTypes.office') },
    { id: 'commercial', label: t('propertyTypes.commercial') },
  ];

  const getPropertySizes = () => {
    if (bookingData.serviceType === 'office-cleaning') {
      return [
        { id: 'small', label: t('sizes.office.small') },
        { id: 'medium', label: t('sizes.office.medium') },
        { id: 'large', label: t('sizes.office.large') },
      ];
    }
    return [
      { id: '1br', label: t('sizes.home.1br') },
      { id: '2br', label: t('sizes.home.2br') },
      { id: '3br', label: t('sizes.home.3br') },
      { id: '4br', label: t('sizes.home.4br') },
      { id: '5br', label: t('sizes.home.5br') },
    ];
  };

  const handleNext = () => {
    if (bookingData.serviceType && bookingData.propertyType && bookingData.propertySize) {
      nextStep();
    }
  };

  const isNextDisabled = !bookingData.serviceType || !bookingData.propertyType || !bookingData.propertySize;

  return (
    <div className="space-y-8">
      {/* Service Type Selection */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('selectService')}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = bookingData.serviceType === service.id;

            return (
              <Card
                key={service.id}
                className={`
                  p-6 cursor-pointer transition-all duration-200
                  hover:shadow-lg hover:border-primary-300
                  ${isSelected ? 'border-primary-600 border-2 bg-primary-50' : ''}
                `}
                onClick={() => {
                  updateBookingData({
                    serviceType: service.id,
                    propertySize: '' // Reset property size when service changes
                  });
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${isSelected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}
                  `}>
                    <Icon className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                      {isSelected && <FaCheck className="text-primary-600" />}
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Property Type Selection */}
      {bookingData.serviceType && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('selectPropertyType')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {propertyTypes.map((type) => {
              const isSelected = bookingData.propertyType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => updateBookingData({ propertyType: type.id })}
                  className={`
                    p-4 rounded-lg border-2 font-medium transition-all duration-200
                    ${isSelected
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }
                  `}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Property Size Selection */}
      {bookingData.serviceType && bookingData.propertyType && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('selectSize')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {getPropertySizes().map((size) => {
              const isSelected = bookingData.propertySize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => updateBookingData({ propertySize: size.id })}
                  className={`
                    p-4 rounded-lg border-2 font-medium transition-all duration-200
                    ${isSelected
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }
                  `}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={handleNext}
          disabled={isNextDisabled}
          size="lg"
        >
          {t('continue')}
        </Button>
      </div>
    </div>
  );
}
