'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { blogPosts } from '@/lib/data';
import { formatDate } from '@/lib/utils';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default function BlogPage({ params: { locale } }: BlogPageProps) {
  const t = useTranslations('blog.listingPage');
  const tCommon = useTranslations('common');

  const categories = ['all', 'tipsTricks', 'officeCleaning', 'sustainability'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === t(`categories.${selectedCategory}`));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('description')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-xs" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {post.readTime} {t('newsletter.button') === 'Subscribe' ? 'min' : t('../min')}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4 pt-4 border-t">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {post.author.name}
                        </div>
                      </div>
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="text-primary-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      {tCommon('readMore')}
                      <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('noResults')}</p>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gray-50">
        <Container size="md">
          <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              {t('newsletter.description')}
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                {t('newsletter.button')}
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}