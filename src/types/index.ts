export interface Tour {
  _id: string
  title: string
  slug: string
  region: string
  activity: string
  durationDays: number
  difficulty: string
  maxAltitudeM: number
  bestSeason: string
  priceFrom: number
  overview: string
  includes: string[]
  excludes: string[]
  itinerary: {
    day: number
    title: string
    details: string
  }[]
  published: boolean
  heroImage: string
  gallery: string[]
  createdAt: Date
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string
  published: boolean
  createdAt: Date
}

export interface GalleryItem {
  _id: string
  title: string
  imageUrl: string
  category: string
  createdAt: Date
}

export interface Enquiry {
  _id: string
  fullName: string
  email: string
  travelDate: Date
  people: number
  message: string
  tourId: string
  userId?: string
  responded: boolean
  createdAt: Date
}

export interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}