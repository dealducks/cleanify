import { Service, BlogPost, Testimonial, TeamMember, FAQ, Statistic, Feature, NavigationItem } from '@/types';

// Navigation
export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Home Cleaning', href: '/services/home-cleaning' },
      { label: 'Office Cleaning', href: '/services/office-cleaning' },
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// Services
export const services: Service[] = [
  {
    id: '1',
    title: 'Home Cleaning',
    slug: 'home-cleaning',
    description: 'Professional residential cleaning services tailored to your home\'s unique needs. Our expert team ensures every corner of your house sparkles with cleanliness.',
    shortDescription: 'Keep your home spotless with our professional cleaning services',
    icon: 'FaHome',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
    features: [
      'Deep cleaning of all rooms',
      'Kitchen and bathroom sanitization',
      'Dusting and vacuuming',
      'Window cleaning',
      'Eco-friendly products',
      'Flexible scheduling',
    ],
    pricing: {
      basic: 89,
      standard: 139,
      premium: 199,
    },
  },
  {
    id: '2',
    title: 'Office Cleaning',
    slug: 'office-cleaning',
    description: 'Maintain a professional and hygienic workspace with our comprehensive office cleaning solutions. We work around your schedule to minimize disruption.',
    shortDescription: 'Professional office cleaning for a productive work environment',
    icon: 'FaBuilding',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    features: [
      'Workspace sanitization',
      'Restroom deep cleaning',
      'Floor care and maintenance',
      'Trash removal and recycling',
      'Break room cleaning',
      'After-hours availability',
    ],
    pricing: {
      basic: 149,
      standard: 249,
      premium: 399,
    },
  },
];

// Statistics
export const statistics: Statistic[] = [
  { id: '1', value: '5K', label: 'Residential Cleaning Successfully Done', suffix: '+' },
  { id: '2', value: '4.5K', label: 'Commercial Cleaning Successfully Done', suffix: '+' },
  { id: '3', value: '99', label: 'Client Satisfaction Rate', suffix: '%' },
];

// Features
export const features: Feature[] = [
  {
    id: '1',
    title: 'Professional Team',
    description: 'Trained and certified cleaning professionals with years of experience',
    icon: 'FaUserTie',
  },
  {
    id: '2',
    title: 'Eco-Friendly Products',
    description: 'Safe, non-toxic cleaning solutions that protect your family and environment',
    icon: 'FaLeaf',
  },
  {
    id: '3',
    title: 'Flexible Scheduling',
    description: 'Book services at your convenience with easy online scheduling',
    icon: 'FaClock',
  },
  {
    id: '4',
    title: '100% Satisfaction Guarantee',
    description: 'Not satisfied? We\'ll re-clean for free or provide a full refund',
    icon: 'FaCheckCircle',
  },
  {
    id: '5',
    title: 'Insured & Bonded',
    description: 'Fully insured for your peace of mind and property protection',
    icon: 'FaShieldAlt',
  },
  {
    id: '6',
    title: 'Affordable Pricing',
    description: 'Competitive rates with transparent pricing and no hidden fees',
    icon: 'FaDollarSign',
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'Cleanify has transformed my home! Their attention to detail is exceptional, and the team is always professional and courteous. Highly recommend!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Office Manager',
    company: 'Tech Solutions Inc.',
    content: 'Our office has never looked better. They work efficiently and don\'t disrupt our workflow. Great service!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Small Business Owner',
    content: 'Professional, reliable, and thorough. The eco-friendly products they use are a huge plus for our environmentally conscious business.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

// FAQ
export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How often should I schedule cleaning services?',
    answer: 'We recommend weekly or bi-weekly cleaning for most homes and offices. However, we offer flexible scheduling including one-time deep cleans, monthly maintenance, or custom frequencies based on your needs.',
  },
  {
    id: '2',
    question: 'Are your cleaning products safe for pets and children?',
    answer: 'Absolutely! We use eco-friendly, non-toxic cleaning products that are safe for your entire family, including pets and children. All our products are EPA-approved and environmentally responsible.',
  },
  {
    id: '3',
    question: 'Do I need to be home during the cleaning?',
    answer: 'No, you don\'t need to be present. Many of our clients provide access instructions and go about their day. Our team is fully insured and bonded for your security and peace of mind.',
  },
  {
    id: '4',
    question: 'What if I\'m not satisfied with the service?',
    answer: 'We offer a 100% satisfaction guarantee. If you\'re not completely happy with our service, contact us within 24 hours and we\'ll re-clean the area for free or provide a full refund.',
  },
  {
    id: '5',
    question: 'How do I get a quote?',
    answer: 'You can request a free quote through our contact form, call us directly, or use our online booking system. We\'ll assess your needs and provide a transparent, no-obligation estimate.',
  },
];

// Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guide To Cleaning Your Home Like A Professional',
    slug: 'guide-to-cleaning-home-like-professional',
    excerpt: 'Learn the secrets professional cleaners use to achieve spotless results every time.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&h=600&fit=crop',
    author: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
    category: 'Tips & Tricks',
    date: '2024-03-15',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Best Tips For Cleaning Your Office Space',
    slug: 'best-tips-cleaning-office-space',
    excerpt: 'Create a more productive work environment with these essential office cleaning tips.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    author: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    category: 'Office Cleaning',
    date: '2024-03-10',
    readTime: 4,
  },
  {
    id: '3',
    title: 'Eco-Friendly Cleaning: Better For You And The Planet',
    slug: 'eco-friendly-cleaning-better-for-planet',
    excerpt: 'Discover how green cleaning products benefit your health and the environment.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
    author: {
      name: 'Sarah Green',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
    category: 'Sustainability',
    date: '2024-03-05',
    readTime: 6,
  },
];

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Jennifer Martinez',
    role: 'Founder & CEO',
    bio: 'With over 15 years in the cleaning industry, Jennifer founded Cleanify to provide exceptional cleaning services with a personal touch.',
    image: 'https://i.pravatar.cc/400?img=10',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: '2',
    name: 'David Thompson',
    role: 'Operations Manager',
    bio: 'David ensures every job meets our high standards and coordinates our team of professional cleaners.',
    image: 'https://i.pravatar.cc/400?img=15',
    social: {
      linkedin: '#',
    },
  },
  {
    id: '3',
    name: 'Lisa Chen',
    role: 'Customer Success Lead',
    bio: 'Lisa is dedicated to ensuring every client has an outstanding experience from booking to completion.',
    image: 'https://i.pravatar.cc/400?img=25',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];