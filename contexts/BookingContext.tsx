'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BookingData {
  // Step 1: Service Selection
  serviceType: string;
  propertyType: string;
  propertySize: string;

  // Step 2: Date & Time
  selectedDate: Date | null;
  selectedTime: string;
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

  // Step 3: Property Details
  address: string;
  specialRequests: string;
  uploadedPhotos: File[];
  accessInstructions: string;

  // Step 4: Add-ons & Price
  addOns: string[];

  // Step 5: Contact Details
  fullName: string;
  email: string;
  phone: string;
}

interface BookingContextType {
  currentStep: number;
  bookingData: BookingData;
  setCurrentStep: (step: number) => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetBooking: () => void;
  calculatePrice: () => number;
}

const initialBookingData: BookingData = {
  serviceType: '',
  propertyType: '',
  propertySize: '',
  selectedDate: null,
  selectedTime: '',
  frequency: 'one-time',
  address: '',
  specialRequests: '',
  uploadedPhotos: [],
  accessInstructions: '',
  addOns: [],
  fullName: '',
  email: '',
  phone: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetBooking = () => {
    setBookingData(initialBookingData);
    setCurrentStep(1);
  };

  const calculatePrice = (): number => {
    let basePrice = 0;

    // Base price by service type and property size
    if (bookingData.serviceType === 'home-cleaning') {
      switch (bookingData.propertySize) {
        case '1br':
          basePrice = 70;
          break;
        case '2br':
          basePrice = 90;
          break;
        case '3br':
          basePrice = 110;
          break;
        case '4br':
          basePrice = 130;
          break;
        case '5br':
          basePrice = 150;
          break;
        default:
          basePrice = 90;
      }
    } else if (bookingData.serviceType === 'office-cleaning') {
      switch (bookingData.propertySize) {
        case 'small':
          basePrice = 100;
          break;
        case 'medium':
          basePrice = 180;
          break;
        case 'large':
          basePrice = 280;
          break;
        default:
          basePrice = 100;
      }
    } else if (bookingData.serviceType === 'deep-cleaning') {
      switch (bookingData.propertySize) {
        case '1br':
          basePrice = 120;
          break;
        case '2br':
          basePrice = 150;
          break;
        case '3br':
          basePrice = 180;
          break;
        case '4br':
          basePrice = 210;
          break;
        case '5br':
          basePrice = 240;
          break;
        default:
          basePrice = 150;
      }
    } else if (bookingData.serviceType === 'move-cleaning') {
      switch (bookingData.propertySize) {
        case '1br':
          basePrice = 150;
          break;
        case '2br':
          basePrice = 200;
          break;
        case '3br':
          basePrice = 250;
          break;
        case '4br':
          basePrice = 300;
          break;
        case '5br':
          basePrice = 350;
          break;
        default:
          basePrice = 200;
      }
    }

    // Apply frequency discount
    let discount = 0;
    switch (bookingData.frequency) {
      case 'weekly':
        discount = 0.10;
        break;
      case 'bi-weekly':
        discount = 0.15;
        break;
      case 'monthly':
        discount = 0.20;
        break;
    }

    basePrice = basePrice * (1 - discount);

    // Add-ons
    if (bookingData.addOns.includes('eco-friendly')) {
      basePrice += 10;
    }
    if (bookingData.addOns.includes('inside-fridge')) {
      basePrice += 15;
    }
    if (bookingData.addOns.includes('inside-oven')) {
      basePrice += 15;
    }
    if (bookingData.addOns.includes('windows')) {
      basePrice += 20;
    }

    return Math.round(basePrice);
  };

  return (
    <BookingContext.Provider
      value={{
        currentStep,
        bookingData,
        setCurrentStep,
        updateBookingData,
        nextStep,
        prevStep,
        resetBooking,
        calculatePrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
