'use client';

import React, { useState } from 'react';
import { FaSun, FaCloudSun, FaMoon, FaCheck, FaCalendarAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useBooking } from '@/contexts/BookingContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CalendarPicker() {
  const t = useTranslations('booking.calendar');
  const { bookingData, updateBookingData, nextStep, prevStep } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots = [
    { id: 'morning', icon: FaSun, label: t('timeSlots.morning'), time: '8:00 AM - 12:00 PM' },
    { id: 'afternoon', icon: FaCloudSun, label: t('timeSlots.afternoon'), time: '12:00 PM - 4:00 PM' },
    { id: 'evening', icon: FaMoon, label: t('timeSlots.evening'), time: '4:00 PM - 8:00 PM' },
  ];

  const frequencies = [
    { id: 'one-time', label: t('frequency.oneTime'), discount: 0 },
    { id: 'weekly', label: t('frequency.weekly'), discount: 10 },
    { id: 'bi-weekly', label: t('frequency.biWeekly'), discount: 15 },
    { id: 'monthly', label: t('frequency.monthly'), discount: 20 },
  ];

  // Generate calendar days
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !bookingData.selectedDate) return false;
    return (
      date.getDate() === bookingData.selectedDate.getDate() &&
      date.getMonth() === bookingData.selectedDate.getMonth() &&
      date.getFullYear() === bookingData.selectedDate.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleNext = () => {
    if (bookingData.selectedDate && bookingData.selectedTime) {
      nextStep();
    }
  };

  const isNextDisabled = !bookingData.selectedDate || !bookingData.selectedTime;

  const monthNames = [
    t('months.january'), t('months.february'), t('months.march'),
    t('months.april'), t('months.may'), t('months.june'),
    t('months.july'), t('months.august'), t('months.september'),
    t('months.october'), t('months.november'), t('months.december')
  ];

  const dayNames = [
    t('days.sun'), t('days.mon'), t('days.tue'),
    t('days.wed'), t('days.thu'), t('days.fri'), t('days.sat')
  ];

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {t('selectDate')}
        </h2>
        <Card className="p-4 max-w-md mx-auto">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <h3 className="text-lg font-bold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              →
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} />;
              }

              const disabled = isDateDisabled(date);
              const selected = isDateSelected(date);

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => !disabled && updateBookingData({ selectedDate: date })}
                  disabled={disabled}
                  className={`
                    aspect-square rounded-lg font-medium text-sm transition-all duration-200
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-primary-100'}
                    ${selected ? 'bg-primary-600 text-white hover:bg-primary-700' : 'text-gray-700'}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Time Slots */}
      {bookingData.selectedDate && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t('selectTime')}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {timeSlots.map((slot) => {
              const Icon = slot.icon;
              const isSelected = bookingData.selectedTime === slot.id;

              return (
                <Card
                  key={slot.id}
                  className={`
                    p-6 cursor-pointer transition-all duration-200
                    hover:shadow-lg hover:border-primary-300
                    ${isSelected ? 'border-primary-600 border-2 bg-primary-50' : ''}
                  `}
                  onClick={() => updateBookingData({ selectedTime: slot.id })}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`text-2xl ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                    <h3 className="font-bold text-gray-900">{slot.label}</h3>
                    {isSelected && <FaCheck className="text-primary-600 ml-auto" />}
                  </div>
                  <p className="text-sm text-gray-600">{slot.time}</p>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Frequency Selection */}
      {bookingData.selectedTime && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('selectFrequency')}
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {frequencies.map((freq) => {
              const isSelected = bookingData.frequency === freq.id;

              return (
                <Card
                  key={freq.id}
                  className={`
                    p-4 cursor-pointer transition-all duration-200
                    hover:shadow-lg hover:border-primary-300
                    ${isSelected ? 'border-primary-600 border-2 bg-primary-50' : ''}
                  `}
                  onClick={() => updateBookingData({ frequency: freq.id as any })}
                >
                  <div className="text-center">
                    <h3 className="font-bold text-gray-900 mb-1">{freq.label}</h3>
                    {freq.discount > 0 && (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        {t('save')} {freq.discount}%
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button onClick={prevStep} variant="outline" size="lg">
          {t('back')}
        </Button>
        <Button onClick={handleNext} disabled={isNextDisabled} size="lg">
          {t('continue')}
        </Button>
      </div>
    </div>
  );
}
