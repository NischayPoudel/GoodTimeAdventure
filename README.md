# Goodtime Adventure

A full-stack Next.js application for a trekking company featuring tours, blog, gallery, enquiries, and wishlist functionality with admin dashboard.

## Features

- Public pages: Home, Tours, Activities, Blog, Gallery, About, Contact, Privacy, Terms
- Authentication with NextAuth (Credentials Provider)
- Role-based access (user/admin)
- Admin dashboard for managing tours, blog, gallery, enquiries
- User features: Wishlist, My Enquiries
- MongoDB with Mongoose
- TypeScript, Tailwind CSS
- Server-side validation with Zod

## Setup

1. Clone or create the project:
   ```bash
   npx create-next-app@latest goodtime-adventure --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
   cd goodtime-adventure
   ```

2. Install dependencies:
   ```bash
   npm install next-auth mongoose bcryptjs zod
   npm install -D @types/bcryptjs
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in `MONGODB_URI` (local MongoDB or Atlas)
   - Set `NEXTAUTH_URL` to `http://localhost:3000`
   - Generate a secure `NEXTAUTH_SECRET`

4. Seed the database:
   ```bash
   node scripts/seed.mjs
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Admin Access

- Email: admin@goodtimeadventure.test
- Password: Admin123!

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- NextAuth
- Zod
- bcrypt
