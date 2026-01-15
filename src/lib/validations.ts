import { z } from 'zod'

export const tourSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  region: z.string().min(1),
  activity: z.string().min(1),
  durationDays: z.number().min(1),
  difficulty: z.string().min(1),
  maxAltitudeM: z.number().min(0),
  bestSeason: z.string().min(1),
  priceFrom: z.number().min(0),
  overview: z.string().min(1),
  includes: z.array(z.string()),
  excludes: z.array(z.string()),
  itinerary: z.array(z.object({
    day: z.number(),
    title: z.string(),
    details: z.string(),
  })),
  published: z.boolean(),
  heroImage: z.string().url(),
  gallery: z.array(z.string()),
})

export const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url(),
  published: z.boolean().optional().default(true),
})

export const galleryItemSchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().url(),
  category: z.string().min(1),
})

export const enquirySchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  travelDate: z.string().transform((str) => new Date(str)),
  people: z.number().min(1),
  message: z.string().min(1),
  tourId: z.string().min(1),
  userId: z.string().optional(),
})

export const contactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
})