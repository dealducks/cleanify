'use client';

import React, { useRef } from 'react';
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useBooking } from '@/contexts/BookingContext';
import { Input } from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function PropertyForm() {
  const t = useTranslations('booking.propertyForm');
  const { bookingData, updateBookingData, nextStep, prevStep } = useBooking();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isUnder5MB = file.size <= 5 * 1024 * 1024;
      return isImage && isUnder5MB;
    });

    updateBookingData({
      uploadedPhotos: [...bookingData.uploadedPhotos, ...validFiles].slice(0, 5),
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = bookingData.uploadedPhotos.filter((_, i) => i !== index);
    updateBookingData({ uploadedPhotos: newPhotos });
  };

  const handleNext = () => {
    if (bookingData.address) {
      nextStep();
    }
  };

  const isNextDisabled = !bookingData.address;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>

        {/* Address Input */}
        <div className="mb-6">
          <Input
            label={t('address.label')}
            placeholder={t('address.placeholder')}
            value={bookingData.address}
            onChange={(e) => updateBookingData({ address: e.target.value })}
            required
          />
          <p className="text-sm text-gray-500 mt-1">{t('address.help')}</p>
        </div>

        {/* Access Instructions */}
        <div className="mb-6">
          <Textarea
            label={t('accessInstructions.label')}
            placeholder={t('accessInstructions.placeholder')}
            value={bookingData.accessInstructions}
            onChange={(e) => updateBookingData({ accessInstructions: e.target.value })}
            rows={3}
          />
        </div>

        {/* Special Requests */}
        <div className="mb-6">
          <Textarea
            label={t('specialRequests.label')}
            placeholder={t('specialRequests.placeholder')}
            value={bookingData.specialRequests}
            onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-1">{t('specialRequests.help')}</p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('photos.label')}
          </label>
          <p className="text-sm text-gray-500 mb-4">{t('photos.help')}</p>

          {/* Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          <Card
            className="p-8 border-2 border-dashed border-gray-300 hover:border-primary-400 cursor-pointer transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-1">
                {t('photos.uploadButton')}
              </p>
              <p className="text-sm text-gray-500">
                {t('photos.uploadHelp')}
              </p>
            </div>
          </Card>

          {/* Uploaded Photos Preview */}
          {bookingData.uploadedPhotos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
              {bookingData.uploadedPhotos.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(index);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                  <p className="text-xs text-gray-600 mt-1 truncate">
                    {file.name}
                  </p>
                </div>
              ))}

              {/* Add more button if less than 5 photos */}
              {bookingData.uploadedPhotos.length < 5 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 transition-colors flex items-center justify-center"
                >
                  <div className="text-center">
                    <FaImage className="text-2xl text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">{t('photos.addMore')}</p>
                  </div>
                </button>
              )}
            </div>
          )}

          {bookingData.uploadedPhotos.length >= 5 && (
            <p className="text-sm text-amber-600 mt-2">
              {t('photos.maxReached')}
            </p>
          )}
        </div>
      </div>

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
