import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Statistics } from '@/components/sections/Statistics';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { BlogPosts } from '@/components/sections/BlogPosts';
import { FAQ } from '@/components/sections/FAQ';
import { ContactFormSection } from '@/components/sections/ContactForm';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  return (
    <>
      <Hero locale={locale} />
      <Statistics locale={locale} />
      <Services locale={locale} />
      <Features locale={locale} />
      <Testimonials locale={locale} />
      <BlogPosts locale={locale} />
      <FAQ locale={locale} />
      <ContactFormSection locale={locale} />
    </>
  );
}