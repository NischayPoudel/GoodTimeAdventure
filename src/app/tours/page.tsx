import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { TourCard } from '@/components/TourCard'
import { SearchFilter } from '@/components/SearchFilter'

export default async function ToursPage() {
  await connectDB()
  const tours = await Tour.find({ published: true }).sort({ createdAt: -1 })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Tours</h1>
      <SearchFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  )
}