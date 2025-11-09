'use client';

import React from 'react';
import { useBooking } from '@/contexts/BookingContext';
import StepIndicator from './StepIndicator';
import ServiceSelector from './ServiceSelector';
import CalendarPicker from './CalendarPicker';
import PropertyForm from './PropertyForm';
import BookingSummary from './BookingSummary';
import ConfirmationScreen from './ConfirmationScreen';

export default function BookingWizard() {
  const { currentStep } = useBooking();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelector />;
      case 2:
        return <CalendarPicker />;
      case 3:
        return <PropertyForm />;
      case 4:
        return <BookingSummary />;
      case 5:
        return <ConfirmationScreen />;
      default:
        return <ServiceSelector />;
    }
  };

  return (
    <div>
      {currentStep < 5 && <StepIndicator currentStep={currentStep} totalSteps={5} />}
      <div className="min-h-[600px]">
        {renderStep()}
      </div>
    </div>
  );
}
