import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { TourCard } from '@/components/TourCard'

export async function FeaturedTours() {
  await connectDB()
  const tours = await Tour.find({ published: true }).limit(3).sort({ createdAt: -1 })

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}