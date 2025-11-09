Admin Portal Implementation Plan

Phase 1: Database & Infrastructure Setup

1.  Install dependencies: Prisma, @prisma/client, bcryptjs, jose (JWT), @supabase/supabase-js
2.  Create .env file with Supabase PostgreSQL connection string
3.  Initialize Prisma and create schema with tables:

- User (admin authentication)
- Service (with pricing tiers)
- BlogPost (with categories, authors)
- Booking (persist booking requests)
- Testimonial, TeamMember, FAQ, Feature, Statistic
- SiteSettings (contact info, business hours)
- ServiceExtra (for add-ons like eco-friendly, windows, etc.)

4.  Run Prisma migration to create database tables
5.  Seed database with existing hardcoded data from lib/data.ts

Phase 2: Authentication System

1.  Create /api/auth routes: login, logout, verify session
2.  Implement password hashing with bcryptjs
3.  JWT token management with jose library
4.  Build /login page with email/password form
5.  Create middleware to protect admin routes
6.  Session management with HTTP-only cookies

Phase 3: API Routes for Data Management

1.  Services API: CRUD operations for services, pricing, extras
2.  Blog API: CRUD for blog posts with Markdown support
3.  Bookings API: GET all bookings, update status, delete
4.  Site Settings API: Update contact info, business hours
5.  Other content APIs: Testimonials, Team, FAQ, Features, Statistics
6.  File upload API: Handle images for blog, team photos, booking photos

Phase 4: Admin Portal UI

1.  Create /admin layout with sidebar navigation
2.  Dashboard page: Overview stats (total bookings, services, posts)
3.  Services management: List, create, edit, delete services with pricing
4.  Extras management: Manage add-ons (eco-friendly, windows, etc.)
5.  Blog management: List posts, Markdown editor (react-simplemde-editor), preview
6.  Bookings page: Table view with filters, status updates, export
7.  Site Settings page: Edit contact info, business hours, address
8.  Content pages: Manage testimonials, team, FAQ, features

Phase 5: Frontend Integration

1.  Update services pages to fetch from API instead of lib/data.ts
2.  Update blog pages to fetch from database
3.  Update booking submission to POST to API and persist
4.  Update contact page to fetch settings from database
5.  Update home page to fetch testimonials, stats, features from API
6.  Image upload handling for booking photos

Phase 6: Multi-language Support

1.  Database schema for translations (ServiceTranslation, BlogPostTranslation tables)
2.  Admin UI to manage translations for each language (en, sk, uk, ru)
3.  API updates to return content based on locale parameter
4.  Migration script to move translations from JSON to database

Technical Details:

- Database: Supabase PostgreSQL with Prisma ORM
- Auth: Custom JWT-based with bcryptjs, HTTP-only cookies
- Blog Editor: Markdown with react-simplemde-editor
- File Storage: Supabase Storage for images
- Forms: react-hook-form + zod validation
- Admin UI: Same Tailwind + components, table library (tanstack/react-table)

Files to Create/Modify:

- Create: ~40 new files (Prisma schema, API routes, admin pages, components)
- Modify: ~15 existing files (frontend pages to fetch from API)
- Delete: lib/data.ts (after migration)
