'use client';

import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const t = useTranslations('booking.steps');

  const steps = [
    { number: 1, label: t('service') },
    { number: 2, label: t('dateTime') },
    { number: 3, label: t('details') },
    { number: 4, label: t('review') },
    { number: 5, label: t('confirm') },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10">
          <div
            className="h-full bg-primary-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step Circles */}
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isPending = step.number > currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  transition-all duration-300 bg-white border-2
                  ${isCompleted ? 'border-primary-600 bg-primary-600 text-white' : ''}
                  ${isCurrent ? 'border-primary-600 text-primary-600 scale-110' : ''}
                  ${isPending ? 'border-gray-300 text-gray-400' : ''}
                `}
              >
                {isCompleted ? <FaCheck className="text-sm" /> : step.number}
              </div>
              <span
                className={`
                  mt-2 text-xs md:text-sm font-medium whitespace-nowrap
                  ${isCurrent ? 'text-primary-600' : ''}
                  ${isCompleted ? 'text-gray-700' : ''}
                  ${isPending ? 'text-gray-400' : ''}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
