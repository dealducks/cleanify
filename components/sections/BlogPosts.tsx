'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

interface BlogPostsProps {
  locale: string;
}

export const BlogPosts: React.FC<BlogPostsProps> = ({ locale }) => {
  const t = useTranslations('blog');

  const latestPosts = [
    {
      id: '1',
      titleKey: 'items.0.title',
      excerptKey: 'items.0.excerpt',
      categoryKey: 'items.0.category',
      slug: 'guide-to-cleaning-home-like-professional',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&h=600&fit=crop',
      date: '2024-03-15',
      readTime: 5,
    },
    {
      id: '2',
      titleKey: 'items.1.title',
      excerptKey: 'items.1.excerpt',
      categoryKey: 'items.1.category',
      slug: 'best-tips-cleaning-office-space',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      date: '2024-03-10',
      readTime: 4,
    },
    {
      id: '3',
      titleKey: 'items.2.title',
      excerptKey: 'items.2.excerpt',
      categoryKey: 'items.2.category',
      slug: 'eco-friendly-cleaning-better-for-planet',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
      date: '2024-03-05',
      readTime: 6,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-600 font-semibold uppercase tracking-wide text-sm">
              {t('subtitle')}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t('title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full flex flex-col">
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={t(post.titleKey)}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {t(post.categoryKey)}
                    </div>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-xs" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-xs" />
                      {post.readTime} {t('minRead')}
                    </span>
                  </div>

                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                      {t(post.titleKey)}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {t(post.excerptKey)}
                  </p>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="text-primary-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    {t('readMore')}
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/${locale}/blog`}>
            <Button size="lg" variant="outline">{t('viewAll')}</Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};