import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { Hero } from '@/components/Hero'
import { FeaturedTours } from '@/components/FeaturedTours'
import { Activities } from '@/components/Activities'
import { Testimonials } from '@/components/Testimonials'
import { LatestBlog } from '@/components/LatestBlog'
import { GalleryPreview } from '@/components/GalleryPreview'
import { CTA } from '@/components/CTA'

export default async function Home() {
  await connectDB()
  const tours = await Tour.find({ published: true })

  return (
    <div>
      <Hero />
      <FeaturedTours />
      <Activities tours={tours} />
      <Testimonials />
      <LatestBlog />
      <GalleryPreview />
      <CTA />
    </div>
  )
}
