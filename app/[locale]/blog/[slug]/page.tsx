'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowLeft, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { blogPosts } from '@/lib/data';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function BlogPostPage({ params: { slug, locale } }: BlogPostPageProps) {
  const t = useTranslations('blog.postPage');
  const tCommon = useTranslations('common');
  const tBlog = useTranslations('blog.items');

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  // Get blog content from translations
  const blogContent = tBlog.raw(`${post.id - 1}.content`);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12">
        <Container size="lg">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 font-medium"
          >
            <FaArrowLeft />
            {t('backToBlog')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              {post.category}
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author.name}</div>
                </div>
              </div>

              <span className="flex items-center gap-2">
                <FaCalendar className="text-sm" />
                {formatDate(post.date)}
              </span>

              <span className="flex items-center gap-2">
                <FaClock className="text-sm" />
                {post.readTime} {t('minRead')}
              </span>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <Container size="md">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 mb-6">
                {tBlog(`${post.id - 1}.excerpt`)}
              </p>

              {/* Real blog content from translations */}
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  {blogContent.intro}
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                  {t('sections.keyTakeaways')}
                </h2>

                <p className="leading-relaxed">
                  {blogContent.keyTakeaways.text}
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  {blogContent.keyTakeaways.list.map((item: string, index: number) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                  ))}
                </ul>

                <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                  {t('sections.bestPractices')}
                </h2>

                <p className="leading-relaxed">
                  {blogContent.bestPractices.text1}
                </p>

                <p className="leading-relaxed">
                  {blogContent.bestPractices.text2}
                </p>

                <p className="leading-relaxed">
                  {blogContent.bestPractices.text3}
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                  {t('sections.conclusion')}
                </h2>

                <p className="leading-relaxed">
                  {blogContent.conclusion}
                </p>
              </div>
            </article>

            {/* Share */}
            <div className="border-t border-b py-6 mb-12">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{t('shareArticle')}</span>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                    <FaFacebookF />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                    <FaTwitter />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                    <FaLinkedinIn />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary-50 rounded-2xl p-8 text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('cta.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('cta.description')}
              </p>
              <Link href={`/${locale}/booking`}>
                <Button size="lg">{t('cta.button')}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('relatedArticles')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} hover>
                  <Link href={`/${locale}/blog/${relatedPost.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/${locale}/blog/${relatedPost.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      href={`/${locale}/blog/${relatedPost.slug}`}
                      className="text-primary-600 font-medium text-sm hover:underline"
                    >
                      {tCommon('readMore')} →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}