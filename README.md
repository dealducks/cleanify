# Cleanify - Professional Cleaning Services Website

A modern, fully responsive multi-page website built with Next.js 14, TypeScript, and Tailwind CSS. This demo website showcases professional cleaning services and serves as a portfolio piece to demonstrate web development capabilities.

## Features

- **Multi-Page Architecture** - Comprehensive website with dedicated pages for all content
- **Modern Tech Stack** - Built with Next.js 14, TypeScript, and Tailwind CSS
- **Fully Responsive** - Mobile-first design that works on all devices
- **Animations** - Smooth animations using Framer Motion
- **Type Safe** - Full TypeScript implementation
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Form Handling** - Contact forms with validation using React Hook Form
- **Clean Code** - Well-organized component structure and reusable components

## Pages

1. **Home** (`/`) - Hero section, statistics, services preview, features, testimonials, blog posts, FAQ, and contact form
2. **About** (`/about`) - Company story, mission & values, team members, why choose us
3. **Services** (`/services`) - Complete services overview with pricing comparison
4. **Home Cleaning** (`/services/home-cleaning`) - Detailed residential cleaning service page
5. **Office Cleaning** (`/services/office-cleaning`) - Detailed commercial cleaning service page
6. **Blog** (`/blog`) - Blog listing with category filters
7. **Blog Post** (`/blog/[slug]`) - Individual blog post pages with dynamic routing
8. **Contact** (`/contact`) - Contact form, business info, and map integration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: React Icons
- **Image Handling**: Next.js Image Optimization

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser** and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
cleanify-website/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx          # About page
│   ├── services/               # Services pages
│   │   ├── page.tsx           # Services overview
│   │   ├── home-cleaning/
│   │   └── office-cleaning/
│   ├── blog/                   # Blog pages
│   │   ├── page.tsx           # Blog listing
│   │   └── [slug]/page.tsx    # Dynamic blog posts
│   ├── contact/page.tsx       # Contact page
│   └── globals.css            # Global styles
│
├── components/                 # React components
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/              # Page sections
│   │   ├── Hero.tsx
│   │   ├── Statistics.tsx
│   │   ├── Services.tsx
│   │   ├── Features.tsx
│   │   ├── BlogPosts.tsx
│   │   ├── FAQ.tsx
│   │   ├── Testimonials.tsx
│   │   └── ContactForm.tsx
│   └── ui/                    # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Container.tsx
│
├── lib/                       # Utility functions and data
│   ├── utils.ts              # Helper functions
│   └── data.ts               # Mock data
│
├── types/                     # TypeScript type definitions
│   └── index.ts
│
├── public/                    # Static assets
│   └── images/               # Image files
│
├── tailwind.config.ts        # Tailwind configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## Customization

### Colors

Edit the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#f0fdf4',
    // ... add your colors
  },
}
```

### Content

Update the demo content in `lib/data.ts`:

- Services
- Blog posts
- Team members
- Testimonials
- FAQ items
- Statistics

### Images

Replace placeholder images in the `public/images/` directory with your own:

- `hero-image.jpg`
- `home-cleaning.jpg`
- `office-cleaning.jpg`
- `about-hero.jpg`
- `blog-1.jpg`, `blog-2.jpg`, `blog-3.jpg`
- Avatar and team images

### Fonts

The project uses Inter font by default. To change fonts, edit `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({ subsets: ['latin'] });
```

## Components

### UI Components

- **Button** - Customizable button with variants (primary, secondary, outline, ghost)
- **Card** - Card container with optional hover effects
- **Input/Textarea** - Form inputs with label and error states
- **Container** - Responsive container wrapper with size options

### Layout Components

- **Header** - Navigation with mobile menu and sticky positioning
- **Footer** - Multi-column footer with links and social media

### Section Components

All reusable page sections with animations and responsive design.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Deploy with one click

### Environment Variables

Create a `.env.local` file for any environment-specific configuration:

```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
# Add other variables as needed
```

## Features to Add

This is a demo website. For production use, consider adding:

- [ ] Backend integration for contact forms
- [ ] Real blog CMS integration (Contentful, Sanity, etc.)
- [ ] Authentication for admin panel
- [ ] Online booking system
- [ ] Payment integration
- [ ] Google Maps integration
- [ ] Analytics (Google Analytics, Plausible, etc.)
- [ ] Email notifications
- [ ] Newsletter subscription
- [ ] SEO optimizations (sitemap, robots.txt)
- [ ] Accessibility improvements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with Next.js Image component
- Lazy loading for better performance
- Code splitting with Next.js
- Minimal bundle size

## License

This is a demo project created for portfolio purposes.

## Support

For questions or issues, please contact your development team.

---

Built with ❤️ using Next.js and TypeScript